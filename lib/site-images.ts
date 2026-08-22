/**
 * Central image paths — destination photos managed in lib/country-images.ts.
 * Run `node scripts/sync-country-images.mjs` after adding new country photos.
 */
import {
  COUNTRY_IMAGE_PLACEHOLDER,
  getCountryImageUrl,
} from "@/lib/country-images";
import { REGIONAL_IMAGE_REGISTRY } from "@/lib/country-images.registry";

const DEST = "/images/destinations";

export const SITE_IMAGES = {
  hero: "/images/hero.jpg",
  mapTexture: "/images/map-texture.jpg",
  worldHands: "/images/world-hands.jpg",
  team: "/images/team.jpg",
  ramadanBg: "/images/ramadan-bg.jpg",
  ramadanFeature: "/images/ramadan-feature.jpg",
} as const;

/** @deprecated Prefer getCountryImageUrl() — kept for legacy imports. */
export const DESTINATION_IMAGES = {
  usa: getCountryImageUrl("usa"),
  canada: getCountryImageUrl("canada"),
  mexico: getCountryImageUrl("mexico"),
  caribbean: COUNTRY_IMAGE_PLACEHOLDER,
  brazil: getCountryImageUrl("brazil"),
  europeRegional: REGIONAL_IMAGE_REGISTRY.europe,
  uk: getCountryImageUrl("uk"),
  france: getCountryImageUrl("france"),
  germany: getCountryImageUrl("germany"),
  italy: getCountryImageUrl("italy"),
  spain: getCountryImageUrl("spain"),
  asiaRegional: REGIONAL_IMAGE_REGISTRY["asia-pacific"],
  japan: getCountryImageUrl("japan"),
  thailand: getCountryImageUrl("thailand"),
  china: getCountryImageUrl("china"),
  middleEastRegional: REGIONAL_IMAGE_REGISTRY["middle-east"],
  turkey: getCountryImageUrl("turkey"),
  saudiArabia: getCountryImageUrl("saudi-arabia"),
  uae: getCountryImageUrl("uae"),
  placeholder: COUNTRY_IMAGE_PLACEHOLDER,
} as const;

export type DestinationImageKey = keyof typeof DESTINATION_IMAGES;

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

export { DEST };
