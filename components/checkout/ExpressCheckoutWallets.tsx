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
import { attributionPayloadForCheckout } from "@/lib/attribution";
import { debug, debugError } from "@/lib/debug";

type ExpressPayload = {
  email: string;
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
  amountCents: number;
  currency?: string;
  payload: ExpressPayload;
  disabled?: boolean;
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

function ExpressCheckoutInner({
  payload,
  disabled,
  onError,
}: {
  payload: ExpressPayload;
  disabled?: boolean;
  onError?: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onConfirm(event: StripeExpressCheckoutElementConfirmEvent) {
    if (!stripe || !elements || disabled || busy) return;
    setBusy(true);
    onError?.("");

    const { error: submitError } = await elements.submit();
    if (submitError) {
      onError?.(submitError.message || "Payment could not start.");
      setBusy(false);
      return;
    }

    try {
      const body: Record<string, unknown> = {
        email: payload.email.trim(),
        country: payload.country,
        price: payload.price,
      };
      if (payload.flag) body.flag = payload.flag;
      if (payload.travelDate) body.travelDate = payload.travelDate;
      if (payload.packageId) body.packageId = payload.packageId;
      if (payload.promoCode) body.promoCode = payload.promoCode;
      if (payload.affiliateRef) body.affiliateRef = payload.affiliateRef;
      if (payload.wantsTopUp) body.wantsTopUp = true;
      const attribution = attributionPayloadForCheckout();
      if (attribution) body.attribution = attribution;

      debug("checkout", "express payment-intent →");
      const res = await fetch(`${API_BASE}/api/checkout/payment-intent`, {
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
        throw new Error(
          typeof detail === "string"
            ? detail
            : typeof data.message === "string"
              ? data.message
              : "Could not start wallet payment.",
        );
      }

      const clientSecret =
        (typeof data.clientSecret === "string" && data.clientSecret) ||
        (typeof data.client_secret === "string" && data.client_secret) ||
        "";
      if (!clientSecret) throw new Error("Missing payment secret.");

      const returnUrl = `${window.location.origin}/success?email=${encodeURIComponent(payload.email.trim())}`;
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: returnUrl,
          receipt_email: payload.email.trim(),
        },
      });

      if (error) {
        onError?.(error.message || "Wallet payment failed.");
        setBusy(false);
      }
      // On success Stripe redirects to return_url
    } catch (err) {
      debugError("checkout", "express confirm failed", err);
      onError?.(
        err instanceof Error ? err.message : "Wallet payment failed.",
      );
      setBusy(false);
    }
  }

  if (disabled) {
    return (
      <p className="checkout-express__hint">
        Enter your email above to enable Apple Pay, Google Pay, or Link.
      </p>
    );
  }

  return (
    <div className={`checkout-express__element${busy ? " is-busy" : ""}`}>
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
      {!ready && (
        <p className="checkout-express__hint">
          Loading wallet buttons…
        </p>
      )}
    </div>
  );
}

export function ExpressCheckoutWallets(props: Props) {
  const [stripe, setStripe] = useState<Awaited<ReturnType<typeof loadStripe>>>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const emailOk = props.payload.email.includes("@") && props.payload.email.includes(".");

  useEffect(() => {
    let cancelled = false;
    void getStripe()
      .then((instance) => {
        if (!cancelled) setStripe(instance);
      })
      .catch((err) => {
        if (!cancelled) {
          setLoadError(
            err instanceof Error ? err.message : "Could not load wallets.",
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const options = useMemo(
    () => ({
      mode: "payment" as const,
      amount: Math.max(50, props.amountCents),
      currency: (props.currency || "usd").toLowerCase(),
      appearance: {
        variables: {
          borderRadius: "10px",
          colorPrimary: "#0F3D3E",
        },
      },
    }),
    [props.amountCents, props.currency],
  );

  if (loadError) {
    return <p className="checkout-express__hint">{loadError}</p>;
  }

  if (!stripe || props.amountCents < 50) {
    return (
      <p className="checkout-express__hint">Loading wallet buttons…</p>
    );
  }

  return (
    <div className="checkout-express">
      <p className="checkout-express__label">Express checkout</p>
      <Elements stripe={stripe} options={options} key={props.amountCents}>
        <ExpressCheckoutInner
          payload={props.payload}
          disabled={props.disabled || !emailOk}
          onError={props.onError}
        />
      </Elements>
      <div className="checkout-express__divider">
        <span>or pay another way</span>
      </div>
    </div>
  );
}
