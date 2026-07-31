/**
 * Client helpers for the NoorLink Automation backend
 * (repo: abumuawiyaah1/noorlink-automation on Railway).
 *
 * Browser calls use same-origin `/api/...` (see lib/api-client.ts),
 * which is proxied by app/api/[[...path]]/route.ts → BACKEND_API_URL.
 */
import { API_BASE } from "@/lib/api-client";

function apiUrl(path: string): string {
  const base = API_BASE.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export type AutomationOrder = {
  id: string;
  orderNumber: string;
  email: string;
  country: string;
  flag?: string | null;
  packageName: string;
  price: number;
  currency: string;
  status: string;
  createdAt: string;
  qrCodeUrl?: string | null;
  activationCode?: string | null;
  dataUsedGb?: number | null;
  dataTotalGb?: number | null;
};

export type OrderLookupResult = {
  found: boolean;
  order: AutomationOrder | null;
};

export type CheckoutSessionResult = {
  success: boolean;
  sessionId?: string | null;
  checkoutUrl?: string | null;
  orderId?: string | null;
  message?: string | null;
};

async function readError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { detail?: string; error?: string };
    if (body.detail) return body.detail;
    if (body.error) return body.error;
  } catch {
    // ignore
  }
  return `Request failed (${res.status})`;
}

/** GET /api/orders/lookup → noorlink-automation */
export async function lookupOrder(
  orderId: string,
  email: string,
): Promise<OrderLookupResult> {
  const params = new URLSearchParams({
    orderId: orderId.trim(),
    email: email.trim(),
  });
  const url = apiUrl(`/api/orders/lookup?${params.toString()}`);
  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(await readError(res));
  }
  return (await res.json()) as OrderLookupResult;
}

/** POST /api/checkout/session → creates order + Stripe Checkout URL */
export async function createCheckoutSession(input: {
  country: string;
  price: number;
  email: string;
  flag?: string;
  travelDate?: string;
  packageId?: string;
}): Promise<CheckoutSessionResult> {
  const url = apiUrl("/api/checkout/session");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: input.country,
      price: input.price,
      email: input.email,
      flag: input.flag,
      travelDate: input.travelDate,
      packageId: input.packageId,
    }),
  });
  if (!res.ok) {
    throw new Error(await readError(res));
  }
  return (await res.json()) as CheckoutSessionResult;
}
