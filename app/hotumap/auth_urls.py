"""
Authentication module for uMap.

Provides OSM OAuth login endpoints compatible with uMap.
"""

from django.urls import path
from . import views

urlpatterns = [
    # OSM OAuth (legacy)
    path("login/", views.OSMLogin.as_view(), name="osm-login"),
    path("callback/", views.OSMCallback.as_view(), name="osm-callback"),
    
    # Hanko onboarding
    path("onboarding/", views.OnboardingCallback.as_view(), name="onboarding-callback"),
    
    # Auth status check
    path("status/", views.AuthStatus.as_view(), name="auth-status"),
]
