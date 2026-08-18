"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { lookupOrder, type LookedUpOrder } from "@/lib/orders-api";
import { formatCountryLabel } from "@/lib/country-slugs";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";

type OrderLookupCardProps = {
  title?: string;
  description?: string;
  submitLabel?: string;
  initialEmail?: string;
  initialOrderId?: string;
  compact?: boolean;
};

export function OrderLookupCard({
  title = "Track your order",
  description = "Enter the email and order ID from your first confirmation email to check status and delivery.",
  submitLabel = "Track order",
  initialEmail = "",
  initialOrderId = "",
  compact = false,
}: OrderLookupCardProps) {
  const [email, setEmail] = useState(initialEmail);
  const [orderId, setOrderId] = useState(initialOrderId);
  const [order, setOrder] = useState<LookedUpOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const result = await lookupOrder(email, orderId);
    setLoading(false);
    if (!result.found || !result.order) {
      setOrder(null);
      setError(
        result.error ??
          "Order not found. Use the checkout email and the order ID from your confirmation email.",
      );
      return;
    }
    setOrder(result.order);
  }

  return (
    <div className={`login-card${compact ? " login-card--compact" : ""}`}>
      {!order ? (
        <>
          <div style={{ fontSize: compact ? "2rem" : "3rem", marginBottom: 20 }}>🔎</div>
          <h1>{title}</h1>
          <p>{description}</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor={compact ? "lookup-email-compact" : "lookup-email"}>
                Email address
              </label>
              <input
                id={compact ? "lookup-email-compact" : "lookup-email"}
                type="email"
                className="input-field"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor={compact ? "lookup-order-compact" : "lookup-order"}>
                Order ID
              </label>
              <input
                id={compact ? "lookup-order-compact" : "lookup-order"}
                type="text"
                className="input-field"
                value={orderId}
                onChange={(event) => setOrderId(event.target.value)}
                placeholder="NL-123456"
                required
              />
            </div>

            {error ? (
              <p className="error-message" role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Checking…" : submitLabel}
            </button>
          </form>

          <p className="order-lookup-note">
            Need help finding the order ID? Check the first email sent after payment.
          </p>
        </>
      ) : (
        <div className="lookup-result">
          <div className="lookup-result__head">
            <div>
              <h1>{order.packageName ?? "Your eSIM"}</h1>
              <p>
                {order.flag ? `${order.flag} ` : ""}
                {formatCountryLabel(order.country ?? "")}
              </p>
            </div>
            <span className="lookup-status">{order.status ?? "unknown"}</span>
          </div>

          {order.orderNumber ? (
            <p>
              <strong>Order:</strong> {order.orderNumber}
            </p>
          ) : null}
          {order.price != null ? (
            <p>
              <strong>Paid:</strong> {order.currency ?? "USD"} {Number(order.price).toFixed(2)}
            </p>
          ) : null}
          {order.dataTotalGb != null ? (
            <p>
              <strong>Usage:</strong> {order.dataUsedGb ?? 0} GB used of {order.dataTotalGb} GB
            </p>
          ) : null}

          <div className="lookup-actions">
            {order.qrCodeUrl ? (
              <a href={order.qrCodeUrl} target="_blank" rel="noopener noreferrer">
                Open QR / install details
              </a>
            ) : (
              <Link
                href={`/support?subject=${encodeURIComponent("Install / QR code")}&email=${encodeURIComponent(email)}&orderId=${encodeURIComponent(order.orderNumber ?? orderId)}`}
              >
                QR missing? Contact support
              </Link>
            )}

            <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>Open WhatsApp</a>
          </div>

          {order.activationCode ? (
            <p className="order-lookup-note">
              Activation code: <strong>{order.activationCode}</strong>
            </p>
          ) : null}

          <button
            type="button"
            className="login-btn login-btn--ghost"
            onClick={() => setOrder(null)}
          >
            Look up another order
          </button>
        </div>
      )}
    </div>
  );
}
