import { PSEO_DESTINATIONS } from "@/lib/pseo/seed";
import type { PseoDestination } from "@/lib/pseo/types";
import type { Locale } from "@/lib/i18n/config";

export type { PseoDestination, PseoLocaleCopy, PseoWave } from "@/lib/pseo/types";
export { PSEO_DESTINATIONS } from "@/lib/pseo/seed";

export function getAllPseoDestinations(): PseoDestination[] {
  return PSEO_DESTINATIONS;
}

export function getIndexedPseoDestinations(): PseoDestination[] {
  return PSEO_DESTINATIONS.filter((d) => d.isIndexed);
}

export function getPseoDestination(slug: string): PseoDestination | null {
  const normalized = slug.trim().toLowerCase();
  return (
    PSEO_DESTINATIONS.find((d) => d.slug === normalized) ?? null
  );
}

export function getPseoAvailableLocales(dest: PseoDestination): Locale[] {
  return (Object.keys(dest.locales) as Locale[]).filter(
    (locale) => !!dest.locales[locale],
  );
}

export function getPseoLocaleCopy(dest: PseoDestination, locale: Locale) {
  return dest.locales[locale] ?? dest.locales.en;
}
