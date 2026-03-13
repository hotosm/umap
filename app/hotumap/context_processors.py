"""
Context processors for uMap Hanko authentication.

Exposes authentication settings and Hanko user info to templates.
"""

from django.conf import settings

def auth_settings(request):
    """Add authentication settings and Hanko user to template context.

    Returns:
        dict: Context variables for auth configuration and user info
    """
    # HANKO_PUBLIC_URL is the public URL for frontend web component
    # HANKO_API_URL is the internal URL for backend JWT validation
    hanko_public_url = getattr(settings, 'HANKO_PUBLIC_URL', '') or getattr(settings, 'HANKO_API_URL', '')

    return {
        'AUTH_PROVIDER': getattr(settings, 'AUTH_PROVIDER', 'legacy'),
        'HANKO_PUBLIC_URL': hanko_public_url,
        'SITE_URL': getattr(settings, 'SITE_URL', '/'),
        'COOKIE_DOMAIN': getattr(settings, 'COOKIE_DOMAIN', ''),
    }
