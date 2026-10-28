import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { storeGet, storeSet, storeRemove } from "../utils/storage";
import { setToken as setApiToken } from "../api/client";
export type CartItem = { id: string; name: string; pricePerDay: number; nights: number };
type AppState = {
  user: any; token: string | null;
  signIn: (user: any, token: string) => void; signOut: () => void;
  cart: CartItem[]; addToCart: (item: CartItem) => void; removeFromCart: (id: string) => void; clearCart: () => void;
  savedIds: string[]; toggleSaved: (id: string) => void;
};
const Ctx = createContext<AppState | null>(null);
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>(["marzouga"]);
  useEffect(() => {
    storeGet("auth_token").then(async (tok) => {
      if (tok) {
        const userJson = await storeGet("auth_user");
        setTokenState(tok); setApiToken(tok);
        if (userJson) { try { setUser(JSON.parse(userJson)); } catch {} }
      }
    }).catch(() => {});
    storeGet("saved_ids").then((v) => { if (v) { try { setSavedIds(JSON.parse(v)); } catch {} } }).catch(() => {});
  }, []);
  const value = useMemo<AppState>(() => ({
    user, token,
    signIn: (u, t) => { setUser(u); setTokenState(t); setApiToken(t); storeSet("auth_token", t).catch(() => {}); storeSet("auth_user", JSON.stringify(u)).catch(() => {}); },
    signOut: () => { setUser(null); setTokenState(null); setApiToken(null); storeRemove("auth_token").catch(() => {}); storeRemove("auth_user").catch(() => {}); },
    cart,
    addToCart: (item) => setCart((c) => c.some((x) => x.id === item.id) ? c : [...c, item]),
    removeFromCart: (id) => setCart((c) => c.filter((x) => x.id !== id)),
    clearCart: () => setCart([]),
    savedIds,
    toggleSaved: (id) => setSavedIds((s) => { const next = s.includes(id) ? s.filter((x) => x !== id) : [...s, id]; storeSet("saved_ids", JSON.stringify(next)).catch(() => {}); return next; }),
  }), [user, token, cart, savedIds]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useApp() { const v = useContext(Ctx); if (!v) throw new Error("useApp outside provider"); return v; }
