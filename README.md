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
|  | Multiple backgrounds / backgrounds as layers |
| | [Enable real-time collaboration]([https://github.com/hotosm/chatmap/issues/1](https://github.com/hotosm/umap/issues/3)) |

Integration with HOT products

<!-- prettier-ignore-start -->
| Status | Feature |
|:--:| :-- |
|✅| Integration with ChatMap (load exported chats + media files) |
| | Add access to all HOT products from header |
| | Basic integration with OpenAerialMap (get available background imagery for the map's area) |
| | Basic integration with Tasking Manager (get project by id) |
| | Basic integration with FieldTM (get mapped data) |
| | Basic integration with Raw Data API (get OSM data from there, instead of Overpass) |
| | Basic integration with fAIr (get predictions) |
| | Create a raster layer by uploading data to OpenAerialMap |

Advanced features that will enable new use cases

<!-- prettier-ignore-start -->
| Status | Feature |
|:--:| :-- |
| | Support vector tiles


## Licensing

Copyright 2024 Humanitarian OpenStreetMap Team

This is free software! you may use this project under the terms of the GNU General Public License (GPL) Version 3.

This project makes heavy use of the amazing [uMap](https://github.com/umap-project/umap) project developed by Yohan Boniface & contributors, which has the same GNU license.
