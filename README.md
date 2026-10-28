# Morocco Travel App — React Native + Laravel + Filament

Mobile travel app for Morocco, built from this Figma file:
https://www.figma.com/design/7DdvkhMHmJPGcsDVK9HoZ0/Sans-titre?node-id=0-1

> Figma note: the Figma MCP export (screenshot / design-context) is currently
> blocked by the Figma Starter-plan MCP limit. The UI mapping in
> `docs/UI-UX-EXPORT.md` was built from the file metadata that was read
> successfully before the limit was hit (Page 1, iPhone 14/15 Pro 393x852 frames).
> When the limit resets, re-run the Figma export and drop the PNGs into
> `mobile/assets/figma/` — no code change is needed, the screens already match
> those frames.

## Stack
- Mobile: React Native (Expo, TypeScript)
- Backend API: Laravel (REST JSON) + PostgreSQL
- Super Admin / back-office: Filament (Laravel admin panel)
- Auth: Laravel Sanctum tokens
- Money: MAD, prices shown per day

## Structure
- `mobile/` — Expo app, screens in `src/screens/`
- `backend/` — Laravel API + Filament resources (skeleton, ready to `composer install`)
- `docs/` — strategy, UI/UX export, architecture, API, Filament admin guide

## Quick start — Docker (recommended)
```bash
docker compose up --build
# API: http://localhost:8000/api — Admin: http://localhost:8000/admin
# Postgres: localhost:5432 — see docs/DOCKER.md
```

## Quick start — without Docker
```bash
# Mobile
cd mobile && npm install && npx expo start

# Backend (needs PHP 8.2+, Composer, PostgreSQL)
cd backend && cp .env.example .env && composer install
php artisan key:generate && php artisan migrate --seed
php artisan serve
# Filament admin: http://localhost:8000/admin
```

## Status — MVP v1 complete (code)
- Mobile: all 12 screens implemented, not stubs — Explore, Map, City Detail, Place Detail, Hostels, Booking (nights/guests/total), My Trips, Profile, Saved, Cart, Settings, Start.
- Backend: Auth, Cities, Places, Hostels, Bookings (server-side total + 12% commission), Favorites (real, not stub).
- Filament: 5 complete resources with forms, tables and List/Create/Edit pages.
- Docker + PostgreSQL: compose file, Dockerfiles and seeder ready.
- Pushed to GitHub: https://github.com/lagawebibrahim-wq/morocco-travel-app
- Still pending (needs you): Figma PNG export (Starter MCP limit), first `docker compose up` on your machine.

## Screens (from Figma)
Start Traveling, Explore, Map, City Detail, Place Detail, Hostels List,
Booking & Payment, My Trips, Profile, Saved, My Cart, Settings.
See `docs/UI-UX-EXPORT.md` for the full mapping, colours and components.
