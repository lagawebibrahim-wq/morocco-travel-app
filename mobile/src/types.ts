export type Place = { id: number | string; name: string; location: string; distanceKm: number; distance_km?: number; rating: number; travelers?: number; travelers_count?: number; city?: any; lat?: number; lng?: number; description?: string };
export type Hostel = { id: number | string; place_id?: number | string; name: string; pricePerDay?: number; price_per_day_mad?: number; rating: number };
export type Booking = { id: number | string; hostel_id?: number | string; hostel?: Hostel; check_in: string; check_out: string; guests: number; total_mad: number; status: string };
export type User = { id: number | string; name: string; email: string };
export type Nav = { navigate: (name: string, params?: Record<string, any>) => void; back: () => void; params: Record<string, any>; go: (name: string) => void };
export type ScreenProps = { nav: Nav; go: (name: string) => void; params: Record<string, any> };
