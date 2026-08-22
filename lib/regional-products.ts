import { plansPathForCountry } from "@/lib/country-slugs";

export type RegionalRouteSlug =
  | "europe"
  | "north-america"
  | "asia-pacific"
  | "middle-east";

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
};

export const REGIONAL_PRODUCTS: Record<RegionalRouteSlug, RegionalProduct> = {
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
      "Panama",
      "Costa Rica",
      "Bahamas",
    ],
    exclusions: [],
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
      "Fiji",
      "Maldives",
    ],
    exclusions: [],
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
    heroTagline: "Gulf, Turkey, and more — one plan for multi-stop Middle East trips.",
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
      "Lebanon",
    ],
    exclusions: [],
    singleCountrySlug: "turkey",
    faqBorder:
      "No. One regional plan covers every country listed on this page.",
  },
};

const ROUTE_ALIASES: Record<string, RegionalRouteSlug> = {
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
};

export const REGIONAL_ROUTE_SLUGS = Object.keys(
  REGIONAL_PRODUCTS,
) as RegionalRouteSlug[];

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
