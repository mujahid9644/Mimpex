"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { Locale, translations, TranslationKey } from "./translations";

type LanguageContextValue = {
  locale: Locale;
  t: TranslationKey;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "mimpex-locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === "en" || saved === "bn") setLocaleState(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale === "bn" ? "bn" : "en";
    document.body.classList.toggle("locale-bn", locale === "bn");
    document.body.classList.toggle("font-bengali", locale === "bn");
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, ready]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const toggleLocale = useCallback(() => {
    setLocaleState((l) => (l === "en" ? "bn" : "en"));
  }, []);

  const value = useMemo(
    () => ({
      locale,
      t: translations[locale],
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale]
  );

  if (!ready) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
