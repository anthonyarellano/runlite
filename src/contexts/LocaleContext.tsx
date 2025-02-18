"use client";
import { translations } from "~/locales/translations";
import { createContext, useContext, useState, ReactNode } from "react";

type Locale = keyof typeof translations;
type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

/**
 * Provider component for managing application-wide locale state
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

/**
 * Hook to access the current locale and locale setter
 * @throws Error if used outside of LocaleProvider
 */
export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
