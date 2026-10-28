#!/bin/bash
# Scaffold a full Laravel app and overlay this project's backend code.
# Run from the travel-app root: bash scripts/setup-laravel.sh
# Requires: PHP 8.2+, Composer. Does NOT touch mobile/ or docs/.
set -e
if [ -f backend/artisan ]; then echo "backend/ already looks like a Laravel app, skipping scaffold."; exit 0; fi
if ! command -v composer >/dev/null; then echo "Composer is required. Install it from https://getcomposer.org/"; exit 1; fi
composer create-project laravel/laravel backend-full --prefer-dist --no-interaction
cp -a backend/. backend-full/ 2>/dev/null || true
# backend/ files that are NOT Laravel app code (Dockerfile, .dockerignore, README) are harmless in backend-full/
cd backend-full
composer require laravel/sanctum filament/filament --no-interaction
cp .env.example .env 2>/dev/null || true
php artisan key:generate || true
php artisan migrate --seed --force || echo "Migrate failed: check DB settings in .env (PostgreSQL: DB_CONNECTION=pgsql, DB_HOST=db in Docker, 127.0.0.1 locally)"
echo "Done. Your full Laravel app is in backend-full/. Run: cd backend-full && php artisan serve"
