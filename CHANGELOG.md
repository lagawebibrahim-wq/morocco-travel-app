## 1.1.5 — CI Mockery fix

- New result in run 40756738973: PHPUnit finally ran — 28 tests, 4 passed, 24 errors, all with the same error `Class "Mockery" not found` (first: AuthApiTest::test_register_login_me_logout).
- Root cause: Laravel's TestCase uses Mockery in its lifecycle, and the scaffold's `require-dev` includes `mockery/mockery`, but our overlay `composer.json` did not. Unit tests (plain PHPUnit) passed; all Feature tests (Laravel TestCase) errored.
- Fix: added `mockery/mockery ^1.6` to `backend/composer.json` require-dev.

## 1.1.4 — CI Tests\\TestCase fix

- New failure in run 40750949578: PHPUnit failed before running any test with `Class "Tests\\TestCase" not found` (AuthApiTest.php:6).
- Root cause: our overlay `composer.json` had no `autoload-dev` mapping, while the scaffold's does (`Tests\\` => `tests/`). After the fresh `composer install`, the scaffold's `tests/TestCase.php` was present but not autoloadable.
- Fix: added `autoload-dev` mapping to `backend/composer.json` and added `backend/tests/TestCase.php` (identical to the Laravel 12 scaffold) to the project itself, so the test base class no longer depends on scaffold leftovers.

## 1.1.3 — CI test command fix

- New failure in run 40750120649 was NOT Pail: `php artisan test` reported `Command "test" is not defined` — the artisan test command is only registered when a compatible PHPUnit is installed, and our `^11|^12` range let Composer pick PHPUnit 12.
- Fix: pin `phpunit/phpunit` to `^11.5` (the scaffold's known-good constraint for Laravel 12) and run tests via `vendor/bin/phpunit` directly in CI instead of through artisan, so the test runner does not depend on artisan command registration.

## 1.1.2 — CI Pail discovery fix

- Root cause of the Run Laravel tests failure: the scaffold's `bootstrap/cache/packages.php` still listed dev packages (Laravel Pail, Sail) that the overlay's `composer.json` does not install, and our `composer.json` had no `post-autoload-dump` script to regenerate it, so `php artisan` failed with `Class Laravel\Pail\PailServiceProvider not found` before any test ran.
- Fix: `backend/composer.json` now has the standard `post-autoload-dump` discovery script + `laravel/tinker`; CI and Docker entrypoint both clear `bootstrap/cache/packages.php`/`services.php` and run `php artisan package:discover` after the overlay install.

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
