import { normalizeCountrySlug, plansPathForCountry } from "@/lib/country-slugs";
import { getCountryImageUrl } from "@/lib/country-images";
import type { DestinationCard, DestinationRegion } from "@/lib/destinations-catalog";

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
  { slug: "guatemala", name: "Guatemala", templateKey: "north-america" },
  { slug: "honduras", name: "Honduras", templateKey: "north-america" },
  { slug: "belize", name: "Belize", templateKey: "north-america" },
  { slug: "bahamas", name: "Bahamas", templateKey: "north-america" },
  { slug: "jamaica", name: "Jamaica", templateKey: "north-america" },
  { slug: "dominican-republic", name: "Dominican Republic", templateKey: "north-america", aliases: ["dominican"] },
  { slug: "barbados", name: "Barbados", templateKey: "north-america" },
  { slug: "trinidad-and-tobago", name: "Trinidad and Tobago", templateKey: "north-america", aliases: ["trinidad"] },
  { slug: "puerto-rico", name: "Puerto Rico", templateKey: "north-america" },
  { slug: "cayman-islands", name: "Cayman Islands", templateKey: "north-america", aliases: ["cayman"] },
  { slug: "aruba", name: "Aruba", templateKey: "north-america" },
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
  { slug: "poland", name: "Poland", templateKey: "europe" },
  { slug: "czechia", name: "Czechia", templateKey: "europe", aliases: ["czech-republic", "czech"] },
  { slug: "greece", name: "Greece", templateKey: "europe" },
  { slug: "hungary", name: "Hungary", templateKey: "europe" },
  { slug: "romania", name: "Romania", templateKey: "europe" },
  { slug: "bulgaria", name: "Bulgaria", templateKey: "europe" },
  { slug: "croatia", name: "Croatia", templateKey: "europe" },
  { slug: "ukraine", name: "Ukraine", templateKey: "europe" },
  { slug: "cyprus", name: "Cyprus", templateKey: "europe" },
  { slug: "russia", name: "Russia", templateKey: "europe", aliases: ["rusia", "russian-federation"] },
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
  { slug: "new-zealand", name: "New Zealand", templateKey: "asia-pacific" },
  { slug: "hong-kong", name: "Hong Kong", templateKey: "asia-pacific" },
  { slug: "taiwan", name: "Taiwan", templateKey: "asia-pacific" },
  { slug: "cambodia", name: "Cambodia", templateKey: "asia-pacific" },
  { slug: "bangladesh", name: "Bangladesh", templateKey: "asia-pacific" },
  { slug: "pakistan", name: "Pakistan", templateKey: "asia-pacific" },
  { slug: "sri-lanka", name: "Sri Lanka", templateKey: "asia-pacific", aliases: ["srilanka"] },
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
  { slug: "israel", name: "Israel", templateKey: "middle-east" },
  { slug: "brazil", name: "Brazil", templateKey: "south-america" },
  { slug: "argentina", name: "Argentina", templateKey: "south-america" },
  { slug: "chile", name: "Chile", templateKey: "south-america" },
  { slug: "colombia", name: "Colombia", templateKey: "south-america" },
  { slug: "peru", name: "Peru", templateKey: "south-america" },
  { slug: "uruguay", name: "Uruguay", templateKey: "south-america" },
  { slug: "ecuador", name: "Ecuador", templateKey: "south-america" },
  { slug: "bolivia", name: "Bolivia", templateKey: "south-america" },
  { slug: "paraguay", name: "Paraguay", templateKey: "south-america" },
  { slug: "venezuela", name: "Venezuela", templateKey: "south-america" },
  { slug: "south-africa", name: "South Africa", templateKey: "africa" },
  { slug: "nigeria", name: "Nigeria", templateKey: "africa" },
  { slug: "morocco", name: "Morocco", templateKey: "africa" },
  { slug: "kenya", name: "Kenya", templateKey: "africa" },
  { slug: "ghana", name: "Ghana", templateKey: "africa" },
  { slug: "tanzania", name: "Tanzania", templateKey: "africa" },
  { slug: "uganda", name: "Uganda", templateKey: "africa" },
  { slug: "rwanda", name: "Rwanda", templateKey: "africa" },
  { slug: "senegal", name: "Senegal", templateKey: "africa" },
  { slug: "algeria", name: "Algeria", templateKey: "africa" },
  { slug: "tunisia", name: "Tunisia", templateKey: "africa" },
  { slug: "ethiopia", name: "Ethiopia", templateKey: "africa" },
  { slug: "zambia", name: "Zambia", templateKey: "africa" },
];

const TEMPLATE_REGION: Record<TemplateRegionKey, DestinationRegion> = {
  "north-america": "Americas",
  "south-america": "Americas",
  europe: "Europe",
  "asia-pacific": "Asia",
  "middle-east": "Middle East",
  africa: "Africa",
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

function matchesCountryQuery(
  hint: CountryTemplateHint,
  raw: string,
  slug: string,
): boolean {
  const names = [hint.slug, hint.name.toLowerCase(), ...(hint.aliases ?? [])];

  for (const value of names) {
    if (value === slug || value === raw) return true;

    // Prefix match for longer tokens only (never "us" ⊂ "rus…").
    const canPrefix = raw.length >= 3 && value.length >= 3;
    if (canPrefix && (value.startsWith(raw) || raw.startsWith(value))) return true;
    if (slug.length >= 3 && value.startsWith(slug)) return true;
    if (raw.length >= 3 && hint.name.toLowerCase().startsWith(raw)) return true;
  }
  return false;
}

export function findCountryTemplateHint(query: string): CountryTemplateHint | undefined {
  const slug = normalizeCountrySlug(query);
  const raw = query.trim().toLowerCase();
  if (!slug && !raw) return undefined;

  return COUNTRY_TEMPLATE_HINTS.find((hint) => matchesCountryQuery(hint, raw, slug));
}

export function searchCountryTemplateHints(query: string): CountryTemplateHint[] {
  const raw = query.trim().toLowerCase();
  const slug = normalizeCountrySlug(query);
  if (!raw) return [];

  return COUNTRY_TEMPLATE_HINTS.filter((hint) => matchesCountryQuery(hint, raw, slug));
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
    image: getCountryImageUrl(hint.slug),
    description: `Instant eSIM data for ${hint.name}. Opening this card shows live plans you can buy.`,
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

  // Unknown country: route to /plans/{slug}; backend generates from regional template.
  const name = titleCaseCountry(slug);
  return {
    id: slug,
    title: name,
    region: "Europe",
    priceCountryId: slug,
    priceLabel: TEMPLATE_STARTING_PRICE.europe,
    className: "bg-dynamic",
    image: getCountryImageUrl(slug),
    description: `eSIM plans for ${name}. Live plans are generated from our regional catalog.`,
    thingsToDo: ["Stay connected on arrival", "Use maps and rideshares", "Share photos without roaming fees"],
    href: plansPathForCountry(slug),
  };
}
