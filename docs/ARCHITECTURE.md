# Architecture

```
React Native (Expo)  ──HTTPS/JSON──>  Laravel API (Sanctum)
        │                                    │
        │                              PostgreSQL 16 (Docker service `db`)
        │                                    │
        └─ (same Laravel app) ──> Filament Admin (/admin)
```

## Mobile — `mobile/`
- `App.tsx`: navigation (stack + bottom tabs), theme provider.
- `src/theme.ts`: colours from Figma (#f9f9f9, white cards, #d0a774, #323232, #484848, orange CTA).
- `src/data/places.ts`: seed data matching Figma (Marzouga, Imlil, Marrakesh, Agafay, Hostel Ils 345 MAD).
- `src/api/client.ts`: fetch wrapper, base URL from `EXPO_PUBLIC_API_URL`, Sanctum token in `Authorization: Bearer`.
- `src/screens/`: one file per Figma screen. No navigation library is
  hard-required in this starter: screens are switched by a simple state
  router in App.tsx so the project runs without extra install steps;
  replace it with React Navigation when you add deep links.

## Backend — `backend/`
- Models: City, Place, Hostel, Booking, User.
- Migrations: cities, places (city_id, distance_km, rating), hostels
  (place_id, price_per_day_mad), bookings (user_id, hostel_id, dates, guests, total_mad, status), favorites.
- API controllers: CityController, PlaceController, HostelController, BookingController, AuthController.
- Filament resources: CityResource, PlaceResource, HostelResource, BookingResource, UserResource.
  Filament is the super-admin: no separate frontend build is needed for the admin.

## Data flow for a booking
1. App: GET /api/places?city=marrakech → list
2. App: GET /api/hostels?place_id=… → list, price_per_day_mad
3. App: POST /api/bookings {hostel_id, check_in, check_out, guests} → total_mad calculated server-side
4. Admin (Filament): sees the booking, confirms / cancels, commission = 10-15% of total_mad.
5. App: GET /api/bookings/me → My Trips.
