# This file extends uMap app with new URLs for custom features

import views
from django.urls import path
from umap import urls

urlpatterns = [
   path("upload", views.upload_view, name="upload"),
]

urlpatterns += urls.urlpatterns
