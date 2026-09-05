import { getCountryFlag } from "@/lib/country-flags";
import { plansPathForCountry } from "@/lib/country-slugs";
import { findCountryTemplateHint } from "@/lib/country-templates";
import {
  findDestinationById,
  type HeroDestination,
} from "@/lib/hero-destinations";

export type ThisWeekSlot = {
  label: string;
  query: string;
  /** Single-country destination id only — never regional / global packs. */
  destinationId: string;
  reason: string;
};

export type ThisWeekPill = {
  label: string;
  query: string;
  href: string;
  flag: string;
  reason: string;
};

type MonthWeek = `${number}-${1 | 2 | 3 | 4}`;

type WeekPlan = {
  /** Short line for what’s taking place this week (shared context). */
  weekReason: string;
  moment: ThisWeekSlot;
  season: ThisWeekSlot;
};

const FAITH_UMRAH: ThisWeekSlot = {
  label: "Umrah",
  query: "Umrah",
  destinationId: "saudi-arabia",
  reason: "Year-round pilgrimage travel",
};

const FAITH_RAMADAN: ThisWeekSlot = {
  label: "Ramadan",
  query: "Ramadan",
  destinationId: "saudi-arabia",
  reason: "Ramadan travel & planning",
};

const FAITH_HAJJ: ThisWeekSlot = {
  label: "Hajj",
  query: "Hajj",
  destinationId: "saudi-arabia",
  reason: "Hajj season travel",
};

/** Reference faith windows for 2026 (Umm al-Qura / common estimates; moon may shift ±1–2 days). */
const FAITH_BASE_YEAR = 2026;
const RAMADAN_START = { month: 2, day: 18 };
const RAMADAN_END = { month: 3, day: 19 };
const HAJJ_START = { month: 5, day: 1 };
const HAJJ_END = { month: 5, day: 30 };

/**
 * Full-year moment + season map (Gregorian month × week-of-month).
 * Faith chip is resolved live (Umrah / Ramadan / Hajj) so Islamic dates can shift.
 */
const WEEK_PLANS: Record<MonthWeek, WeekPlan> = {
  // January — winter sun + new-year travel
  "1-1": {
    weekReason: "Post-NYE city trips and early-year sun escapes",
    moment: slot("USA", "usa", "New Year city travel"),
    season: slot("Jamaica", "jamaica", "Winter-sun island planning"),
  },
  "1-2": {
    weekReason: "Winter-sun beach demand stays high",
    moment: slot("Mexico", "mexico", "Winter-sun beach trips"),
    season: slot("Jamaica", "jamaica", "Caribbean leisure peak"),
  },
  "1-3": {
    weekReason: "Gulf winter weather and Umrah side trips",
    moment: slot("UAE", "uae", "Mild Gulf winter travel"),
    season: slot("Bahamas", "bahamas", "Sun escape bookings"),
  },
  "1-4": {
    weekReason: "Cooler-month city breaks",
    moment: slot("Turkey", "turkey", "Istanbul winter city breaks"),
    season: slot("Mexico", "mexico", "Winter-sun corridor"),
  },

  // February — late winter → Ramadan
  "2-1": {
    weekReason: "Peak winter-sun leisure",
    moment: slot("Jamaica", "jamaica", "Winter-sun beach weeks"),
    season: slot("Mexico", "mexico", "Sun escape planning"),
  },
  "2-2": {
    weekReason: "Island-hopping before Ramadan travel shift",
    moment: slot("Bahamas", "bahamas", "Late-winter island hops"),
    season: slot("UAE", "uae", "Gulf winter corridor"),
  },
  "2-3": {
    weekReason: "Ramadan begins — pilgrimage and data planning",
    moment: slot("Saudi Arabia", "saudi-arabia", "Ramadan travel corridor"),
    season: slot("Turkey", "turkey", "Pilgrimage route stopovers"),
  },
  "2-4": {
    weekReason: "Ramadan travel and Gulf family visits",
    moment: slot("UAE", "uae", "Ramadan Gulf visits"),
    season: slot("Turkey", "turkey", "Corridor city breaks"),
  },

  // March — Ramadan → Eid + spring
  "3-1": {
    weekReason: "Mid-Ramadan trips and corridor travel",
    moment: slot("Turkey", "turkey", "Ramadan corridor travel"),
    season: slot("UAE", "uae", "Gulf family visits"),
  },
  "3-2": {
    weekReason: "Cherry blossom season overlaps spring bookings",
    moment: slot("Japan", "japan", "Cherry blossom season"),
    season: slot("France", "france", "Early spring Europe"),
  },
  "3-3": {
    weekReason: "Blossom peak weeks and Europe spring interest",
    moment: slot("Japan", "japan", "Blossom peak travel"),
    season: slot("Italy", "italy", "Spring Europe city breaks"),
  },
  "3-4": {
    weekReason: "Eid week and spring Europe ramp",
    moment: slot("Saudi Arabia", "saudi-arabia", "Eid and post-Ramadan Umrah"),
    season: slot("Spain", "spain", "Spring Europe openings"),
  },

  // April — Carnival + spring Europe
  "4-1": {
    weekReason: "Jamaica Carnival season energy",
    moment: slot("Jamaica", "jamaica", "Carnival season"),
    season: slot("Spain", "spain", "Spring Europe leisure"),
  },
  "4-2": {
    weekReason: "Spring city breaks and Easter travel window",
    moment: slot("France", "france", "Spring city breaks"),
    season: slot("Italy", "italy", "Easter Europe travel"),
  },
  "4-3": {
    weekReason: "Europe shoulder season ramps up",
    moment: slot("Italy", "italy", "Spring Italy trips"),
    season: slot("Turkey", "turkey", "Spring corridor travel"),
  },
  "4-4": {
    weekReason: "Spring UK ↔ Europe leisure and family visits",
    moment: slot("UK", "uk", "Spring visiting family"),
    season: slot("Spain", "spain", "Late-spring Europe"),
  },

  // May — Europe ramp + Hajj season
  "5-1": {
    weekReason: "Hajj travel prep and early pilgrim arrivals",
    moment: slot("Saudi Arabia", "saudi-arabia", "Hajj travel prep"),
    season: slot("Turkey", "turkey", "Pilgrim route stopovers"),
  },
  "5-2": {
    weekReason: "Hajj transit corridors and early summer Europe",
    moment: slot("UAE", "uae", "Hajj transit corridor"),
    season: slot("France", "france", "Early summer Europe"),
  },
  "5-3": {
    weekReason: "Peak Hajj approach and Europe bookings",
    moment: slot("Turkey", "turkey", "Hajj corridor stopovers"),
    season: slot("Italy", "italy", "Early summer Italy"),
  },
  "5-4": {
    weekReason: "Hajj days and Eid al-Adha",
    moment: slot("Saudi Arabia", "saudi-arabia", "Hajj and Eid al-Adha"),
    season: slot("Spain", "spain", "Early summer Spain"),
  },

  // June — early summer
  "6-1": {
    weekReason: "School and summer Europe season opens",
    moment: slot("France", "france", "Summer Europe opens"),
    season: slot("Italy", "italy", "Early summer Italy"),
  },
  "6-2": {
    weekReason: "Beach and city summer trips",
    moment: slot("Spain", "spain", "Summer beach & city"),
    season: slot("Turkey", "turkey", "Early summer Turkey"),
  },
  "6-3": {
    weekReason: "Mid-June Europe leisure peak building",
    moment: slot("Italy", "italy", "Summer Italy peak building"),
    season: slot("UK", "uk", "Summer UK visits"),
  },
  "6-4": {
    weekReason: "Pre-July holiday rush",
    moment: slot("Spain", "spain", "Pre-July holiday rush"),
    season: slot("France", "france", "Summer France bookings"),
  },

  // July — high summer
  "7-1": {
    weekReason: "Peak summer holiday weeks",
    moment: slot("Italy", "italy", "Peak summer Italy"),
    season: slot("Spain", "spain", "Peak summer Spain"),
  },
  "7-2": {
    weekReason: "Family summer Europe and Turkey resorts",
    moment: slot("France", "france", "Family summer Europe"),
    season: slot("Turkey", "turkey", "Summer Turkey resorts"),
  },
  "7-3": {
    weekReason: "High-season beach and city demand",
    moment: slot("Spain", "spain", "High-season beach travel"),
    season: slot("UK", "uk", "Summer UK corridor"),
  },
  "7-4": {
    weekReason: "Late-July mix: Turkey sun and Caribbean interest",
    moment: slot("Turkey", "turkey", "Late-July Turkey sun"),
    season: slot("Jamaica", "jamaica", "Caribbean summer interest"),
  },

  // August — late summer / family travel
  "8-1": {
    weekReason: "Classic August Europe holidays",
    moment: slot("Spain", "spain", "August Europe holidays"),
    season: slot("Italy", "italy", "August Italy travel"),
  },
  "8-2": {
    weekReason: "Last big summer Europe weeks",
    moment: slot("France", "france", "Late-summer France"),
    season: slot("Turkey", "turkey", "Late-summer Turkey"),
  },
  "8-3": {
    weekReason: "Late-summer visits home and early Gulf planning",
    moment: slot("UK", "uk", "Late-summer home visits"),
    season: slot("UAE", "uae", "Early Gulf autumn planning"),
  },
  "8-4": {
    weekReason: "Summer fade into early winter-sun planning",
    moment: slot("Turkey", "turkey", "Summer fade corridor"),
    season: slot("Jamaica", "jamaica", "Early winter-sun planning"),
  },

  // September — shoulder season
  "9-1": {
    weekReason: "Turkey shoulder season and winter-sun planning starts",
    moment: slot("Turkey", "turkey", "Fall shoulder season"),
    season: slot("Jamaica", "jamaica", "Winter-sun planning starts"),
  },
  "9-2": {
    weekReason: "Fall Gulf trips and Mexico sun corridor",
    moment: slot("UAE", "uae", "Fall Gulf trips"),
    season: slot("Mexico", "mexico", "Sun corridor planning"),
  },
  "9-3": {
    weekReason: "Soft Europe shoulder and Caribbean push",
    moment: slot("Spain", "spain", "Europe shoulder season"),
    season: slot("Jamaica", "jamaica", "Caribbean fall push"),
  },
  "9-4": {
    weekReason: "Steady Umrah and fall leisure mix",
    moment: slot("Turkey", "turkey", "Fall city breaks"),
    season: slot("Bahamas", "bahamas", "Winter-sun bookings"),
  },

  // October — fall getaways
  "10-1": {
    weekReason: "Fall break and winter-sun bookings rise",
    moment: slot("Mexico", "mexico", "Fall break sun trips"),
    season: slot("Jamaica", "jamaica", "Winter-sun rise"),
  },
  "10-2": {
    weekReason: "Caribbean leisure and mild Gulf autumn",
    moment: slot("Jamaica", "jamaica", "Fall Caribbean leisure"),
    season: slot("UAE", "uae", "Mild Gulf autumn"),
  },
  "10-3": {
    weekReason: "City breaks and sun escapes",
    moment: slot("Turkey", "turkey", "Fall city breaks"),
    season: slot("Mexico", "mexico", "Sun escape bookings"),
  },
  "10-4": {
    weekReason: "Late-fall travel and early holiday planning",
    moment: slot("Bahamas", "bahamas", "Late-fall island trips"),
    season: slot("USA", "usa", "Early holiday planning"),
  },

  // November — pre-holiday
  "11-1": {
    weekReason: "Pre-holiday sun trips",
    moment: slot("Mexico", "mexico", "Pre-holiday sun trips"),
    season: slot("Jamaica", "jamaica", "Holiday beach planning"),
  },
  "11-2": {
    weekReason: "Mild Gulf season and year-round Umrah",
    moment: slot("UAE", "uae", "Mild Gulf season"),
    season: slot("Turkey", "turkey", "Late-fall corridor"),
  },
  "11-3": {
    weekReason: "Thanksgiving week travel",
    moment: slot("USA", "usa", "Thanksgiving week travel"),
    season: slot("Jamaica", "jamaica", "Holiday sun escape"),
  },
  "11-4": {
    weekReason: "Early December trip locks",
    moment: slot("Bahamas", "bahamas", "Holiday beach locks"),
    season: slot("Mexico", "mexico", "December sun planning"),
  },

  // December — holidays + NYE
  "12-1": {
    weekReason: "Holiday beach bookings",
    moment: slot("Jamaica", "jamaica", "Holiday beach bookings"),
    season: slot("Mexico", "mexico", "December sun trips"),
  },
  "12-2": {
    weekReason: "Christmas travel week building",
    moment: slot("Jamaica", "jamaica", "Christmas week travel"),
    season: slot("UAE", "uae", "Holiday Gulf visits"),
  },
  "12-3": {
    weekReason: "Christmas–New Year city and sun mix",
    moment: slot("USA", "usa", "Christmas city travel"),
    season: slot("Bahamas", "bahamas", "Holiday sun mix"),
  },
  "12-4": {
    weekReason: "NYE week and sun escapes",
    moment: slot("USA", "usa", "NYE week (city celebrations)"),
    season: slot("Mexico", "mexico", "New Year sun escapes"),
  },
};

function slot(label: string, destinationId: string, reason: string): ThisWeekSlot {
  return { label, query: label, destinationId, reason };
}

export function weekOfMonth(date: Date = new Date()): 1 | 2 | 3 | 4 {
  const day = date.getUTCDate();
  if (day <= 7) return 1;
  if (day <= 14) return 2;
  if (day <= 21) return 3;
  return 4;
}

function utcYmd(year: number, month: number, day: number): number {
  return Date.UTC(year, month - 1, day);
}

/** Islamic dates drift ~11 days earlier each Gregorian year vs the 2026 base windows. */
function faithShiftMs(year: number): number {
  return (year - FAITH_BASE_YEAR) * -11 * 24 * 60 * 60 * 1000;
}

function inWindow(
  date: Date,
  start: { month: number; day: number },
  end: { month: number; day: number },
): boolean {
  const year = date.getUTCFullYear();
  const shift = faithShiftMs(year);
  const t = date.getTime();
  const startMs = utcYmd(year, start.month, start.day) + shift;
  let endMs = utcYmd(year, end.month, end.day) + shift + 24 * 60 * 60 * 1000 - 1;
  // Window can cross year boundary after negative shift.
  if (endMs < startMs) {
    endMs = utcYmd(year + 1, end.month, end.day) + shift + 24 * 60 * 60 * 1000 - 1;
  }
  return t >= startMs && t <= endMs;
}

export function resolveFaithSlot(date: Date = new Date()): ThisWeekSlot {
  if (inWindow(date, RAMADAN_START, RAMADAN_END)) return FAITH_RAMADAN;
  if (inWindow(date, HAJJ_START, HAJJ_END)) return FAITH_HAJJ;
  return FAITH_UMRAH;
}

export function resolveWeekPlan(date: Date = new Date()): WeekPlan {
  const month = date.getUTCMonth() + 1;
  const week = weekOfMonth(date);
  const key = `${month}-${week}` as MonthWeek;
  return WEEK_PLANS[key] ?? WEEK_PLANS["9-1"];
}

function isBlockedRegionalId(destinationId: string): boolean {
  const id = destinationId.trim().toLowerCase();
  return (
    id === "europe" ||
    id === "global" ||
    id === "worldwide" ||
    id.startsWith("regional-") ||
    [
      "caribbean",
      "north-america",
      "asia-pacific",
      "middle-east",
      "africa",
      "south-america",
    ].includes(id)
  );
}

function resolveDestinationForId(
  destinationId: string,
): Pick<HeroDestination, "href" | "flag"> | null {
  if (isBlockedRegionalId(destinationId)) return null;

  const featured = findDestinationById(destinationId);
  if (featured) {
    if (featured.type === "region") return null;
    return { href: featured.href, flag: featured.flag };
  }

  const hint = findCountryTemplateHint(destinationId);
  if (hint) {
    if (hint.slug === "europe") return null;
    return {
      href: plansPathForCountry(hint.slug),
      flag: getCountryFlag(hint.slug),
    };
  }

  return {
    href: plansPathForCountry(destinationId),
    flag: getCountryFlag(destinationId),
  };
}

export function slotToPill(slot: ThisWeekSlot): ThisWeekPill | null {
  const dest = resolveDestinationForId(slot.destinationId);
  if (!dest) return null;
  return {
    label: slot.label,
    query: slot.query,
    href: dest.href,
    flag: dest.flag,
    reason: slot.reason,
  };
}

/**
 * Three hero chips for the current week:
 * 1) Faith (Umrah / Ramadan / Hajj)
 * 2) World moment
 * 3) Season pick
 * Countries only — never regional / Global packs.
 */
export function thisWeekHeroPills(date: Date = new Date()): ThisWeekPill[] {
  const plan = resolveWeekPlan(date);
  const faith = resolveFaithSlot(date);
  const candidates = [faith, plan.moment, plan.season];
  const pills: ThisWeekPill[] = [];
  const seen = new Set<string>();

  const push = (item: ThisWeekSlot) => {
    if (pills.length >= 3) return;
    if (isBlockedRegionalId(item.destinationId)) return;
    const key = item.label.trim().toLowerCase();
    if (!key || seen.has(key)) return;
    const pill = slotToPill(item);
    if (!pill) return;
    seen.add(key);
    pills.push(pill);
  };

  for (const item of candidates) push(item);

  const fallbacks: ThisWeekSlot[] = [
    FAITH_UMRAH,
    slot("Turkey", "turkey", "Steady travel corridor"),
    slot("Jamaica", "jamaica", "Leisure sun planning"),
    slot("Mexico", "mexico", "Sun escape planning"),
    slot("Spain", "spain", "Europe city breaks"),
  ];
  for (const item of fallbacks) push(item);

  return pills.slice(0, 3);
}

export function thisWeekReason(date: Date = new Date()): string {
  return resolveWeekPlan(date).weekReason;
}
