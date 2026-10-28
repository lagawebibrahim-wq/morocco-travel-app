export type Place = { id: string; name: string; location: string; distanceKm: number; rating: number; travelers: number; pricePerDay?: number; lat: number; lng: number };
export const places: Place[] = [
  { id: "marzouga", name: "Merzouga Marrakesh", location: "Marrakech, Morocco", distanceKm: 9.7, rating: 4.9, travelers: 15, lat: 31.0997, lng: -4.0117 },
  { id: "imlil", name: "Imlil Marrakesh", location: "Marrakech, Morocco", distanceKm: 4.5, rating: 4.8, travelers: 15, lat: 31.1325, lng: -7.9167 },
  { id: "marrakesh", name: "Marrakesh", location: "Marrakech, Morocco", distanceKm: 10.3, rating: 4.9, travelers: 15, lat: 31.6295, lng: -7.9811 },
  { id: "agafay", name: "Agafay", location: "Marrakech, Morocco", distanceKm: 23.0, rating: 4.7, travelers: 15, lat: 31.4426, lng: -8.0203 },
];
export const hostels = [
  { id: "hostel-ils", placeId: "marzouga", name: "Hostel Ils", pricePerDay: 345, rating: 4.9 },
  { id: "hostel-desert", placeId: "marzouga", name: "Desert Camp Hostel", pricePerDay: 420, rating: 4.8 },
];
export const SERVICE_FEE_MAD = 35;
export const bookingTotal = (nights: number, pricePerDay: number) => nights * pricePerDay + SERVICE_FEE_MAD;
export const bookingExample = { nights: 2, pricePerDay: 345, total: 725, cartTotal: 1245 };
