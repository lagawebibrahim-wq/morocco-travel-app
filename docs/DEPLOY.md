# Deploy — Morocco Travel App v1.0

## Option A: Docker (recommended, no PHP/Composer needed on host)
```bash
git clone https://github.com/lagawebibrahim-wq/morocco-travel-app.git
cd morocco-travel-app
docker compose up --build
```
- First run scaffolds Laravel inside the api container (Composer create-project + overlay + Sanctum), then `migrate --seed`.
- API: http://localhost:8000/api — health: `GET /api/health` → {status: "ok"}
- Admin: http://localhost:8000/admin (seed admin: admin@travel.local / password123 — change it!)
- Postgres: localhost:5432, db morocco_travel, user morocco.
- Mobile web preview: `docker compose --profile web up mobile-web` → http://localhost:8081

## Option B: Local (without Docker)
```bash
# Backend
bash scripts/setup-laravel.sh   # scaffolds backend-full, installs Sanctum/Filament, migrates+seeds
cd backend-full && php artisan serve   # http://localhost:8000
php artisan test                        # Laravel tests (sqlite in CI, postgres locally)
# Mobile
cd mobile && npm install && npx expo start
# Android emulator API URL: EXPO_PUBLIC_API_URL=http://10.0.2.2:8000/api
```

## Before production
- Change seed passwords (admin@travel.local, ali@travel.local) and APP_KEY.
- Replace picsum demo images in TravelSeeder with real photos.
- Add a real payment gateway if card payments must actually charge (today card is recorded only).
- Set a real domain + HTTPS, and point the mobile app to it via EXPO_PUBLIC_API_URL.
- CI: workflow file `.github/workflows/ci.yml` is ready locally but must be added once from your machine (GitHub Apps cannot push workflow files): clone the repo, copy the file in, push — then CI runs on every push to main (mobile TypeScript + Jest, backend Laravel tests on sqlite).
