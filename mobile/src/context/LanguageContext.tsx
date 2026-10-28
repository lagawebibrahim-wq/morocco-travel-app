import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, translate, type Locale } from "../i18n/dictionaries";
import { getTranslations } from "../api/client";
type LangState = { locale: Locale; setLocale: (l: Locale) => void; t: (key: string) => string; source: "backend" | "fallback" };
const Ctx = createContext<LangState | null>(null);
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [remote, setRemote] = useState<Record<string, string> | null>(null);
  const [source, setSource] = useState<"backend" | "fallback">("fallback");
  const load = async (loc: Locale) => {
    try {
      const res = await getTranslations(loc);
      const map = (res as any)?.translations ?? res;
      if (map && typeof map === "object" && Object.keys(map).length) { setRemote(map); setSource("backend"); }
      else { setRemote(null); setSource("fallback"); }
    } catch { setRemote(null); setSource("fallback"); }
  };
  useEffect(() => { load(locale); }, [locale]);
  const value = useMemo<LangState>(() => ({
    locale,
    setLocale: (l) => setLocaleState(l),
    t: (key) => translate(locale, key, remote ?? undefined),
    source,
  }), [locale, remote, source]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useLanguage() { const v = useContext(Ctx); if (!v) throw new Error("useLanguage outside provider"); return v; }
export { dictionaries };
