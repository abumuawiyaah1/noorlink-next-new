import { API_BASE } from "@/lib/api-client";

export type PromoValidatePayload = {
  code: string;
  country: string;
  price: number;
  packageId: string;
};

export type PromoValidateResult = {
  valid: boolean;
  code?: string;
  percentOff?: number;
  discountAmount?: number;
  finalPrice?: number;
  message?: string;
  endsAt?: string;
  error?: string;
};

export async function validatePromoCode(
  payload: PromoValidatePayload,
): Promise<PromoValidateResult> {
  const url = `${API_BASE}/api/promo/validate`;
  const body: Record<string, unknown> = {
    code: payload.code.trim(),
    country: payload.country.trim(),
    price: payload.price,
    packageId: payload.packageId.trim(),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) {
      const detail = data.detail;
      return {
        valid: false,
        error:
          typeof detail === "string"
            ? detail
            : typeof data.message === "string"
              ? data.message
              : "Could not validate promo code.",
      };
    }

    return {
      valid: Boolean(data.valid),
      code:
        (typeof data.code === "string" && data.code) ||
        (typeof payload.code === "string" ? payload.code.trim().toUpperCase() : undefined),
      percentOff:
        typeof data.percentOff === "number"
          ? data.percentOff
          : typeof data.percent_off === "number"
            ? data.percent_off
            : undefined,
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
      message: typeof data.message === "string" ? data.message : undefined,
      endsAt:
        typeof data.endsAt === "string"
          ? data.endsAt
          : typeof data.ends_at === "string"
            ? data.ends_at
            : undefined,
    };
  } catch (err) {
    return {
      valid: false,
      error:
        err instanceof Error
          ? err.message
          : "Could not reach the promo service.",
    };
  }
}
