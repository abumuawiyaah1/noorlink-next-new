import { normalizeCountrySlug } from "@/lib/country-slugs";

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

/** Country slug → flag emoji for plans UI (fallback when API omits flag). */
const COUNTRY_FLAGS: Record<string, string> = {
  usa: "🇺🇸",
  canada: "🇨🇦",
  mexico: "🇲🇽",
  panama: "🇵🇦",
  "costa-rica": "🇨🇷",
  bahamas: "🇧🇸",
  jamaica: "🇯🇲",
  "dominican-republic": "🇩🇴",
  barbados: "🇧🇧",
  "trinidad-and-tobago": "🇹🇹",
  "puerto-rico": "🇵🇷",
  uk: "🇬🇧",
  france: "🇫🇷",
  germany: "🇩🇪",
  italy: "🇮🇹",
  spain: "🇪🇸",
  netherlands: "🇳🇱",
  switzerland: "🇨🇭",
  portugal: "🇵🇹",
  austria: "🇦🇹",
  belgium: "🇧🇪",
  ireland: "🇮🇪",
  sweden: "🇸🇪",
  norway: "🇳🇴",
  denmark: "🇩🇰",
  finland: "🇫🇮",
  iceland: "🇮🇸",
  malta: "🇲🇹",
  russia: "🇷🇺",
  europe: "🇪🇺",
  japan: "🇯🇵",
  china: "🇨🇳",
  india: "🇮🇳",
  australia: "🇦🇺",
  singapore: "🇸🇬",
  thailand: "🇹🇭",
  "south-korea": "🇰🇷",
  indonesia: "🇮🇩",
  malaysia: "🇲🇾",
  philippines: "🇵🇭",
  vietnam: "🇻🇳",
  fiji: "🇫🇯",
  maldives: "🇲🇻",
  "saudi-arabia": "🇸🇦",
  uae: "🇦🇪",
  caribbean: "🏝️",
  "regional-caribbean": "🏝️",
  "regional-europe": "🇪🇺",
  "middle-east": "🕌",
  "regional-middle-east": "🕌",
  qatar: "🇶🇦",
  kuwait: "🇰🇼",
  bahrain: "🇧🇭",
  oman: "🇴🇲",
  turkey: "🇹🇷",
  egypt: "🇪🇬",
  jordan: "🇯🇴",
  lebanon: "🇱🇧",
  brazil: "🇧🇷",
  argentina: "🇦🇷",
  chile: "🇨🇱",
  colombia: "🇨🇴",
  peru: "🇵🇪",
  "south-africa": "🇿🇦",
  nigeria: "🇳🇬",
  morocco: "🇲🇦",
};

export function resolveCountryFlagSlug(countryId: string): string {
  const slug = normalizeCountrySlug(countryId);
  return SLUG_ALIASES[slug] ?? slug;
}

export function getCountryFlag(countryId: string): string {
  const slug = resolveCountryFlagSlug(countryId);
  return COUNTRY_FLAGS[slug] ?? "🌍";
}

/** Prefer API flag when present; otherwise use local catalog. */
export function resolveCountryFlag(
  countryId: string,
  apiFlag?: string | null,
): string {
  const trimmed = apiFlag?.trim();
  if (trimmed) return trimmed;
  return getCountryFlag(countryId);
}
