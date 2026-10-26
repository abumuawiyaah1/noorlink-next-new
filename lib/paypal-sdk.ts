"use client";

/** Shared PayPal SDK boot helpers for checkout + order top-up. */

import { paypalSdkLocale } from "@/lib/i18n/payment-locale";

export type PayPalConfig = {
  enabled: boolean;
  clientId?: string;
  mode?: string;
};

export type PayPalNamespace = {
  FUNDING?: { PAYPAL?: string };
  Buttons: (options: Record<string, unknown>) => {
    render: (el: HTMLElement) => Promise<void>;
    close?: () => Promise<void>;
  };
};

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

let paypalSdkPromise: Promise<PayPalNamespace | null> | null = null;
/** PayPal `locale` the in-flight / loaded SDK script was requested with. */
let paypalSdkLoadedLocale: string | null = null;

function sdkHost(mode?: string): string {
  return mode === "live" ? "www.paypal.com" : "www.sandbox.paypal.com";
}

/** Prefer public env (no proxy round-trip); fall back to API config. */
export async function resolvePayPalConfig(
  configUrl: string,
): Promise<PayPalConfig | null> {
  const envClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.trim();
  const envMode = process.env.NEXT_PUBLIC_PAYPAL_MODE?.trim() || "sandbox";
  if (envClientId) {
    return { enabled: true, clientId: envClientId, mode: envMode };
  }

  try {
    const res = await fetch(configUrl, { headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    return (await res.json()) as PayPalConfig;
  } catch {
    return null;
  }
}

/** Drop a previously loaded SDK so it can be re-requested with another locale. */
function resetPayPalSdk() {
  document
    .querySelectorAll('script[data-nl-paypal-sdk="1"]')
    .forEach((node) => node.remove());
  delete window.paypal;
  paypalSdkPromise = null;
  paypalSdkLoadedLocale = null;
}

/**
 * Loads the PayPal JS SDK once per site locale.
 * `locale` is the NoorLink site locale (en | es | ar); it is mapped to PayPal's
 * `locale` query param. PayPal controls the actual button copy.
 */
export async function loadPayPalSdk(
  clientId: string,
  mode?: string,
  locale?: string | null,
): Promise<PayPalNamespace | null> {
  if (typeof window === "undefined") return null;

  const sdkLocale = paypalSdkLocale(locale);
  if (paypalSdkLoadedLocale && paypalSdkLoadedLocale !== sdkLocale) {
    // Language switcher changed the locale after the SDK loaded.
    resetPayPalSdk();
  }
  if (window.paypal) return window.paypal;

  if (!paypalSdkPromise) {
    paypalSdkLoadedLocale = sdkLocale;
    const request: Promise<PayPalNamespace | null> = new Promise<PayPalNamespace | null>((resolve) => {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[data-nl-paypal-sdk="1"]',
      );
      if (existing) {
        if (window.paypal) {
          resolve(window.paypal);
          return;
        }
        const done = () => resolve(window.paypal ?? null);
        existing.addEventListener("load", done);
        existing.addEventListener("error", done);
        window.setTimeout(done, 12000);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://${sdkHost(mode)}/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture&disable-funding=paylater,card,credit,venmo&locale=${encodeURIComponent(sdkLocale)}`;
      script.async = true;
      script.dataset.nlPaypalSdk = "1";
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        resolve(window.paypal ?? null);
      };
      script.onload = finish;
      script.onerror = finish;
      window.setTimeout(finish, 12000);
      document.body.appendChild(script);
    }).then((paypal) => {
      // Only clear shared state if a newer (other-locale) request hasn't replaced us.
      if (!paypal && paypalSdkPromise === request) {
        paypalSdkPromise = null;
        paypalSdkLoadedLocale = null;
      }
      return paypal;
    });
    paypalSdkPromise = request;
  }

  return paypalSdkPromise;
}
