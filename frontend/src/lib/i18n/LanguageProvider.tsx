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
  const [locale, setLocaleState] = useState<Locale>("bn");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === "bn") setLocaleState(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = "bn";
    document.body.classList.add("locale-bn", "font-bengali");
    localStorage.setItem(STORAGE_KEY, "bn");
  }, [ready]);

  const setLocale = useCallback((_next: Locale) => setLocaleState("bn"), []);

  const toggleLocale = useCallback(() => {
    setLocaleState("bn");
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

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
