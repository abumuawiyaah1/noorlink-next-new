import { API_BASE } from "@/lib/api-client";
import { attributionPayloadForCheckout } from "@/lib/attribution";
import { debug, debugError } from "@/lib/debug";

export type CheckoutSessionPayload = {
  email: string;
  country: string;
  price: number;
  flag?: string;
  phone?: string;
  travelDate?: string;
  packageId?: string;
  promoCode?: string;
  affiliateRef?: string;
  wantsTopUp?: boolean;
  isGift?: boolean;
  gift?: {
    recipientEmail: string;
    recipientName: string;
    giftMessage?: string;
    senderName?: string;
  };
};

export type CheckoutSessionResult = {
  success: boolean;
  sessionId?: string;
  checkoutUrl?: string;
  orderId?: string;
  message?: string;
  error?: string;
  discountAmount?: number;
  finalPrice?: number;
  promoCode?: string;
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
  if (payload.phone) body.phone = payload.phone.trim();
  if (payload.travelDate) body.travelDate = payload.travelDate;
  if (payload.packageId) body.packageId = payload.packageId;
  if (payload.promoCode) body.promoCode = payload.promoCode.trim().toUpperCase();
  if (payload.affiliateRef) body.affiliateRef = payload.affiliateRef.trim().toUpperCase();
  if (payload.wantsTopUp) body.wantsTopUp = true;
  if (payload.isGift) {
    body.isGift = true;
    if (payload.gift) body.gift = payload.gift;
  }
  const attribution = attributionPayloadForCheckout();
  if (attribution) body.attribution = attribution;

  debug("checkout", "createCheckoutSession →", {
    url,
    country: body.country,
    price: body.price,
    packageId: body.packageId,
    email: typeof body.email === "string" ? `${String(body.email).slice(0, 3)}…` : undefined,
  });

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
    debugError("checkout", "network error", err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "Could not reach the payment service.",
    };
  }

  let data: Record<string, unknown> = {};
  let rawText = "";
  try {
    rawText = await res.text();
    data = rawText ? (JSON.parse(rawText) as Record<string, unknown>) : {};
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
            : rawText && !rawText.startsWith("<")
              ? rawText.slice(0, 240)
              : `Payment setup failed (${res.status}).`;
    debugError("checkout", "session failed", { status: res.status, message });
    return { success: false, error: message };
  }

  const checkoutUrl =
    (typeof data.checkoutUrl === "string" && data.checkoutUrl) ||
    (typeof data.checkout_url === "string" && data.checkout_url) ||
    undefined;

  const result = {
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
    discountAmount:
      typeof data.discountAmount === "number"
        ? data.discountAmount
        : typeof data.discount_amount === "number"
          ? data.discount_amount
          : undefined,
    finalPrice:
      typeof data.finalPrice === "number"
        ? data.finalPrice
        : typeof data.final_price === "number"
          ? data.final_price
          : undefined,
    promoCode:
      typeof data.promoCode === "string"
        ? data.promoCode
        : typeof data.promo_code === "string"
          ? data.promo_code
          : undefined,
  };
  debug("checkout", "session created", {
    sessionId: result.sessionId,
    orderId: result.orderId,
    hasCheckoutUrl: Boolean(result.checkoutUrl),
  });
  return result;
}
