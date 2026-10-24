import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE, normalizeLocale } from "@/lib/i18n/config";
import ar from "@/messages/ar.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  es: es as Dictionary,
  ar: ar as Dictionary,
};

export function getDictionary(locale?: string | null): Dictionary {
  return dictionaries[normalizeLocale(locale)];
}

export function t(
  dict: Dictionary,
  path: string,
  vars?: Record<string, string | number>,
): string {
  const parts = path.split(".");
  let cur: unknown = dict;
  for (const part of parts) {
    if (cur && typeof cur === "object" && part in cur) {
      cur = (cur as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }
  if (typeof cur !== "string") return path;
  if (!vars) return cur;
  return Object.entries(vars).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    cur,
  );
}

export function navItemsFromDictionary(dict: Dictionary) {
  return [
    { href: "/about", label: dict.nav.about },
    { href: "/hajj-umrah", label: dict.nav.hajjUmrah },
    { href: "/destinations", label: dict.nav.destinations },
    { href: "/learn", label: dict.nav.learn },
    { href: "/support", label: dict.nav.support },
    { href: "/partners#apply", label: dict.nav.partners },
    { href: "/faq", label: dict.nav.faq },
    { href: "/dashboard", label: dict.nav.myEsims, highlight: true as const },
  ];
}

export { DEFAULT_LOCALE };
