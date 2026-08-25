import { API_BASE } from "@/lib/api-client";
import { debug } from "@/lib/debug";
import {
  findDestinationById,
  popularPills,
} from "@/lib/hero-destinations";

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

export type HeroPopularPill = {
  label: string;
  query: string;
  href: string;
  flag: string;
};

export function toPopularPill(item: PopularDestinationItem): HeroPopularPill {
  return {
    label: item.destination,
    query: item.query,
    href: item.href,
    flag: item.flag,
  };
}

/** Manual / seasonal hero shortcuts — always the base set. */
export function seasonalHeroPills(): HeroPopularPill[] {
  return popularPills.map((pill) => {
    const dest = findDestinationById(pill.destinationId);
    return {
      label: pill.label,
      query: pill.query,
      href: dest?.href ?? "/destinations",
      flag: dest?.flag ?? "🌍",
    };
  });
}

/**
 * Hero pills are mostly manual/seasonal.
 * Always return `target` pills: seasonal first, then trending only to fill gaps.
 * Never replace the full set with a sparse trending list (avoids a single pill).
 */
export function mergeHeroPopularPills(
  seasonal: HeroPopularPill[],
  trending: HeroPopularPill[],
  target = 3,
): HeroPopularPill[] {
  const result: HeroPopularPill[] = [];
  const seen = new Set<string>();

  const push = (pill: HeroPopularPill) => {
    if (result.length >= target) return;
    const key = pill.label.trim().toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    result.push(pill);
  };

  for (const pill of seasonal) push(pill);
  for (const pill of trending) push(pill);

  return result;
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
  const seasonal = seasonalHeroPills();
  debug("analytics", "fetchPopularPills →");

  try {
    const data = await fetchPopularAnalytics();
    const trendingSource =
      data.trending.length > 0 ? data.trending : (data.fallback ?? []);
    const trending = trendingSource.map(toPopularPill);

    const merged = mergeHeroPopularPills(seasonal, trending, 3);
    debug("analytics", "popular pills", {
      seasonal: seasonal.length,
      trending: trending.length,
      merged: merged.length,
    });
    return merged;
  } catch {
    return seasonal.slice(0, 3);
  }
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
