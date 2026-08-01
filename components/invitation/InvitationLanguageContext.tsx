"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "si" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const STORAGE_KEY = "wedding_invitation_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("si");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (savedLang === "si" || savedLang === "en") {
        setLanguageState(savedLang);
      }
    } catch {
      // Ignore localStorage errors in SSR / private browsing
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore localStorage write error
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "si" ? "en" : "si");
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if component is used outside provider
    return {
      language: "si" as Language,
      setLanguage: () => {},
      toggleLanguage: () => {},
    };
  }
  return context;
}
