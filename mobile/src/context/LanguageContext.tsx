import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { I18nManager } from "react-native";
import { dictionaries, translate, type Locale } from "../i18n/dictionaries";
import { isRTL } from "../i18n/rtl";
import { getTranslations } from "../api/client";
import { storeGet, storeSet } from "../utils/storage";
type LangState = { locale: Locale; setLocale: (l: Locale) => void; t: (key: string) => string; source: "backend" | "fallback"; rtl: boolean };
const Ctx = createContext<LangState | null>(null);
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [remote, setRemote] = useState<Record<string, string> | null>(null);
  const [source, setSource] = useState<"backend" | "fallback">("fallback");
  // Restore saved language on first mount
  useEffect(() => { storeGet("locale").then((v) => { if (v === "ar" || v === "fr" || v === "en") setLocaleState(v as Locale); }).catch(() => {}); }, []);
  const load = async (loc: Locale) => {
    try {
      const res = await getTranslations(loc);
      const map = (res as any)?.translations ?? res;
      if (map && typeof map === "object" && Object.keys(map).length) { setRemote(map); setSource("backend"); }
      else { setRemote(null); setSource("fallback"); }
    } catch { setRemote(null); setSource("fallback"); }
  };
  useEffect(() => {
    // Native RTL: takes full effect after app restart; manual row-reverse flipping below works immediately.
    try { I18nManager.allowRTL(true); I18nManager.forceRTL(locale === "ar"); } catch {}
    load(locale);
  }, [locale]);
  const value = useMemo<LangState>(() => ({
    locale,
    setLocale: (l) => { setLocaleState(l); storeSet("locale", l).catch(() => {}); },
    t: (key) => translate(locale, key, remote ?? undefined),
    source,
    rtl: isRTL(locale),
  }), [locale, remote, source]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useLanguage() { const v = useContext(Ctx); if (!v) throw new Error("useLanguage outside provider"); return v; }
export { dictionaries };
