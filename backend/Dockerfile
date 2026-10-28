# Laravel API + Filament, on PHP 8.2 with PostgreSQL driver.
# NOTE: this image expects a full Laravel scaffold. The starter files in
# backend/ are the app code (models, controllers, routes, migrations,
# Filament resources) — scaffold first, then copy them in (see backend/README.md).
FROM php:8.2-cli
RUN apt-get update && apt-get install -y --no-install-recommends \
      libpq-dev postgresql-client unzip git \
    && docker-php-ext-install pdo_pgsql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /var/www
COPY . /var/www
RUN composer install --no-interaction --prefer-dist --optimize-autoloader || true
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 8000
ENTRYPOINT ["/entrypoint.sh"]
