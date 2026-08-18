import { normalizeCountrySlug, plansPathForCountry } from "@/lib/country-slugs";
import type { DestinationCard, DestinationRegion } from "@/lib/destinations-catalog";
import { DESTINATION_IMAGES } from "@/lib/site-images";

export type TemplateRegionKey =
  | "north-america"
  | "south-america"
  | "europe"
  | "asia-pacific"
  | "middle-east"
  | "africa";

export type CountryTemplateHint = {
  slug: string;
  name: string;
  templateKey: TemplateRegionKey;
  aliases?: string[];
};

/** Mirrors backend COUNTRY_TEMPLATE_HINTS — any of these can generate plans. */
export const COUNTRY_TEMPLATE_HINTS: CountryTemplateHint[] = [
  { slug: "usa", name: "United States", templateKey: "north-america", aliases: ["us", "united-states"] },
  { slug: "canada", name: "Canada", templateKey: "north-america" },
  { slug: "mexico", name: "Mexico", templateKey: "north-america" },
  { slug: "panama", name: "Panama", templateKey: "north-america" },
  { slug: "costa-rica", name: "Costa Rica", templateKey: "north-america" },
  { slug: "bahamas", name: "Bahamas", templateKey: "north-america" },
  { slug: "jamaica", name: "Jamaica", templateKey: "north-america" },
  { slug: "dominican-republic", name: "Dominican Republic", templateKey: "north-america", aliases: ["dominican"] },
  { slug: "barbados", name: "Barbados", templateKey: "north-america" },
  { slug: "trinidad-and-tobago", name: "Trinidad and Tobago", templateKey: "north-america", aliases: ["trinidad"] },
  { slug: "puerto-rico", name: "Puerto Rico", templateKey: "north-america" },
  { slug: "uk", name: "United Kingdom", templateKey: "europe", aliases: ["united-kingdom", "gb"] },
  { slug: "france", name: "France", templateKey: "europe" },
  { slug: "germany", name: "Germany", templateKey: "europe" },
  { slug: "italy", name: "Italy", templateKey: "europe" },
  { slug: "spain", name: "Spain", templateKey: "europe" },
  { slug: "netherlands", name: "Netherlands", templateKey: "europe" },
  { slug: "switzerland", name: "Switzerland", templateKey: "europe" },
  { slug: "portugal", name: "Portugal", templateKey: "europe" },
  { slug: "austria", name: "Austria", templateKey: "europe" },
  { slug: "belgium", name: "Belgium", templateKey: "europe" },
  { slug: "ireland", name: "Ireland", templateKey: "europe" },
  { slug: "sweden", name: "Sweden", templateKey: "europe" },
  { slug: "norway", name: "Norway", templateKey: "europe" },
  { slug: "denmark", name: "Denmark", templateKey: "europe" },
  { slug: "finland", name: "Finland", templateKey: "europe" },
  { slug: "iceland", name: "Iceland", templateKey: "europe" },
  { slug: "malta", name: "Malta", templateKey: "europe" },
  { slug: "europe", name: "Europe", templateKey: "europe", aliases: ["eu", "schengen"] },
  { slug: "japan", name: "Japan", templateKey: "asia-pacific" },
  { slug: "china", name: "China", templateKey: "asia-pacific" },
  { slug: "india", name: "India", templateKey: "asia-pacific" },
  { slug: "australia", name: "Australia", templateKey: "asia-pacific" },
  { slug: "singapore", name: "Singapore", templateKey: "asia-pacific" },
  { slug: "thailand", name: "Thailand", templateKey: "asia-pacific" },
  { slug: "south-korea", name: "South Korea", templateKey: "asia-pacific", aliases: ["korea"] },
  { slug: "indonesia", name: "Indonesia", templateKey: "asia-pacific" },
  { slug: "malaysia", name: "Malaysia", templateKey: "asia-pacific" },
  { slug: "philippines", name: "Philippines", templateKey: "asia-pacific" },
  { slug: "vietnam", name: "Vietnam", templateKey: "asia-pacific" },
  { slug: "fiji", name: "Fiji", templateKey: "asia-pacific" },
  { slug: "maldives", name: "Maldives", templateKey: "asia-pacific" },
  { slug: "saudi-arabia", name: "Saudi Arabia", templateKey: "middle-east", aliases: ["saudi", "umrah", "hajj"] },
  { slug: "uae", name: "United Arab Emirates", templateKey: "middle-east", aliases: ["united-arab-emirates"] },
  { slug: "qatar", name: "Qatar", templateKey: "middle-east" },
  { slug: "kuwait", name: "Kuwait", templateKey: "middle-east" },
  { slug: "bahrain", name: "Bahrain", templateKey: "middle-east" },
  { slug: "oman", name: "Oman", templateKey: "middle-east" },
  { slug: "turkey", name: "Turkey", templateKey: "middle-east" },
  { slug: "egypt", name: "Egypt", templateKey: "middle-east" },
  { slug: "jordan", name: "Jordan", templateKey: "middle-east" },
  { slug: "lebanon", name: "Lebanon", templateKey: "middle-east" },
  { slug: "brazil", name: "Brazil", templateKey: "south-america" },
  { slug: "argentina", name: "Argentina", templateKey: "south-america" },
  { slug: "chile", name: "Chile", templateKey: "south-america" },
  { slug: "colombia", name: "Colombia", templateKey: "south-america" },
  { slug: "peru", name: "Peru", templateKey: "south-america" },
  { slug: "south-africa", name: "South Africa", templateKey: "africa" },
  { slug: "nigeria", name: "Nigeria", templateKey: "africa" },
  { slug: "morocco", name: "Morocco", templateKey: "africa" },
];

const TEMPLATE_REGION: Record<TemplateRegionKey, DestinationRegion> = {
  "north-america": "Americas",
  "south-america": "Americas",
  europe: "Europe",
  "asia-pacific": "Asia",
  "middle-east": "Middle East",
  africa: "Africa",
};

const TEMPLATE_IMAGE: Record<TemplateRegionKey, string> = {
  "north-america": DESTINATION_IMAGES.usa,
  "south-america": DESTINATION_IMAGES.brazil,
  europe: DESTINATION_IMAGES.europeRegional,
  "asia-pacific": DESTINATION_IMAGES.asiaRegional,
  "middle-east": DESTINATION_IMAGES.middleEastRegional,
  africa: DESTINATION_IMAGES.middleEastRegional,
};

const TEMPLATE_STARTING_PRICE: Record<TemplateRegionKey, string> = {
  "north-america": "From $16.99",
  "south-america": "From $13.99",
  europe: "From $19.99",
  "asia-pacific": "From $14.99",
  "middle-east": "From $17.99",
  africa: "From $12.99",
};

function titleCaseCountry(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function findCountryTemplateHint(query: string): CountryTemplateHint | undefined {
  const slug = normalizeCountrySlug(query);
  const raw = query.trim().toLowerCase();
  if (!slug && !raw) return undefined;

  return COUNTRY_TEMPLATE_HINTS.find((hint) => {
    const names = [hint.slug, hint.name.toLowerCase(), ...(hint.aliases ?? [])];
    return names.some(
      (value) =>
        value === slug ||
        value === raw ||
        value.includes(raw) ||
        raw.includes(value) ||
        hint.name.toLowerCase().includes(raw),
    );
  });
}

export function searchCountryTemplateHints(query: string): CountryTemplateHint[] {
  const raw = query.trim().toLowerCase();
  const slug = normalizeCountrySlug(query);
  if (!raw) return [];

  return COUNTRY_TEMPLATE_HINTS.filter((hint) => {
    const names = [hint.slug, hint.name.toLowerCase(), ...(hint.aliases ?? [])];
    return names.some((value) => {
      if (value === slug || value === raw) return true;
      if (value.startsWith(raw) || value.startsWith(slug)) return true;
      if (raw.length >= 3 && hint.name.toLowerCase().startsWith(raw)) return true;
      return false;
    });
  });
}

export function destinationCardFromHint(hint: CountryTemplateHint): DestinationCard {
  const region = TEMPLATE_REGION[hint.templateKey];
  return {
    id: hint.slug,
    title: hint.name,
    region,
    priceCountryId: hint.slug,
    priceLabel: TEMPLATE_STARTING_PRICE[hint.templateKey],
    className: "bg-dynamic",
    image: TEMPLATE_IMAGE[hint.templateKey],
    description: `Instant eSIM data for ${hint.name}, priced from our regional catalog.`,
    thingsToDo: ["Stay connected on arrival", "Use maps and rideshares", "Share photos without roaming fees"],
    href: plansPathForCountry(hint.slug),
  };
}

/** Any typed country still gets a plans card — backend templates fill the catalog. */
export function destinationCardFromQuery(query: string): DestinationCard | null {
  const slug = normalizeCountrySlug(query);
  if (slug.length < 2) return null;

  const hint = findCountryTemplateHint(query);
  if (hint) return destinationCardFromHint(hint);

  const name = titleCaseCountry(slug);
  return {
    id: slug,
    title: name,
    region: "Europe",
    priceCountryId: slug,
    priceLabel: TEMPLATE_STARTING_PRICE.europe,
    className: "bg-dynamic",
    image: TEMPLATE_IMAGE.europe,
    description: `eSIM plans for ${name}. We’ll generate coverage from our regional catalog.`,
    thingsToDo: ["Stay connected on arrival", "Use maps and rideshares", "Share photos without roaming fees"],
    href: plansPathForCountry(slug),
  };
}
