import { plansPathForCountry } from "@/lib/country-slugs";
import { COUNTRY_TEMPLATE_HINTS } from "@/lib/country-templates";
import { INSIDER_ISSUES } from "@/lib/insider-issues";
import {
  REGIONAL_PRODUCTS,
  plansPathForRegion,
  type RegionalRouteSlug,
} from "@/lib/regional-products";
import { absoluteUrl } from "@/lib/seo";

export type SitemapEntry = {
  url: string;
  lastModified?: Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

const REGIONAL_ROUTE_SLUGS = new Set<RegionalRouteSlug>(
  Object.keys(REGIONAL_PRODUCTS) as RegionalRouteSlug[],
);

/** Country slugs that resolve to a regional product page instead of /plans/{slug}. */
const REGIONAL_COUNTRY_SLUGS = new Set([
  "europe",
  "eu",
  "schengen",
  "asia",
  "asia-pacific",
  "middle-east",
  "north-america",
  "africa",
  "south-america",
  "caribbean",
  "global",
  "worldwide",
  "world",
]);

function countryPlansPath(slug: string): string | null {
  if (slug === "saudi-arabia" || slug === "umrah" || slug === "hajj") {
    return "/hajj-umrah";
  }
  if (REGIONAL_COUNTRY_SLUGS.has(slug)) {
    const regional = slug as RegionalRouteSlug;
    if (REGIONAL_ROUTE_SLUGS.has(regional)) {
      return plansPathForRegion(regional);
    }
    if (slug === "eu" || slug === "schengen") return plansPathForRegion("europe");
    if (slug === "asia") return plansPathForRegion("asia-pacific");
    if (slug === "worldwide" || slug === "world") return plansPathForRegion("global");
    return null;
  }
  return plansPathForCountry(slug);
}

export function buildSitemapEntries(now = new Date()): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/destinations"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/hajj-umrah"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/faq"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/support"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/newsletter"), changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/partners"), changeFrequency: "monthly", priority: 0.4 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/refund"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/kyc"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/cookie-policy"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const countryPaths = new Set<string>();
  for (const hint of COUNTRY_TEMPLATE_HINTS) {
    const path = countryPlansPath(hint.slug);
    if (path) countryPaths.add(path);
  }
  for (const path of countryPaths) {
    entries.push({
      url: absoluteUrl(path),
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: now,
    });
  }

  for (const slug of Object.keys(REGIONAL_PRODUCTS) as RegionalRouteSlug[]) {
    entries.push({
      url: absoluteUrl(plansPathForRegion(slug)),
      changeFrequency: "weekly",
      priority: 0.85,
      lastModified: now,
    });
  }

  for (const issue of INSIDER_ISSUES) {
    entries.push({
      url: absoluteUrl(`/newsletter/${issue.slug}`),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
