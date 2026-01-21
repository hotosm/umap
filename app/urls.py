# This file extends uMap app with new URLs for custom features

from hotumap import chatmap, api
from django.urls import path, include
from django.conf import settings
from umap import urls

urlpatterns = [
   # ChatMap routes
   path("chatmap", chatmap.upload_view, name="chatmap-upload"),
   path('save_file/', chatmap.FileUploadView.as_view(), name='file-upload'),
   path('media_file/<path:file_path>', chatmap.serve_media, name='serve_media'),
   path('video_player/<path:file_path>', chatmap.serve_video_player, name='serve_video_player'),
   path('audio_player/<path:file_path>', chatmap.serve_audio_player, name='serve_audio_player'),
   
   # API routes
   path('api/get_map/<path:map_id>', api.get_map, name='api_get_map'),
   
   # Auth API routes (compatible with fAIr)
   path('api/v1/auth/', include('hotumap.auth_urls')),
]

# Add admin mapping patterns if Hanko is enabled
if getattr(settings, 'AUTH_PROVIDER', 'legacy') == 'hanko':
    # Import admin views directly
    from hotumap import admin_views
    
    urlpatterns += [
        path('api/admin/mappings/', admin_views.MappingsListCreateView.as_view(), name="admin-mappings-list"),
        path('api/admin/mappings/<path:id>/', admin_views.MappingDetailView.as_view(), name="admin-mapping-detail"),
    ]

urlpatterns += urls.urlpatterns

# Serve static files in DEBUG mode (for gunicorn)
if settings.DEBUG:
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    urlpatterns += staticfiles_urlpatterns()
