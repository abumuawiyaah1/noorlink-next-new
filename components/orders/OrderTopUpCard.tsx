"use client";

import { useEffect, useState } from "react";
import { TopUpPayPalButton, type TopUpPayPalSelection } from "@/components/orders/TopUpPayPalButton";
import {
  createTopUpSession,
  fetchTopUpOptions,
  type TopUpPackageOffer,
} from "@/lib/orders-api";

type OrderTopUpCardProps = {
  orderNumber: string;
  email: string;
};

function formatRetail(usd: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: usd % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(usd);
}

export function OrderTopUpCard({ orderNumber, email }: OrderTopUpCardProps) {
  const [mode, setMode] = useState<"wallet" | "access_package" | null>(null);
  const [amounts, setAmounts] = useState<number[]>([]);
  const [packages, setPackages] = useState<TopUpPackageOffer[]>([]);
  const [paypalAvailable, setPaypalAvailable] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState<TopUpPayPalSelection | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await fetchTopUpOptions(email, orderNumber);
      if (cancelled) return;
      setLoading(false);
      setPaypalAvailable(Boolean(result.paypalAvailable));
      if (!result.supported) {
        setReason(result.reason ?? "Top-up is not available for this plan.");
        return;
      }
      if (result.mode === "access_package" && result.packages?.length) {
        setMode("access_package");
        setPackages(result.packages);
        return;
      }
      if (result.amountsUsd?.length) {
        setMode("wallet");
        setAmounts(result.amountsUsd);
        return;
      }
      setReason(result.reason ?? "Top-up is not available for this plan.");
    })();
    return () => {
      cancelled = true;
    };
  }, [email, orderNumber]);

  if (loading) {
    return null;
  }

  const hasWallet = mode === "wallet" && amounts.length > 0;
  const hasPackages = mode === "access_package" && packages.length > 0;

  if (!hasWallet && !hasPackages) {
    if (reason) {
      return (
        <p className="order-usage__fine-print" style={{ marginTop: 12 }}>
          {reason}
        </p>
      );
    }
    return null;
  }

  const selectedOffer =
    selection?.kind === "package"
      ? packages.find((p) => p.offerId === selection.offerId)
      : null;
  const selectedLabel =
    selection?.kind === "wallet"
      ? `$${selection.fundUsd} data`
      : selectedOffer?.name ?? null;
  const selectedRetail =
    selection?.kind === "wallet"
      ? null
      : selectedOffer
        ? formatRetail(selectedOffer.retailUsd)
        : null;

  async function payWithCard() {
    if (!selection) return;
    setError(null);
    setSubmitting(true);
    const result = await createTopUpSession({
      orderId: orderNumber,
      email,
      fundUsd: selection.kind === "wallet" ? selection.fundUsd : undefined,
      offerId: selection.kind === "package" ? selection.offerId : undefined,
      packageSlug: selection.kind === "package" ? selection.packageSlug : undefined,
      packageCode: selection.kind === "package" ? selection.packageCode : undefined,
      periodNum: selection.kind === "package" ? selection.periodNum : undefined,
    });
    setSubmitting(false);
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
        {hasPackages
          ? "Add another pack onto this eSIM — same install, more data and days."
          : "Pay-as-you-go top-up — funds are added to your existing line. Install stays the same."}
      </p>

      {!selection ? (
        hasPackages ? (
          <div className="order-topup__amounts">
            {packages.map((offer) => (
              <button
                key={offer.offerId}
                type="button"
                className="order-topup__btn order-topup__btn--package"
                onClick={() =>
                  setSelection({
                    kind: "package",
                    offerId: offer.offerId,
                    packageSlug: offer.slug,
                    packageCode: offer.packageCode,
                    periodNum: offer.periodNum,
                  })
                }
              >
                <span className="order-topup__btn-label">{offer.name}</span>
                <span className="order-topup__btn-price">
                  {formatRetail(offer.retailUsd)}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="order-topup__amounts">
            {amounts.map((amount) => (
              <button
                key={amount}
                type="button"
                className="order-topup__btn"
                onClick={() => setSelection({ kind: "wallet", fundUsd: amount })}
              >
                ${amount} data
              </button>
            ))}
          </div>
        )
      ) : (
        <div className="order-topup__pay">
          <div className="order-topup__selected">
            <span>
              Selected: <strong>{selectedLabel}</strong>
              {selectedRetail ? ` · ${selectedRetail}` : null}
            </span>
            <button
              type="button"
              className="order-topup__change"
              disabled={submitting}
              onClick={() => {
                setSelection(null);
                setError(null);
              }}
            >
              Change
            </button>
          </div>
          <button
            type="button"
            className="order-topup__btn order-topup__btn--card"
            disabled={submitting}
            onClick={() => void payWithCard()}
          >
            {submitting ? "Starting…" : "Pay with card"}
          </button>
          {paypalAvailable ? (
            <TopUpPayPalButton
              orderNumber={orderNumber}
              email={email}
              selection={selection}
              disabled={submitting}
              onBusy={setSubmitting}
              onError={(message) => setError(message || null)}
            />
          ) : null}
        </div>
      )}

      {error ? (
        <p className="error-message" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
