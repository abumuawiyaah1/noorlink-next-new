import { getCountryImageUrl } from "@/lib/country-images";
import type { PopularSeasonId } from "@/lib/popular-countries";

export type PopularStory = {
  countryId: string;
  reason: string;
  tips: [string, string];
  image: string;
  /** Short label for festivity moments */
  momentLabel?: string;
};

type FestivityMoment = {
  id: string;
  countryId: string;
  reason: string;
  tips: [string, string];
  image?: string;
  /** Inclusive UTC month/day window (may wrap year-end). */
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
};

/** Big travel moments that can earn a Popular slot. */
export const POPULAR_FESTIVITIES: FestivityMoment[] = [
  {
    id: "nye-nyc",
    countryId: "usa",
    reason: "New Year in Times Square",
    tips: [
      "Watch the ball drop in Times Square",
      "Toast midnight with a late Broadway show or rooftop view",
    ],
    startMonth: 12,
    startDay: 20,
    endMonth: 1,
    endDay: 5,
  },
  {
    id: "jamaica-carnival-season",
    countryId: "jamaica",
    reason: "Carnival season energy",
    tips: [
      "Join the color and music of carnival street parties",
      "Spend a beach morning in Negril after the celebrations",
    ],
    startMonth: 3,
    startDay: 15,
    endMonth: 4,
    endDay: 30,
  },
];

/** Default seasonal reason + tips per country (positive to-dos only). */
const SEASON_STORIES: Record<
  PopularSeasonId,
  Partial<Record<string, Omit<PopularStory, "countryId" | "image">>>
> = {
  "winter-sun": {
    usa: {
      reason: "Winter city breaks",
      tips: ["Ice skate in a city park", "Warm up in a museum afternoon"],
    },
    mexico: {
      reason: "Winter sun escape",
      tips: ["Swim a Yucatán cenote", "Stroll a colonial plaza at sunset"],
    },
    jamaica: {
      reason: "Winter island escape",
      tips: ["Swim in turquoise water at Negril", "Taste jerk chicken in a beach town"],
    },
    turkey: {
      reason: "Mild winter city travel",
      tips: ["Cruise the Bosphorus", "Wander the Grand Bazaar"],
    },
    uae: {
      reason: "Peak winter in the Gulf",
      tips: ["Watch the Dubai skyline at dusk", "Explore a desert evening"],
    },
    "saudi-arabia": {
      reason: "Pilgrimage season travel",
      tips: ["Visit the Haram with calm prep days", "See heritage streets in Diriyah"],
    },
  },
  "pilgrimage-spring": {
    "saudi-arabia": {
      reason: "Umrah & spring travel",
      tips: ["Plan quiet time in Makkah and Madinah", "Add a day in modern Riyadh"],
    },
    turkey: {
      reason: "Spring pilgrimage layover favorite",
      tips: ["See Cappadocia at sunrise", "Walk the Sultanahmet peninsula"],
    },
    uae: {
      reason: "Spring Gulf stopover",
      tips: ["Visit Sheikh Zayed Mosque", "Evening walk on the Corniche"],
    },
    japan: {
      reason: "Cherry blossom season",
      tips: ["Walk under sakura in a city park", "Ride a day trip to Kyoto temples"],
    },
    france: {
      reason: "Spring in the cities",
      tips: ["Café morning along the Seine", "Day trip into the countryside"],
    },
  },
  summer: {
    france: {
      reason: "Summer travel peak",
      tips: ["Evening walk along the Seine", "Day on the Riviera coast"],
    },
    italy: {
      reason: "Summer in Italy",
      tips: ["Walk Rome’s Centro in soft morning light", "Gelato stop after a piazza evening"],
    },
    spain: {
      reason: "Summer Spain escapes",
      tips: ["Tapas night in a lively barrio", "Beach morning on the Mediterranean"],
    },
    turkey: {
      reason: "Summer coasts & cities",
      tips: ["Ferry day on the Bosphorus", "Sunset on the Aegean coast"],
    },
    uk: {
      reason: "Summer city hopping",
      tips: ["Picnic in a London park", "Day-trip to Bath or Brighton"],
    },
    jamaica: {
      reason: "Caribbean summer",
      tips: ["Reggae beach afternoon", "Waterfall swim in the hills"],
    },
  },
  "hajj-fall": {
    "saudi-arabia": {
      reason: "Hajj & fall travel",
      tips: ["Focus days in Makkah and Madinah", "Quiet evening reflection walks"],
    },
    turkey: {
      reason: "Fall layover favorite",
      tips: ["Cappadocia balloon morning", "Tea with a Bosphorus view"],
    },
    uae: {
      reason: "Fall Gulf travel",
      tips: ["Desert evening under clear skies", "Modern museum afternoon"],
    },
    japan: {
      reason: "Fall foliage travel",
      tips: ["Temple walk under autumn leaves", "Onsen evening after a train day"],
    },
    france: {
      reason: "Fall city light",
      tips: ["Museum morning in Paris", "Long café lunch as evenings cool"],
    },
    usa: {
      reason: "Fall city travel",
      tips: ["Walk a leafy city avenue", "Catch a live game or show"],
    },
  },
};

const DEFAULT_TIPS: [string, string] = [
  "Explore the old city on foot",
  "Save an evening for a local meal out",
];

function dayOfYear(month: number, day: number): number {
  return month * 100 + day;
}

function inFestivityWindow(
  date: Date,
  moment: FestivityMoment,
): boolean {
  const now = dayOfYear(date.getUTCMonth() + 1, date.getUTCDate());
  const start = dayOfYear(moment.startMonth, moment.startDay);
  const end = dayOfYear(moment.endMonth, moment.endDay);
  if (start <= end) return now >= start && now <= end;
  // Wraps year-end (e.g. Dec 20 → Jan 5)
  return now >= start || now <= end;
}

export function getActiveFestivityCountryIds(date: Date = new Date()): string[] {
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const moment of POPULAR_FESTIVITIES) {
    if (!inFestivityWindow(date, moment)) continue;
    if (seen.has(moment.countryId)) continue;
    seen.add(moment.countryId);
    ids.push(moment.countryId);
  }
  return ids;
}

function festivityForCountry(
  countryId: string,
  date: Date,
): FestivityMoment | null {
  for (const moment of POPULAR_FESTIVITIES) {
    if (moment.countryId !== countryId) continue;
    if (inFestivityWindow(date, moment)) return moment;
  }
  return null;
}

/** Resolve reason + tips + image for Popular cards and plans-page story. */
export function getPopularStory(
  countryId: string,
  seasonId: PopularSeasonId,
  date: Date = new Date(),
): PopularStory {
  const festivity = festivityForCountry(countryId, date);
  if (festivity) {
    return {
      countryId,
      reason: festivity.reason,
      tips: festivity.tips,
      image: festivity.image ?? getCountryImageUrl(countryId),
      momentLabel: festivity.reason,
    };
  }

  const seasonal = SEASON_STORIES[seasonId]?.[countryId];
  if (seasonal) {
    return {
      countryId,
      reason: seasonal.reason,
      tips: seasonal.tips,
      image: getCountryImageUrl(countryId),
    };
  }

  return {
    countryId,
    reason: "Popular right now",
    tips: DEFAULT_TIPS,
    image: getCountryImageUrl(countryId),
  };
}
