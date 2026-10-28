# API Reference (v8)

Base URL: `{API_URL}` (default `http://localhost:8000/api`). All responses are JSON.
Auth: `Authorization: Bearer <Sanctum token>` for protected routes.

## Public
- `GET /health` — service status
- `GET /languages` — locales (ar, fr, en) with direction
- `GET /translations?locale=ar|fr|en` — UI strings from backend
- `GET /cities` — all cities
- `GET /places?city_id=&search=&category=&sort=rating|distance&per_page=` — paginated (default 20, max 50), `data` + `meta`
- `GET /places/{id}` — city, hostels, reviews (with user names)
- `GET /places/{id}/reviews` — paginated reviews
- `GET /hostels?place_id=&min_price=&max_price=&sort=price|rating&per_page=` — paginated, featured first
- `GET /hostels/{id}`

## Auth (throttled 30/min)
- `POST /auth/register` — {name, email, password} → 201 + token
- `POST /auth/login` — {email, password} → token
- `POST /auth/logout` — revokes current token
- `GET /me` — current user
- `PUT /me` — {name?, password? (min 8)} — update profile

## Protected
- `GET /bookings/me` — my bookings
- `POST /bookings` — {hostel_id, check_in, check_out, guests?, payment_method?: cash|card} → 201, total = nights x price + 35 MAD fee, 12% commission. 422 if dates overlap a non-cancelled booking for the same hostel.
- `POST /bookings/{id}/cancel` — owner only, 422 if already cancelled
- `GET /favorites/me` — my favorites
- `POST /favorites` — {place_id}
- `DELETE /favorites/{id}` — owner only
- `POST /places/{id}/reviews` — {rating 1-5, comment?} — one review per user per place (updateOrCreate); place rating is recalculated to the average of its reviews

## Admin
- Filament panel at `/admin` (orange theme) — login allowed only for users with `is_admin = true` (middleware `EnsureUserIsAdmin`). Resources: City, Place, Hostel, Booking, User, Translation, Review. Dashboard widget: bookings, revenue, commission, hostels, places.

## Errors
- 401 unauthenticated, 403 not owner / not admin, 404 not found, 422 validation (with `errors` object).
