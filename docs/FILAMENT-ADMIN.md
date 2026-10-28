# Filament — Super Admin

Filament lives inside the same Laravel app, at `/admin`. No separate
frontend project is needed for the admin.

## Install (once, in backend/)
```bash
composer require filament/filament:"^3.0"
php artisan filament:install --panels
php artisan make:filament-user   # creates the first admin user
php artisan serve
# open http://localhost:8000/admin
```

## Resources — now complete (`app/Filament/Resources/`)
Each resource has a full form + table, plus List / Create / Edit pages under `Pages/`.
- CityResource: name, slug, image.
- PlaceResource: city relation, name, location, distance_km, rating, image, travelers_count (+15 in Figma).
- HostelResource: place relation, name, price_per_day_mad, rating, image, is_featured (paid featured listing).
- BookingResource: user, hostel, dates, guests, total_mad, status (pending/confirmed/cancelled/completed), commission_mad (computed 10-15%).
- UserResource: name, email, role (admin / user).

## Daily admin workflow
1. Add a city → add its places → add hostels with price_per_day_mad.
2. Mark a hostel `is_featured` for the paid listing.
3. Confirm bookings, check commission in BookingResource.
4. Never edit prices from the mobile app — only from Filament / API admin.
