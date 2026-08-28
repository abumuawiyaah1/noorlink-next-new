import { API_BASE } from "@/lib/api-client";
import { debug, debugError } from "@/lib/debug";

export type LookedUpOrder = {
  id?: string;
  orderNumber?: string;
  email?: string;
  country?: string;
  flag?: string;
  packageName?: string;
  price?: number;
  currency?: string;
  status?: string;
  createdAt?: string;
  qrCodeUrl?: string | null;
  activationCode?: string | null;
  dataUsedGb?: number | null;
  dataTotalGb?: number | null;
  validityDays?: number | null;
  daysRemaining?: number | null;
  dataRemainingGb?: number | null;
  fulfillmentPending?: boolean;
  allowanceStatus?: string | null;
};

async function parseLookupResponse(
  response: Response,
): Promise<{ found: boolean; order: LookedUpOrder | null; error?: string; message?: string }> {
  const data = (await response.json().catch(() => ({}))) as {
    found?: boolean;
    order?: LookedUpOrder | null;
    detail?: string;
    message?: string;
  };
  if (!response.ok) {
    const error = data.detail ?? data.message ?? "Could not look up this order.";
    return { found: false, order: null, error };
  }
  return {
    found: Boolean(data.found),
    order: data.order ?? null,
    message: data.message,
  };
}

export async function lookupOrder(
  email: string,
  orderId: string,
): Promise<{ found: boolean; order: LookedUpOrder | null; error?: string }> {
  const params = new URLSearchParams({
    email: email.trim(),
    orderId: orderId.trim(),
  });
  const url = `${API_BASE}/api/orders/lookup?${params.toString()}`;
  debug("orders", "lookupOrder →", { orderId: orderId.trim() });

  try {
    const response = await fetch(url, { method: "GET" });
    const result = await parseLookupResponse(response);
    debug("orders", "lookup result", {
      found: result.found,
      status: result.order?.status,
    });
    return result;
  } catch (err) {
    debugError("orders", "network error", err);
    return {
      found: false,
      order: null,
      error: err instanceof Error ? err.message : "Lookup failed.",
    };
  }
}

export async function lookupOrderBySession(
  sessionId: string,
  email: string,
): Promise<{ found: boolean; order: LookedUpOrder | null; error?: string; message?: string }> {
  const params = new URLSearchParams({
    sessionId: sessionId.trim(),
    email: email.trim(),
  });
  const url = `${API_BASE}/api/orders/by-session?${params.toString()}`;
  debug("orders", "lookupOrderBySession →", { sessionId: sessionId.slice(0, 12) });

  try {
    const response = await fetch(url, { method: "GET" });
    return await parseLookupResponse(response);
  } catch (err) {
    debugError("orders", "session lookup network error", err);
    return {
      found: false,
      order: null,
      error: err instanceof Error ? err.message : "Lookup failed.",
    };
  }
}

export async function lookupOrderByPaymentIntent(
  paymentIntentId: string,
  email: string,
): Promise<{ found: boolean; order: LookedUpOrder | null; error?: string; message?: string }> {
  const params = new URLSearchParams({
    paymentIntentId: paymentIntentId.trim(),
    email: email.trim(),
  });
  const url = `${API_BASE}/api/orders/by-payment-intent?${params.toString()}`;
  debug("orders", "lookupOrderByPaymentIntent →", {
    paymentIntentId: paymentIntentId.slice(0, 12),
  });

  try {
    const response = await fetch(url, { method: "GET" });
    return await parseLookupResponse(response);
  } catch (err) {
    debugError("orders", "payment intent lookup network error", err);
    return {
      found: false,
      order: null,
      error: err instanceof Error ? err.message : "Lookup failed.",
    };
  }
}
