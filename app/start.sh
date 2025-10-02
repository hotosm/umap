#!/usr/bin/env bash
set -eo pipefail
# collect static files
uv run python manage.py collectstatic --noinput
# now wait for the database
uv run python manage.py wait_for_database
# ensure social_django migrations are set
uv run python manage.py migrate social_django
# then run other migrations
uv run python manage.py migrate
# import icons
uv run python manage.py import_pictograms --attribution "Maki Icons by Mapbox" \
  ${UMAP_ICONS_PATH:-"/app/custom/icons"}
# import tilelayers
echo "Importing tilelayers..."
psql \
  --host="$UMAP_DB_HOST" \
  --port="${UMAP_DB_PORT:-5432}" \
  --username="$UMAP_DB_USER" \
  --dbname="$UMAP_DB_NAME" \
  --file=${UMAP_IMPORT_TILELAYERS_PATH:-"/app/scripts/import-tilelayers.sql"}
# run app
uv run gunicorn -b 0.0.0.0:8000 wsgi
