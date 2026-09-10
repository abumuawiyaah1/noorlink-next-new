"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { API_BASE } from "@/lib/api-client";
import { attributionPayloadForCheckout } from "@/lib/attribution";
import { debug, debugError } from "@/lib/debug";
import { loadPayPalSdk, resolvePayPalConfig } from "@/lib/paypal-sdk";

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

async function waitForHost(
  ref: RefObject<HTMLDivElement | null>,
  cancelled: () => boolean,
): Promise<HTMLDivElement | null> {
  for (let i = 0; i < 20; i++) {
    if (cancelled()) return null;
    if (ref.current) return ref.current;
    await new Promise((r) => window.setTimeout(r, 50));
  }
  return ref.current;
}

export function PayPalCheckoutButton({ payload, disabled, onError }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const payloadRef = useRef(payload);
  const disabledRef = useRef(disabled);
  const onErrorRef = useRef(onError);
  payloadRef.current = payload;
  disabledRef.current = disabled;
  onErrorRef.current = onError;

  const [status, setStatus] = useState<"loading" | "ready" | "hidden">("loading");

  const packageId = payload.packageId ?? "";
  const price = payload.price;

  useEffect(() => {
    let cancelled = false;
    let buttons: {
      render: (el: HTMLElement) => Promise<void>;
      close?: () => Promise<void>;
    } | null = null;
    const isCancelled = () => cancelled;

    async function boot() {
      try {
        const data = await resolvePayPalConfig(
          `${API_BASE || ""}/api/checkout/paypal/config`,
        );
        if (cancelled) return;
        if (!data?.enabled || !data.clientId) {
          setStatus("hidden");
          return;
        }

        const paypal = await loadPayPalSdk(data.clientId, data.mode);
        if (cancelled) return;
        if (!paypal) {
          debugError("checkout", "paypal sdk missing after load");
          setStatus("hidden");
          return;
        }

        const host = await waitForHost(hostRef, isCancelled);
        if (cancelled || !host) {
          if (!cancelled) setStatus("hidden");
          return;
        }

        host.innerHTML = "";
        buttons = paypal.Buttons({
          fundingSource: paypal.FUNDING?.PAYPAL ?? "paypal",
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
            height: 44,
          },
          onClick: (
            _data: unknown,
            actions: { reject: () => unknown; resolve: () => unknown },
          ) => {
            const current = payloadRef.current;
            if (disabledRef.current) {
              onErrorRef.current?.("Checkout is busy. Please wait a moment.");
              return actions.reject();
            }
            if (!current.packageId?.trim()) {
              onErrorRef.current?.(
                "Missing plan. Please go back and select a plan again.",
              );
              return actions.reject();
            }
            if (current.price <= 0) {
              onErrorRef.current?.(
                "Invalid plan price. Please go back and select a plan again.",
              );
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
              body: JSON.stringify(checkoutBody(payloadRef.current)),
            });
            const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
            if (!res.ok) {
              const detail = body.detail;
              throw new Error(
                typeof detail === "string"
                  ? detail
                  : typeof body.message === "string"
                    ? body.message
                    : "Could not start PayPal.",
              );
            }
            const id =
              (typeof body.paypalOrderId === "string" && body.paypalOrderId) ||
              (typeof body.paypal_order_id === "string" && body.paypal_order_id) ||
              "";
            if (!id) throw new Error("PayPal order id missing.");
            return id;
          },
          onApprove: async (data: { orderID?: string }) => {
            const paypalOrderId = data.orderID;
            if (!paypalOrderId) {
              onErrorRef.current?.("PayPal approval missing order id.");
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
              payloadRef.current.email?.trim() ||
              "";
            const params = new URLSearchParams();
            if (orderId) params.set("orderId", orderId);
            if (email) params.set("email", email);
            params.set("paypal", "1");
            window.location.assign(`/success?${params.toString()}`);
          },
          onError: (err: unknown) => {
            debugError("checkout", "paypal button error", err);
            onErrorRef.current?.(
              err instanceof Error ? err.message : "PayPal could not complete payment.",
            );
          },
          onCancel: () => {
            onErrorRef.current?.("");
          },
        });
        await buttons.render(host);
        if (!cancelled) setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        debugError("checkout", "paypal boot failed", err);
        setStatus("hidden");
      }
    }

    void boot();
    return () => {
      cancelled = true;
      void buttons?.close?.();
    };
  }, [packageId, price]);

  if (status === "hidden") return null;

  return (
    <div className="checkout-paypal">
      <p className="checkout-express__label">Pay with PayPal</p>
      {status === "loading" ? (
        <p className="checkout-express__hint">Loading PayPal…</p>
      ) : null}
      <div ref={hostRef} className="checkout-paypal__host" />
    </div>
  );
}
