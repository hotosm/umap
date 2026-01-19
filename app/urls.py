# This file extends uMap app with new URLs for custom features

from hotumap import chatmap, api
from django.urls import path, include
from django.conf import settings
from umap import urls

# Admin mapping patterns for Hanko authentication
admin_mapping_patterns = []
if getattr(settings, 'AUTH_PROVIDER', 'legacy') == 'hanko':
    try:
        from hotosm_auth_django.admin_routes import create_admin_urlpatterns
        admin_mapping_patterns = create_admin_urlpatterns(
            app_name="umap",
            user_model="auth.User",
            user_id_column="id",
            user_name_column="username",
            user_email_column="email",
        )
    except ImportError:
        pass

urlpatterns = [
   path("chatmap", chatmap.upload_view, name="chatmap-upload"),
   path('save_file/', chatmap.FileUploadView.as_view(), name='file-upload'),
   path('media_file/<path:file_path>', chatmap.serve_media, name='serve_media'),
   path('video_player/<path:file_path>', chatmap.serve_video_player, name='serve_video_player'),
   path('audio_player/<path:file_path>', chatmap.serve_audio_player, name='serve_audio_player'),
   path('api/get_map/<path:map_id>', api.get_map, name='api_get_map'),
]

# Add admin mapping patterns if Hanko is enabled
if admin_mapping_patterns:
    urlpatterns.append(path('api/admin/', include(admin_mapping_patterns)))

urlpatterns += urls.urlpatterns
