"use client";

import {
  ExpressCheckoutElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, type StripeExpressCheckoutElementConfirmEvent } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";
import { API_BASE } from "@/lib/api-client";
import { createTopUpPaymentIntent } from "@/lib/orders-api";
import type { TopUpPayPalSelection } from "@/components/orders/TopUpPayPalButton";

type Props = {
  orderNumber: string;
  email: string;
  selection: TopUpPayPalSelection;
  amountCents: number;
  disabled?: boolean;
  onBusy?: (busy: boolean) => void;
  onError?: (message: string) => void;
};

let stripePromise: ReturnType<typeof loadStripe> | null = null;

async function getStripe() {
  if (!stripePromise) {
    const res = await fetch(`${API_BASE}/api/checkout/config`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error("Could not load payment configuration.");
    }
    const data = (await res.json()) as { publishableKey?: string; publishable_key?: string };
    const key = data.publishableKey || data.publishable_key;
    if (!key) throw new Error("Stripe publishable key missing.");
    stripePromise = loadStripe(key);
  }
  return stripePromise;
}

function TopUpExpressInner({
  orderNumber,
  email,
  selection,
  disabled,
  onBusy,
  onError,
}: {
  orderNumber: string;
  email: string;
  selection: TopUpPayPalSelection;
  disabled?: boolean;
  onBusy?: (busy: boolean) => void;
  onError?: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onConfirm(_event: StripeExpressCheckoutElementConfirmEvent) {
    if (!stripe || !elements || disabled || busy) return;
    setBusy(true);
    onBusy?.(true);
    onError?.("");

    const { error: submitError } = await elements.submit();
    if (submitError) {
      onError?.(submitError.message || "Payment could not start.");
      setBusy(false);
      onBusy?.(false);
      return;
    }

    try {
      const result = await createTopUpPaymentIntent({
        orderId: orderNumber,
        email,
        fundUsd: selection.kind === "wallet" ? selection.fundUsd : undefined,
        offerId: selection.kind === "package" ? selection.offerId : undefined,
        packageSlug: selection.kind === "package" ? selection.packageSlug : undefined,
        packageCode: selection.kind === "package" ? selection.packageCode : undefined,
        periodNum: selection.kind === "package" ? selection.periodNum : undefined,
      });
      if (!result.success || !result.clientSecret) {
        throw new Error(result.message ?? "Could not start wallet payment.");
      }

      const returnUrl =
        `${window.location.origin}/dashboard` +
        `?orderId=${encodeURIComponent(orderNumber)}` +
        `&email=${encodeURIComponent(email.trim().toLowerCase())}` +
        `&topup=1`;

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: result.clientSecret,
        confirmParams: {
          return_url: returnUrl,
          receipt_email: email.trim().toLowerCase(),
        },
      });

      if (error) {
        onError?.(error.message || "Wallet payment failed.");
        setBusy(false);
        onBusy?.(false);
      }
      // On success Stripe redirects to return_url
    } catch (err) {
      onError?.(err instanceof Error ? err.message : "Wallet payment failed.");
      setBusy(false);
      onBusy?.(false);
    }
  }

  if (disabled) return null;

  return (
    <div className={`order-topup__express-element${busy ? " is-busy" : ""}`}>
      <ExpressCheckoutElement
        options={{
          buttonType: {
            applePay: "buy",
            googlePay: "buy",
            paypal: "buynow",
          },
          paymentMethods: {
            applePay: "auto",
            googlePay: "auto",
            link: "auto",
            paypal: "never",
            amazonPay: "never",
          },
          layout: { maxColumns: 1, maxRows: 3, overflow: "auto" },
        }}
        onReady={({ availablePaymentMethods }) => {
          setReady(Boolean(availablePaymentMethods));
        }}
        onConfirm={onConfirm}
      />
      {!ready ? (
        <p className="order-usage__fine-print">Loading Apple Pay / Google Pay…</p>
      ) : null}
    </div>
  );
}

export function TopUpExpressWallets({
  orderNumber,
  email,
  selection,
  amountCents,
  disabled,
  onBusy,
  onError,
}: Props) {
  const [stripe, setStripe] = useState<Awaited<ReturnType<typeof loadStripe>>>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void getStripe()
      .then((instance) => {
        if (!cancelled) setStripe(instance);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const options = useMemo(
    () => ({
      mode: "payment" as const,
      amount: Math.max(50, amountCents),
      currency: "usd",
      appearance: {
        variables: {
          borderRadius: "10px",
          colorPrimary: "#0F3D3E",
        },
      },
    }),
    [amountCents],
  );

  if (loadError || amountCents < 50) {
    return null;
  }

  if (!stripe) {
    return <p className="order-usage__fine-print">Loading Apple Pay / Google Pay…</p>;
  }

  return (
    <div className="order-topup__express">
      <p className="order-topup__express-label">Express checkout</p>
      <Elements stripe={stripe} options={options} key={amountCents}>
        <TopUpExpressInner
          orderNumber={orderNumber}
          email={email}
          selection={selection}
          disabled={disabled}
          onBusy={onBusy}
          onError={onError}
        />
      </Elements>
      <div className="order-topup__express-divider">
        <span>or pay another way</span>
      </div>
    </div>
  );
}
