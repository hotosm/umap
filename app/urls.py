# This file extends uMap app with new URLs for custom features

from hotumap import chatmap, api
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
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
    from hotumap import dashboard_views

    urlpatterns += [
        path('api/admin/mappings/', admin_views.MappingsListCreateView.as_view(), name="admin-mappings-list"),
        path('api/admin/mappings/<path:id>/', admin_views.MappingDetailView.as_view(), name="admin-mapping-detail"),
    ]

    # Override user_dashboard with Hanko-aware version
    # Using explicit paths for each language to ensure they match before umap's
    urlpatterns += [
        path('es/me', dashboard_views.user_dashboard, name="user_dashboard_es"),
        path('en/me', dashboard_views.user_dashboard, name="user_dashboard_en"),
        path('fr/me', dashboard_views.user_dashboard, name="user_dashboard_fr"),
        path('de/me', dashboard_views.user_dashboard, name="user_dashboard_de"),
        path('pt/me', dashboard_views.user_dashboard, name="user_dashboard_pt"),
    ]

urlpatterns += urls.urlpatterns
