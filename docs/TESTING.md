# Testing

## Backend (Laravel, PHP 8.2+)
After scaffolding (scripts/setup-laravel.sh or Docker first run):
```bash
php artisan test
```
Tests included:
- Unit: BookingPricingTest — Figma example 725 MAD (2 x 345 + 35 fee, commission 83), 1-night, long stay, same-day = 1 night.
- Feature: BookingPaymentTest (card payment, cancel own booking, cancel other user's forbidden, invalid payment rejected), AuthApiTest (register 201, login, me, logout, wrong password, validation), PlacesApiTest (list + search), HostelsApiTest (list + place filter), BookingsApiTest (total 725, commission 83, auth required, bad dates/guests rejected), FavoritesApiTest (toggle save/unsave, auth required).
- Test data: factories for City, Place, Hostel, Booking, Favorite (User factory comes from a fresh Laravel scaffold).

## Mobile (Expo, TypeScript)
```bash
cd mobile
npm install
npm run typecheck   # tsc --noEmit
npm test            # Jest, 7 tests
```
Jest tests (src/__tests__/booking.test.ts): bookingTotal 725 example, service fee 35, 1-night total, cart total, search filter.
TypeScript was verified here (v3) with no errors; Jest 7/7 passed here in a /tmp copy (full expo install does not fit the workspace filesystem chown limits, so run it on your machine).

## Seed / demo data
`php artisan db:seed` (TravelSeeder) creates:
- Cities: Marrakech, Merzouga
- 6 places (Figma 4 + Ourika Valley + Erg Chebbi Dunes), 6 hostels (Hostel Ils 345 MAD featured, Desert Camp 420, Atlas 280, Medina Riad 390, Agafay Camp 550, Dune Night Camp 480)
- Users: admin@travel.local / password123, ali@travel.local / password123 (demo booking Hostel Ils 2 nights, 725 MAD, confirmed; 1 favorite)
Change these passwords before production.
