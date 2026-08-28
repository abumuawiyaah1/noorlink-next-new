const STRIPE_CHECKOUT_HOSTS = new Set([
  "checkout.stripe.com",
  "pay.stripe.com",
]);

const TRUSTED_QR_HOSTS = new Set([
  "api.qrserver.com",
  "chart.googleapis.com",
  "quickchart.io",
]);

function parseHttpsUrl(value: string | null | undefined): URL | null {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}

export function isSafeStripeCheckoutUrl(value: string | null | undefined): boolean {
  const url = parseHttpsUrl(value);
  if (!url) return false;
  return STRIPE_CHECKOUT_HOSTS.has(url.hostname);
}

export function isSafeQrCodeUrl(value: string | null | undefined): boolean {
  const url = parseHttpsUrl(value);
  if (!url) return false;
  if (url.hostname.endsWith(".noorlink.co") || url.hostname === "noorlink.co") {
    return true;
  }
  return TRUSTED_QR_HOSTS.has(url.hostname);
}

export function safeExternalHref(
  value: string | null | undefined,
  validator: (v: string | null | undefined) => boolean,
): string | undefined {
  if (!value || !validator(value)) return undefined;
  return value.trim();
}
