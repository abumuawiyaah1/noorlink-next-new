import { DESTINATION_CARDS } from "@/lib/destinations-catalog";
import { fetchPlansByCountryServer } from "@/lib/plans-api";

export type DestinationPriceMap = Record<string, string>;

function formatFromPrice(price: number, dollars?: string, cents?: string): string {
  if (dollars != null && cents != null) {
    return `From $${dollars}.${cents.padStart(2, "0").slice(-2)}`;
  }
  return `From $${price.toFixed(2)}`;
}

/** Load the cheapest live plan price for each destination card. */
export async function fetchDestinationStartingPrices(): Promise<DestinationPriceMap> {
  const countryIds = [
    ...new Set(DESTINATION_CARDS.map((card) => card.priceCountryId)),
  ];

  const byCountry = new Map<string, string>();

  await Promise.all(
    countryIds.map(async (countryId) => {
      try {
        const response = await fetchPlansByCountryServer(countryId);
        const plans = response.plans ?? [];
        if (plans.length === 0) return;

        const cheapest = plans.reduce((best, plan) =>
          plan.price < best.price ? plan : best,
        );
        byCountry.set(
          countryId,
          formatFromPrice(
            cheapest.price,
            cheapest.formattedPriceParts?.dollars,
            cheapest.formattedPriceParts?.cents,
          ),
        );
      } catch (error) {
        console.error("[destination-prices] Failed for", countryId, error);
      }
    }),
  );

  const prices: DestinationPriceMap = {};
  for (const card of DESTINATION_CARDS) {
    prices[card.id] = byCountry.get(card.priceCountryId) ?? card.priceLabel;
  }
  return prices;
}
