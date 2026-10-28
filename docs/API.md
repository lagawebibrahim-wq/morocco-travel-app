# API — Laravel REST (JSON, MAD)

Base: `{APP_URL}/api` — Auth: `Authorization: Bearer <sanctum-token>` where noted.

## Auth
- POST /register {name, email, password} → {user, token}
- POST /login {email, password} → {user, token}
- POST /logout (auth) → 204
- GET /me (auth) → user

## Public
- GET /cities → [{id, name, slug, image_url}]
- GET /places?city_id=&search=&category= → [{id, city, name, location, distance_km, rating, image_url, travelers_count}]
- GET /places/{id} → place + hostels
- GET /hostels?place_id= → [{id, place_id, name, price_per_day_mad, rating, image_url}]
- GET /hostels/{id}

## Authenticated
- POST /bookings {hostel_id, check_in, check_out, guests} → booking with total_mad = price_per_day * nights
- GET /bookings/me → my trips (status: pending/confirmed/cancelled/completed)
- POST /favorites {place_id} / DELETE /favorites/{place_id} → Saved screen
- GET /favorites/me

## Responses / errors
- Success: `{data: …}` or the resource directly in this starter.
- Validation: 422 with Laravel `errors` object. Auth failure: 401.
- Money is always an integer in MAD, never a float, to avoid rounding bugs.
