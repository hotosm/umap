from umap.models import DataLayer
from rest_framework.response import Response

# Get a map
def get_map(request, map_id):
    layers = DataLayer.objects.get(map=map_id)
    return Response({"layers_count": f"{len(layers)}"})

# TODO: build a web page that takes a map id and build a visualization

