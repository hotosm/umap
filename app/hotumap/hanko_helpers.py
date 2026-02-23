"""
Hanko authentication helpers for uMap.

These helpers implement the user mapping flow for uMap:
1. Check if mapping exists (hanko_id → user_id)
2. If not, ask user if they had an account before
3. Legacy user → Connect OSM to recover account
4. New user → Create new Django user

This follows the same pattern as uMap but adapted for uMap's User model.
"""

from typing import Optional, Tuple
import logging
from django.contrib.auth.models import User

logger = logging.getLogger(__name__)


def find_legacy_user_by_osm_id(osm_id: int) -> Optional[User]:
    """Find existing user by OSM ID via social_auth.

    Used after OSM connect to check if this OSM ID already exists
    in the database (legacy user). This is more reliable than username
    because OSM allows username changes.

    Args:
        osm_id: OSM user ID from OAuth

    Returns:
        User if found, None otherwise
    """
    try:
        from social_django.models import UserSocialAuth
        social_auth = UserSocialAuth.objects.get(
            provider='openstreetmap-oauth2',
            uid=str(osm_id)
        )
        return social_auth.user
    except Exception:
        return None


def find_legacy_user_by_email(email: str) -> Optional[User]:
    """Find existing user by email.

    Used as fallback when OSM ID lookup fails. More reliable than username
    because email is unique and doesn't change as often.

    Note: Legacy users from OSM OAuth typically don't have email set
    (OSM OAuth returns email=""). This only works if user manually
    configured their email in uMap.

    Args:
        email: Email address to search for

    Returns:
        User if found, None otherwise
    """
    if not email:
        return None
    try:
        return User.objects.get(email=email)
    except User.DoesNotExist:
        return None


def handle_legacy_recovery(osm_data: dict) -> Tuple[Optional[User], int]:
    """Handle legacy user recovery after OSM connect.

    Called when user said "Yes, I had an account" and connected OSM.
    Checks if the OSM ID from OAuth exists in social_auth.

    Args:
        osm_data: OSM OAuth response containing 'id', 'username', 'display_name'

    Returns:
        Tuple of (existing_user, osm_id):
        - If existing_user is not None: Legacy user found, create mapping
        - If existing_user is None: No legacy user, need to create new account
    """
    osm_id = osm_data.get("id")
    existing_user = find_legacy_user_by_osm_id(osm_id) if osm_id else None

    if existing_user:
        logger.info(f"Legacy user found: osm_id={osm_id}, django_user_id={existing_user.id}")
    else:
        logger.info(f"No legacy user found for osm_id={osm_id}")

    return existing_user, osm_id


def create_umap_user(
    username: str,
    email: Optional[str] = None,
    osm_user_id: Optional[int] = None,
) -> User:
    """Create a new Django User for uMap.

    Args:
        username: Display username
        email: Email address (optional)
        osm_user_id: OSM user ID (optional, stored in profile if needed)

    Returns:
        User: Created user instance
    """
    # Handle username conflicts by appending suffix
    final_username = username
    suffix = 1
    while User.objects.filter(username=final_username).exists():
        final_username = f"{username}_{suffix}"
        suffix += 1

    user = User.objects.create_user(
        username=final_username,
        email=email or "",
    )
    
    logger.info(f"Created User: id={user.id}, username={final_username}")
    return user


class HankoUserFilterMixin:
    """Mixin to filter queryset by authenticated Hanko user.

    Usage:
        class MapViewSet(HankoUserFilterMixin, ...):
            ...

    This will automatically filter querysets to show only the current user's maps.
    """

    def get_queryset(self):
        queryset = super().get_queryset()

        # Check if we have Hanko auth
        if hasattr(self.request, 'hotosm') and self.request.hotosm.user:
            from hotosm_auth_django import get_mapped_user_id
            
            # Get mapped Django user ID
            app_user_id = get_mapped_user_id(
                self.request.hotosm.user,
                app_name="umap"
            )
            
            if app_user_id:
                try:
                    django_user_id = int(app_user_id)
                    # Filter by owner field (uMap uses 'owner' for Map model)
                    if hasattr(queryset.model, 'owner'):
                        queryset = queryset.filter(owner_id=django_user_id)
                        logger.debug(f"Filtered by owner_id={django_user_id}")
                except (ValueError, TypeError):
                    logger.error(f"Invalid mapped user ID: {app_user_id}")

        return queryset
