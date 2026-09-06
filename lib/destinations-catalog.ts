import { plansPathForCountry } from "@/lib/country-slugs";
import { getCountryImage, getCountryImageUrl } from "@/lib/country-images";
import { plansPathForRegion } from "@/lib/regional-products";
import {
  COUNTRY_TEMPLATE_HINTS,
  destinationCardFromHint,
  destinationCardFromQuery,
  searchCountryTemplateHints,
} from "@/lib/country-templates";

export type DestinationRegion =
  | "Americas"
  | "Europe"
  | "Asia"
  | "Middle East"
  | "Africa";

/** Homepage-aligned region filters on Destinations (plus Trending). */
export type DestinationFilterId =
  | "all"
  | "caribbean"
  | "europe"
  | "middle-east"
  | "north-america"
  | "asia-pacific"
  | "africa"
  | "south-america"
  | "global";

export type DestinationCard = {
  id: string;
  title: string;
  region: DestinationRegion;
  /** Country slug used when the traveler continues to plans/checkout. */
  priceCountryId: string;
  /**
   * Editorial starting price only — Destinations shows live cheapest plan
   * prices from the plans API so visitors are not shown a cheaper teaser.
   */
  priceLabel: string;
  className: string;
  image: string;
  description: string;
  thingsToDo: string[];
  href: string;
};

/** Same 8 regions as homepage regional plans — each shows 8 countries. */
export const DESTINATION_FILTERS: { id: DestinationFilterId; label: string }[] = [
  { id: "all", label: "Trending" },
  { id: "caribbean", label: "Caribbean" },
  { id: "europe", label: "Europe" },
  { id: "middle-east", label: "Middle East" },
  { id: "north-america", label: "North America" },
  { id: "asia-pacific", label: "Asia Pacific" },
  { id: "africa", label: "Africa" },
  { id: "south-america", label: "South America" },
  { id: "global", label: "Global" },
];

/** Exactly 8 countries per region filter (countries only — never regional packs). */
export const REGION_FILTER_COUNTRY_IDS: Record<
  Exclude<DestinationFilterId, "all">,
  readonly string[]
> = {
  caribbean: [
    "jamaica",
    "bahamas",
    "dominican-republic",
    "barbados",
    "trinidad-and-tobago",
    "puerto-rico",
    "cayman-islands",
    "aruba",
  ],
  europe: [
    "uk",
    "france",
    "italy",
    "spain",
    "germany",
    "portugal",
    "greece",
    "netherlands",
  ],
  "middle-east": [
    "saudi-arabia",
    "uae",
    "turkey",
    "egypt",
    "qatar",
    "jordan",
    "oman",
    "bahrain",
  ],
  "north-america": [
    "usa",
    "canada",
    "mexico",
    "costa-rica",
    "panama",
    "guatemala",
    "honduras",
    "belize",
  ],
  "asia-pacific": [
    "japan",
    "thailand",
    "australia",
    "singapore",
    "indonesia",
    "south-korea",
    "vietnam",
    "india",
  ],
  africa: [
    "morocco",
    "south-africa",
    "kenya",
    "nigeria",
    "ghana",
    "tanzania",
    "egypt",
    "senegal",
  ],
  "south-america": [
    "brazil",
    "argentina",
    "colombia",
    "peru",
    "chile",
    "ecuador",
    "uruguay",
    "bolivia",
  ],
  global: [
    "usa",
    "uk",
    "turkey",
    "uae",
    "japan",
    "france",
    "brazil",
    "jamaica",
  ],
};

/** Editorial notes for trending destinations. Live “From” prices come from the plans API. */
export const DESTINATION_CARDS: DestinationCard[] = [
  {
    id: "usa",
    title: "United States",
    region: "Americas",
    priceCountryId: "usa",
    priceLabel: "From $4.50",
    className: "bg-usa",
    image: getCountryImageUrl("usa"),
    description: "Coast-to-coast cities, national parks, and always-on travel days.",
    thingsToDo: ["Walk the NYC skyline", "Road-trip national parks", "Catch a live game"],
    href: plansPathForCountry("usa"),
  },
  {
    id: "canada",
    title: "Canada",
    region: "Americas",
    priceCountryId: "canada",
    priceLabel: "From $6.00",
    className: "bg-canada",
    image: getCountryImageUrl("canada"),
    description: "Mountain towns, lake country, and vibrant bilingual cities.",
    thingsToDo: ["Explore Banff trails", "Wander Old Québec", "See Niagara Falls"],
    href: plansPathForCountry("canada"),
  },
  {
    id: "mexico",
    title: "Mexico",
    region: "Americas",
    priceCountryId: "mexico",
    priceLabel: "From $6.00",
    className: "bg-mexico",
    image: getCountryImageUrl("mexico"),
    description: "Beaches, street food, and colonial centers packed with color.",
    thingsToDo: ["Swim cenotes in Yucatán", "Tacos in CDMX", "Explore Tulum ruins"],
    href: plansPathForCountry("mexico"),
  },
  {
    id: "brazil",
    title: "Brazil",
    region: "Americas",
    priceCountryId: "brazil",
    priceLabel: "From $8.00",
    className: "bg-brazil",
    image: getCountryImageUrl("brazil"),
    description: "Samba rhythms, rainforest edges, and iconic coastal views.",
    thingsToDo: ["Sunset at Sugarloaf", "Walk Copacabana", "Visit Iguaçu Falls"],
    href: plansPathForCountry("brazil"),
  },
  {
    id: "jamaica",
    title: "Jamaica",
    region: "Americas",
    priceCountryId: "jamaica",
    priceLabel: "From $6.00",
    className: "bg-brazil",
    image: getCountryImageUrl("jamaica"),
    description: "Turquoise water, reggae nights, and easy island mornings.",
    thingsToDo: ["Beach day in Negril", "Waterfall swim in the hills", "Jerk lunch by the coast"],
    href: plansPathForCountry("jamaica"),
  },
  {
    id: "argentina",
    title: "Argentina",
    region: "Americas",
    priceCountryId: "argentina",
    priceLabel: "From $7.00",
    className: "bg-brazil",
    image: getCountryImageUrl("argentina"),
    description: "Steakhouse nights, wide avenues, and dramatic southern landscapes.",
    thingsToDo: ["Walk Buenos Aires barrios", "Café afternoon", "Day trip for wine country"],
    href: plansPathForCountry("argentina"),
  },
  {
    id: "colombia",
    title: "Colombia",
    region: "Americas",
    priceCountryId: "colombia",
    priceLabel: "From $6.00",
    className: "bg-brazil",
    image: getCountryImageUrl("colombia"),
    description: "Mountain cities, Caribbean edges, and warm street life.",
    thingsToDo: ["Old-city walk in Cartagena", "Coffee tasting day", "Evening in a plaza"],
    href: plansPathForCountry("colombia"),
  },
  {
    id: "chile",
    title: "Chile",
    region: "Americas",
    priceCountryId: "chile",
    priceLabel: "From $7.00",
    className: "bg-brazil",
    image: getCountryImageUrl("chile"),
    description: "Pacific coastlines, Andean views, and long scenic drives.",
    thingsToDo: ["Santiago city walk", "Coastal day trip", "Valley wine tasting"],
    href: plansPathForCountry("chile"),
  },
  {
    id: "north-america-regional",
    title: "North America",
    region: "Americas",
    priceCountryId: "regional-north-america",
    priceLabel: "From $16.99",
    className: "bg-usa",
    image: getCountryImageUrl("usa"),
    description: "USA, Canada, and Mexico on one eSIM — ideal for cross-border trips.",
    thingsToDo: ["Road-trip the west", "NYC to Toronto", "Mexico City layovers"],
    href: plansPathForRegion("north-america"),
  },
  {
    id: "europe",
    title: "Europe",
    region: "Europe",
    priceCountryId: "regional-europe",
    priceLabel: "From $19.99",
    className: "bg-europe-regional",
    image: getCountryImageUrl("europe"),
    description: "One eSIM for France, Germany, Italy, Spain, and more.",
    thingsToDo: ["Hop capital cities", "Train between borders", "Café culture days"],
    href: plansPathForRegion("europe"),
  },
  {
    id: "uk",
    title: "United Kingdom",
    region: "Europe",
    priceCountryId: "united-kingdom",
    priceLabel: "From $5.00",
    className: "bg-uk",
    image: getCountryImageUrl("uk"),
    description: "Historic streets, countryside escapes, and world-class museums.",
    thingsToDo: ["Ride the Tube", "Day-trip to Bath", "Walk the Highlands"],
    href: plansPathForCountry("united-kingdom"),
  },
  {
    id: "france",
    title: "France",
    region: "Europe",
    priceCountryId: "france",
    priceLabel: "From $4.50",
    className: "bg-france",
    image: getCountryImageUrl("france"),
    description: "Parisian nights, Riviera light, and countryside weekends.",
    thingsToDo: ["Louvre morning", "Seine evening walk", "Day in Provence"],
    href: plansPathForCountry("france"),
  },
  {
    id: "germany",
    title: "Germany",
    region: "Europe",
    priceCountryId: "germany",
    priceLabel: "From $4.50",
    className: "bg-germany",
    image: getCountryImageUrl("germany"),
    description: "Castles, design capitals, and efficient city-to-city travel.",
    thingsToDo: ["Berlin street art", "Neuschwanstein day", "Rhine river views"],
    href: plansPathForCountry("germany"),
  },
  {
    id: "italy",
    title: "Italy",
    region: "Europe",
    priceCountryId: "italy",
    priceLabel: "From $4.50",
    className: "bg-france",
    image: getCountryImageUrl("italy"),
    description: "Roman streets, coastal light, and unhurried café evenings.",
    thingsToDo: ["Walk Rome’s Centro", "Gelato after a piazza evening", "Day trip to the coast"],
    href: plansPathForCountry("italy"),
  },
  {
    id: "spain",
    title: "Spain",
    region: "Europe",
    priceCountryId: "spain",
    priceLabel: "From $4.50",
    className: "bg-france",
    image: getCountryImageUrl("spain"),
    description: "Tapas nights, Mediterranean mornings, and lively city plazas.",
    thingsToDo: ["Tapas in a local barrio", "Beach morning on the Med", "Evening plaza walk"],
    href: plansPathForCountry("spain"),
  },
  {
    id: "portugal",
    title: "Portugal",
    region: "Europe",
    priceCountryId: "portugal",
    priceLabel: "From $4.50",
    className: "bg-france",
    image: getCountryImageUrl("portugal"),
    description: "Atlantic light, tiled streets, and easy train days between cities.",
    thingsToDo: ["Tram ride in Lisbon", "Day trip to Sintra", "Sunset in Porto"],
    href: plansPathForCountry("portugal"),
  },
  {
    id: "netherlands",
    title: "Netherlands",
    region: "Europe",
    priceCountryId: "netherlands",
    priceLabel: "From $4.50",
    className: "bg-germany",
    image: getCountryImageUrl("netherlands"),
    description: "Canals, bike paths, and compact cities built for wandering.",
    thingsToDo: ["Canal walk in Amsterdam", "Day trip to Haarlem", "Museumplein afternoon"],
    href: plansPathForCountry("netherlands"),
  },
  {
    id: "ireland",
    title: "Ireland",
    region: "Europe",
    priceCountryId: "ireland",
    priceLabel: "From $4.50",
    className: "bg-uk",
    image: getCountryImageUrl("ireland"),
    description: "Green cliffs, friendly cities, and coastal road days.",
    thingsToDo: ["Walk Dublin’s streets", "Day on the coast", "Evening traditional music"],
    href: plansPathForCountry("ireland"),
  },
  {
    id: "asia",
    title: "Asia Pacific",
    region: "Asia",
    priceCountryId: "regional-asia-pacific",
    priceLabel: "From $14.99",
    className: "bg-asia-regional",
    image: getCountryImageUrl("asia"),
    description: "Japan, Thailand, Singapore, and more on one plan.",
    thingsToDo: ["Temple mornings", "Night markets", "Bullet-train hops"],
    href: plansPathForRegion("asia-pacific"),
  },
  {
    id: "japan",
    title: "Japan",
    region: "Asia",
    priceCountryId: "japan",
    priceLabel: "From $6.00",
    className: "bg-japan",
    image: getCountryImageUrl("japan"),
    description: "Neon cities, quiet shrines, and seamless transit everywhere.",
    thingsToDo: ["Shibuya crossing", "Kyoto temples", "Onsen evening"],
    href: plansPathForCountry("japan"),
  },
  {
    id: "thailand",
    title: "Thailand",
    region: "Asia",
    priceCountryId: "thailand",
    priceLabel: "From $6.00",
    className: "bg-thailand",
    image: getCountryImageUrl("thailand"),
    description: "Golden temples, island ferries, and legendary street eats.",
    thingsToDo: ["Bangkok night market", "Island hop Phuket", "Visit Chiang Mai"],
    href: plansPathForCountry("thailand"),
  },
  {
    id: "china",
    title: "China",
    region: "Asia",
    priceCountryId: "china",
    priceLabel: "From $7.00",
    className: "bg-china",
    image: getCountryImageUrl("china"),
    description: "Ancient walls, futuristic skylines, and endless city energy.",
    thingsToDo: ["Walk the Great Wall", "Shanghai Bund", "Tea house stop"],
    href: plansPathForCountry("china"),
  },
  {
    id: "india",
    title: "India",
    region: "Asia",
    priceCountryId: "india",
    priceLabel: "From $6.00",
    className: "bg-asia-regional",
    image: getCountryImageUrl("india"),
    description: "Color, spice, and cities that reward slow wandering.",
    thingsToDo: ["Sunrise at a heritage site", "Street-food evening", "Train day between cities"],
    href: plansPathForCountry("india"),
  },
  {
    id: "australia",
    title: "Australia",
    region: "Asia",
    priceCountryId: "australia",
    priceLabel: "From $7.00",
    className: "bg-asia-regional",
    image: getCountryImageUrl("australia"),
    description: "Harbor cities, coastal walks, and wide-open road trips.",
    thingsToDo: ["Harbor ferry ride", "Coastal walk", "Café morning in the city"],
    href: plansPathForCountry("australia"),
  },
  {
    id: "singapore",
    title: "Singapore",
    region: "Asia",
    priceCountryId: "singapore",
    priceLabel: "From $5.00",
    className: "bg-asia-regional",
    image: getCountryImageUrl("singapore"),
    description: "Garden city nights, hawker flavors, and easy transit.",
    thingsToDo: ["Hawker centre dinner", "Gardens by the Bay", "Neighborhood walk"],
    href: plansPathForCountry("singapore"),
  },
  {
    id: "indonesia",
    title: "Indonesia",
    region: "Asia",
    priceCountryId: "indonesia",
    priceLabel: "From $6.00",
    className: "bg-thailand",
    image: getCountryImageUrl("indonesia"),
    description: "Island mornings, temple visits, and warm evening markets.",
    thingsToDo: ["Temple sunrise", "Beach afternoon", "Local warung dinner"],
    href: plansPathForCountry("indonesia"),
  },
  {
    id: "south-korea",
    title: "South Korea",
    region: "Asia",
    priceCountryId: "south-korea",
    priceLabel: "From $6.00",
    className: "bg-japan",
    image: getCountryImageUrl("south-korea"),
    description: "Seoul nights, palace grounds, and fast city-to-city travel.",
    thingsToDo: ["Palace morning", "Night market snacks", "Day trip by KTX"],
    href: plansPathForCountry("south-korea"),
  },
  {
    id: "middle-east",
    title: "Middle East",
    region: "Middle East",
    priceCountryId: "regional-middle-east",
    priceLabel: "From $17.99",
    className: "bg-middle-east-regional",
    image: getCountryImageUrl("middle-east"),
    description: "UAE, Turkey, Saudi Arabia, and more on one regional plan.",
    thingsToDo: ["Desert evenings", "Old-city souks", "Gulf skyline nights"],
    href: plansPathForRegion("middle-east"),
  },
  {
    id: "caribbean",
    title: "Caribbean",
    region: "Americas",
    priceCountryId: "regional-caribbean",
    priceLabel: "From $14.99",
    className: "bg-caribbean-regional",
    image: getCountryImageUrl("caribbean"),
    description: "Bahamas, Jamaica, Dominican Republic and 20+ islands on one eSIM.",
    thingsToDo: ["Island hopping", "Beach resorts", "Cruise stopovers"],
    href: plansPathForRegion("caribbean"),
  },
  {
    id: "turkey",
    title: "Turkey",
    region: "Middle East",
    priceCountryId: "turkey",
    priceLabel: "From $4.50",
    className: "bg-turkey",
    image: getCountryImageUrl("turkey"),
    description: "Where continents meet — bazaars, coastlines, and hot-air dawns.",
    thingsToDo: ["Grand Bazaar", "Bosphorus cruise", "Cappadocia balloons"],
    href: plansPathForCountry("turkey"),
  },
  {
    id: "saudi-arabia",
    title: "Saudi Arabia",
    region: "Middle East",
    priceCountryId: "saudi-arabia",
    priceLabel: "From $7.00",
    className: "bg-saudi-arabia",
    image: getCountryImageUrl("saudi-arabia"),
    description: "Sacred journeys in Makkah and Madinah, plus modern Riyadh.",
    thingsToDo: ["Umrah & Hajj travel", "Visit AlUla", "Diriyah heritage"],
    href: plansPathForCountry("saudi-arabia"),
  },
  {
    id: "uae",
    title: "UAE",
    region: "Middle East",
    priceCountryId: "uae",
    priceLabel: "From $7.50",
    className: "bg-uae",
    image: getCountryImageUrl("uae"),
    description: "Desert dunes, marina nights, and world-famous landmarks.",
    thingsToDo: ["Burj Khalifa view", "Desert safari", "Abu Dhabi mosques"],
    href: plansPathForCountry("uae"),
  },
  {
    id: "egypt",
    title: "Egypt",
    region: "Middle East",
    priceCountryId: "egypt",
    priceLabel: "From $5.00",
    className: "bg-middle-east-regional",
    image: getCountryImageUrl("egypt"),
    description: "Nile cities, ancient sites, and warm evening streets.",
    thingsToDo: ["Nile evening walk", "Museum morning", "Old Cairo exploration"],
    href: plansPathForCountry("egypt"),
  },
  {
    id: "qatar",
    title: "Qatar",
    region: "Middle East",
    priceCountryId: "qatar",
    priceLabel: "From $7.00",
    className: "bg-uae",
    image: getCountryImageUrl("qatar"),
    description: "Modern waterfronts, museum days, and easy city hops.",
    thingsToDo: ["Corniche walk", "Museum of Islamic Art", "Souq evening"],
    href: plansPathForCountry("qatar"),
  },
  {
    id: "jordan",
    title: "Jordan",
    region: "Middle East",
    priceCountryId: "jordan",
    priceLabel: "From $6.00",
    className: "bg-middle-east-regional",
    image: getCountryImageUrl("jordan"),
    description: "Petra dawns, desert silence, and welcoming city cafés.",
    thingsToDo: ["Petra morning", "Amman café stop", "Wadi Rum evening"],
    href: plansPathForCountry("jordan"),
  },
  {
    id: "kuwait",
    title: "Kuwait",
    region: "Middle East",
    priceCountryId: "kuwait",
    priceLabel: "From $7.00",
    className: "bg-uae",
    image: getCountryImageUrl("kuwait"),
    description: "Gulf skyline views, coastal walks, and modern city days.",
    thingsToDo: ["Waterfront stroll", "Museum afternoon", "Evening skyline view"],
    href: plansPathForCountry("kuwait"),
  },
  {
    id: "bahrain",
    title: "Bahrain",
    region: "Middle East",
    priceCountryId: "bahrain",
    priceLabel: "From $7.00",
    className: "bg-uae",
    image: getCountryImageUrl("bahrain"),
    description: "Island capital energy, souq lanes, and easy weekend pacing.",
    thingsToDo: ["Souq wander", "Fort visit", "Waterfront evening"],
    href: plansPathForCountry("bahrain"),
  },
  {
    id: "morocco",
    title: "Morocco",
    region: "Africa",
    priceCountryId: "morocco",
    priceLabel: "From $5.00",
    className: "bg-middle-east-regional",
    image: getCountryImageUrl("morocco"),
    description: "Medina lanes, rooftop tea, and Atlas light at the edges.",
    thingsToDo: ["Medina morning walk", "Rooftop tea", "Day trip to the coast"],
    href: plansPathForCountry("morocco"),
  },
  {
    id: "south-africa",
    title: "South Africa",
    region: "Africa",
    priceCountryId: "south-africa",
    priceLabel: "From $6.00",
    className: "bg-brazil",
    image: getCountryImageUrl("south-africa"),
    description: "Cape light, mountain edges, and vibrant city neighborhoods.",
    thingsToDo: ["Table Mountain views", "Waterfront walk", "Wine valley day"],
    href: plansPathForCountry("south-africa"),
  },
  {
    id: "nigeria",
    title: "Nigeria",
    region: "Africa",
    priceCountryId: "nigeria",
    priceLabel: "From $6.00",
    className: "bg-brazil",
    image: getCountryImageUrl("nigeria"),
    description: "Lagos energy, coastal air, and lively creative districts.",
    thingsToDo: ["City neighborhood walk", "Local food evening", "Waterfront afternoon"],
    href: plansPathForCountry("nigeria"),
  },
  {
    id: "africa-regional",
    title: "Africa",
    region: "Africa",
    priceCountryId: "regional-africa",
    priceLabel: "From $12.99",
    className: "bg-middle-east-regional",
    image: getCountryImageUrl("africa"),
    description: "South Africa, Morocco, Kenya, and more on one regional plan.",
    thingsToDo: ["Cape Town coast", "Marrakech medina", "Safari drives"],
    href: plansPathForRegion("africa"),
  },
  {
    id: "south-america-regional",
    title: "South America",
    region: "Americas",
    priceCountryId: "regional-south-america",
    priceLabel: "From $12.99",
    className: "bg-brazil",
    image: getCountryImageUrl("brazil"),
    description: "Brazil, Argentina, Chile, and more — one eSIM for the whole region.",
    thingsToDo: ["Rio viewpoints", "Patagonia trails", "Andean cities"],
    href: plansPathForRegion("south-america"),
  },
  {
    id: "global-regional",
    title: "Global",
    region: "Europe",
    priceCountryId: "regional-global",
    priceLabel: "From $29.99",
    className: "bg-europe-regional",
    image: getCountryImageUrl("europe"),
    description: "One plan for long trips spanning Europe, Americas, Asia, and more.",
    thingsToDo: ["Multi-region business", "Round-the-world legs", "Frequent flyer hops"],
    href: plansPathForRegion("global"),
  },
];

export function isSingleCountryDestination(card: DestinationCard): boolean {
  return !card.priceCountryId.startsWith("regional-");
}

function resolveDestinationCardById(
  id: string,
  options?: { allowPlaceholder?: boolean },
): DestinationCard | null {
  const curated = DESTINATION_CARDS.find(
    (card) => card.id === id && isSingleCountryDestination(card),
  );
  if (curated) return curated;

  const hint = COUNTRY_TEMPLATE_HINTS.find((item) => item.slug === id);
  if (!hint || hint.slug === "europe") return null;
  if (!options?.allowPlaceholder && getCountryImage(hint.slug).isPlaceholder) {
    return null;
  }
  return destinationCardFromHint(hint);
}

/** Eight countries for a homepage-aligned region filter. */
export function countryCardsForFilter(
  filterId: Exclude<DestinationFilterId, "all">,
): DestinationCard[] {
  const ids = REGION_FILTER_COUNTRY_IDS[filterId] ?? [];
  const cards: DestinationCard[] = [];
  const seen = new Set<string>();

  for (const id of ids) {
    if (seen.has(id)) continue;
    // Curated filter lists always show (placeholder photo OK until we add art).
    const card = resolveDestinationCardById(id, { allowPlaceholder: true });
    if (!card) continue;
    seen.add(card.id);
    cards.push(card);
    if (cards.length >= 8) break;
  }

  return cards;
}

/** @deprecated Prefer countryCardsForFilter — kept for broad Americas/Europe helpers. */
export function countryCardsForRegion(
  region: DestinationRegion,
): DestinationCard[] {
  const filterMap: Partial<Record<DestinationRegion, DestinationFilterId>> = {
    Europe: "europe",
    Asia: "asia-pacific",
    Americas: "north-america",
    "Middle East": "middle-east",
    Africa: "africa",
  };
  const filterId = filterMap[region];
  if (!filterId || filterId === "all") return [];
  return countryCardsForFilter(filterId);
}

export function filterDestinationCards(
  query: string,
  filter: DestinationFilterId,
): DestinationCard[] {
  const q = query.trim().toLowerCase();

  if (filter !== "all" && !q) {
    return countryCardsForFilter(filter);
  }

  const featured = DESTINATION_CARDS.filter((card) => {
    if (!isSingleCountryDestination(card)) return false;
    const queryMatch =
      !q ||
      card.title.toLowerCase().includes(q) ||
      card.id.toLowerCase().includes(q) ||
      card.region.toLowerCase().includes(q) ||
      card.description.toLowerCase().includes(q) ||
      card.thingsToDo.some((tip) => tip.toLowerCase().includes(q));
    return queryMatch;
  });

  if (!q) return featured;

  const generated = searchCountryTemplateHints(query)
    .map(destinationCardFromHint)
    .filter((card) => isSingleCountryDestination(card))
    .filter((card) => !featured.some((existing) => existing.id === card.id));

  const combined = [...featured, ...generated];
  if (combined.length > 0) return combined;

  const fallback = destinationCardFromQuery(query);
  if (fallback && isSingleCountryDestination(fallback)) {
    return [fallback];
  }

  return [];
}

export function parseDestinationFilter(value?: string): DestinationFilterId {
  if (!value) return "all";
  const raw = value.trim().toLowerCase();
  const aliases: Record<string, DestinationFilterId> = {
    all: "all",
    trending: "all",
    europe: "europe",
    asia: "asia-pacific",
    "asia-pacific": "asia-pacific",
    americas: "north-america",
    "north-america": "north-america",
    "north america": "north-america",
    "south-america": "south-america",
    "south america": "south-america",
    caribbean: "caribbean",
    "middle-east": "middle-east",
    "middle east": "middle-east",
    africa: "africa",
    global: "global",
  };
  return aliases[raw] ?? "all";
}
