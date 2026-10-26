/**
 * Insider issue body overlays (long-form article copy) for non-English locales.
 *
 * English remains the source of truth in `lib/insider-issues*.ts` /
 * `lib/insider-specials.ts`. Titles, opener, CTAs and archive-card fields live in
 * `messages/{locale}.json` → `newsletterPage.issues.*`. Everything else
 * (destination paragraphs, tips, connectivity / Hajj / deal copy, closing, and the
 * special-edition Islamic reminders) is overlaid from here, keyed slug → locale.
 *
 * Merge happens in `localizeInsiderIssue` (`lib/insider-i18n.ts`).
 */

import type { Locale } from "@/lib/i18n/config";
import { INSIDER_BODIES_AR } from "@/lib/i18n/insider-bodies-ar";
import { INSIDER_BODIES_ES } from "@/lib/i18n/insider-bodies-es";

/** Localized Qur’an / Hadith card (text + citation). Arabic originals stay on the dua. */
export type InsiderReminderOverlay = {
  reference?: string;
  text?: string;
};

export type InsiderDuaOverlay = {
  occasion?: string;
  /**
   * Meaning / gloss shown under the Arabic. Use "" to hide it (Arabic locale,
   * where the dua is already in Arabic).
   */
  text?: string;
  reference?: string;
};

export type InsiderBodyOverlay = {
  destinationBody?: string[];
  tips?: string[];
  connectivityBody?: string;
  hajjBody?: string;
  dealBody?: string;
  closing?: string;
  /** Specials only. */
  dealGiving?: { body?: string; ctaLabel?: string };
  /** Specials only. */
  emailBrief?: {
    highlight?: string;
    highlightReference?: string;
    note?: string;
  };
  /** Specials only — aligned by index with the English arrays. */
  islamicReminders?: {
    quran?: InsiderReminderOverlay[];
    hadith?: InsiderReminderOverlay[];
    duas?: InsiderDuaOverlay[];
  };
};

export type InsiderBodyCatalog = Record<string, InsiderBodyOverlay>;

const CATALOGS: Partial<Record<Locale, InsiderBodyCatalog>> = {
  es: INSIDER_BODIES_ES,
  ar: INSIDER_BODIES_AR,
};

/** Returns the body overlay for a slug + locale (undefined for English / unknown). */
export function getInsiderBodyOverlay(
  slug: string,
  locale: Locale,
): InsiderBodyOverlay | undefined {
  return CATALOGS[locale]?.[slug];
}

/** Slugs that have a body overlay for a locale (used by QA scripts). */
export function insiderBodySlugs(locale: Locale): string[] {
  return Object.keys(CATALOGS[locale] ?? {});
}
