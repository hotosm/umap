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

@login_required
def chatmap_upload_view(request):
    return render(request, 'upload.html')

class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        uploaded_file = request.FILES.get('file')
        map_name = request.POST.get('name')
        
        if not uploaded_file:
            return Response({"detail": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        if uploaded_file.name.endswith('.zip'):
            try:
                with zipfile.ZipFile(uploaded_file, 'r') as zip_ref:
                    geojson_content_file = None
                    geojson_file_name = None
                    center = [0,0]
                    files = []
                    for file_name in zip_ref.namelist():
                        with zip_ref.open(file_name) as file:
                            file_content = file.read()
                            
                            # Add _umap_options for GeoJSON files
                            if file_name.endswith(".geojson"):
                                try:
                                    geojson = json.loads(file_content)
                                    geojson["_umap_options"] = {
                                        "displayOnLoad": True,
                                        "inCaption": True,
                                        "browsable": True,
                                        "editMode": "advanced",
                                        "name": "ChatMap locations",
                                        "remoteData": {},
                                        "popupContentTemplate": "# {message}\n*{username}*\n{{/media_file/{file|\"../../static/nopic.png\"}}}",
                                        "permissions": {"edit_status": 0}
                                    }
                                    file_content = json.dumps(geojson)
                                    geojson_content_file = ContentFile(file_content, name=file_name)
                                    geojson_file_name = file_name
                                    center = geojson["features"][0]["geometry"]["coordinates"]
                                except:
                                    pass

                            # If it's an image, save it
                            elif file_name.endswith(".jpg"):
                                content_file = ContentFile(file_content, name=file_name)
                                files.append(content_file)

                    if geojson_content_file:
                        new_map = create_map(
                            geojson_content_file,
                            geojson_file_name,
                            center, map_name,
                            files,
                            self.request.user
                        )
                        url = "/map/" + new_map.slug + "_" + str(new_map.id)
                        return redirect(url)
                    else:
                        return redirect("/chatmap")
            except zipfile.BadZipFile:
                return Response({"detail": "The provided file is not a valid zip file."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "Please upload a .zip file."}, status=status.HTTP_400_BAD_REQUEST)


def create_map(geojson_data, geojson_file_name, center, map_name, files, owner):
    
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
            "fullscreenControl": True
        }
    }
    
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
    
    new_data_layer = DataLayer(
        uuid=uuid4(),
        name="ChatMap " + geojson_file_name,
        map=new_map,
        description="Data by ChatMap",
        geojson=geojson_data,
        display_on_load=True,
        rank=1,
        settings={},
        edit_status=Map.OWNER,
    )

    new_data_layer.save()
    
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

    return FileResponse(file, content_type='image/jpeg')
