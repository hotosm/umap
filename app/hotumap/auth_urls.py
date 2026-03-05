"""
Authentication module for uMap.

Provides OSM OAuth login endpoints compatible with uMap.
"""

from django.urls import path
from . import views
from hotosm_auth_django.osm_views import osm_login, osm_callback

urlpatterns = [
    # OSM OAuth — sets osm_connection cookie used by OnboardingCallback
    path("osm/login/", osm_login, name="osm-login"),
    path("osm/callback/", osm_callback, name="osm-callback"),

    # Hanko onboarding
    path("onboarding/", views.OnboardingCallback.as_view(), name="onboarding-callback"),

    # Auth status check
    path("status/", views.AuthStatus.as_view(), name="auth-status"),
]
