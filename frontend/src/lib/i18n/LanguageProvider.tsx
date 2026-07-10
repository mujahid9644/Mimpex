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

// Get initial locale from localStorage before any rendering (server-side compatible)
function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    return (saved === "en" || saved === "bn") ? saved : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if ((saved === "en" || saved === "bn") && saved !== locale) {
      setLocaleState(saved);
    }
  }, [locale]);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.lang = locale === "bn" ? "bn" : "en";
    document.body.classList.toggle("locale-bn", locale === "bn");
    document.body.classList.toggle("font-bengali", locale === "bn");
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, hydrated]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((l) => {
      const next = l === "en" ? "bn" : "en";
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
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
