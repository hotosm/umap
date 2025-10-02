# HOT's uMap

This is the uMap instance for HOT, an easy way to create maps
with a focus in humanitarian use

https://umap.hotosm.org

It's based on [uMap](https://github.com/umap-project/umap/)
with some extra flavour added by the `hotumap` app.

## Run

Make a copy of env.sample and edit the needed variables.

### Development

1. Edit source ./env.local.sample and rename it to ./env.local
2. `source ./env.local`
3. `uv run python manage.py makemigrations hotumap`
3. `uv run python manage.py migrate hotumap`
3. `uv run python manage.py collectstatic --noinput`
4. `uv run python manage.py import_pictograms --attribution "Maki Icons by Mapbox" custom/icons`
5. `uv run gunicorn wsgi`

You should be able to open the app in:
http://127.0.0.1:8001

#### With Docker

1. Edit source `./env.docker.sample` and rename it to `./env.docker`
2. `source ./env.docker`
3. `docker compose -f docker-compose.dev.yml up -d`
4. `docker exec -t hotumap python manage.py makemigrations hotumap`
5. `docker exec -t hotumap python manage.py migrate hotumap`

You should be able to open the app in:
http://127.0.0.1:8001

### Production

1. Edit source `./env.prod.sample` and rename it to `./env.prod`
2. `source ./env.prod`
3. `docker compose -f docker-compose.dev.yml up -d`
4. `docker exec -t hotumap python manage.py makemigrations hotumap`
5. `docker exec -t hotumap python manage.py migrate hotumap`

### Useful commands

#### Create superuser

```
uv run python manage.py migrate hotumap
```

Or, in Docker:

```
docker exec -ti hotumap python manage.py createsuperuser
```

## Latest features

✅ Done
⚙️ In progress

### Core uMap

<!-- prettier-ignore-start -->
| Status | Feature |
|:--:| :-- |
|✅| Custom (HOT) branding |
|✅| Containerization (via Docker) |
|✅| Database backup functionality |
|⚙️| Define and create a set of initial templates for humanitarian use |
|⚙️| Define and create a set of initial categories for humanitarian use |
|⚙️| [Enable real-time collaboration](https://github.com/hotosm/umap/issues/3) |
| | [Multiple imagery backgrounds / imagery backgrounds as layers](https://github.com/hotosm/umap/issues/5) |
| | Support [vector tiles](https://github.com/umap-project/umap/issues/1634)

### Custom features / integrations

<!-- prettier-ignore-start -->
| Status | Feature |
|:--:| :-- |
|✅| Basic integration with [ChatMap](https://chatmap.hotosm.org) (load exported chats + media files) |
|✅| Template selection for ChatMap imports
|✅| [Support audio for ChatMap imports](https://github.com/hotosm/umap/issues/6)
|⚙️| [Create visualizations from multiple maps](https://github.com/hotosm/umap/issues/11)
|⚙️| Advanced integration with ChatMap (live stream of data) |
|⚙️| [Create isochrone visualization map](https://github.com/hotosm/umap/issues/10)
| | Add access to all HOT products from header |
| | Basic integration with OpenAerialMap (get available background imagery for the map's area) |
| | Basic integration with DroneTM (get available background imagery from project id) |
| | Basic integration with Tasking Manager (get project AOI/status by id) |
| | Basic integration with FieldTM (get mapped data) |
| | Basic integration with Raw Data API (get OSM data from there, instead of Overpass) |
| | Basic integration with fAIr (get predictions) |
| | Create a raster layer by uploading data to OpenAerialMap |

## Licensing

This project makes heavy use of the amazing [uMap](https://github.com/umap-project/umap) project, developed by Yohan Boniface & contributors, which is under the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

The rest of the code is copyrighted by (2024) Humanitarian OpenStreetMap Team under the terms of the same license, GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.


