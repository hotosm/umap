#!/bin/bash
# Request cert renewal
docker compose run --rm certbot certonly --webroot \
  --webroot-path=/var/www/certbot -d $SITE_DOMAIN --non-interactive --agree-tos \
  -m $SITE_ADMIN_EMAIL --no-eff-email --force-renewal
# Reload Nginx
docker compose exec nginx nginx -s reload
