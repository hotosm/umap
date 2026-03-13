"""
Custom middleware for uMap Hanko authentication.

This middleware sets request.user to the mapped Django user when
a user is authenticated with Hanko. This makes all existing Django
authentication checks (like @login_required) work with Hanko auth.
"""

import logging
from django.conf import settings
from django.contrib.auth import get_user_model, logout

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
        self._authenticate_hanko_user(request)

        response = self.get_response(request)

        # If Hanko is enabled but no Hanko session, clear stale Django cookies
        self._clear_session_if_no_hanko(request, response)

        return response

    def _authenticate_hanko_user(self, request):
        """Set request.user to the mapped Django user if authenticated with Hanko.

        If no mapping exists, sets request.needs_onboarding = True.
        The actual user/mapping creation happens in OnboardingCallback view.
        """
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
                    # Mapping exists but user deleted - needs re-onboarding
                    request.needs_onboarding = True
                    request.hanko_user_for_onboarding = hanko_user
            else:
                # No mapping exists - user needs onboarding
                # Do NOT auto-create users here. Let OnboardingCallback handle it.
                request.needs_onboarding = True
                request.hanko_user_for_onboarding = hanko_user
                logger.debug(f"Hanko user {hanko_user.email} needs onboarding (no mapping)")

        except ImportError as e:
            logger.error(f"hotosm_auth_django not available: {e}")
        except Exception as e:
            logger.error(f"Error in HankoUserMiddleware: {e}")

    def _clear_session_if_no_hanko(self, request, response):
        """Clear Django session cookies if no Hanko authentication is present.

        When the Hanko cookie is missing or invalid, any existing Django session
        is stale (the user logged out from Hanko but the Django session persists).
        We log them out server-side and delete the session cookie from the response.
        """
        has_hanko = hasattr(request, 'hotosm') and request.hotosm.user
        if has_hanko:
            return

        session_cookie_name = getattr(settings, 'SESSION_COOKIE_NAME', 'sessionid')
        if session_cookie_name not in request.COOKIES:
            return

        # Flush session data server-side
        if hasattr(request, 'user') and request.user.is_authenticated:
            logger.info(f"No Hanko cookie — clearing stale Django session for user {request.user.id}")
            logout(request)

        # Delete session cookie from the response
        response.delete_cookie(
            session_cookie_name,
            path=getattr(settings, 'SESSION_COOKIE_PATH', '/'),
            domain=getattr(settings, 'SESSION_COOKIE_DOMAIN', None),
            samesite=getattr(settings, 'SESSION_COOKIE_SAMESITE', 'Lax'),
        )

        # Also delete messages cookie if present
        if 'messages' in request.COOKIES:
            response.delete_cookie('messages', path='/')

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
