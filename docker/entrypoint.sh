#!/usr/bin/env bash
set -eo pipefail

source /venv/bin/activate

# collect static files
umap collectstatic --noinput
# now wait for the database
umap wait_for_database
# then migrate the database
umap migrate
# import icons
umap import_pictograms --attribution "Maki Icons by Mapbox" /srv/umap/custom/icons
# run uWSGI
exec uwsgi --ini docker/uwsgi.ini

