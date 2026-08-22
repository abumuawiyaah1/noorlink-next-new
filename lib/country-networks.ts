import { normalizeCountrySlug } from "@/lib/country-slugs";
import {
  COUNTRY_TEMPLATE_HINTS,
  findCountryTemplateHint,
  type TemplateRegionKey,
} from "@/lib/country-templates";

const SLUG_ALIASES: Record<string, string> = {
  us: "usa",
  "united-states": "usa",
  gb: "uk",
  "united-kingdom": "uk",
  "united-arab-emirates": "uae",
  korea: "south-korea",
  rusia: "russia",
  "russian-federation": "russia",
};

/** Primary partner networks shown on the plans page (aligned with our catalog). */
const COUNTRY_NETWORKS: Record<string, readonly string[]> = {
  usa: ["T-Mobile", "AT&T", "Verizon"],
  canada: ["Rogers", "Bell", "Telus"],
  mexico: ["Telcel", "AT&T Mexico", "Movistar"],
  panama: ["+Móvil", "Claro", "Digicel"],
  "costa-rica": ["Kölbi", "Claro", "Movistar"],
  bahamas: ["BTC", "Aliv"],
  jamaica: ["Digicel", "Flow"],
  "dominican-republic": ["Claro", "Altice"],
  barbados: ["Flow", "Digicel"],
  "trinidad-and-tobago": ["bmobile", "Digicel"],
  "puerto-rico": ["T-Mobile", "AT&T", "Claro"],
  uk: ["EE", "Vodafone", "O2"],
  france: ["Orange", "SFR", "Bouygues"],
  germany: ["Deutsche Telekom", "Vodafone", "O2"],
  italy: ["TIM", "Vodafone", "Wind Tre"],
  spain: ["Movistar", "Vodafone", "Orange"],
  netherlands: ["KPN", "Vodafone", "Odido"],
  switzerland: ["Swisscom", "Sunrise", "Salt"],
  portugal: ["MEO", "Vodafone", "NOS"],
  austria: ["A1", "Magenta", "Drei"],
  belgium: ["Proximus", "Orange", "Base"],
  ireland: ["Vodafone", "Three", "Eir"],
  sweden: ["Telia", "Tele2", "Tre"],
  norway: ["Telenor", "Telia", "Ice"],
  denmark: ["TDC", "Telia", "3"],
  finland: ["Elisa", "Telia", "DNA"],
  iceland: ["Síminn", "Vodafone", "Nova"],
  malta: ["GO", "Melita", "Epic"],
  russia: ["MTS", "Beeline", "MegaFon"],
  europe: ["Vodafone", "Orange", "Deutsche Telekom"],
  japan: ["SoftBank", "NTT Docomo", "KDDI"],
  china: ["China Mobile", "China Unicom", "China Telecom"],
  india: ["Jio", "Airtel", "Vi"],
  australia: ["Telstra", "Optus", "Vodafone"],
  singapore: ["Singtel", "StarHub", "M1"],
  thailand: ["AIS", "TrueMove H", "DTAC"],
  "south-korea": ["SK Telecom", "KT", "LG U+"],
  indonesia: ["Telkomsel", "XL Axiata", "Indosat"],
  malaysia: ["Maxis", "CelcomDigi", "U Mobile"],
  philippines: ["Globe", "Smart", "DITO"],
  vietnam: ["Viettel", "Vinaphone", "Mobifone"],
  fiji: ["Vodafone Fiji", "Digicel"],
  maldives: ["Dhiraagu", "Ooredoo"],
  "saudi-arabia": ["stc", "Mobily", "Zain"],
  uae: ["Etisalat", "du"],
  qatar: ["Ooredoo", "Vodafone"],
  kuwait: ["Zain", "Ooredoo", "stc"],
  bahrain: ["Batelco", "Zain", "stc"],
  oman: ["Omantel", "Ooredoo", "Vodafone"],
  turkey: ["Turkcell", "Vodafone", "Türk Telekom"],
  egypt: ["Vodafone", "Orange", "Etisalat"],
  jordan: ["Zain", "Orange", "Umniah"],
  lebanon: ["Alfa", "touch"],
  brazil: ["Claro", "Vivo", "TIM"],
  argentina: ["Claro", "Movistar", "Personal"],
  chile: ["Entel", "Movistar", "Claro"],
  colombia: ["Claro", "Movistar", "Tigo"],
  peru: ["Movistar", "Claro", "Entel"],
  "south-africa": ["Vodacom", "MTN", "Cell C"],
  nigeria: ["MTN", "Airtel", "Glo"],
  morocco: ["Maroc Telecom", "Orange", "Inwi"],
};

const REGIONAL_NETWORKS: Record<TemplateRegionKey, readonly string[]> = {
  "north-america": ["T-Mobile", "AT&T", "Rogers"],
  "south-america": ["Claro", "Movistar", "Entel"],
  europe: ["Vodafone", "Orange", "Deutsche Telekom"],
  "asia-pacific": ["Singtel", "AIS", "China Mobile"],
  "middle-east": ["Etisalat", "stc", "Ooredoo"],
  africa: ["MTN", "Orange", "Vodacom"],
};

function resolveNetworkSlug(countryId: string): string {
  const slug = normalizeCountrySlug(countryId);
  return SLUG_ALIASES[slug] ?? slug;
}

export function getCountryNetworkNames(countryId: string): string[] {
  const slug = resolveNetworkSlug(countryId);
  if (COUNTRY_NETWORKS[slug]?.length) {
    return [...COUNTRY_NETWORKS[slug]];
  }

  const hint =
    findCountryTemplateHint(slug) ??
    COUNTRY_TEMPLATE_HINTS.find((entry) => entry.slug === slug);

  const regional = hint ? REGIONAL_NETWORKS[hint.templateKey] : REGIONAL_NETWORKS.europe;
  return [...regional];
}

function joinNetworkNames(names: string[]): string {
  if (names.length === 0) return "Partner networks";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
}

/** e.g. "T-Mobile, AT&T & Verizon · 5G where available" */
export function formatCountryNetworkLabel(countryId: string): string {
  const names = getCountryNetworkNames(countryId);
  return `${joinNetworkNames(names)} · 5G where available`;
}
