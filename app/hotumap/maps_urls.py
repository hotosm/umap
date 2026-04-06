from django.urls import path
from .views import MapList

urlpatterns = [
    path("", MapList.as_view(), name="map-list"),
]
