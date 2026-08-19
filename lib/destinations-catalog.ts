import { plansPathForCountry } from "@/lib/country-slugs";
import { DESTINATION_IMAGES } from "@/lib/site-images";
import {
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

export const DESTINATION_FILTERS: { id: "all" | DestinationRegion; label: string }[] = [
  { id: "all", label: "Trending" },
  { id: "Europe", label: "Europe" },
  { id: "Asia", label: "Asia" },
  { id: "Americas", label: "Americas" },
  { id: "Middle East", label: "Middle East" },
  { id: "Africa", label: "Africa" },
];

/** Editorial notes for trending destinations. Live “From” prices come from the plans API. */
export const DESTINATION_CARDS: DestinationCard[] = [
  {
    id: "usa",
    title: "United States",
    region: "Americas",
    priceCountryId: "usa",
    priceLabel: "From $4.50",
    className: "bg-usa",
    image: DESTINATION_IMAGES.usa,
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
    image: DESTINATION_IMAGES.canada,
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
    image: DESTINATION_IMAGES.mexico,
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
    image: DESTINATION_IMAGES.brazil,
    description: "Samba rhythms, rainforest edges, and iconic coastal views.",
    thingsToDo: ["Sunset at Sugarloaf", "Walk Copacabana", "Visit Iguaçu Falls"],
    href: plansPathForCountry("brazil"),
  },
  {
    id: "europe",
    title: "Europe (Regional)",
    region: "Europe",
    priceCountryId: "france",
    priceLabel: "From $5.00",
    className: "bg-europe-regional",
    image: DESTINATION_IMAGES.europeRegional,
    description: "Start with France plans, then browse the UK, Germany, and more.",
    thingsToDo: ["Hop capital cities", "Train between borders", "Café culture days"],
    href: plansPathForCountry("france"),
  },
  {
    id: "uk",
    title: "United Kingdom",
    region: "Europe",
    priceCountryId: "united-kingdom",
    priceLabel: "From $5.00",
    className: "bg-uk",
    image: DESTINATION_IMAGES.uk,
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
    image: DESTINATION_IMAGES.france,
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
    image: DESTINATION_IMAGES.germany,
    description: "Castles, design capitals, and efficient city-to-city travel.",
    thingsToDo: ["Berlin street art", "Neuschwanstein day", "Rhine river views"],
    href: plansPathForCountry("germany"),
  },
  {
    id: "asia",
    title: "Asia (Regional)",
    region: "Asia",
    priceCountryId: "japan",
    priceLabel: "From $12.00",
    className: "bg-asia-regional",
    image: DESTINATION_IMAGES.asiaRegional,
    description: "Start with Japan plans, then browse Thailand, China, and more.",
    thingsToDo: ["Temple mornings", "Night markets", "Bullet-train hops"],
    href: plansPathForCountry("japan"),
  },
  {
    id: "japan",
    title: "Japan",
    region: "Asia",
    priceCountryId: "japan",
    priceLabel: "From $6.00",
    className: "bg-japan",
    image: DESTINATION_IMAGES.japan,
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
    image: DESTINATION_IMAGES.thailand,
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
    image: DESTINATION_IMAGES.china,
    description: "Ancient walls, futuristic skylines, and endless city energy.",
    thingsToDo: ["Walk the Great Wall", "Shanghai Bund", "Tea house stop"],
    href: plansPathForCountry("china"),
  },
  {
    id: "middle-east",
    title: "Middle East (Regional)",
    region: "Middle East",
    priceCountryId: "turkey",
    priceLabel: "From $15.00",
    className: "bg-middle-east-regional",
    image: DESTINATION_IMAGES.middleEastRegional,
    description: "Start with Turkey plans, then browse UAE, Saudi Arabia, and more.",
    thingsToDo: ["Desert evenings", "Old-city souks", "Gulf skyline nights"],
    href: plansPathForCountry("turkey"),
  },
  {
    id: "turkey",
    title: "Turkey",
    region: "Middle East",
    priceCountryId: "turkey",
    priceLabel: "From $4.50",
    className: "bg-turkey",
    image: DESTINATION_IMAGES.turkey,
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
    image: DESTINATION_IMAGES.saudiArabia,
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
    image: DESTINATION_IMAGES.uae,
    description: "Desert dunes, marina nights, and world-famous landmarks.",
    thingsToDo: ["Burj Khalifa view", "Desert safari", "Abu Dhabi mosques"],
    href: plansPathForCountry("uae"),
  },
];

export function filterDestinationCards(
  query: string,
  region: "all" | DestinationRegion,
): DestinationCard[] {
  const q = query.trim().toLowerCase();

  const featured = DESTINATION_CARDS.filter((card) => {
    const regionMatch = region === "all" || card.region === region;
    const queryMatch =
      !q ||
      card.title.toLowerCase().includes(q) ||
      card.id.toLowerCase().includes(q) ||
      card.region.toLowerCase().includes(q) ||
      card.description.toLowerCase().includes(q) ||
      card.thingsToDo.some((tip) => tip.toLowerCase().includes(q));
    return regionMatch && queryMatch;
  });

  if (!q) return featured;

  const generated = searchCountryTemplateHints(query)
    .map(destinationCardFromHint)
    .filter((card) => region === "all" || card.region === region)
    .filter((card) => !featured.some((existing) => existing.id === card.id));

  const combined = [...featured, ...generated];
  if (combined.length > 0) return combined;

  const fallback = destinationCardFromQuery(query);
  if (fallback && (region === "all" || fallback.region === region)) {
    return [fallback];
  }

  return [];
}
