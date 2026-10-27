import {
  normalizeCurrency,
  type CurrencyCode,
} from "@/lib/currency/config";

/**
 * Currencies enabled on the NoorLink PayPal Business account for checkout.
 * Anything else falls back to USD on the PayPal order + SDK.
 */
export const PAYPAL_CHARGE_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "CAD",
  "MXN",
] as const;

export type PayPalChargeCurrency = (typeof PAYPAL_CHARGE_CURRENCIES)[number];

export function isPayPalChargeCurrency(
  value: string | null | undefined,
): value is PayPalChargeCurrency {
  return !!value && (PAYPAL_CHARGE_CURRENCIES as readonly string[]).includes(
    value.toUpperCase(),
  );
}

/** Currency to pass to PayPal JS SDK + Orders API. */
export function resolvePayPalChargeCurrency(
  preferred: string | null | undefined,
): PayPalChargeCurrency {
  const code = normalizeCurrency(preferred);
  return isPayPalChargeCurrency(code) ? code : "USD";
}

export function paypalChargesInLocal(currency: CurrencyCode): boolean {
  return currency !== "USD" && isPayPalChargeCurrency(currency);
}
