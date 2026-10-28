// Swap EXPO_PUBLIC_API_URL to your Laravel URL, e.g. http://localhost:8000/api
const BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8000/api";
let token: string | null = null;
export const setToken = (t: string | null) => { token = t; };
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...init?.headers },
  });
  if (!res.ok) throw new Error(`API ${res.status} ${path}`);
  return res.json() as Promise<T>;
}
export const getPlaces = () => api("/places");
export const getHostels = (placeId: string) => api(`/hostels?place_id=${placeId}`);
