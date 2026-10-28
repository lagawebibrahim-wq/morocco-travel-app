#!/bin/sh
set -e
# If /var/www is only the overlay (no Laravel scaffold), build one.
if [ ! -f /var/www/artisan ]; then
  echo "No Laravel scaffold found — scaffolding with Composer (first run only, may take a few minutes)..."
  composer create-project laravel/laravel /tmp/laravel-app --prefer-dist --no-interaction
  cp -a /tmp/laravel-app/. /var/www/
  cp -a /overlay/. /var/www/
  rm -rf /tmp/laravel-app
  cd /var/www
  composer require laravel/sanctum filament/filament --no-interaction || true
  # The scaffold's bootstrap/cache/packages.php still lists dev packages (Pail, Sail)
  # that our composer.json does not install — regenerate discovery or artisan boots fail.
  rm -f bootstrap/cache/packages.php bootstrap/cache/services.php
  php artisan package:discover --ansi || true
fi
cd /var/www
# Env: use the overlay example if no .env exists.
if [ ! -f .env ] && [ -f .env.example ]; then cp .env.example .env; fi
# Wait for PostgreSQL (db service).
until pg_isready -h "${DB_HOST:-db}" -p "${DB_PORT:-5432}" -U "${DB_USERNAME:-morocco}" -d "${DB_DATABASE:-morocco_travel}" >/dev/null 2>&1; do
  echo "Waiting for Postgres..."
  sleep 2
done
php artisan key:generate --force || true
php artisan migrate --seed --force || true
php artisan serve --host=0.0.0.0 --port=8000
