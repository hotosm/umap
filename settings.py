# -*- coding:utf-8 -*-

from umap.settings.base import *  # pylint: disable=W0614,W0401
import os

# Application definition
ROOT_URLCONF = 'urls'

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-+q304+%(8^1#r49+0dbj584!k2n#wuc-a5^yx()jlf)quv+chu')
INTERNAL_IPS = ("127.0.0.1",)
ALLOWED_HOSTS =  os.environ.get('ALLOWED_HOSTS', [])

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ADMINS = (("Emilio Mariscal", "emilio.mariscal@hotosm.org"),)
MANAGERS = ADMINS

DATABASES = {
    "default": {
        "ENGINE": "django.contrib.gis.db.backends.postgis",
        "NAME": os.environ.get('UMAP_DB_NAME'),
        "USER": os.environ.get('UMAP_DB_USER'),
        "PASSWORD": os.environ.get('UMAP_DB_PASSWORD'),
        "HOST": os.environ.get('UMAP_DB_HOST'),
        "PORT": "5432",
    }
}

if os.environ.get('ENABLE_S3_STORAGE', False):
    STORAGES = {
        "default": { "BACKEND": "django.core.files.storage.FileSystemStorage" },
        "data": {
            "BACKEND": "umap.storage.s3.S3DataStorage",
            "OPTIONS": {
                "access_key": os.environ.get('S3_ACCESS_KEY'),
                "secret_key": os.environ.get('S3_SECRET_KEY'),
                "security_token": os.environ.get('S3_SECURITY_TOKEN'),
                "bucket_name": os.environ.get('S3_BUCKET_NAME'),
                "endpoint_url": os.environ.get('S3_ENDPOINT_URL')
            },
        },
        "staticfiles":{ "BACKEND": "umap.storage.staticfiles.UmapManifestStaticFilesStorage" }
    }

INSTALLED_APPS += (
    "rest_framework",
    "hotumap"
)

LANGUAGE_CODE = "en"

# Set to False if login into django account should not be possible. You can
# administer accounts in the admin interface.
ENABLE_ACCOUNT_LOGIN = True

AUTHENTICATION_BACKENDS = (
    "social_core.backends.openstreetmap_oauth2.OpenStreetMapOAuth2",
    "django.contrib.auth.backends.ModelBackend",
)

SOCIAL_AUTH_OPENSTREETMAP_OAUTH2_KEY=os.environ.get('UMAP_OSM_KEY')
SOCIAL_AUTH_OPENSTREETMAP_OAUTH2_SECRET=os.environ.get('UMAP_OSM_SECRET')

MIDDLEWARE += ("social_django.middleware.SocialAuthExceptionMiddleware",)

SOCIAL_AUTH_REDIRECT_IS_HTTPS = os.getenv('UMAP_SOCIAL_AUTH_REDIRECT_IS_HTTPS', 'False').lower() == 'true'
SOCIAL_AUTH_RAISE_EXCEPTIONS = False
SOCIAL_AUTH_BACKEND_ERROR_URL = "/"

SITE_URL = os.environ.get('UMAP_SITE_URL', "http://127.0.0.1:8001")

# POSTGIS_VERSION = (2, 1, 0)
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# For users' statics (geojson mainly)
MEDIA_ROOT = os.environ.get('MEDIA_ROOT', '/srv/umap/data')

### uMap settings

# Customization
UMAP_CUSTOM_TEMPLATES=os.environ.get('UMAP_CUSTOM_TEMPLATES', '/srv/umap/custom/templates')
UMAP_CUSTOM_STATICS=os.environ.get('UMAP_CUSTOM_STATICS', '/srv/umap/custom/static')

# Add a banner to warn people this instance is not production ready.
UMAP_DEMO_SITE = False

# Whether to allow non authenticated people to create maps.
UMAP_ALLOW_ANONYMOUS = True

# This setting will exclude empty maps (in fact, it will exclude all maps where
# the default center has not been updated)
UMAP_EXCLUDE_DEFAULT_MAPS = False

# How many maps should be showcased on the main page resp. on the user page
UMAP_MAPS_PER_PAGE = 5
# How many maps should be looked for when performing a (sub)search
UMAP_MAPS_PER_SEARCH = 15
# How many maps should be showcased on the user page, if owner
UMAP_MAPS_PER_PAGE_OWNER = 10

# Put the site in readonly mode (useful for migration or any maintenance)
UMAP_READONLY = False

# Default map location for new maps
LEAFLET_LONGITUDE = 21
LEAFLET_LATITUDE = 12
LEAFLET_ZOOM = 3

# Number of old version to keep per datalayer.
UMAP_KEEP_VERSIONS = 10

# UMAP_HOME_FEED="highlighted"

UMAP_HOST_INFOS = {
    "name": "Humanitarian OpenStreetMap Team",
    "url": "https://hotosm.org",
    "email": "emilio.mariscal@hotosm.org"
}
