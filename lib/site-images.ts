/**
 * Central image paths — all destination/card assets live under /images/destinations/.
 * Run `node scripts/optimize-images.mjs` after adding new photos.
 */

const DEST = "/images/destinations";

export const SITE_IMAGES = {
  hero: "/images/hero.jpg",
  mapTexture: "/images/map-texture.jpg",
  worldHands: "/images/world-hands.jpg",
  team: "/images/team.jpg",
  ramadanBg: "/images/ramadan-bg.jpg",
  ramadanFeature: "/images/ramadan-feature.jpg",
} as const;

export const DESTINATION_IMAGES = {
  usa: `${DEST}/usa.jpg`,
  canada: `${DEST}/canada.jpg`,
  mexico: `${DEST}/mexico.jpg`,
  caribbean: `${DEST}/mexico.jpg`,
  brazil: `${DEST}/brazil.jpg`,
  europeRegional: `${DEST}/europe-regional.jpg`,
  uk: `${DEST}/uk.jpg`,
  france: `${DEST}/france.jpg`,
  germany: `${DEST}/germany.jpg`,
  asiaRegional: `${DEST}/asia-regional.jpg`,
  japan: `${DEST}/japan.jpg`,
  thailand: `${DEST}/thailand.jpg`,
  china: `${DEST}/china.jpg`,
  middleEastRegional: `${DEST}/middle-east-regional.jpg`,
  turkey: `${DEST}/turkey.jpg`,
  saudiArabia: `${DEST}/saudi-arabia.jpg`,
  uae: `${DEST}/uae.jpg`,
} as const;

export type DestinationImageKey = keyof typeof DESTINATION_IMAGES;

/** Resolve a catalog/card image path, falling back to regional template art. */
export function destinationImage(src: string, priority = false): {
  src: string;
  loading: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
} {
  return {
    src,
    loading: priority ? "eager" : "lazy",
    fetchPriority: priority ? "high" : undefined,
  };
}
