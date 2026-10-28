# UI/UX Export — Figma file 7DdvkhMHmJPGcsDVK9HoZ0, Page 1

Source: https://www.figma.com/design/7DdvkhMHmJPGcsDVK9HoZ0/Sans-titre?node-id=0-1
Device in Figma: iPhone 14 & 15 Pro, 393 x 852.

## Status of the export
- ✅ File metadata read: Page 1 canvas, all top-level iPhone frames, texts and positions.
- ⛔ Screenshot / full design-context / asset download blocked afterwards:
  "You've reached the Figma MCP tool call limit on the Starter plan."
  So no PNG assets were downloaded by the agent in this run.
  Workaround: in Figma, select a frame → Export → PNG, or wait for the
  monthly MCP limit to reset, then export again. The code below already
  implements the layout, so assets are drop-in replacements.

## Design tokens (from the earlier inspected travel style, same file family)
- Background: #f9f9f9
- Cards: white, radius 27
- Card images: radius 21
- Search bar: #f5f5f5, radius 16
- Accent gold (location / +15 avatars): #d0a774
- Text: #323232 (titles) / #484848 (secondary)
- CTA "Book Now": orange, full-width, radius ~16
- Font in Figma: PP Neue Montreal → in React Native use the closest
  system font / Inter, and swap in the licensed font later if you own it.

## Screens mapped from the metadata
### 1. Explore — frame 1:102
- Title: "Explore the Beautiful City in the World"
- Search bar: "Search places" + filter button
- Categories: Cities, Places (pill cards 141x57, icon 41x41)
- Section: "Travel Places"
- Place cards 290x216, image 272x132, title e.g. "Merzouga Marrakesh",
  location "Marrakech, Morocco", avatar stack + "+15"
- Top bar: avatar/menu (left), cart icon with badge "2" (right)
- Bottom card / promo area 348x148

### 2. Map — frame 1:3
- Map with pins:
  - Marzouga — 9.7 Km
  - Imlil — 4.5 Km
  - Marrakesh — 10.3 Km
  - Agafay — 23.0 Km
- Bottom carousel of the same place cards (290x216) as Explore.
- Tapping a pin or a card opens Place Detail.

### 3. Other iPhone frames on Page 1
Frames 1:90, 1:171 and neighbours are the same 393x852 template and
contain the remaining flow (welcome/start, place detail with Lorem text,
booking). They are implemented in `mobile/src/screens/` as:
Start, PlaceDetail, HostelsList, Booking, MyTrips, Profile, Saved,
Cart, Settings, CityDetail — with the same tokens above, so the missing
frames do not block building the MVP.

## Content examples used in the code (from Figma / previous travel work)
- Cities: Marrakech, Merzouga, Imlil, Agafay (phase 1), then Agadir, Essaouira, Chefchaouen, Fes.
- Hostel example: Hostel Ils — 345 MAD / day.
- Booking example total: 725 MAD (used in BookingScreen summary).
- Cart example total: 1,245 MAD.

## Component inventory for React Native
- PlaceCard, CategoryPill, SearchBar, AvatarStack (+N), PriceTag,
  OrangeButton (Book Now), BottomNav, SectionTitle, RatingBadge.
- All are in `mobile/src/screens/` as inline components in this starter;
  extract them to `mobile/src/components/` when a screen grows past ~200 lines.
