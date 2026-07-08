#!/bin/bash
# One-time bootstrap for the nginx + Let's Encrypt TLS setup. Solves the
# chicken-and-egg problem: nginx's TLS server block needs a certificate to
# exist before it can start, but certbot needs nginx running on port 80 to
# complete the HTTP-01 challenge. Run this once from the repo root, after
# DOMAIN/.env are filled in and DNS already points at this server.
#
# Adapted from the well-known wmnnd/certbot-nginx pattern.

set -e

if [ ! -f .env ]; then
  echo "Missing .env — copy .env.example to .env and fill it in first." >&2
  exit 1
fi

# shellcheck disable=SC1091
source .env

if [ -z "$DOMAIN" ] || [ "$DOMAIN" = "yourdomain.example" ]; then
  echo "Set a real DOMAIN in .env before running this script." >&2
  exit 1
fi

COMPOSE="docker compose -f docker-compose.prod.yml"
DATA_PATH="./deploy/certbot"
EMAIL="" # optional: set an email for Let's Encrypt renewal notices

echo "### Creating a dummy self-signed certificate for $DOMAIN ..."
mkdir -p "$DATA_PATH/conf/live/$DOMAIN"
$COMPOSE run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout '/etc/letsencrypt/live/$DOMAIN/privkey.pem' \
    -out '/etc/letsencrypt/live/$DOMAIN/fullchain.pem' \
    -subj '/CN=localhost'" certbot

echo "### Starting nginx ..."
$COMPOSE up -d nginx

echo "### Deleting dummy certificate ..."
$COMPOSE run --rm --entrypoint "\
  rm -rf /etc/letsencrypt/live/$DOMAIN && \
  rm -rf /etc/letsencrypt/archive/$DOMAIN && \
  rm -rf /etc/letsencrypt/renewal/$DOMAIN.conf" certbot

echo "### Requesting real Let's Encrypt certificate for $DOMAIN ..."
EMAIL_ARG="--register-unsafely-without-email"
if [ -n "$EMAIL" ]; then
  EMAIL_ARG="--email $EMAIL"
fi
$COMPOSE run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $EMAIL_ARG \
    -d $DOMAIN \
    --rsa-key-size 4096 \
    --agree-tos \
    --force-renewal" certbot

echo "### Reloading nginx ..."
$COMPOSE exec nginx nginx -s reload

echo "Done. $DOMAIN should now be serving a real certificate."
