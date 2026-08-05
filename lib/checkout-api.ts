import { API_BASE } from "@/lib/api-client";

export type CheckoutSessionPayload = {
  email: string;
  country: string;
  price: number;
  flag?: string;
  travelDate?: string;
  packageId?: string;
};

export type CheckoutSessionResult = {
  success: boolean;
  sessionId?: string;
  checkoutUrl?: string;
  orderId?: string;
  message?: string;
  error?: string;
};

/**
 * Creates a Stripe Hosted Checkout session via the FastAPI backend.
 * Prefer same-origin `/api/...` when API_BASE is empty (Cloudflare proxy).
 */
export async function createCheckoutSession(
  payload: CheckoutSessionPayload,
): Promise<CheckoutSessionResult> {
  const base = API_BASE; // '' in prod proxy mode; absolute URL when set
  const url = `${base}/api/checkout/session`;

  const body: Record<string, unknown> = {
    email: payload.email.trim(),
    country: payload.country,
    price: payload.price,
  };
  if (payload.flag) body.flag = payload.flag;
  if (payload.travelDate) body.travelDate = payload.travelDate;
  if (payload.packageId) body.packageId = payload.packageId;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "Could not reach the payment service.",
    };
  }

  let data: Record<string, unknown> = {};
  try {
    data = (await res.json()) as Record<string, unknown>;
  } catch {
    data = {};
  }

  if (!res.ok) {
    const detail = data.detail;
    const message =
      typeof detail === "string"
        ? detail
        : typeof data.error === "string"
          ? data.error
          : typeof data.message === "string"
            ? data.message
            : `Payment setup failed (${res.status}).`;
    return { success: false, error: message };
  }

  const checkoutUrl =
    (typeof data.checkoutUrl === "string" && data.checkoutUrl) ||
    (typeof data.checkout_url === "string" && data.checkout_url) ||
    undefined;

  return {
    success: Boolean(data.success ?? true),
    sessionId:
      (typeof data.sessionId === "string" && data.sessionId) ||
      (typeof data.session_id === "string" && data.session_id) ||
      undefined,
    checkoutUrl,
    orderId:
      (typeof data.orderId === "string" && data.orderId) ||
      (typeof data.order_id === "string" && data.order_id) ||
      undefined,
    message: typeof data.message === "string" ? data.message : undefined,
  };
}
