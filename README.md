# HOT's uMap instance

This is the uMap instance for HOT, an easy way to create maps
with a focus in humanitarian use

https://umap.hotosm.org

It's based on [uMap](https://github.com/umap-project/umap/)
with some extra flavour added by the `hotmap` app.

## Run

Make a copy of env.sample and edit the needed variables.

## Run with Docker

### Development

```
docker compose -f docker-compose.dev.yml up -d
docker exec -t hotumap python manage.py makemigrations hotumap
docker exec -t hotumap python manage.py migrate hotumap
```

You should be able to open the app:
http://127.0.0.1:8001

### Production

For *production* run the same commands but with the default compose yaml file:

```
docker compose up -d
```

### Add tile layers

```
docker exec -t hotumap-db /bin/bash /umap/import-tilelayers.sh
```

### Create superuser

```
docker exec -ti hotumap python manage.py createsuperuser
```

## Product roadmap

✅ Done
⚙️ In progress

Core uMap

<!-- prettier-ignore-start -->
| Status | Feature |
|:--:| :-- |
|✅| Custom (HOT) branding |
|✅| Containerization (via Docker) |
|✅| Database backup functionality |
|⚙️| [Support audio for ChatMap imports](https://github.com/hotosm/umap/issues/6)
| | [Multiple imagery backgrounds / imagery backgrounds as layers](https://github.com/hotosm/umap/issues/5) |
| | [Enable real-time collaboration](https://github.com/hotosm/chatmap/issues/1) |
| | Define and create a set of initial templates for humanitarian use |
| | Define and create a set of initial categories for humanitarian use |

Integration with HOT products

<!-- prettier-ignore-start -->
| Status | Feature |
|:--:| :-- |
|✅| Basic integration with ChatMap (load exported chats + media files) |
| | Advanced integration with ChatMap (live stream of data) |
| | Add access to all HOT products from header |
| | Basic integration with OpenAerialMap (get available background imagery for the map's area) |
| | Basic integration with DroneTM (get available background imagery from project id) |
| | Basic integration with Tasking Manager (get project AOI/status by id) |
| | Basic integration with FieldTM (get mapped data) |
| | Basic integration with Raw Data API (get OSM data from there, instead of Overpass) |
| | Basic integration with fAIr (get predictions) |
| | Create a raster layer by uploading data to OpenAerialMap |

Advanced features that will enable new use cases

<!-- prettier-ignore-start -->
| Status | Feature |
|:--:| :-- |
| | Support [vector tiles](https://github.com/umap-project/umap/issues/1634)


## Licensing

This project makes heavy use of the amazing [uMap](https://github.com/umap-project/umap) project, developed by Yohan Boniface & contributors, which is under the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

The rest of the code is copyrighted by (2024) Humanitarian OpenStreetMap Team under the terms of the same license, GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.


