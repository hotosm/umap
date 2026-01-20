"""
Admin mapping routes for user management.

Manual implementation compatible with hotosm_auth_django.admin_routes.
"""

from django.urls import path
from . import admin_views

urlpatterns = [
    path("mappings/", admin_views.MappingsListCreateView.as_view(), name="admin-mappings-list"),
    path("mappings/<int:pk>/", admin_views.MappingDetailView.as_view(), name="admin-mapping-detail"),
]
