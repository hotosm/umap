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
def upload_view(request):
    # Get ChatMap templates list
    # they must contain 'chatmap' in the name
    # and be starred by a member of staff
    qs = Map.public.starred_by_staff().filter(
        is_template=True,
        name__icontains='chatmap',
    ).order_by('name')

    chatmap_templates = [
        {
            "id": m.id,
            "name": m.name,
            "description": m.description,
            "url": m.get_absolute_url(),
        }
        for m in qs
    ]
    context = {"chatmap_templates": chatmap_templates}
    return render(request, 'upload.html', context)

# This is a view for extending uMap with a new feature
# that enables the uploading of data exported from a tool like
# ChatMap (chatmap.hotosm.org). The .zip file uploaded
# here must contain a GeoJSON file with a 'message' property
# for displaying text and a 'file' property if media files
# (.jpg, .mp4 and .opus) are available
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
        template_id = int(request.POST.get('template_id', '-1'))
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
                            elif file_name.endswith(".jpg") or file_name.endswith(".mp4") or file_name.endswith(".opus") or file_name.endswith(".mp3"):
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
                            uuid,
                            template_id
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
POPUP_CONTENT_TEMPLATE = "# {message}\n{{{image}}}\n{media}"

# Create a new map with uploaded data
def create_map(geojson_data, geojson_file_name, center, map_name, files, owner, uuid, template_id):

    map_settings = None
    if template_id == -1:
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
    else:
        # Get settings from template
        template_map = Map.objects.get(pk=template_id)
        map_settings = template_map.settings

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

    # Replace file property with image and media urls
    # If no media, or no image, set a blank single pixel
    site_url_media = SITE_URL.replace("http:", "").replace("https:", "")
    for feature in geojson_data['features']:
        file_name = feature['properties'].get('file')
        if file_name:
            path = f"{uuid}-{file_name}"
            if path.endswith(".jpg"):
                feature['properties']['image'] = f"{SITE_URL}/media_file/{path}"
            elif path.endswith(".mp4"):
                feature['properties']['media'] = f"<iframe width=\"495\" height=\"365\" src=\"//{site_url_media}/video_player/{path}\" title=\"Video player\" scrolling=\"no\" frameborder=\"0\"></iframe>"
                feature['properties']['image'] = "/static/nopic.png"
            elif path.endswith(".opus") or path.endswith(".mp3"):
                feature['properties']['media'] = f"<iframe width=\"495\" height=\"65\" src=\"//{site_url_media}/audio_player/{path}\" title=\"Audio player\" scrolling=\"no\" frameborder=\"0\"></iframe>"
                feature['properties']['image'] = "/static/nopic.png"
            del feature['properties']['file']
        del feature['properties']['username']

    # Data layer settings
    data_layer_settings = None
    if template_id == -1:
        data_layer_settings = {
            "color": "Crimson",
            "iconClass": "Drop",
            "popupContentTemplate": POPUP_CONTENT_TEMPLATE,
            "popupShape": "Large",
        }
    else:
        # Get first template's data layer
        data_layer = DataLayer.objects.get(map=template_id)
        data_layer_settings = data_layer.settings
        
    # Create new data layer
    new_data_layer = DataLayer(
        uuid=uuid,
        name=f"ChatMap {map_name}",
        map=new_map,
        description="Data by ChatMap",
        geojson=ContentFile(json.dumps(geojson_data), name=geojson_file_name),
        display_on_load=True,
        rank=1,
        settings=data_layer_settings,
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

    content_type = 'image/jpeg'
    if file_path.endswith(".mp4"):
        content_type = 'video/mp4'
    elif file_path.endswith(".opus"):
        content_type = 'audio/ogg'
    elif file_path.endswith(".mp3"):
        content_type = 'audio/mp3'

    return FileResponse(file, content_type=content_type)

# Serve video player
def serve_video_player(request, file_path):
    return render(request, "video.html", {"video_url": file_path})

# Serve audio player
def serve_audio_player(request, file_path):
    file_type = "audio/ogg"
    if file_path.endswith(".mp3"):
        file_type = "audio/mp3"
    return render(request, "audio.html", {"audio_url": file_path, "file_type": file_type})
