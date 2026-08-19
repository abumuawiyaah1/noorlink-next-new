"use client";

import { useEffect, useState } from "react";

export const PENDING_PRICE_LABEL = "See plans";

type DestinationStartingPrice = {
  label: string;
  amount: number;
};

const CACHE_KEY = "noorlink.dest-from-prices";
const STALE_TTL_MS = 24 * 60 * 60 * 1000;

type CachePayload = {
  savedAt: number;
  prices: Record<string, DestinationStartingPrice>;
};

function readCachedPrices(): Record<string, DestinationStartingPrice> {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as CachePayload;
    if (!parsed?.prices || typeof parsed.savedAt !== "number") return {};
    if (Date.now() - parsed.savedAt > STALE_TTL_MS) return {};

    return parsed.prices;
  } catch {
    return {};
  }
}

function writeCachedPrices(prices: Record<string, DestinationStartingPrice>) {
  try {
    const payload: CachePayload = { savedAt: Date.now(), prices };
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore quota / private-mode failures.
  }
}

export function useLiveStartingPrices(countryIds: string[]) {
  const [prices, setPrices] = useState<Record<string, DestinationStartingPrice>>(
    {},
  );
  const idsKey = [...new Set(countryIds.filter(Boolean))].sort().join(",");

  useEffect(() => {
    setPrices(readCachedPrices());
  }, []);

  useEffect(() => {
    if (!idsKey) return;

    let cancelled = false;

    async function load() {
      try {
        const response = await fetch(
          `/api/destination-prices?countries=${encodeURIComponent(idsKey)}`,
          { headers: { Accept: "application/json" } },
        );
        if (!response.ok) return;

        const body = (await response.json()) as {
          prices?: Record<string, DestinationStartingPrice>;
        };
        if (cancelled || !body.prices) return;

        setPrices((current) => {
          const next = { ...current, ...body.prices };
          writeCachedPrices(next);
          return next;
        });
      } catch (error) {
        console.error("[destination-prices] Client refresh failed", error);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [idsKey]);

  return prices;
}
