# -*- coding:utf-8 -*-

"""
Example settings for local development

Use this file as a base for your local development settings and copy
it to umap/settings/local.py. It should not be checked into
your code repository.

"""

from umap.settings.base import *  # pylint: disable=W0614,W0401

SECRET_KEY = ""
INTERNAL_IPS = ("127.0.0.1",)
ALLOWED_HOSTS = [
    "*",
]

DEBUG = False

ADMINS = (("Emilio Mariscal", "emilio.mariscal@hotosm.org"),)
MANAGERS = ADMINS

DATABASES = {
    "default": {
        "ENGINE": "django.contrib.gis.db.backends.postgis",
        "NAME": "",
        "USER": "",
        "PASSWORD": "",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}

LANGUAGE_CODE = "en"

# Set to False if login into django account should not be possible. You can
# administer accounts in the admin interface.
ENABLE_ACCOUNT_LOGIN = True

AUTHENTICATION_BACKENDS = (
    "social_core.backends.openstreetmap_oauth2.OpenStreetMapOAuth2",
    "django.contrib.auth.backends.ModelBackend",
)


SOCIAL_AUTH_OPENSTREETMAP_OAUTH2_KEY=""
SOCIAL_AUTH_OPENSTREETMAP_OAUTH2_SECRET=""

MIDDLEWARE += ("social_django.middleware.SocialAuthExceptionMiddleware",)
SOCIAL_AUTH_REDIRECT_IS_HTTPS = True
SOCIAL_AUTH_RAISE_EXCEPTIONS = False
SOCIAL_AUTH_BACKEND_ERROR_URL = "/"

# Add a baner to warn people this instance is not production ready.
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

SITE_URL = "https:/umap.hotosm.org"

# CACHES = {
#     'default': {
#         'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
#         'LOCATION': '/var/tmp/django_cache',
#     }
# }

# POSTGIS_VERSION = (2, 1, 0)
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Put the site in readonly mode (useful for migration or any maintenance)
UMAP_READONLY = False

# For static deployment
STATIC_ROOT = "/home/admin/umap/var/static"

# For users' statics (geojson mainly)
MEDIA_ROOT = "/home/admin/umap/var/data"

# Default map location for new maps
LEAFLET_LONGITUDE = 21
LEAFLET_LATITUDE = 12
LEAFLET_ZOOM = 3

# Number of old version to keep per datalayer.
UMAP_KEEP_VERSIONS = 10

# Customization
UMAP_CUSTOM_TEMPLATES="/home/admin/umap/custom/templates"
UMAP_CUSTOM_STATICS="/home/admin/umap/custom/static"