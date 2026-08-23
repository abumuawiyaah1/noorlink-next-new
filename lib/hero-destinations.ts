import { plansPathForCountry } from "@/lib/country-slugs";
import { getCountryFlag } from "@/lib/country-flags";
import {
  destinationCardFromQuery,
  searchCountryTemplateHints,
} from "@/lib/country-templates";
import {
  plansPathForRegion,
  regionalSearchMatches,
} from "@/lib/regional-products";

export type HeroDestination = {
  id: string;
  label: string;
  flag: string;
  type: "country" | "region";
  href: string;
  keywords: string[];
};

export const heroDestinations: HeroDestination[] = [
  {
    id: "turkey",
    label: "Turkey",
    flag: "🇹🇷",
    type: "country",
    href: plansPathForCountry("turkey"),
    keywords: ["turkey", "istanbul", "ankara", "antalya"],
  },
  {
    id: "spain",
    label: "Spain",
    flag: "🇪🇸",
    type: "country",
    href: plansPathForCountry("spain"),
    keywords: ["spain", "madrid", "barcelona", "seville"],
  },
  {
    id: "france",
    label: "France",
    flag: "🇫🇷",
    type: "country",
    href: plansPathForCountry("france"),
    keywords: ["france", "paris", "lyon", "nice"],
  },
  {
    id: "colombia",
    label: "Colombia",
    flag: "🇨🇴",
    type: "country",
    href: plansPathForCountry("colombia"),
    keywords: ["colombia", "bogota", "medellin", "cartagena", "latam"],
  },
  {
    id: "italy",
    label: "Italy",
    flag: "🇮🇹",
    type: "country",
    href: plansPathForCountry("italy"),
    keywords: ["italy", "rome", "milan", "venice", "florence"],
  },
  {
    id: "saudi-arabia",
    label: "Saudi Arabia",
    flag: "🇸🇦",
    type: "country",
    href: "/hajj-umrah",
    keywords: ["umrah", "hajj", "saudi", "saudi arabia", "mecca", "medina", "jeddah"],
  },
  {
    id: "europe",
    label: "Europe Regional",
    flag: "🌍",
    type: "region",
    href: plansPathForRegion("europe"),
    keywords: ["europe", "eu", "schengen", "uk", "germany", "multi-country"],
  },
  {
    id: "north-america-regional",
    label: "North America Regional",
    flag: "🌎",
    type: "region",
    href: plansPathForRegion("north-america"),
    keywords: ["north america", "usa canada mexico", "cross border"],
  },
  {
    id: "asia-regional",
    label: "Asia Pacific Regional",
    flag: "🌏",
    type: "region",
    href: plansPathForRegion("asia-pacific"),
    keywords: ["asia pacific", "southeast asia", "multi-country asia"],
  },
  {
    id: "latam",
    label: "South America Regional",
    flag: "🌎",
    type: "region",
    href: plansPathForRegion("south-america"),
    keywords: ["latam", "latin america", "south america", "brazil", "argentina"],
  },
  {
    id: "africa-regional",
    label: "Africa Regional",
    flag: "🌍",
    type: "region",
    href: plansPathForRegion("africa"),
    keywords: ["africa", "safari", "south africa", "morocco"],
  },
  {
    id: "global-regional",
    label: "Global Regional",
    flag: "🌐",
    type: "region",
    href: plansPathForRegion("global"),
    keywords: ["global", "worldwide", "world", "multi-region"],
  },
];

export const popularPills = [
  { label: "Umrah", query: "Umrah", destinationId: "saudi-arabia" },
  { label: "Turkey", query: "Turkey", destinationId: "turkey" },
  { label: "Europe", query: "Europe", destinationId: "europe" },
] as const;

export function filterDestinations(query: string): HeroDestination[] {
  const q = query.trim().toLowerCase();
  if (!q) return heroDestinations.slice(0, 6);

  const featured = heroDestinations.filter(
    (dest) =>
      dest.label.toLowerCase().includes(q) ||
      dest.keywords.some(
        (kw) =>
          kw.includes(q) ||
          (q.length >= 3 && q.includes(kw) && kw.length >= 3),
      ),
  );

  const regionalMatches = regionalSearchMatches(query).map((product) => ({
    id: product.routeSlug,
    label: product.displayName,
    flag: product.flag,
    type: "region" as const,
    href: plansPathForRegion(product.routeSlug),
    keywords: [product.routeSlug, product.shortName.toLowerCase()],
  }));

  const featuredIds = new Set(featured.map((dest) => dest.id));
  const regionalFeatured = regionalMatches.filter((dest) => !featuredIds.has(dest.id));

  const combinedFeatured = [...regionalFeatured, ...featured];

  const generated = searchCountryTemplateHints(query)
    .map((hint) => ({
      id: hint.slug,
      label: hint.name,
      flag: getCountryFlag(hint.slug),
      type: "country" as const,
      href: plansPathForCountry(hint.slug),
      keywords: [hint.slug, hint.name.toLowerCase(), ...(hint.aliases ?? [])],
    }))
    .filter((dest) => !combinedFeatured.some((existing) => existing.id === dest.id));

  const combined = [...combinedFeatured, ...generated];
  if (combined.length > 0) return combined.slice(0, 8);

  const fallback = destinationCardFromQuery(query);
  if (!fallback) return [];

  return [
    {
      id: fallback.id,
      label: fallback.title,
      flag: getCountryFlag(fallback.id),
      type: "country",
      href: fallback.href,
      keywords: [fallback.id, fallback.title.toLowerCase()],
    },
  ];
}

export function findDestinationById(id: string): HeroDestination | undefined {
  return heroDestinations.find((d) => d.id === id);
}

export function resolveDestination(query: string): HeroDestination | null {
  const matches = filterDestinations(query);
  return matches[0] ?? null;
}
