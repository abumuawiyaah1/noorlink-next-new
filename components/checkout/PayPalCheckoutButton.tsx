"use client";

import { useEffect, useRef, useState } from "react";
import { API_BASE } from "@/lib/api-client";
import { attributionPayloadForCheckout } from "@/lib/attribution";
import { debug, debugError } from "@/lib/debug";

export type PayPalCheckoutPayload = {
  email?: string;
  country: string;
  price: number;
  flag?: string;
  travelDate?: string;
  packageId?: string;
  promoCode?: string;
  affiliateRef?: string;
  wantsTopUp?: boolean;
};

type Props = {
  payload: PayPalCheckoutPayload;
  disabled?: boolean;
  onError?: (message: string) => void;
};

type PayPalConfig = {
  enabled: boolean;
  clientId?: string;
  mode?: string;
};

type PayPalNamespace = {
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

async function loadPayPalSdk(clientId: string): Promise<PayPalNamespace | null> {
  if (typeof window === "undefined") return null;
  if (window.paypal) return window.paypal;
  if (!paypalSdkPromise) {
    paypalSdkPromise = new Promise((resolve) => {
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
        window.setTimeout(done, 8000);
        return;
      }
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture`;
      script.async = true;
      script.dataset.nlPaypalSdk = "1";
      const finish = () => resolve(window.paypal ?? null);
      script.onload = finish;
      script.onerror = finish;
      window.setTimeout(finish, 8000);
      document.body.appendChild(script);
    });
  }
  return paypalSdkPromise;
}

function checkoutBody(payload: PayPalCheckoutPayload): Record<string, unknown> {
  const body: Record<string, unknown> = {
    country: payload.country,
    price: payload.price,
  };
  const email = payload.email?.trim();
  if (email) body.email = email;
  if (payload.flag) body.flag = payload.flag;
  if (payload.travelDate) body.travelDate = payload.travelDate;
  if (payload.packageId) body.packageId = payload.packageId;
  if (payload.promoCode) body.promoCode = payload.promoCode;
  if (payload.affiliateRef) body.affiliateRef = payload.affiliateRef;
  if (payload.wantsTopUp) body.wantsTopUp = true;
  const attribution = attributionPayloadForCheckout();
  if (attribution) body.attribution = attribution;
  return body;
}

export function PayPalCheckoutButton({ payload, disabled, onError }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let buttons: { close?: () => Promise<void> } | null = null;

    async function boot() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/checkout/paypal/config`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) {
          setVisible(false);
          return;
        }
        const data = (await res.json()) as PayPalConfig;
        if (!data.enabled || !data.clientId) {
          setVisible(false);
          return;
        }
        const paypal = await loadPayPalSdk(data.clientId);
        if (cancelled || !paypal || !hostRef.current) {
          setVisible(false);
          return;
        }

        setVisible(true);
        hostRef.current.innerHTML = "";
        buttons = paypal.Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
            height: 44,
          },
          onClick: (_data: unknown, actions: { reject: () => unknown; resolve: () => unknown }) => {
            if (disabled) {
              onError?.("Checkout is busy. Please wait a moment.");
              return actions.reject();
            }
            if (!payload.packageId?.trim()) {
              onError?.("Missing plan. Please go back and select a plan again.");
              return actions.reject();
            }
            if (payload.price <= 0) {
              onError?.("Invalid plan price. Please go back and select a plan again.");
              return actions.reject();
            }
            return actions.resolve();
          },
          createOrder: async () => {
            debug("checkout", "paypal create-order →");
            const res = await fetch(`${API_BASE}/api/checkout/paypal/create-order`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(checkoutBody(payload)),
            });
            const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
            if (!res.ok) {
              const detail = data.detail;
              throw new Error(
                typeof detail === "string"
                  ? detail
                  : typeof data.message === "string"
                    ? data.message
                    : "Could not start PayPal.",
              );
            }
            const id =
              (typeof data.paypalOrderId === "string" && data.paypalOrderId) ||
              (typeof data.paypal_order_id === "string" && data.paypal_order_id) ||
              "";
            if (!id) throw new Error("PayPal order id missing.");
            return id;
          },
          onApprove: async (data: { orderID?: string }) => {
            const paypalOrderId = data.orderID;
            if (!paypalOrderId) {
              onError?.("PayPal approval missing order id.");
              return;
            }
            debug("checkout", "paypal capture →");
            const res = await fetch(`${API_BASE}/api/checkout/paypal/capture`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ paypalOrderId }),
            });
            const result = (await res.json().catch(() => ({}))) as Record<string, unknown>;
            if (!res.ok) {
              const detail = result.detail;
              throw new Error(
                typeof detail === "string"
                  ? detail
                  : typeof result.message === "string"
                    ? result.message
                    : "PayPal payment failed.",
              );
            }
            const orderId =
              (typeof result.orderId === "string" && result.orderId) ||
              (typeof result.order_id === "string" && result.order_id) ||
              "";
            const email =
              (typeof result.email === "string" && result.email) ||
              payload.email?.trim() ||
              "";
            const params = new URLSearchParams();
            if (orderId) params.set("orderId", orderId);
            if (email) params.set("email", email);
            params.set("paypal", "1");
            window.location.assign(`/success?${params.toString()}`);
          },
          onError: (err: unknown) => {
            debugError("checkout", "paypal button error", err);
            onError?.(
              err instanceof Error ? err.message : "PayPal could not complete payment.",
            );
          },
          onCancel: () => {
            onError?.("");
          },
        });
        await buttons.render(hostRef.current);
      } catch (err) {
        debugError("checkout", "paypal boot failed", err);
        if (!cancelled) setVisible(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void boot();
    return () => {
      cancelled = true;
      void buttons?.close?.();
    };
  }, [
    disabled,
    onError,
    payload.affiliateRef,
    payload.country,
    payload.email,
    payload.flag,
    payload.packageId,
    payload.price,
    payload.promoCode,
    payload.travelDate,
    payload.wantsTopUp,
  ]);

  if (!visible && !loading) return null;

  return (
    <div className="checkout-paypal">
      <p className="checkout-express__label">Pay with PayPal</p>
      {loading && !visible ? (
        <p className="checkout-express__hint">Loading PayPal…</p>
      ) : null}
      <div ref={hostRef} className="checkout-paypal__host" />
    </div>
  );
}
