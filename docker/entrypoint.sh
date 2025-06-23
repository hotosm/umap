#!/usr/bin/env bash
set -eo pipefail

source /venv/bin/activate

# Install PostgreSQL client for the backup system
apt-get update
apt-get install -y postgresql-client
# Install custom dependencies
pip install umap-project[s3] gunicorn djangorestframework django-dbbackup
# collect static files
python manage.py collectstatic --noinput
# now wait for the database
python manage.py wait_for_database
# then migrate the database
python manage.py migrate
# import icons
python manage.py import_pictograms --attribution "Maki Icons by Mapbox" /srv/umap/custom/icons
# run app
exec gunicorn -b 0.0.0.0:8000 wsgi


