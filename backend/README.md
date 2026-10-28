# Backend — Laravel API + Filament Admin
This is a starter skeleton (models, migrations, controllers, Filament resources).
To run a full Laravel app, scaffold it first, then copy these files in:
```bash
composer create-project laravel/laravel backend-tmp
# copy app/, database/, routes/ from this folder into backend-tmp
cd backend-tmp && cp ../backend/.env.example .env
composer require laravel/sanctum filament/filament
php artisan migrate --seed && php artisan serve
# Admin: http://localhost:8000/admin
```

## Docker
See `../docs/DOCKER.md`. In short: scaffold Laravel, copy these files in,
then `docker compose up --build` from the project root. The database is
PostgreSQL (`DB_CONNECTION=pgsql`, host `db` inside Docker, `127.0.0.1` outside).
