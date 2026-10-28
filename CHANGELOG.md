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
