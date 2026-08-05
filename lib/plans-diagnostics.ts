import { API_BASE } from "@/lib/api-client";
import { SERVER_API_BASE } from "@/lib/api-server";
import {
  plansApiUrl,
  type EsimPlan,
  type FormattedPriceParts,
  type PlansByCountryResponse,
} from "@/lib/plans-api";

export type PlansConnectivityResult = {
  ok: boolean;
  url: string;
  countryId: string;
  status: number | null;
  statusText: string | null;
  planCount: number;
  hasFormattedPrices: boolean;
  error: string | null;
  timestamp: string;
  data?: PlansByCountryResponse;
};

function fallbackPriceParts(price: number): FormattedPriceParts {
  const dollars = Math.floor(price);
  const cents = Math.round((price - dollars) * 100);
  return { dollars: String(dollars), cents: String(cents) };
}

function isValidPriceParts(
  parts: FormattedPriceParts | undefined | null,
): parts is FormattedPriceParts {
  return (
    !!parts &&
    typeof parts.dollars === "string" &&
    parts.dollars.length > 0 &&
    typeof parts.cents === "string" &&
    parts.cents.length > 0
  );
}

/** Ensure every plan has usable formatted_price_parts for UI rendering. */
export function normalizePlanPriceParts(plan: EsimPlan): EsimPlan {
  if (isValidPriceParts(plan.formattedPriceParts)) {
    return {
      ...plan,
      formattedPriceParts: {
        dollars: plan.formattedPriceParts.dollars,
        cents: plan.formattedPriceParts.cents.padStart(2, "0").slice(-2),
      },
    };
  }

  return {
    ...plan,
    formattedPriceParts: fallbackPriceParts(plan.price),
  };
}

export function normalizePlansResponse(
  response: PlansByCountryResponse,
): PlansByCountryResponse {
  const plans = response.plans.map(normalizePlanPriceParts);
  const planGroups = {
    fixed: response.planGroups.fixed.map(normalizePlanPriceParts),
    unlimited: response.planGroups.unlimited.map(normalizePlanPriceParts),
    flexible: response.planGroups.flexible.map(normalizePlanPriceParts),
  };

  return {
    ...response,
    plans,
    planGroups,
  };
}

/**
 * Ping the plans API and return structured diagnostics for connectivity reports.
 * Logs full URL + status when the request fails or returns empty data.
 */
export async function pingPlansApi(
  countryId: string,
  options?: { serverSide?: boolean },
): Promise<PlansConnectivityResult> {
  const baseUrl = options?.serverSide ? SERVER_API_BASE : API_BASE;
  const url = plansApiUrl(countryId, baseUrl);
  const timestamp = new Date().toISOString();

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      let detail = "";
      try {
        const body = (await res.json()) as { detail?: string };
        if (body.detail) detail = body.detail;
      } catch {
        // ignore
      }

      const error = `HTTP ${res.status} ${res.statusText}${detail ? ` — ${detail}` : ""}`;
      console.error("[plans-diagnostics] API ping failed:", {
        url,
        countryId,
        status: res.status,
        statusText: res.statusText,
        detail,
      });

      return {
        ok: false,
        url,
        countryId,
        status: res.status,
        statusText: res.statusText,
        planCount: 0,
        hasFormattedPrices: false,
        error,
        timestamp,
      };
    }

    const payload = (await res.json()) as PlansByCountryResponse;
    const normalized = normalizePlansResponse(payload);
    const planCount = normalized.plans.length;
    const hasFormattedPrices = normalized.plans.every((plan) =>
      isValidPriceParts(plan.formattedPriceParts),
    );

    if (planCount === 0) {
      console.warn("[plans-diagnostics] API returned empty plans:", {
        url,
        countryId,
        status: res.status,
      });
    }

    // HTTP success = ok. Zero plans is a valid empty catalog, not a load failure.
    return {
      ok: true,
      url,
      countryId,
      status: res.status,
      statusText: res.statusText,
      planCount,
      hasFormattedPrices,
      error: hasFormattedPrices
        ? null
        : "Plans missing formatted_price_parts.",
      timestamp,
      data: normalized,
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown network error";

    console.error("[plans-diagnostics] API ping unreachable:", {
      url,
      countryId,
      error: err,
    });

    return {
      ok: false,
      url,
      countryId,
      status: null,
      statusText: null,
      planCount: 0,
      hasFormattedPrices: false,
      error: message,
      timestamp,
    };
  }
}
