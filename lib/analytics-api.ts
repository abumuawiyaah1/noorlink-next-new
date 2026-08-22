import { API_BASE } from "@/lib/api-client";
import { debug } from "@/lib/debug";

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
  debug("analytics", "fetchPopularPills →");
  const res = await fetch(`${API_BASE}/api/v1/analytics/popular`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to load popular destinations (${res.status})`);
  }

  const data = (await res.json()) as PopularAnalyticsResponse;
  const source =
    data.trending.length > 0 ? data.trending : (data.fallback ?? []);

  if (source.length === 0 && data.fallbackLabels?.length) {
    debug("analytics", "using fallbackLabels", data.fallbackLabels.length);
    return data.fallbackLabels.map((label) => ({
      label,
      query: label,
      href: "/destinations",
      flag: "🌍",
    }));
  }

  const pills = source.map(toPopularPill);
  debug("analytics", "popular pills", { count: pills.length });
  return pills;
}
