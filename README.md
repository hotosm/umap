# HOT's uMap instance

https://umap.hotosm.org

## Run with Docker

`docker compose up -d`
`docker exec -t hotumap python manage.py makemigrations hotumap`
`docker exec -t hotumap python manage.py migrate hotumap`

### Add tile layers

`docker exec -t hotumap-db /bin/bash /umap/import-tilelayers.sh`

### Create superuser

`docker exec -t hotumap python manage.py createsuperuser`

