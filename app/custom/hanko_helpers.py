# -*- coding:utf-8 -*-
"""
Hanko authentication helpers for uMap Django application.
Provides utilities for user mapping and queryset filtering.
"""

from rest_framework.response import Response
from rest_framework import status


class HankoUserFilterMixin:
    """Filters querysets by the mapped Hanko user."""

    def get_queryset(self):
        """Filter queryset by the authenticated Hanko user."""
        qs = super().get_queryset()

        if hasattr(self.request, 'hotosm') and self.request.hotosm.user:
            try:
                from hotosm_auth_django import get_mapped_user_id
                
                # Get the mapped user ID for this app
                app_user_id = get_mapped_user_id(
                    self.request.hotosm.user,
                    app_name="umap"
                )
                
                if app_user_id:
                    # Filter by owner - adjust field name as needed for your model
                    return qs.filter(owner_id=app_user_id)
            except ImportError:
                pass

        return qs


def require_hanko_auth(view_func):
    """Decorator to require Hanko authentication for a view."""
    def wrapper(request, *args, **kwargs):
        if not hasattr(request, 'hotosm') or not request.hotosm.user:
            return Response(
                {"error": "Not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        return view_func(request, *args, **kwargs)
    return wrapper


def require_osm_connection(view_func):
    """Decorator to require OSM connection for a view."""
    def wrapper(request, *args, **kwargs):
        if not hasattr(request, 'hotosm') or not request.hotosm.user:
            return Response(
                {"error": "Not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        if not request.hotosm.osm:
            return Response(
                {"error": "OSM connection required"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        return view_func(request, *args, **kwargs)
    return wrapper
