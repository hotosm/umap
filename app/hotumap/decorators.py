"""
Custom authentication decorators for uMap with Hanko SSO support.
"""

import logging
from functools import wraps
from django.conf import settings
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required

logger = logging.getLogger(__name__)


def hanko_or_login_required(view_func):
    """
    Decorator that allows access if user is authenticated via:
    1. Hanko SSO (request.hotosm.user exists)
    2. Django session (request.user.is_authenticated)

    If neither, redirects to login page.
    """
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        auth_provider = getattr(settings, 'AUTH_PROVIDER', 'legacy')

        # Debug to file
        with open('/tmp/decorator_called.txt', 'a') as f:
            f.write(f"=== hanko_or_login_required called, AUTH_PROVIDER={auth_provider} ===\n")
            f.write(f"  has_hotosm={hasattr(request, 'hotosm')}\n")
            if hasattr(request, 'hotosm'):
                f.write(f"  hotosm.user={request.hotosm.user}\n")

        # Check Hanko authentication first (if enabled)
        if auth_provider == 'hanko':
            has_hotosm = hasattr(request, 'hotosm')
            hotosm_user = request.hotosm.user if has_hotosm else None

            if has_hotosm and hotosm_user:
                with open('/tmp/decorator_called.txt', 'a') as f:
                    f.write(f"  -> Hanko auth OK, allowing access\n")
                return view_func(request, *args, **kwargs)

        # Check Django authentication
        if request.user.is_authenticated:
            with open('/tmp/decorator_called.txt', 'a') as f:
                f.write(f"  -> Django auth OK, allowing access\n")
            return view_func(request, *args, **kwargs)

        # Not authenticated, redirect to login
        with open('/tmp/decorator_called.txt', 'a') as f:
            f.write(f"  -> No auth, redirecting to login\n")
        from django.contrib.auth.views import redirect_to_login
        return redirect_to_login(request.get_full_path())

    return wrapper
