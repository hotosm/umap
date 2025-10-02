#!/usr/bin/env bash
set -eo pipefail
# collect static files
uv run python manage.py collectstatic --noinput
# now wait for the database
uv run python manage.py wait_for_database
# then migrate the database
uv run python manage.py migrate
# import icons
uv run python manage.py import_pictograms --attribution "Maki Icons by Mapbox" /app/custom/icons
# create tile layers
sh scripts/import-tilelayers.sh
# run app
uv run gunicorn -b 0.0.0.0:8000 wsgi
