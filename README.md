# HOT's uMap instance

https://umap.hotosm.org

## Run with Docker

`docker compose up -d`

## Add tile layers

`docker exec -ti umap-db-1 /bin/bash /umap/import-tilelayers.sh`

## Create superuser

`docker exec -ti umap-app-1 umap createsuperuser`

