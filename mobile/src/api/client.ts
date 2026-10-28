// API client: talks to Laravel, falls back to local data in screens when offline.
// Set EXPO_PUBLIC_API_URL, e.g. http://localhost:8000/api (Android emulator: http://10.0.2.2:8000/api)
const BASE = (process.env.EXPO_PUBLIC_API_URL as string) ?? "http://localhost:8000/api";
let token: string | null = null;
export const setToken = (t: string | null) => { token = t; };
export const getToken = () => token;
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(init?.headers ?? {}) },
  });
  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const msg = data?.message ?? data?.errors ?? `API ${res.status} ${path}`;
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return (data?.data ?? data) as T;
}
export const getCities = () => api<any[]>("/cities");
export const getPlaces = (q?: string) => api<any[]>(`/places${q ? `?search=${encodeURIComponent(q)}` : ""}`);
export const getPlace = (id: string | number) => api<any>(`/places/${id}`);
export const getHostels = (placeId?: string | number) => api<any[]>(`/hostels${placeId ? `?place_id=${placeId}` : ""}`);
export const login = (email: string, password: string) => api<{ user: any; token: string }>("/login", { method: "POST", body: JSON.stringify({ email, password }) });
export const register = (name: string, email: string, password: string) => api<{ user: any; token: string }>("/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
export const getMe = () => api<any>("/me");
export const createBooking = (body: Record<string, any>) => api<any>("/bookings", { method: "POST", body: JSON.stringify(body) });
export const getMyBookings = () => api<any[]>("/bookings/me");
export const getFavorites = () => api<any[]>("/favorites/me");
export const toggleFavorite = (placeId: string | number) => api<any>("/favorites/toggle", { method: "POST", body: JSON.stringify({ place_id: placeId }) });

export const getLanguages = () => api<any[]>("/languages");
export const getTranslations = (locale: string) => api<any>(`/translations?locale=${locale}`);
