"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { API_BASE } from "@/lib/api-client";
import {
  captureTopUpPayPal,
  createTopUpPayPalOrder,
} from "@/lib/orders-api";
import { loadPayPalSdk, resolvePayPalConfig } from "@/lib/paypal-sdk";

export type TopUpPayPalSelection =
  | { kind: "wallet"; fundUsd: number }
  | {
      kind: "package";
      offerId: string;
      packageSlug?: string | null;
      packageCode?: string | null;
      periodNum?: number | null;
    };

type Props = {
  orderNumber: string;
  email: string;
  selection: TopUpPayPalSelection;
  disabled?: boolean;
  onError?: (message: string) => void;
  onBusy?: (busy: boolean) => void;
};

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

export function TopUpPayPalButton({
  orderNumber,
  email,
  selection,
  disabled,
  onError,
  onBusy,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const selectionRef = useRef(selection);
  const disabledRef = useRef(disabled);
  const onErrorRef = useRef(onError);
  const onBusyRef = useRef(onBusy);
  selectionRef.current = selection;
  disabledRef.current = disabled;
  onErrorRef.current = onError;
  onBusyRef.current = onBusy;

  const [status, setStatus] = useState<"loading" | "ready" | "hidden">("loading");

  const selectionKey =
    selection.kind === "wallet"
      ? `wallet-${selection.fundUsd}`
      : `pkg-${selection.offerId}`;

  useEffect(() => {
    let cancelled = false;
    let buttons: {
      render: (el: HTMLElement) => Promise<void>;
      close?: () => Promise<void>;
    } | null = null;

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
          setStatus("hidden");
          return;
        }

        const host = await waitForHost(hostRef, () => cancelled);
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
            height: 40,
          },
          onClick: (
            _data: unknown,
            actions: { reject: () => unknown; resolve: () => unknown },
          ) => {
            if (disabledRef.current) {
              onErrorRef.current?.("Checkout is busy. Please wait a moment.");
              return actions.reject();
            }
            return actions.resolve();
          },
          createOrder: async () => {
            onBusyRef.current?.(true);
            const current = selectionRef.current;
            const result = await createTopUpPayPalOrder({
              orderId: orderNumber,
              email,
              fundUsd: current.kind === "wallet" ? current.fundUsd : undefined,
              offerId: current.kind === "package" ? current.offerId : undefined,
              packageSlug:
                current.kind === "package" ? current.packageSlug : undefined,
              packageCode:
                current.kind === "package" ? current.packageCode : undefined,
              periodNum:
                current.kind === "package" ? current.periodNum : undefined,
            });
            if (!result.success || !result.paypalOrderId) {
              onBusyRef.current?.(false);
              throw new Error(result.message ?? "Could not start PayPal.");
            }
            return result.paypalOrderId;
          },
          onApprove: async (data: { orderID?: string }) => {
            const paypalOrderId = data.orderID;
            if (!paypalOrderId) {
              onBusyRef.current?.(false);
              onErrorRef.current?.("PayPal approval missing order id.");
              return;
            }
            const result = await captureTopUpPayPal({
              orderId: orderNumber,
              email,
              paypalOrderId,
            });
            onBusyRef.current?.(false);
            if (!result.success) {
              onErrorRef.current?.(result.message ?? "PayPal top-up failed.");
              return;
            }
            const params = new URLSearchParams({
              orderId: orderNumber,
              email,
              topup: "1",
              paypal: "1",
            });
            window.location.assign(`/dashboard?${params.toString()}`);
          },
          onError: (err: unknown) => {
            onBusyRef.current?.(false);
            onErrorRef.current?.(
              err instanceof Error ? err.message : "PayPal could not complete payment.",
            );
          },
          onCancel: () => {
            onBusyRef.current?.(false);
            onErrorRef.current?.("");
          },
        });
        await buttons.render(host);
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("hidden");
      }
    }

    void boot();
    return () => {
      cancelled = true;
      void buttons?.close?.();
    };
  }, [selectionKey, orderNumber, email]);

  if (status === "hidden") return null;

  return (
    <div className="order-topup__paypal">
      {status === "loading" ? (
        <p className="order-usage__fine-print">Loading PayPal…</p>
      ) : null}
      <div ref={hostRef} className="order-topup__paypal-host" />
    </div>
  );
}
