import AsyncStorage from "@react-native-async-storage/async-storage";
const memory = new Map<string, string>();
export async function storeGet(key: string): Promise<string | null> {
  try { return await AsyncStorage.getItem(key); } catch { return memory.get(key) ?? null; }
}
export async function storeSet(key: string, value: string): Promise<void> {
  memory.set(key, value);
  try { await AsyncStorage.setItem(key, value); } catch {}
}
export async function storeRemove(key: string): Promise<void> {
  memory.delete(key);
  try { await AsyncStorage.removeItem(key); } catch {}
}
