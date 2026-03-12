"""
Context processors for uMap Hanko authentication.

Exposes authentication settings and Hanko user info to templates.
"""

from django.conf import settings
from django.contrib.auth.models import User

def get_hanko_django_user(request):
    """
    Get the Django user for a Hanko-authenticated request.

    Only returns a user if a mapping already exists. Does NOT auto-create
    mappings or users. The onboarding flow handles user/mapping creation.

    Returns:
        User instance if mapping exists, None otherwise
    """
    if not hasattr(request, 'hotosm') or not request.hotosm.user:
        return None

    hanko_user = request.hotosm.user

    try:
        from hotosm_auth_django import get_mapped_user_id

        # Check if mapping exists
        mapped_user_id = get_mapped_user_id(hanko_user, app_name="umap")
        if mapped_user_id:
            try:
                return User.objects.get(id=int(mapped_user_id))
            except User.DoesNotExist:
                pass

    except (ImportError, ValueError) as e:
        import logging
        logging.getLogger(__name__).error(f"Error in get_hanko_django_user: {e}")

    return None

def auth_settings(request):
    """Add authentication settings and Hanko user to template context.

    Returns:
        dict: Context variables for auth configuration and user info
    """
    # HANKO_PUBLIC_URL is the public URL for frontend web component
    # HANKO_API_URL is the internal URL for backend JWT validation
    hanko_public_url = getattr(settings, 'HANKO_PUBLIC_URL', '') or getattr(settings, 'HANKO_API_URL', '')

    context = {
        'AUTH_PROVIDER': getattr(settings, 'AUTH_PROVIDER', 'legacy'),
        'HANKO_API_URL': hanko_public_url,  # Frontend always uses public URL
        'HANKO_PUBLIC_URL': hanko_public_url,  # Explicit public URL for web component
        'SITE_URL': getattr(settings, 'SITE_URL', '/'),
        'COOKIE_DOMAIN': getattr(settings, 'COOKIE_DOMAIN', ''),
        'hanko_user': None,
        'hanko_authenticated': False,
    }

    # Check for Hanko authentication
    if hasattr(request, 'hotosm') and request.hotosm.user:
        context['hanko_authenticated'] = True
        context['hanko_user'] = request.hotosm.user

        # Try to get the mapped Django user
        try:
            from hotumap.dashboard_views import get_hanko_django_user
            django_user = get_hanko_django_user(request)
            if django_user:
                context['hanko_django_user'] = django_user
        except ImportError:
            # Fallback to direct mapping lookup
            try:
                from hotosm_auth_django import get_mapped_user_id
                mapped_user_id = get_mapped_user_id(request.hotosm.user, app_name="umap")
                if mapped_user_id:
                    try:
                        django_user = User.objects.get(id=int(mapped_user_id))
                        context['hanko_django_user'] = django_user
                    except (User.DoesNotExist, ValueError):
                        pass
            except ImportError:
                pass

    return context
