# Mobile — React Native (Expo, TypeScript)
```bash
npm install
npx expo start
# set API URL: EXPO_PUBLIC_API_URL=http://localhost:8000/api npx expo start
```
Screens mirror the Figma file: Start, Explore, Map, City Detail, Place Detail,
Hostels, Booking, My Trips, Profile, Saved, Cart, Settings.

## v2
- 13 screens, stack + tabs navigation, Auth (login/register/guest), API client with local fallback, cart, favorites, booking.
- Run: `npm install && npx expo start`, typecheck: `npm run typecheck`. Set EXPO_PUBLIC_API_URL to your Laravel API (Android emulator: http://10.0.2.2:8000/api).
