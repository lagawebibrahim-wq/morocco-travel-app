export type Place = { id: string; name: string; location: string; distanceKm: number; rating: number; travelers: number; pricePerDay?: number };
export const places: Place[] = [
  { id: "marzouga", name: "Merzouga Marrakesh", location: "Marrakech, Morocco", distanceKm: 9.7, rating: 4.9, travelers: 15 },
  { id: "imlil", name: "Imlil Marrakesh", location: "Marrakech, Morocco", distanceKm: 4.5, rating: 4.8, travelers: 15 },
  { id: "marrakesh", name: "Marrakesh", location: "Marrakech, Morocco", distanceKm: 10.3, rating: 4.9, travelers: 15 },
  { id: "agafay", name: "Agafay", location: "Marrakech, Morocco", distanceKm: 23.0, rating: 4.7, travelers: 15 },
];
export const hostels = [
  { id: "hostel-ils", placeId: "marzouga", name: "Hostel Ils", pricePerDay: 345, rating: 4.9 },
  { id: "hostel-desert", placeId: "marzouga", name: "Desert Camp Hostel", pricePerDay: 420, rating: 4.8 },
];
export const bookingExample = { nights: 2, pricePerDay: 345, total: 725, cartTotal: 1245 };
