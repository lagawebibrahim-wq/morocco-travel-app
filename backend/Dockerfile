# Laravel API + Filament, PHP 8.2 + PostgreSQL driver.
# This image copies the project code to /overlay. At runtime, if /var/www
# has no Laravel scaffold yet, entrypoint.sh scaffolds one with Composer
# and overlays /overlay on top — so docker compose works without a
# pre-existing Laravel project on the host.
FROM php:8.2-cli
RUN apt-get update && apt-get install -y --no-install-recommends \
      libpq-dev postgresql-client unzip git libzip-dev \
    && docker-php-ext-install pdo_pgsql zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /var/www
COPY . /overlay
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 8000
ENTRYPOINT ["/entrypoint.sh"]
