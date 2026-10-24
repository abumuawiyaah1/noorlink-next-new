/** Locked product decisions for NoorLink localization. */

export const LOCALES = ["en", "es", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Cookie set by middleware / language switcher. */
export const LOCALE_COOKIE = "nl_locale";

/** Request header middleware sets so SSR matches the URL prefix / cookie. */
export const LOCALE_HEADER = "x-nl-locale";

export const LOCALE_META: Record<
  Locale,
  { label: string; nativeLabel: string; dir: "ltr" | "rtl"; htmlLang: string }
> = {
  en: { label: "English", nativeLabel: "English", dir: "ltr", htmlLang: "en" },
  es: {
    label: "Spanish (LatAm)",
    nativeLabel: "Español",
    dir: "ltr",
    htmlLang: "es",
  },
  ar: {
    label: "Arabic (MSA)",
    nativeLabel: "العربية",
    dir: "rtl",
    htmlLang: "ar",
  },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function normalizeLocale(value: string | null | undefined): Locale {
  if (!value) return DEFAULT_LOCALE;
  const base = value.toLowerCase().split("-")[0];
  return isLocale(base) ? base : DEFAULT_LOCALE;
}
