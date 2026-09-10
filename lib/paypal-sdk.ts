"use client";

/** Shared PayPal SDK boot helpers for checkout + order top-up. */

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

export async function loadPayPalSdk(
  clientId: string,
  mode?: string,
): Promise<PayPalNamespace | null> {
  if (typeof window === "undefined") return null;
  if (window.paypal) return window.paypal;

  if (!paypalSdkPromise) {
    paypalSdkPromise = new Promise<PayPalNamespace | null>((resolve) => {
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
      script.src = `https://${sdkHost(mode)}/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture&disable-funding=paylater,card,credit,venmo`;
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
      if (!paypal) paypalSdkPromise = null;
      return paypal;
    });
  }

  return paypalSdkPromise;
}
