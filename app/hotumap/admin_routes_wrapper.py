"""
Admin mapping routes wrapper for JSON-only responses.

Wraps hotosm_auth_django admin routes to force JSON rendering.
"""

from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import status


def create_json_admin_urlpatterns(app_name, user_model, user_id_column, user_name_column, user_email_column):
    """
    Create admin URL patterns with JSON-only responses.
    
    This wraps hotosm_auth_django.admin_routes to ensure all responses are JSON.
    """
    from hotosm_auth_django.admin_routes import create_admin_urlpatterns
    from django.urls import path
    from functools import wraps
    
    # Get the original patterns
    original_patterns = create_admin_urlpatterns(
        app_name=app_name,
        user_model=user_model,
        user_id_column=user_id_column,
        user_name_column=user_name_column,
        user_email_column=user_email_column,
    )
    
    # Wrap each view to force JSON rendering
    wrapped_patterns = []
    for pattern in original_patterns:
        if hasattr(pattern.callback, 'cls'):
            # It's a class-based view
            view_class = pattern.callback.cls
            
            # Add JSONRenderer to the class
            original_renderer_classes = getattr(view_class, 'renderer_classes', [])
            view_class.renderer_classes = [JSONRenderer]
            
            # Wrap dispatch to ensure JSON responses
            original_dispatch = view_class.dispatch
            
            @wraps(original_dispatch)
            def wrapped_dispatch(self, request, *args, **kwargs):
                try:
                    response = original_dispatch(self, request, *args, **kwargs)
                    # Ensure the response has JSONRenderer
                    if not hasattr(response, 'accepted_renderer'):
                        response.accepted_renderer = JSONRenderer()
                    if not hasattr(response, 'accepted_media_type'):
                        response.accepted_media_type = 'application/json'
                    return response
                except Exception as e:
                    # Return JSON error response
                    return Response(
                        {"detail": str(e)},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
            
            view_class.dispatch = wrapped_dispatch
        
        wrapped_patterns.append(pattern)
    
    return wrapped_patterns
