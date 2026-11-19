import { getPseoRegion } from "@/lib/pseo/content";
import { PSEO_DESTINATIONS } from "@/lib/pseo/seed";
import type { PseoDestination, PseoWave } from "@/lib/pseo/types";
import type { Locale } from "@/lib/i18n/config";

export type {
  PseoDestination,
  PseoFaqItem,
  PseoLocaleCopy,
  PseoWave,
} from "@/lib/pseo/types";
export { PSEO_DESTINATIONS } from "@/lib/pseo/seed";
export {
  getPseoAirports,
  formatPseoAirportList,
} from "@/lib/pseo/airports";
export {
  getPseoFaqs,
  getPseoClusterLinks,
  getPseoRegion,
  pseoFaqCopyFromDict,
} from "@/lib/pseo/content";
export {
  buildPseoBreadcrumbJsonLd,
  buildPseoFaqJsonLd,
  buildPseoOfferJsonLd,
} from "@/lib/pseo/jsonld";

const WAVE_ORDER: Record<PseoWave, number> = { A: 0, B: 1, C: 2, D: 3 };

function compareByWaveThenSlug(a: PseoDestination, b: PseoDestination): number {
  const waveDiff = WAVE_ORDER[a.wave] - WAVE_ORDER[b.wave];
  if (waveDiff !== 0) return waveDiff;
  return a.slug.localeCompare(b.slug);
}

export function getAllPseoDestinations(): PseoDestination[] {
  return PSEO_DESTINATIONS;
}

/** Indexed hubs, Wave A → B → C first so crawl hits priority corridors first. */
export function getIndexedPseoDestinations(): PseoDestination[] {
  return PSEO_DESTINATIONS.filter((d) => d.isIndexed).sort(compareByWaveThenSlug);
}

/** Wave A indexed hubs — homepage / crawl-priority link lists. */
export function getWaveAIndexedPseoDestinations(): PseoDestination[] {
  return getIndexedPseoDestinations().filter((d) => d.wave === "A");
}

export function getPseoDestination(slug: string): PseoDestination | null {
  const normalized = slug.trim().toLowerCase();
  return (
    PSEO_DESTINATIONS.find((d) => d.slug === normalized) ?? null
  );
}

/** Indexed hub for a plans country id (e.g. turkey → /esim/turkey). */
export function getIndexedPseoForCountry(
  countryId: string,
): PseoDestination | null {
  const normalized = countryId.trim().toLowerCase();
  const aliases: Record<string, string> = {
    "united-arab-emirates": "uae",
    saudi: "saudi-arabia",
    dominican: "dominican-republic",
    korea: "south-korea",
    "united-states": "usa",
    "united-kingdom": "uk",
    us: "usa",
    gb: "uk",
  };
  const slug = aliases[normalized] ?? normalized;
  const dest = getPseoDestination(slug);
  return dest?.isIndexed ? dest : null;
}

export function pseoHubPath(slug: string): string {
  return `/esim/${slug.trim().toLowerCase()}`;
}

export function getPseoAvailableLocales(dest: PseoDestination): Locale[] {
  return (Object.keys(dest.locales) as Locale[]).filter(
    (locale) => !!dest.locales[locale],
  );
}

export function getPseoLocaleCopy(dest: PseoDestination, locale: Locale) {
  return dest.locales[locale] ?? dest.locales.en;
}

/**
 * Related indexed hubs — same region first, then other corridors.
 * Within each bucket prefer earlier waves (A before C) for crawl flow.
 */
export function getRelatedIndexedPseo(
  slug: string,
  limit = 8,
): PseoDestination[] {
  const current = slug.trim().toLowerCase();
  const self = getPseoDestination(current);
  const region = self ? getPseoRegion(self) : null;
  const others = getIndexedPseoDestinations().filter((d) => d.slug !== current);
  const sameRegion = (
    region ? others.filter((d) => getPseoRegion(d) === region) : []
  ).sort(compareByWaveThenSlug);
  const sameRegionSet = new Set(sameRegion.map((d) => d.slug));
  const rest = others
    .filter((d) => !sameRegionSet.has(d.slug))
    .sort(compareByWaveThenSlug);
  return [...sameRegion, ...rest].slice(0, limit);
}
