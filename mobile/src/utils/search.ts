export function filterPlaces<T extends { name: string }>(list: T[], q: string): T[] {
  const query = q.trim().toLowerCase();
  if (!query) return list;
  return list.filter((p) => p.name.toLowerCase().includes(query));
}
export function cartTotal(items: { pricePerDay: number; nights: number }[], serviceFee: number): number {
  if (!items.length) return 0;
  return items.reduce((s, i) => s + i.pricePerDay * i.nights, 0) + serviceFee;
}
