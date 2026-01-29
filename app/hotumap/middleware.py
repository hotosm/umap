"""
Custom middleware for uMap Hanko authentication.

This middleware sets request.user to the mapped Django user when
a user is authenticated with Hanko. This makes all existing Django
authentication checks (like @login_required) work with Hanko auth.
"""

import logging
from django.conf import settings
from django.contrib.auth import get_user_model

logger = logging.getLogger(__name__)
User = get_user_model()


class HankoUserMiddleware:
    """
    Middleware that sets request.user to the mapped Django user for Hanko auth.

    This must run AFTER HankoAuthMiddleware (which sets request.hotosm.user)
    and AFTER Django's AuthenticationMiddleware.

    When a user is authenticated with Hanko and has a mapping to a Django user,
    this middleware sets request.user to that Django user. This makes all
    existing @login_required decorators and request.user.is_authenticated
    checks work seamlessly with Hanko authentication.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Only process if Hanko auth is enabled
        if getattr(settings, 'AUTH_PROVIDER', 'legacy') == 'hanko':
            self._authenticate_hanko_user(request)

        response = self.get_response(request)
        return response

    def _authenticate_hanko_user(self, request):
        """Set request.user to the mapped Django user if authenticated with Hanko."""
        # Check if user is already authenticated via Django session
        if hasattr(request, 'user') and request.user.is_authenticated:
            return

        # Check for Hanko authentication
        if not hasattr(request, 'hotosm') or not request.hotosm.user:
            return

        hanko_user = request.hotosm.user

        try:
            from hotosm_auth_django import get_mapped_user_id

            # Check if there's a mapping
            mapped_user_id = get_mapped_user_id(hanko_user, app_name="umap")

            if mapped_user_id:
                try:
                    django_user = User.objects.get(id=int(mapped_user_id))
                    # Set request.user to the mapped Django user
                    request.user = django_user
                    # Mark that this was set by Hanko middleware
                    request._hanko_authenticated = True
                    # Sync email/username from Hanko to Django user
                    self._sync_hanko_user_data(django_user, hanko_user)
                    logger.debug(f"Hanko user {hanko_user.id} mapped to Django user {django_user.id}")
                except User.DoesNotExist:
                    logger.warning(f"Mapped user {mapped_user_id} not found for Hanko user {hanko_user.id}")
            else:
                # No mapping exists - try auto-mapping by email or create new user
                if hanko_user.email:
                    try:
                        from hotosm_auth_django import create_user_mapping

                        # Try to find existing user by email
                        existing_user = User.objects.filter(email=hanko_user.email).first()
                        if not existing_user:
                            # Try by username (email prefix)
                            email_username = hanko_user.email.split('@')[0]
                            existing_user = User.objects.filter(username__iexact=email_username).first()

                        if existing_user:
                            # Create mapping to existing user
                            create_user_mapping(
                                hanko_user_id=hanko_user.id,
                                app_user_id=str(existing_user.id),
                                app_name="umap",
                            )
                            request.user = existing_user
                            request._hanko_authenticated = True
                            logger.info(f"Auto-mapped Hanko user {hanko_user.id} to existing Django user {existing_user.id}")
                        else:
                            # No existing user - create new Django user
                            new_user = self._create_django_user_for_hanko(hanko_user)
                            if new_user:
                                create_user_mapping(
                                    hanko_user_id=hanko_user.id,
                                    app_user_id=str(new_user.id),
                                    app_name="umap",
                                )
                                request.user = new_user
                                request._hanko_authenticated = True
                                logger.info(f"Auto-created Django user {new_user.id} for Hanko user {hanko_user.id}")
                    except Exception as e:
                        logger.error(f"Error auto-mapping/creating Hanko user: {e}")

        except ImportError as e:
            logger.error(f"hotosm_auth_django not available: {e}")
        except Exception as e:
            logger.error(f"Error in HankoUserMiddleware: {e}")

    def _sync_hanko_user_data(self, django_user, hanko_user):
        """Sync email and username from Hanko user to the mapped Django user.

        When a user changes their email or username in Hanko's profile,
        the corresponding Django user fields are updated to stay in sync.
        """
        if not hanko_user.email:
            return

        updated = False

        if django_user.email != hanko_user.email:
            django_user.email = hanko_user.email
            updated = True
            # Derive new username from the updated email
            new_username = hanko_user.email.split('@')[0]
            if not User.objects.filter(username=new_username).exclude(id=django_user.id).exists():
                django_user.username = new_username
            logger.info(
                f"Synced Hanko email to Django user {django_user.id}: {hanko_user.email}"
            )

        if updated:
            django_user.save(update_fields=['email', 'username'])

    def _create_django_user_for_hanko(self, hanko_user):
        """Create a new Django user for a Hanko user.

        Args:
            hanko_user: The Hanko user object with id and email

        Returns:
            User: The created Django user, or None if creation failed
        """
        if not hanko_user.email:
            return None

        try:
            # Generate username from email
            base_username = hanko_user.email.split('@')[0]
            username = base_username
            counter = 1

            # Ensure unique username
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1

            # Create the user
            new_user = User.objects.create_user(
                username=username,
                email=hanko_user.email,
            )

            logger.info(f"Created Django user '{username}' (id={new_user.id}) for Hanko email {hanko_user.email}")
            return new_user

        except Exception as e:
            logger.error(f"Failed to create Django user for Hanko user {hanko_user.id}: {e}")
            return None
