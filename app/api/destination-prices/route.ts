import { NextRequest, NextResponse } from "next/server";
import { normalizeCountrySlug } from "@/lib/country-slugs";
import { debug } from "@/lib/debug";
import {
  DESTINATION_PRICE_REVALIDATE_SECONDS,
  MAX_DESTINATION_PRICE_COUNTRIES,
  featuredDestinationCountryIds,
  fetchDestinationStartingPrices,
} from "@/lib/destination-prices";

export const revalidate = 300;

function requestedCountryIds(request: NextRequest): string[] {
  const raw = request.nextUrl.searchParams.get("countries") ?? "";
  const fromQuery = raw
    .split(",")
    .map((value) => normalizeCountrySlug(value))
    .filter((value) => value.length >= 2 && value.length <= 40);

  const ids = fromQuery.length > 0 ? fromQuery : featuredDestinationCountryIds();
  return [...new Set(ids)].slice(0, MAX_DESTINATION_PRICE_COUNTRIES);
}

export async function GET(request: NextRequest) {
  const ids = requestedCountryIds(request);
  debug("destination-prices-route", "GET", { countries: ids.length });
  const prices = await fetchDestinationStartingPrices(ids);
  debug("destination-prices-route", "done", {
    resolved: Object.keys(prices).length,
  });
  return NextResponse.json(
    { prices },
    {
      headers: {
        "Cache-Control": `public, s-maxage=${DESTINATION_PRICE_REVALIDATE_SECONDS}, stale-while-revalidate=60`,
      },
    },
  );
}
