import { plansPathForCountry } from "@/lib/country-slugs";

export type RegionalRouteSlug =
  | "caribbean"
  | "europe"
  | "north-america"
  | "asia-pacific"
  | "middle-east"
  | "africa"
  | "south-america"
  | "global";

export type RegionalProduct = {
  routeSlug: RegionalRouteSlug;
  apiCountryId: string;
  displayName: string;
  shortName: string;
  flag: string;
  heroTagline: string;
  countries: readonly string[];
  exclusions: readonly string[];
  singleCountrySlug: string;
  faqBorder: string;
  /** Homepage grid: show first / with spotlight badge */
  featured?: boolean;
};

export const REGIONAL_PRODUCTS: Record<RegionalRouteSlug, RegionalProduct> = {
  caribbean: {
    routeSlug: "caribbean",
    apiCountryId: "regional-caribbean",
    displayName: "Caribbean Regional",
    shortName: "Caribbean",
    flag: "🏝️",
    heroTagline:
      "Island-hop on one eSIM — Bahamas, Jamaica, Dominican Republic and 20+ Caribbean destinations.",
    countries: [
      "Anguilla",
      "Antigua and Barbuda",
      "Aruba",
      "Bahamas",
      "Barbados",
      "British Virgin Islands",
      "Cayman Islands",
      "Curacao",
      "Dominica",
      "Dominican Republic",
      "Grenada",
      "Guadeloupe",
      "Jamaica",
      "Martinique",
      "Montserrat",
      "Puerto Rico",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Maarten",
      "Saint Martin",
      "Saint Vincent and the Grenadines",
      "Turks and Caicos Islands",
      "U.S. Virgin Islands",
    ],
    exclusions: [],
    singleCountrySlug: "jamaica",
    faqBorder:
      "No. One Caribbean plan covers every island listed on this page — install once and hop freely.",
    featured: true,
  },
  europe: {
    routeSlug: "europe",
    apiCountryId: "regional-europe",
    displayName: "Europe Regional",
    shortName: "Europe",
    flag: "🌍",
    heroTagline: "One plan across Europe — install once, cross borders freely.",
    countries: [
      "United Kingdom",
      "France",
      "Germany",
      "Italy",
      "Spain",
      "Netherlands",
      "Switzerland",
      "Portugal",
      "Austria",
      "Belgium",
      "Ireland",
      "Sweden",
      "Norway",
      "Denmark",
      "Finland",
      "Iceland",
      "Malta",
    ],
    exclusions: ["Turkey", "Russia", "Belarus", "Ukraine"],
    singleCountrySlug: "france",
    faqBorder:
      "No. That is the point of a regional plan — same eSIM, same settings when you move between covered countries.",
  },
  "north-america": {
    routeSlug: "north-america",
    apiCountryId: "regional-north-america",
    displayName: "North America Regional",
    shortName: "North America",
    flag: "🌎",
    heroTagline: "USA, Canada & Mexico on one eSIM — no plan swap at the border.",
    countries: [
      "United States",
      "Canada",
      "Mexico",
    ],
    exclusions: ["Panama", "Costa Rica", "Bahamas"],
    singleCountrySlug: "usa",
    faqBorder:
      "No. Keep the same eSIM line for mobile data across the USA, Canada, and Mexico.",
  },
  "asia-pacific": {
    routeSlug: "asia-pacific",
    apiCountryId: "regional-asia-pacific",
    displayName: "Asia Pacific Regional",
    shortName: "Asia Pacific",
    flag: "🌏",
    heroTagline: "Japan to Thailand and beyond — one QR for your whole region.",
    countries: [
      "Japan",
      "China",
      "India",
      "Australia",
      "Singapore",
      "Thailand",
      "South Korea",
      "Indonesia",
      "Malaysia",
      "Philippines",
      "Vietnam",
    ],
    exclusions: ["Fiji", "Maldives"],
    singleCountrySlug: "japan",
    faqBorder:
      "No. Use the same install when you hop between covered countries in Asia Pacific.",
  },
  "middle-east": {
    routeSlug: "middle-east",
    apiCountryId: "regional-middle-east",
    displayName: "Middle East Regional",
    shortName: "Middle East",
    flag: "🕌",
    heroTagline:
      "Saudi, Gulf, Turkey, Egypt and more — one Access MENA pack for multi-stop trips.",
    countries: [
      "Saudi Arabia",
      "United Arab Emirates",
      "Qatar",
      "Kuwait",
      "Bahrain",
      "Oman",
      "Turkey",
      "Egypt",
      "Jordan",
      "Israel",
      "Morocco",
      "Tunisia",
    ],
    exclusions: ["Lebanon"],
    singleCountrySlug: "turkey",
    faqBorder:
      "No. One regional plan covers every country listed on this page (Lebanon not included yet).",
  },
  africa: {
    routeSlug: "africa",
    apiCountryId: "regional-africa",
    displayName: "Africa Regional",
    shortName: "Africa",
    flag: "🌍",
    heroTagline: "Safaris, cities, and coastlines — one plan across African destinations.",
    countries: [
      "South Africa",
      "Nigeria",
      "Morocco",
      "Kenya",
      "Ghana",
      "Egypt",
      "Tanzania",
      "Tunisia",
    ],
    exclusions: [],
    singleCountrySlug: "south-africa",
    faqBorder:
      "No. Use the same eSIM as you travel between covered African destinations.",
  },
  "south-america": {
    routeSlug: "south-america",
    apiCountryId: "regional-south-america",
    displayName: "South America Regional",
    shortName: "South America",
    flag: "🌎",
    heroTagline: "Brazil to the Andes on one eSIM — Latin America regional coverage.",
    countries: [
      "Brazil",
      "Argentina",
      "Chile",
      "Colombia",
      "Peru",
      "Uruguay",
      "Ecuador",
      "Paraguay",
      "Bolivia",
      "Venezuela",
      "Mexico",
      "Panama",
      "Costa Rica",
      "Guatemala",
      "Honduras",
      "El Salvador",
      "Nicaragua",
    ],
    exclusions: [],
    singleCountrySlug: "brazil",
    faqBorder:
      "No. Keep the same eSIM line for mobile data across covered Latin America destinations.",
  },
  global: {
    routeSlug: "global",
    apiCountryId: "regional-global",
    displayName: "Global Regional",
    shortName: "Global",
    flag: "🌐",
    heroTagline: "100+ countries on one plan — for long-haul and multi-region journeys.",
    countries: [
      "United States",
      "Canada",
      "United Kingdom",
      "France",
      "Germany",
      "Italy",
      "Spain",
      "Japan",
      "Australia",
      "Singapore",
      "United Arab Emirates",
      "Turkey",
      "Mexico",
      "Brazil",
      "South Africa",
      "Thailand",
      "Saudi Arabia",
    ],
    exclusions: [],
    singleCountrySlug: "usa",
    faqBorder:
      "No. Your global plan follows you across every covered country on your itinerary.",
  },
};

const ROUTE_ALIASES: Record<string, RegionalRouteSlug> = {
  caribbean: "caribbean",
  carribean: "caribbean",
  "west-indies": "caribbean",
  europe: "europe",
  eu: "europe",
  schengen: "europe",
  "north-america": "north-america",
  "north america": "north-america",
  usa: "north-america",
  "asia-pacific": "asia-pacific",
  asia: "asia-pacific",
  "middle-east": "middle-east",
  "middle east": "middle-east",
  africa: "africa",
  "south-america": "south-america",
  "south america": "south-america",
  latam: "south-america",
  "latin-america": "south-america",
  global: "global",
  worldwide: "global",
  world: "global",
};

/** Display order — Caribbean first (leisure spotlight under the map). */
export const REGIONAL_ROUTE_SLUGS: RegionalRouteSlug[] = [
  "caribbean",
  "europe",
  "middle-east",
  "north-america",
  "asia-pacific",
  "africa",
  "south-america",
  "global",
];

export function normalizeRegionalRouteSlug(input: string): RegionalRouteSlug | null {
  const key = input.trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
  const slug = ROUTE_ALIASES[key.replace(/-regional$/, "")] ?? ROUTE_ALIASES[key];
  if (slug && slug in REGIONAL_PRODUCTS) return slug;
  if (key in REGIONAL_PRODUCTS) return key as RegionalRouteSlug;
  return null;
}

export function getRegionalProduct(routeSlug: string): RegionalProduct | null {
  const normalized = normalizeRegionalRouteSlug(routeSlug);
  return normalized ? REGIONAL_PRODUCTS[normalized] : null;
}

export function plansPathForRegion(routeSlug: string): string {
  const product = getRegionalProduct(routeSlug);
  if (!product) return "/destinations";
  return `/plans/regional/${product.routeSlug}`;
}

export function isRegionalDisplayName(name: string): boolean {
  const lower = name.trim().toLowerCase();
  return Object.values(REGIONAL_PRODUCTS).some(
    (p) => p.displayName.toLowerCase() === lower,
  );
}

export function regionalSearchMatches(query: string): RegionalProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return Object.values(REGIONAL_PRODUCTS).filter((product) => {
    if (product.displayName.toLowerCase().includes(q)) return true;
    if (product.shortName.toLowerCase().includes(q)) return true;
    if (product.routeSlug.includes(q)) return true;
    if (q.includes("europe") && product.routeSlug === "europe") return true;
    if (q.includes("schengen") && product.routeSlug === "europe") return true;
    if (q.includes("asia") && product.routeSlug === "asia-pacific") return true;
    if (q.includes("global") && product.routeSlug === "global") return true;
    if (q.includes("world") && product.routeSlug === "global") return true;
    if (q.includes("africa") && product.routeSlug === "africa") return true;
    if (
      (q.includes("caribbean") ||
        q.includes("bahamas") ||
        q.includes("jamaica") ||
        q.includes("barbados")) &&
      product.routeSlug === "caribbean"
    ) {
      return true;
    }
    if (
      (q.includes("south america") || q.includes("latam")) &&
      product.routeSlug === "south-america"
    ) {
      return true;
    }
    if (
      (q.includes("usa") || q.includes("canada") || q.includes("mexico")) &&
      product.routeSlug === "north-america"
    ) {
      return q.includes(" and ") || q.includes("&") || q.includes("north");
    }
    return false;
  });
}

export function singleCountryPlansPath(product: RegionalProduct): string {
  return plansPathForCountry(product.singleCountrySlug);
}

export const REGIONAL_FAQS = [
  {
    q: "Does one eSIM work in all listed countries?",
    a: "Yes. Install once. When you arrive in any covered country and turn on the eSIM for mobile data, it connects to a local partner network automatically.",
  },
  {
    q: "Do I need a new plan when I cross borders?",
    a: "No — that is why you chose a regional plan.",
  },
  {
    q: "When does my plan start?",
    a: "Usually when the eSIM first connects to mobile data in a covered country — not at checkout. Install on Wi‑Fi before you fly if you like.",
  },
  {
    q: "Can I keep WhatsApp on my main number?",
    a: "Yes. Keep your usual number for WhatsApp and calls; use the eSIM for data.",
  },
  {
    q: "Is hotspot included?",
    a: "Yes — share with a laptop or travel partner at no extra fee.",
  },
] as const;
