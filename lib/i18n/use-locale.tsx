"use client";

import {
  LOCALE_COOKIE,
  LOCALE_META,
  type Locale,
  isLocale,
  normalizeLocale,
} from "@/lib/i18n/config";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const LOCALE_EVENT = "nl:locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${LOCALE_COOKIE}=`));
  return normalizeLocale(match?.split("=")[1]);
}

export function applyDocumentLocale(locale: Locale) {
  const meta = LOCALE_META[locale];
  document.documentElement.lang = meta.htmlLang;
  document.documentElement.dir = meta.dir;
  document.documentElement.dataset.locale = locale;
}

export function writeLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<Locale>(LOCALE_EVENT, { detail: locale }),
    );
  }
}

/** First path segment if it is a known locale (`/es`, `/ar`). */
export function pathLocale(pathname: string): Locale | null {
  const segment = (pathname || "/").split("/")[1];
  return isLocale(segment) ? segment : null;
}

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const pathname = usePathname() || "/";

  useEffect(() => {
    setLocaleState(initialLocale);
    applyDocumentLocale(initialLocale);
  }, [initialLocale]);

  useEffect(() => {
    const fromPath = pathLocale(pathname);
    if (fromPath && fromPath !== locale) {
      setLocaleState(fromPath);
      writeLocaleCookie(fromPath);
      applyDocumentLocale(fromPath);
    }
  }, [pathname, locale]);

  useEffect(() => {
    function onLocale(event: Event) {
      const next = (event as CustomEvent<Locale>).detail;
      setLocaleState(normalizeLocale(next));
    }
    window.addEventListener(LOCALE_EVENT, onLocale);
    return () => window.removeEventListener(LOCALE_EVENT, onLocale);
  }, []);

  function setLocale(next: Locale) {
    writeLocaleCookie(next);
    applyDocumentLocale(next);
    setLocaleState(next);
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

/** Shared locale — SSR initial value from middleware, then cookie / URL sync. */
export function useLocaleState(): [Locale, (locale: Locale) => void] {
  const ctx = useContext(LocaleContext);
  const [fallback, setFallback] = useState<Locale>("en");

  useEffect(() => {
    if (ctx) return;
    setFallback(readLocaleCookie());
    function onLocale(event: Event) {
      setFallback(normalizeLocale((event as CustomEvent<Locale>).detail));
    }
    window.addEventListener(LOCALE_EVENT, onLocale);
    return () => window.removeEventListener(LOCALE_EVENT, onLocale);
  }, [ctx]);

  if (ctx) return [ctx.locale, ctx.setLocale];

  function update(next: Locale) {
    writeLocaleCookie(next);
    applyDocumentLocale(next);
    setFallback(next);
  }

  return [fallback, update];
}
