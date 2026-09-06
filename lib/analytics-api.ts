import { API_BASE } from "@/lib/api-client";
import { debug } from "@/lib/debug";
import { thisWeekHeroPills, type ThisWeekPill } from "@/lib/this-week";

export type PopularDestinationItem = {
  destination: string;
  query: string;
  href: string;
  flag: string;
};

export type TrendingDestinationItem = PopularDestinationItem & {
  count: number;
};

export type PopularAnalyticsResponse = {
  success: boolean;
  trending: TrendingDestinationItem[];
  fallback: PopularDestinationItem[];
  fallbackLabels?: string[];
};

export type HeroPopularPill = ThisWeekPill;

export function toPopularPill(item: PopularDestinationItem): HeroPopularPill {
  return {
    label: item.destination,
    query: item.query,
    href: item.href,
    flag: item.flag,
    reason: item.destination,
  };
}

/** Current-week hero shortcuts — faith + moment + season. */
export function seasonalHeroPills(): HeroPopularPill[] {
  return thisWeekHeroPills();
}

/**
 * Hero pills follow the This week calendar (not live trending).
 * Trending args kept for call-site compatibility; ignored.
 */
export function mergeHeroPopularPills(
  seasonal: HeroPopularPill[],
  _trending: HeroPopularPill[],
  target = 3,
): HeroPopularPill[] {
  return seasonal.slice(0, target);
}

/** Fire-and-forget hero search telemetry — never blocks navigation. */
export function logSearch(destination: string): void {
  const trimmed = destination.trim();
  if (!trimmed) return;

  debug("analytics", "logSearch", trimmed);
  fetch(`${API_BASE}/api/v1/analytics/search-log`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ destination: trimmed }),
  }).catch(() => {
    /* analytics must not affect UX */
  });
}

export async function fetchPopularPills(): Promise<HeroPopularPill[]> {
  const pills = thisWeekHeroPills();
  debug("analytics", "fetchPopularPills → this week calendar", { count: pills.length });
  return pills;
}

export async function fetchPopularAnalytics(): Promise<PopularAnalyticsResponse> {
  debug("analytics", "fetchPopularAnalytics →");
  const res = await fetch(`${API_BASE}/api/v1/analytics/popular`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to load popular destinations (${res.status})`);
  }

  return (await res.json()) as PopularAnalyticsResponse;
}

/** Trending labels + counts for the hybrid Popular countries row. */
export async function fetchTrendingCountrySignals(): Promise<
  { label: string; count: number }[]
> {
  try {
    const data = await fetchPopularAnalytics();
    return (data.trending ?? []).map((item) => ({
      label: item.destination,
      count: item.count,
    }));
  } catch {
    return [];
  }
}
