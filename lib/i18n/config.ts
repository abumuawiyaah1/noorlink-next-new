/** Locked product decisions for NoorLink localization. */

export const LOCALES = ["en", "es", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/**
 * Language policy (not country / currency):
 * 1. Explicit URL `/es` or `/ar` wins
 * 2. Else `nl_locale` cookie (language switcher / prior visit)
 * 3. Else browser `Accept-Language` on first visit
 * 4. Else English
 * Geo/IP is reserved for future local currency — not for forcing language.
 */

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

/**
 * Best matching site locale from Accept-Language (q-order).
 * Returns null when nothing matches en/es/ar.
 */
export function localeFromAcceptLanguage(
  header: string | null | undefined,
): Locale | null {
  if (!header?.trim()) return null;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tagPart, ...params] = part.trim().split(";");
      const tag = (tagPart ?? "").trim().toLowerCase();
      if (!tag || tag === "*") return null;
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      const base = tag.split("-")[0] ?? "";
      if (!isLocale(base)) return null;
      return { locale: base, q: Number.isFinite(q) ? q : 0 };
    })
    .filter((row): row is { locale: Locale; q: number } => row != null)
    .sort((a, b) => b.q - a.q);

  return ranked[0]?.locale ?? null;
}

/** Skip Accept-Language redirects for crawlers (SEO-safe). */
export function isLocaleBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  return /bot|crawl|spider|slurp|facebookexternalhit|preview|wget|curl/i.test(
    userAgent,
  );
}
