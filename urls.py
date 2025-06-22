# This file extends uMap app with new URLs for custom features

from hotumap import views
from django.urls import path
from umap import urls

urlpatterns = [
   path("chatmap", views.chatmap_upload_view, name="chatmap-upload"),
   path('save_file/', views.FileUploadView.as_view(), name='file-upload'),
   path('media_file/<path:file_path>', views.serve_media, name='serve_media'),
   path('video_player/<path:file_path>', views.serve_video_player, name='serve_video_player'),
]

urlpatterns += urls.urlpatterns
