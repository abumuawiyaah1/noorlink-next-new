"use client";

import { useEffect, useState } from "react";
import { createTopUpSession, fetchTopUpOptions } from "@/lib/orders-api";

type OrderTopUpCardProps = {
  orderNumber: string;
  email: string;
};

export function OrderTopUpCard({ orderNumber, email }: OrderTopUpCardProps) {
  const [amounts, setAmounts] = useState<number[]>([]);
  const [reason, setReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await fetchTopUpOptions(email, orderNumber);
      if (cancelled) return;
      setLoading(false);
      if (result.supported && result.amountsUsd?.length) {
        setAmounts(result.amountsUsd);
      } else {
        setReason(result.reason ?? "Top-up is not available for this plan.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [email, orderNumber]);

  if (loading) {
    return null;
  }

  if (!amounts.length) {
    if (reason) {
      return (
        <p className="order-usage__fine-print" style={{ marginTop: 12 }}>
          {reason}
        </p>
      );
    }
    return null;
  }

  async function handleTopUp(fundUsd: number) {
    setError(null);
    setSubmitting(fundUsd);
    const result = await createTopUpSession({
      orderId: orderNumber,
      email,
      fundUsd,
    });
    setSubmitting(null);
    if (!result.success || !result.checkoutUrl) {
      setError(result.message ?? "Could not start top-up checkout.");
      return;
    }
    window.location.href = result.checkoutUrl;
  }

  return (
    <div className="order-topup">
      <div className="order-usage__label-row">
        <span>Need more data?</span>
        <strong>Add data to this eSIM</strong>
      </div>
      <p className="order-usage__fine-print" style={{ marginBottom: 12 }}>
        Pay-as-you-go top-up — funds are added to your existing line. Install stays the same.
      </p>
      <div className="order-topup__amounts">
        {amounts.map((amount) => (
          <button
            key={amount}
            type="button"
            className="order-topup__btn"
            disabled={submitting != null}
            onClick={() => handleTopUp(amount)}
          >
            {submitting === amount ? "Starting…" : `$${amount} data`}
          </button>
        ))}
      </div>
      {error ? (
        <p className="error-message" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
