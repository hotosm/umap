# This file extends uMap app with new URLs for custom features

from hotumap import chatmap, api
from django.urls import path
from umap import urls

urlpatterns = [
   path("chatmap", chatmap.upload_view, name="chatmap-upload"),
   path('save_file/', chatmap.FileUploadView.as_view(), name='file-upload'),
   path('media_file/<path:file_path>', chatmap.serve_media, name='serve_media'),
   path('video_player/<path:file_path>', chatmap.serve_video_player, name='serve_video_player'),
   path('audio_player/<path:file_path>', chatmap.serve_audio_player, name='serve_audio_player'),
   path('api/get_map/<path:map_id>', api.get_map, name='api_get_map'),
]
urlpatterns += urls.urlpatterns
