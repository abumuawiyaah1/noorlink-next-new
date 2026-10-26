/**
 * Site locale → payment-provider *client SDK* locale codes.
 *
 * Only used for Stripe Elements (Express Checkout wallets) and the PayPal JS SDK
 * loaded in the browser. Hosted Stripe Checkout Sessions are created by the backend
 * (which receives `language` on the API body) — we do not invent a locale there.
 *
 * Provider UIs still depend on what Stripe / PayPal / Apple Pay / Google Pay
 * actually translate; passing the locale just opts in.
 */

import type { StripeElementLocale } from "@stripe/stripe-js";
import { normalizeLocale } from "@/lib/i18n/config";

/**
 * Stripe Elements `locale` option.
 * `es-419` is Stripe's Latin-American Spanish (matches our /es = Spanish LatAm).
 */
export function stripeElementsLocale(
  locale?: string | null,
): StripeElementLocale {
  switch (normalizeLocale(locale)) {
    case "es":
      return "es-419";
    case "ar":
      return "ar";
    default:
      return "en";
  }
}

/** PayPal JS SDK `locale` query param (supported ICU-style codes). */
export function paypalSdkLocale(locale?: string | null): string {
  switch (normalizeLocale(locale)) {
    case "es":
      return "es_ES";
    case "ar":
      return "ar_EG";
    default:
      return "en_US";
  }
}
