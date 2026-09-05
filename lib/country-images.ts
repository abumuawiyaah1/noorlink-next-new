import { normalizeCountrySlug } from "@/lib/country-slugs";
import {
  COUNTRY_IMAGE_REGISTRY,
  REGIONAL_IMAGE_REGISTRY,
} from "@/lib/country-images.registry";

const DEST = "/images/destinations";

/** Shown when we sell a country but don't have its photo yet — not another country's image. */
export const COUNTRY_IMAGE_PLACEHOLDER = `${DEST}/placeholder.webp`;

/** Map search/checkout slugs to the photo filename slug. */
const IMAGE_SLUG_ALIASES: Record<string, string> = {
  us: "usa",
  "united-states": "usa",
  gb: "uk",
  "united-kingdom": "uk",
  "united-arab-emirates": "uae",
  korea: "south-korea",
  rusia: "russia",
  "russian-federation": "russia",
};

export type CountryImageResult = {
  src: string;
  slug: string;
  /** True when showing placeholder.jpg (add `{slug}.jpg` to fix). */
  isPlaceholder: boolean;
  /** True when showing an explicit regional product image. */
  isRegional: boolean;
};

export function resolveCountryImageSlug(countryId: string): string {
  const slug = normalizeCountrySlug(countryId);
  if (!slug) return "";
  return IMAGE_SLUG_ALIASES[slug] ?? slug;
}

/** Regional catalog entries (Europe pass, Asia pass, etc.) — not individual countries. */
const REGIONAL_PRODUCT_SLUGS = new Set([
  "europe",
  "asia",
  "asia-pacific",
  "middle-east",
  "africa",
  "americas",
  "north-america",
  "south-america",
  "global",
  "latam",
  "caribbean",
]);

const REGIONAL_SLUG_ALIASES: Record<string, string> = {
  asia: "asia-pacific",
  mea: "middle-east",
  latam: "south-america",
  americas: "north-america",
};

export function getCountryImage(countryId: string): CountryImageResult {
  const slug = resolveCountryImageSlug(countryId);
  if (!slug) {
    return {
      src: COUNTRY_IMAGE_PLACEHOLDER,
      slug: "",
      isPlaceholder: true,
      isRegional: false,
    };
  }

  const countryPhoto = COUNTRY_IMAGE_REGISTRY[slug];
  if (countryPhoto) {
    return { src: countryPhoto, slug, isPlaceholder: false, isRegional: false };
  }

  if (REGIONAL_PRODUCT_SLUGS.has(slug)) {
    const regionalKey = REGIONAL_SLUG_ALIASES[slug] ?? slug;
    const regional =
      REGIONAL_IMAGE_REGISTRY[regionalKey] ?? COUNTRY_IMAGE_PLACEHOLDER;
    return {
      src: regional,
      slug,
      isPlaceholder: regional === COUNTRY_IMAGE_PLACEHOLDER,
      isRegional: regional !== COUNTRY_IMAGE_PLACEHOLDER,
    };
  }

  return {
    src: COUNTRY_IMAGE_PLACEHOLDER,
    slug,
    isPlaceholder: true,
    isRegional: false,
  };
}

export function getCountryImageUrl(countryId: string): string {
  return getCountryImage(countryId).src;
}

/** Image for a regional storefront product (map cards, plans hero). */
export function getRegionalImageUrl(routeSlug: string): string {
  const key = REGIONAL_SLUG_ALIASES[routeSlug] ?? routeSlug;
  return (
    REGIONAL_IMAGE_REGISTRY[key] ??
    REGIONAL_IMAGE_REGISTRY[routeSlug] ??
    COUNTRY_IMAGE_PLACEHOLDER
  );
}

/**
 * Responsive card delivery: 400w `-sm.webp` + 800w full.
 * Destination cards display ~170–280px; avoid downloading 800px files on mobile.
 */
export function destinationCardSrcSet(src: string): {
  src: string;
  srcSet?: string;
  sizes: string;
} {
  const sizes = "(max-width: 768px) 45vw, (max-width: 1100px) 30vw, 280px";
  if (
    !src.includes("/images/destinations/") ||
    !src.endsWith(".webp") ||
    src.includes("-sm.webp")
  ) {
    return { src, sizes };
  }
  const sm = src.replace(/\.webp$/i, "-sm.webp");
  return {
    src: sm,
    srcSet: `${sm} 400w, ${src} 800w`,
    sizes,
  };
}

export function hasCountryPhoto(countryId: string): boolean {
  const slug = resolveCountryImageSlug(countryId);
  return Boolean(slug && COUNTRY_IMAGE_REGISTRY[slug]);
}

export function listCountriesWithPhotos(): string[] {
  return Object.keys(COUNTRY_IMAGE_REGISTRY).sort();
}
