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

## Status — v2 full project (code)
- Mobile: 13 screens with stack navigation + tabs, Auth (login/register, guest mode), API data with local fallback, search, saved/favorites toggle, cart, booking with server total. Screens: Start, Explore, Map, City Detail, Place Detail, Hostels, Booking, My Trips, Profile, Saved, Cart, Settings, Auth.
- Backend: Auth (Sanctum), Cities, Places, Hostels, Bookings (server-side total = nights × price + 35 MAD service fee, 12% commission on subtotal), Favorites incl. toggle, Form Requests, API Resources, Feature tests, factories, Filament AdminPanelProvider.
- Filament: 5 complete resources with forms, tables and List/Create/Edit pages. Admin: /admin.
- Docker + PostgreSQL: compose file; first `docker compose up --build` scaffolds Laravel inside the container automatically (see docs/DOCKER.md), then migrate --seed.
- Pushed to GitHub: https://github.com/lagawebibrahim-wq/morocco-travel-app
- Still pending (needs you): Figma PNG export (Starter MCP limit), first `docker compose up` on your machine (no Docker/PHP on this machine, so not tested here).

## Screens (from Figma)
Start Traveling, Explore, Map, City Detail, Place Detail, Hostels List,
Booking & Payment, My Trips, Profile, Saved, My Cart, Settings.
See `docs/UI-UX-EXPORT.md` for the full mapping, colours and components.

## Status — v3 tests + data
- Backend: BookingPricing service, expanded seeder (2 cities, 6 places, 6 hostels, 2 demo users, 1 demo booking + favorite), tests: Unit Pricing + Feature Auth/Places/Hostels/Bookings/Favorites.
- Mobile: Jest tests (7/7 passed here) for booking/cart/search, `npm test` and `npm run typecheck`.
- Run tests: see docs/TESTING.md. Laravel tests (php artisan test) still need PHP on your machine / Docker — they were written and syntax-checked here, not executed here (no PHP on this machine).

## Status — v4 i18n (ar/fr/en from backend)
- Backend: translations table + TranslationSeeder (58 keys x 3 locales), GET /api/languages and GET /api/translations?locale=ar|fr|en, Filament Translations resource.
- Mobile: LanguageContext fetches translations from backend, falls back to local dictionaries offline, default locale ar, switcher on Start + Settings (العربية / Français / English), all screens use t().
- See docs/I18N.md. Laravel tests for translations included; run with php artisan test on your machine.

## Status — v5 finish round
- Booking payment_method (cash/card, recorded, no gateway charge yet), user cancel endpoint POST /bookings/{id}/cancel with ownership check, Filament TravelStatsWidget (bookings, revenue, commission, hostels, places).
- Figma PNG export re-checked 2026-10-28 evening: still blocked by Starter MCP limit (same error), so no PNGs yet.
- PHP: phply was tried and discarded — it only parses PHP 5 and falsely fails on modern return types/typed properties; php -l still needs PHP on your machine.
- Still needs your machine: first docker compose run + php artisan test (Laravel tests written, not executed here).

## Status — v6 audit: free map + RTL + persistence
- Audit found and fixed: backend places had no lat/lng (map could not use backend data), no persistence (login/language lost on restart), no RTL flip, no images.
- Free map: OpenStreetMap + Leaflet via WebView (no API key), markers from GET /api/places (latitude/longitude/image_url), tap marker -> Place Detail, OSM links below.
- RTL: I18nManager forceRTL for ar + immediate row-reverse flipping + remount on locale change; language/token/saved persisted with AsyncStorage.
- Images: seeder picsum demo images, shown in Explore/Place Detail when present.
- Tests: Jest 13/13 (incl. map OSM + RTL), TypeScript clean. Laravel tests (incl. PlacesCoordinatesTest) still need PHP on your machine.
