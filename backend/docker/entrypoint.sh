#!/bin/sh
set -e
# Wait for PostgreSQL (db service) before migrating.
until pg_isready -h "${DB_HOST:-db}" -p "${DB_PORT:-5432}" -U "${DB_USERNAME:-morocco}" -d "${DB_DATABASE:-morocco_travel}" >/dev/null 2>&1; do
  echo "Waiting for Postgres..."
  sleep 2
done
if [ -f artisan ]; then
  php artisan migrate --force || true
  php artisan serve --host=0.0.0.0 --port=8000
else
  echo "No artisan file found: scaffold Laravel first (see backend/README.md), then rebuild."
  sleep infinity
fi
