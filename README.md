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

