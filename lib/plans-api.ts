import { API_BASE } from "@/lib/api-client";
import { SERVER_API_BASE } from "@/lib/api-server";
import { normalizeCountrySlug } from "@/lib/country-slugs";
import { normalizePlansResponse } from "@/lib/plans-diagnostics";
import { buildRegionalPlansFallback } from "@/lib/regional-plans-fallback";

export type PricingStrategy = "MANUAL" | "AUTOMATED";
export type MarginStatus = "manual" | "automated" | "floor_applied";
export type PlanCategory = "fixed" | "unlimited" | "flexible";
export type DisplayBadge = "best_choice" | "flexible";

export type FormattedPriceParts = {
  dollars: string;
  cents: string;
};

export type EsimPlan = {
  id: string;
  countryId: string;
  name: string;
  dataGb?: number;
  durationDays?: number;
  price: number;
  formattedPriceParts: FormattedPriceParts;
  currency: string;
  isRechargeable: boolean;
  isPayAsYouGo: boolean;
  pricingStrategy: PricingStrategy;
  marginStatus: MarginStatus;
  planCategory: PlanCategory;
  displayBadge?: DisplayBadge | null;
};

export type PlanCategoryGroups = {
  fixed: EsimPlan[];
  unlimited: EsimPlan[];
  flexible: EsimPlan[];
};

export type PlansByCountryResponse = {
  success: boolean;
  countryId: string;
  countryName?: string;
  flag?: string;
  plans: EsimPlan[];
  planGroups: PlanCategoryGroups;
};

export function plansApiUrl(countryId: string, baseUrl: string = API_BASE): string {
  const params = new URLSearchParams({ country_id: countryId });
  return `${baseUrl}/api/v1/plans?${params.toString()}`;
}

async function parsePlansResponse(
  res: Response,
  url: string,
  countryId: string,
): Promise<PlansByCountryResponse> {
  if (!res.ok) {
    let detail = "";
    try {
      const body = (await res.json()) as { detail?: string };
      if (body.detail) detail = `: ${body.detail}`;
    } catch {
      // Response may not be JSON.
    }

    const message = `Plans API error (${res.status})${detail}`;
    console.error("[plans-api] Fetch failed:", {
      url,
      countryId,
      status: res.status,
      statusText: res.statusText,
      message,
    });
    throw new Error(message);
  }

  const payload = (await res.json()) as PlansByCountryResponse;
  return normalizePlansResponse(payload);
}

function wrapPlansNetworkError(
  err: unknown,
  url: string,
  countryId: string,
): Error {
  if (err instanceof Error && err.message.startsWith("Plans API error")) {
    return err;
  }

  const message =
    err instanceof TypeError
      ? "Unable to reach the plans service. Check that the API is running."
      : err instanceof Error
        ? err.message
        : "Unable to load plans.";

  console.error("[plans-api] Network or unexpected error:", {
    url,
    countryId,
    error: err,
  });
  return new Error(message);
}

function withCatalogOrFallback(
  countryId: string,
  payload: PlansByCountryResponse,
): PlansByCountryResponse {
  if (payload.plans?.length) return payload;
  console.warn(
    "[plans-api] Empty catalog from automation — using regional fallback",
    countryId,
  );
  return buildRegionalPlansFallback(countryId);
}

function fallbackAfterError(countryId: string, err: unknown): PlansByCountryResponse {
  console.warn(
    "[plans-api] Automation catalog unavailable — using regional fallback",
    { countryId, error: err instanceof Error ? err.message : err },
  );
  return buildRegionalPlansFallback(countryId);
}

/** Server Component fetch — no client cache, hits pricing engine directly. */
export async function fetchPlansByCountryServer(
  countryId: string,
): Promise<PlansByCountryResponse> {
  const slug = normalizeCountrySlug(countryId);
  const url = plansApiUrl(slug, SERVER_API_BASE);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const payload = await parsePlansResponse(res, url, slug);
    return withCatalogOrFallback(slug, payload);
  } catch (err: unknown) {
    // Prefer sellable regional templates over a hard 503 page.
    if (err instanceof Error && /503|unavailable|reach the plans/i.test(err.message)) {
      return fallbackAfterError(slug, err);
    }
    throw wrapPlansNetworkError(err, url, slug);
  }
}

export async function fetchPlansByCountry(
  countryId: string,
): Promise<PlansByCountryResponse> {
  const slug = normalizeCountrySlug(countryId);
  const url = plansApiUrl(slug);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const payload = await parsePlansResponse(res, url, slug);
    return withCatalogOrFallback(slug, payload);
  } catch (err: unknown) {
    return fallbackAfterError(slug, err);
  }
}
