# Free map + RTL (Arabic flip)

## Free map for testing — OpenStreetMap + Leaflet
- No API key, no Google Maps billing. `mobile/src/components/FreeMap.tsx` renders a Leaflet map in a WebView with OpenStreetMap tiles.
- Data comes from the backend: `GET /api/places` now includes `latitude`, `longitude`, `image_url` (new migration `000004_add_coordinates_to_places`, seeder coordinates for all 6 places).
- Tap a marker → `postMessage(placeId)` → mobile navigates to Place Detail. Below the map, each place also links to openstreetmap.org at its coordinates.
- If the WebView cannot load (no internet), the list below the map still works.

## RTL when language = ar
- `LanguageContext` calls `I18nManager.allowRTL(true)` + `forceRTL(locale === "ar")`. Full native RTL takes effect after an app restart (React Native limitation).
- Immediate flip (no restart needed): every row layout uses `rowDirection(locale)` → `row-reverse` in ar (tabs, categories, booking counters, payment buttons, place-detail buttons, map cards), and `App.tsx` remounts on locale change (`key={locale}`), so the whole UI flips as soon as you switch to العربية in Start or Settings.
- Text: Arabic strings render RTL by bidi automatically; `textAlign` helper returns `right` for ar.
- Persistence: language, auth token/user and saved places are stored in AsyncStorage (`@react-native-async-storage/async-storage`) with an in-memory fallback, so login and language survive an app restart.

## Images
- Seeder `image_url` uses picsum seeds for test/demo (e.g. `https://picsum.photos/seed/marrakech/800/600`). Explore and Place Detail show the image when present, otherwise a colored placeholder. Replace these URLs with real photos before production.
