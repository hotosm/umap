# views.py
import zipfile
import json
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.core.files.base import ContentFile
from .serializers import FileUploadSerializer
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from umap.models import Map, DataLayer, get_default_licence, set_storage
from django.contrib.gis.geos import Point
from django.utils import timezone
from uuid import uuid4
from django.shortcuts import render
from django.http import FileResponse, Http404
from settings import SITE_URL

# Upload form
@login_required
def chatmap_upload_view(request):
    return render(request, 'upload.html')

# This is a view for extending uMap with a new feature
# that enables the uploading of data exported from a tool like
# ChatMap (chatmap.hotosm.org). The .zip file uploaded
# here must contain a GeoJSON file with a 'message' property
# for displaying text and a 'file' property if media files
# (.jpg) are available
#
# Example:
#
# "properties": {
#     "message": "A tree",
#     "file": "attachment-2025-01-30-09-34-25.jpg",
# }
#
class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]
    
    
    def post(self, request, *args, **kwargs):
        uploaded_file = request.FILES.get('file')
        map_name = request.POST.get('name')
        uuid = uuid4()
                
        if not uploaded_file:
            return Response({"detail": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Only accepts .zip files
        if uploaded_file.name.endswith('.zip'):
            try:
                with zipfile.ZipFile(uploaded_file, 'r') as zip_ref:
                    geojson_data = None
                    geojson_file_name = None
                    center = [0,0]
                    files = []
                    for file_name in zip_ref.namelist():
                        with zip_ref.open(file_name) as file:
                            file_content = file.read()
                            
                            # Handle GeoJSON files
                            if file_name.endswith(".geojson"):
                                try:
                                    geojson = json.loads(file_content)
                                    geojson["_umap_options"] = {
                                        "displayOnLoad": True,
                                        "inCaption": True,
                                        "browsable": True,
                                        "editMode": "advanced",
                                        "name": f"ChatMap {map_name})",
                                        "remoteData": {},
                                        "permissions": {"edit_status": 0}
                                    }
                                    geojson_data = geojson
                                    geojson_file_name = file_name
                                    center = geojson["features"][0]["geometry"]["coordinates"]
                                except:
                                    pass

                            # Handle media
                            elif file_name.endswith(".jpg") or file_name.endswith(".mp4"):
                                content_file = ContentFile(file_content, name=f"{uuid}-{file_name}")
                                files.append(content_file)

                    # If there's a GeoJSON, create the map
                    if geojson_file_name:
                        new_map = create_map(
                            geojson_data,
                            geojson_file_name,
                            center, 
                            map_name,
                            files,
                            self.request.user,
                            uuid
                        )
                        url = "/map/" + new_map.slug + "_" + str(new_map.id)
                        return redirect(url)
                    else:
                        return redirect("/chatmap")
            except zipfile.BadZipFile:
                return Response({"detail": "The provided file is not a valid zip file."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "Please upload a .zip file."}, status=status.HTTP_400_BAD_REQUEST)


# Template for layers
POPUP_CONTENT_TEMPLATE = "# {message}\n{{{image}}}\n{video}"

# Create a new map  with uploaded data
def create_map(geojson_data, geojson_file_name, center, map_name, files, owner, uuid):
    
    site_url_video = SITE_URL.replace("http:", "").replace("https:", "")
    
    # Default map settings
    map_settings = {
        "type": "Feature", 
        "geometry": {
            "type": "Point",
            "coordinates": center
        },
        "properties": {
            "zoom": 15, 
            "rules": [], 
            "overlay": {}, 
            "tilelayer": {}, 
            "limitBounds": {}, 
            "zoomControl": True, 
            "fullscreenControl": True,
            "slideshow": {"active": True},
        }
    }
    
    # New uMap map
    new_map = Map(
        name=map_name,
        slug="chatmap",
        center=Point(x=center[0], y=center[1]),
        zoom=15,
        licence=get_default_licence(),
        owner=owner,
        locate=True,
        team=None,
        edit_status=Map.OWNER,
        share_status=Map.PUBLIC,
        settings=map_settings,
        created_at=timezone.now(),
        modified_at=timezone.now()
    )
    new_map.save()
    new_map.editors.add(owner)
    
    # Replace file property with image and video urls
    # If no video, or no image, set a blank single pixel
    for feature in geojson_data['features']:
        path = f"{uuid}-{feature['properties']['file']}"
        if path.endswith(".jpg"):
            feature['properties']['image'] = f"{SITE_URL}/media_file/{path}"
        elif path.endswith(".mp4"):
            feature['properties']['video'] = f"<iframe width=\"495\" height=\"365\" src=\"//{site_url_video}/video_player/{path}\" title=\"Video player\" scrolling=\"no\" frameborder=\"0\"></iframe>"
            feature['properties']['image'] = "/static/nopic.png"
        del feature['properties']['file']

    # Create data layer linked to map
    new_data_layer = DataLayer(
        uuid=uuid,
        name=f"ChatMap {map_name}",
        map=new_map,
        description="Data by ChatMap",
        geojson=ContentFile(json.dumps(geojson_data), name=geojson_file_name),
        display_on_load=True,
        rank=1,
        settings={
            "color": "Crimson",
            "iconClass": "Drop",
            "popupContentTemplate": POPUP_CONTENT_TEMPLATE,
            "popupShape": "Large",

        },
        edit_status=Map.OWNER,
    )
    new_data_layer.save()
    
    # Save files
    for file in files:
        serializer = FileUploadSerializer(data={'file': file, 'data_layer': new_data_layer.pk})
        if serializer.is_valid():
            serializer.save()
    
    return new_map

# Serve media files
def serve_media(request, file_path):
    storage = set_storage()
    s3_file_path = f"media_uploads/{file_path}"
    try:
        file = storage.open(s3_file_path)
    except FileNotFoundError:
        raise Http404("File not found.")

    if file_path.endswith(".mp4"):
        FileResponse(file, content_type='video/mp4')
    return FileResponse(file, content_type='image/jpeg')


# Serve video player
def serve_video_player(request, file_path):
    return render(request, "video.html", {"video_url": file_path})
