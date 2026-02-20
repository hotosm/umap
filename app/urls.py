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
    from hotumap import dashboard_views
    from hotumap.admin_routes_wrapper import create_json_admin_urlpatterns

    # Auth-libs admin routes for hanko_user_mappings (used by Login admin panel)
    hanko_admin_patterns = create_json_admin_urlpatterns(
        app_name="umap",
        user_model="auth.User",
        user_id_column="id",
        user_name_column="username",
        user_email_column="email",
    )
    urlpatterns += [path('api/admin/', include(hanko_admin_patterns))]

    # Override user views with Hanko-aware versions
    # Using explicit paths for each language to ensure they match before umap's
    # Languages supported by umap
    langs = ['es', 'en', 'fr', 'de', 'pt', 'it', 'nl', 'pl', 'ru', 'ja', 'zh', 'ko']
    for lang in langs:
        urlpatterns += [
            # Override login to redirect Hanko users to 'next' directly
            path(f'{lang}/login/', dashboard_views.HankoAwareLoginView.as_view(), name=f"login_{lang}"),
            path(f'{lang}/me', dashboard_views.user_dashboard, name=f"user_dashboard_{lang}"),
            path(f'{lang}/me/teams', dashboard_views.user_teams, name=f"user_teams_{lang}"),
            path(f'{lang}/me/templates', dashboard_views.user_templates, name=f"user_templates_{lang}"),
            path(f'{lang}/me/profile', dashboard_views.user_profile, name=f"user_profile_{lang}"),
        ]

urlpatterns += urls.urlpatterns
