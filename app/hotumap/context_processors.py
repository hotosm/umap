"""
Context processors for uMap Hanko authentication.

Exposes authentication settings and Hanko user info to templates.
"""

from django.conf import settings
from django.contrib.auth.models import User


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
    if getattr(settings, 'AUTH_PROVIDER', 'legacy') == 'hanko':
        if hasattr(request, 'hotosm') and request.hotosm.user:
            context['hanko_authenticated'] = True
            context['hanko_user'] = request.hotosm.user

            # Try to get the mapped Django user (no auto-create)
            try:
                from hotumap.dashboard_views import get_hanko_django_user
                django_user = get_hanko_django_user(request, auto_map=True, auto_create=False)
                if django_user:
                    context['hanko_django_user'] = django_user
            except ImportError:
                # Fallback to just checking mapping without auto-create
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
