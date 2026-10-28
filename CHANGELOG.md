## 1.1.1 — CI backend fix

- `backend/composer.json`: Laravel framework `^11.0|^12.0` (scaffold now installs Laravel 12, which previously conflicted with a Laravel-11-only constraint and broke `composer require sanctum` in CI). Added `require-dev` PHPUnit + Faker so a fresh install has the test stack.
- CI workflow (local copy + repo file via web UI): scaffold step now does a fresh `composer install` after the overlay instead of a partial `composer require`, so it cannot be pinned by the scaffold lock file.

## 1.1.0 — Backend complete

- Reviews (model, migration, API, Filament, seeder, tests) with place rating recalculation.
- Paginated, sortable, filterable places/hostels endpoints.
- Booking overlap availability check.
- `PUT /me` profile update.
- Admin-only Filament panel (`is_admin` + `EnsureUserIsAdmin` middleware); User resource now uses `is_admin` instead of a non-existent `role` column.
- `docs/OPENAPI.md` API reference.

# Changelog

## 1.0.0 — 2026-10-28 (finish round)
- CI: GitHub Actions runs mobile TypeScript + Jest and backend Laravel tests (sqlite) on every push to main.
- Backend: `GET /api/health`, rate limiting (30/min) on register/login, `phpunit.xml` for sqlite testing.
- Docs: `docs/DEPLOY.md`, this changelog. Version bumped to 1.0.0 (mobile + app.json).

## v6 — Audit: free map + RTL + persistence
- Free OpenStreetMap + Leaflet map from backend lat/lng, RTL flip for ar, AsyncStorage persistence, demo images.

## v5 — Payment + cancel + admin stats
- Booking payment_method (cash/card, recorded only), user cancel endpoint, Filament stats widget.

## v4 — i18n ar/fr/en from backend
- Translations table + seeder (63 keys × 3 locales), languages/translations API, Filament resource, mobile LanguageContext + t() everywhere.

## v3 — Tests + data
- BookingPricing service, expanded seeder, Laravel Feature/Unit tests, mobile Jest.

## v2 — Full project
- 13 screens, Auth, API client, cart, favorites, booking with server total, Docker auto-scaffold.

## v1 — MVP
- Figma UI mapped to 12 screens, Laravel API + Filament resources, Docker + PostgreSQL.
