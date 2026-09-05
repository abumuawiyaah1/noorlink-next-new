import { DESTINATION_CARDS, type DestinationCard } from "@/lib/destinations-catalog";
import { normalizeCountrySlug } from "@/lib/country-slugs";
import { getActiveFestivityCountryIds } from "@/lib/popular-moments";

/** Eight countries in two rows on the homepage Popular section. */
export const POPULAR_COUNTRIES_ROW_SIZE = 8;

/** Minimum search count before a trending destination can fill a hybrid slot. */
export const POPULAR_TRENDING_MIN_COUNT = 3;

export type PopularSeasonId =
  | "winter-sun"
  | "pilgrimage-spring"
  | "summer"
  | "hajj-fall";

export type PopularSeasonConfig = {
  id: PopularSeasonId;
  label: string;
  /** Locked brand / campaign destinations (shown first). Countries only. */
  anchors: readonly string[];
  /** Used when trending is sparse — completes the grid after anchors. */
  fallbacks: readonly string[];
};

/**
 * NoorLink seasonal calendar (UTC month).
 * Anchors protect pilgrimage + leisure corridors; fallbacks keep the grid full.
 * Regions / Global never appear here.
 */
export const POPULAR_SEASONS: Record<PopularSeasonId, PopularSeasonConfig> = {
  "winter-sun": {
    id: "winter-sun",
    label: "Winter sun",
    anchors: ["jamaica", "mexico", "usa"],
    fallbacks: [
      "turkey",
      "uae",
      "uk",
      "france",
      "japan",
      "saudi-arabia",
      "spain",
      "italy",
    ],
  },
  "pilgrimage-spring": {
    id: "pilgrimage-spring",
    label: "Pilgrimage spring",
    anchors: ["saudi-arabia", "turkey", "uae"],
    fallbacks: [
      "uk",
      "france",
      "usa",
      "japan",
      "italy",
      "germany",
      "spain",
      "mexico",
    ],
  },
  summer: {
    id: "summer",
    label: "Summer travel",
    anchors: ["france", "italy", "spain"],
    fallbacks: [
      "turkey",
      "uk",
      "usa",
      "jamaica",
      "japan",
      "uae",
      "germany",
      "saudi-arabia",
    ],
  },
  "hajj-fall": {
    id: "hajj-fall",
    label: "Hajj & fall travel",
    anchors: ["saudi-arabia", "turkey", "uae"],
    fallbacks: [
      "uk",
      "france",
      "usa",
      "japan",
      "italy",
      "germany",
      "spain",
      "mexico",
    ],
  },
};

/** Map analytics labels / slugs → single-country DESTINATION_CARDS ids only. */
const TRENDING_LABEL_TO_CARD_ID: Record<string, string> = {
  umrah: "saudi-arabia",
  hajj: "saudi-arabia",
  "saudi arabia": "saudi-arabia",
  "saudi-arabia": "saudi-arabia",
  turkey: "turkey",
  france: "france",
  italy: "italy",
  spain: "spain",
  uk: "uk",
  "united kingdom": "uk",
  "united-kingdom": "uk",
  usa: "usa",
  "united states": "usa",
  "united-states": "usa",
  "new york": "usa",
  nyc: "usa",
  uae: "uae",
  "united arab emirates": "uae",
  dubai: "uae",
  japan: "japan",
  germany: "germany",
  mexico: "mexico",
  canada: "canada",
  brazil: "brazil",
  thailand: "thailand",
  china: "china",
  jamaica: "jamaica",
  bahamas: "jamaica",
  barbados: "jamaica",
  // Regions intentionally omitted — Popular is countries only.
};

export function isPopularCountryCard(card: DestinationCard): boolean {
  return !card.priceCountryId.startsWith("regional-");
}

function cardById(id: string): DestinationCard | undefined {
  const card = DESTINATION_CARDS.find((item) => item.id === id);
  if (!card || !isPopularCountryCard(card)) return undefined;
  return card;
}

export function resolvePopularSeason(date: Date = new Date()): PopularSeasonConfig {
  const month = date.getUTCMonth() + 1; // 1–12
  if (month === 12 || month <= 3) return POPULAR_SEASONS["winter-sun"];
  if (month >= 4 && month <= 6) return POPULAR_SEASONS["pilgrimage-spring"];
  if (month === 7 || month === 8) return POPULAR_SEASONS.summer;
  return POPULAR_SEASONS["hajj-fall"];
}

export function trendingLabelToCardId(label: string): string | null {
  const raw = label.trim().toLowerCase();
  if (!raw) return null;
  if (TRENDING_LABEL_TO_CARD_ID[raw]) return TRENDING_LABEL_TO_CARD_ID[raw];

  const slug = normalizeCountrySlug(raw);
  if (TRENDING_LABEL_TO_CARD_ID[slug]) return TRENDING_LABEL_TO_CARD_ID[slug];
  if (cardById(slug)) return slug;

  return null;
}

/**
 * Hybrid grid: season anchors first, then festivities, then demand,
 * then fallbacks — always exactly `target` single-country cards.
 */
export function buildHybridPopularCountryIds(options: {
  season?: PopularSeasonConfig;
  trending?: { label: string; count?: number }[];
  target?: number;
  minTrendingCount?: number;
  date?: Date;
}): string[] {
  const date = options.date ?? new Date();
  const season = options.season ?? resolvePopularSeason(date);
  const target = options.target ?? POPULAR_COUNTRIES_ROW_SIZE;
  const minCount = options.minTrendingCount ?? POPULAR_TRENDING_MIN_COUNT;
  const result: string[] = [];
  const seen = new Set<string>();

  const push = (id: string | null | undefined) => {
    if (!id || result.length >= target) return;
    if (seen.has(id)) return;
    if (!cardById(id)) return;
    seen.add(id);
    result.push(id);
  };

  // 1) Season wins
  for (const id of season.anchors) push(id);

  // 2) Active festivities / special days
  for (const id of getActiveFestivityCountryIds(date)) push(id);

  // 3) Live demand
  const trending = options.trending ?? [];
  for (const item of trending) {
    const count = item.count ?? 0;
    if (count < minCount) continue;
    push(trendingLabelToCardId(item.label));
  }

  // 4) Seasonal fallbacks
  for (const id of season.fallbacks) push(id);

  // 5) Safety net — countries only
  for (const card of DESTINATION_CARDS) {
    if (result.length >= target) break;
    if (!isPopularCountryCard(card)) continue;
    push(card.id);
  }

  return result.slice(0, target);
}

export function cardsForPopularIds(ids: string[]): DestinationCard[] {
  return ids
    .map((id) => cardById(id))
    .filter((card): card is DestinationCard => Boolean(card));
}

/** Stable default for SSR / first paint (no analytics yet). */
export function defaultPopularCountryCards(date?: Date): DestinationCard[] {
  const ids = buildHybridPopularCountryIds({
    season: resolvePopularSeason(date),
    trending: [],
    date,
  });
  return cardsForPopularIds(ids);
}
