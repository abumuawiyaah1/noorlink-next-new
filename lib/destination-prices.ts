import { DESTINATION_CARDS } from "@/lib/destinations-catalog";
import { debug, debugError } from "@/lib/debug";
import { fetchPlansByCountryCached } from "@/lib/plans-api";
import type { EsimPlan } from "@/lib/plans-api";

export type DestinationStartingPrice = {
  label: string;
  amount: number;
};

export type DestinationPriceMap = Record<string, DestinationStartingPrice>;

export const DESTINATION_PRICE_REVALIDATE_SECONDS = 300;
export const DESTINATION_PRICE_TIMEOUT_MS = 2500;
export const MAX_DESTINATION_PRICE_COUNTRIES = 24;

export function formatFromPrice(
  price: number,
  dollars?: string,
  cents?: string,
): string {
  if (dollars != null && cents != null) {
    return `From $${dollars}.${cents.padStart(2, "0").slice(-2)}`;
  }
  return `From $${price.toFixed(2)}`;
}

/** Cheapest selectable plan — same source the plans page uses. */
export function cheapestStartingPrice(
  plans: EsimPlan[],
): DestinationStartingPrice | null {
  if (plans.length === 0) return null;

  const cheapest = plans.reduce((best, plan) =>
    plan.price < best.price ? plan : best,
  );

  return {
    amount: cheapest.price,
    label: formatFromPrice(
      cheapest.price,
      cheapest.formattedPriceParts?.dollars,
      cheapest.formattedPriceParts?.cents,
    ),
  };
}

export function featuredDestinationCountryIds(): string[] {
  return [...new Set(DESTINATION_CARDS.map((card) => card.priceCountryId))];
}

/**
 * Live "From" prices for Destinations cards.
 * Missing countries are omitted so the UI never shows a cheaper catalog teaser.
 */
export async function fetchDestinationStartingPrices(
  countryIds?: string[],
): Promise<DestinationPriceMap> {
  const ids = [
    ...new Set((countryIds ?? featuredDestinationCountryIds()).filter(Boolean)),
  ].slice(0, MAX_DESTINATION_PRICE_COUNTRIES);

  debug("destination-prices", "fetching starting prices", { count: ids.length });

  const entries = await Promise.all(
    ids.map(async (countryId) => {
      try {
        const response = await fetchPlansByCountryCached(countryId, {
          revalidateSeconds: DESTINATION_PRICE_REVALIDATE_SECONDS,
          timeoutMs: DESTINATION_PRICE_TIMEOUT_MS,
        });
        const price = cheapestStartingPrice(response.plans ?? []);
        if (!price) return null;
        return [countryId, price] as const;
      } catch (error) {
        debugError("destination-prices", "Failed for", countryId, error);
        return null;
      }
    }),
  );

  const prices: DestinationPriceMap = {};
  for (const entry of entries) {
    if (!entry) continue;
    prices[entry[0]] = entry[1];
  }
  debug("destination-prices", "resolved", {
    requested: ids.length,
    resolved: Object.keys(prices).length,
  });
  return prices;
}
