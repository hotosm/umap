"""
Authentication views for uMap.

These views handle both OSM OAuth (legacy) and Hanko authentication flows.
"""

import logging
from django.conf import settings
from django.http import HttpResponseRedirect, JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import status

from .hanko_helpers import (
    find_legacy_user_by_osm_id,
    find_legacy_user_by_email,
    create_umap_user,
)

logger = logging.getLogger(__name__)


# ==========================================
# OSM Legacy Authentication (Compatibility)
# ==========================================

class OSMLogin(APIView):
    """Generate OSM OAuth login URL.
    
    Compatible endpoint with uMap. Returns login URL for OSM OAuth.
    """
    renderer_classes = [JSONRenderer]
    
    def get(self, request):
        """Get OSM login URL.
        
        uMap uses django-social-auth which provides /accounts/login/openstreetmap/
        This endpoint provides a JSON-compatible interface.
        """
        # uMap's django-social-auth integration uses:
        # /accounts/login/openstreetmap/ → redirects to OSM OAuth
        # /accounts/callback/openstreetmap/ → handles callback
        
        login_url = request.build_absolute_uri('/accounts/login/openstreetmap/')
        
        return Response({
            "login_url": login_url
        })


class OSMCallback(APIView):
    """Handle OSM OAuth callback.
    
    This is a compatibility endpoint. The actual callback is handled by
    django-social-auth at /accounts/callback/openstreetmap/
    """
    renderer_classes = [JSONRenderer]
    
    def get(self, request):
        """Get OSM callback information.
        
        In a production setup with django-social-auth, the actual callback
        happens automatically. This endpoint is for compatibility and 
        returns status information.
        """
        # django-social-auth handles the actual OAuth flow
        # This is just a compatibility stub
        
        if request.user.is_authenticated:
            return Response({
                "authenticated": True,
                "user": {
                    "id": request.user.id,
                    "username": request.user.username,
                }
            })
        else:
            return Response({
                "authenticated": False,
                "error": "Not authenticated"
            }, status=401)


@method_decorator(csrf_exempt, name='dispatch')
class OnboardingCallback(View):
    """Handle onboarding callback from login service.

    This endpoint is called after the user completes onboarding in login.hotosm.org.
    It creates the Django User and mapping based on whether the user is new or legacy.

    Query params:
    - new_user=true: User is new, create new Django user
    - (no param): User is legacy, osm_connection cookie should be set

    Only works when AUTH_PROVIDER=hanko.
    """

    def get(self, request):
        from hotosm_auth_django import create_user_mapping

        # Only for Hanko auth
        if getattr(settings, 'AUTH_PROVIDER', 'legacy') != 'hanko':
            return JsonResponse(
                {"error": "Onboarding only available with Hanko auth"},
                status=400
            )

        # Need Hanko user from middleware
        if not hasattr(request, 'hotosm') or not request.hotosm.user:
            return JsonResponse(
                {"error": "Not authenticated with Hanko"},
                status=401
            )

        hanko_user = request.hotosm.user
        is_new_user = request.GET.get('new_user') == 'true'

        if is_new_user:
            # New user - create Django user with email as username base
            username = hanko_user.email.split('@')[0]

            # Create User
            user = create_umap_user(
                username=username,
                email=hanko_user.email,
            )

            # Create mapping
            create_user_mapping(
                hanko_user_id=hanko_user.id,
                app_user_id=str(user.id),
                app_name="umap",
            )

            logger.info(f"New user created: hanko_id={hanko_user.id}, django_user_id={user.id}")

            # Redirect to uMap homepage
            site_url = getattr(settings, 'SITE_URL', '/')
            return HttpResponseRedirect(site_url)

        else:
            # Legacy user - should have osm_connection cookie
            osm_connection = request.hotosm.osm

            if not osm_connection:
                return JsonResponse(
                    {"error": "OSM connection required for legacy users"},
                    status=400
                )

            osm_id = osm_connection.osm_user_id
            osm_username = osm_connection.osm_username

            # Check if User already exists (true legacy)
            # Priority: 1) OSM ID (via social_auth), 2) Email (Hanko email)
            existing_user = find_legacy_user_by_osm_id(osm_id) if osm_id else None
            if not existing_user:
                # Fallback to email - use Hanko user's email
                existing_user = find_legacy_user_by_email(hanko_user.email)

            if not existing_user:
                # No existing uMap account with this OSM ID or email
                # Redirect back to Login with error message
                from urllib.parse import urlencode
                login_url = getattr(settings, 'HANKO_PUBLIC_URL', '') or getattr(settings, 'HANKO_API_URL', 'https://login.hotosm.org')
                site_url = getattr(settings, 'SITE_URL', '/')
                error_msg = f"No existing account found for your OSM user. Please select 'No, I'm new' to create a new account."
                params = urlencode({
                    'onboarding': 'umap',
                    'return_to': site_url,
                    'error': error_msg,
                })
                return HttpResponseRedirect(f"{login_url}/app?{params}")

            # True legacy user - create mapping
            create_user_mapping(
                hanko_user_id=hanko_user.id,
                app_user_id=str(existing_user.id),
                app_name="umap",
            )

            logger.info(f"Legacy user mapped: hanko_id={hanko_user.id}, django_user_id={existing_user.id}")

            # Redirect to uMap homepage
            site_url = getattr(settings, 'SITE_URL', '/')
            return HttpResponseRedirect(site_url)


class AuthStatus(APIView):
    """Check authentication status for Hanko users.

    Returns:
    - authenticated: true if user has valid mapping
    - needs_onboarding: true if user needs to complete onboarding
    - hanko_user: Hanko user info if authenticated with Hanko

    Only works when AUTH_PROVIDER=hanko.
    """
    renderer_classes = [JSONRenderer]

    def get(self, request):
        from hotosm_auth_django import get_mapped_user_id
        from django.contrib.auth.models import User

        # Only for Hanko auth
        if getattr(settings, 'AUTH_PROVIDER', 'legacy') != 'hanko':
            return Response({
                "auth_provider": "legacy",
                "authenticated": request.user.is_authenticated if hasattr(request, 'user') else False,
            })

        # Check Hanko user
        if not hasattr(request, 'hotosm') or not request.hotosm.user:
            return Response({
                "auth_provider": "hanko",
                "authenticated": False,
                "hanko_authenticated": False,
            })

        hanko_user = request.hotosm.user

        # Check mapping
        mapped_user_id = get_mapped_user_id(hanko_user, app_name="umap")

        if mapped_user_id is not None:
            # Has mapping - fully authenticated
            try:
                django_user_id = int(mapped_user_id)
                user = User.objects.get(id=django_user_id)
                return Response({
                    "auth_provider": "hanko",
                    "authenticated": True,
                    "needs_onboarding": False,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                    },
                    "hanko_user": {
                        "id": hanko_user.id,
                        "email": hanko_user.email,
                    }
                })
            except User.DoesNotExist:
                logger.error(f"Mapped user {mapped_user_id} not found")
                pass  # Fall through to needs_onboarding

        # No mapping - needs onboarding
        return Response({
            "auth_provider": "hanko",
            "authenticated": False,
            "needs_onboarding": True,
            "hanko_authenticated": True,
            "hanko_user": {
                "id": hanko_user.id,
                "email": hanko_user.email,
            }
        })
