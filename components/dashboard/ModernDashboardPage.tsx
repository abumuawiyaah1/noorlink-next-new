"use client";

import { FormEvent, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { lookupOrder, type LookedUpOrder } from "@/lib/orders-api";
import { formatCountryLabel } from "@/lib/country-slugs";

export function ModernDashboardPage() {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<LookedUpOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const result = await lookupOrder(email, orderId);
    setLoading(false);
    if (!result.found || !result.order) {
      setError(
        result.error ??
          "Order not found. Use the email from checkout and the order ID from your confirmation email.",
      );
      setOrder(null);
      return;
    }
    setOrder(result.order);
  }

  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "My eSIMs" }]} />

      {!order ? (
        <div id="login-view">
          <div className="login-card">
            <div style={{ fontSize: "3rem", marginBottom: 20 }}>🔒</div>
            <h1>Manage eSIM</h1>
            <p>
              Enter the email and order ID from your confirmation email to check
              status and delivery.
            </p>

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="dashboard-email">Email Address</label>
                <input
                  id="dashboard-email"
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="dashboard-order">Order ID</label>
                <input
                  id="dashboard-order"
                  type="text"
                  className="input-field"
                  value={orderId}
                  onChange={(event) => setOrderId(event.target.value)}
                  placeholder="NL-123456"
                  required
                />
              </div>

              {error && (
                <p className="error-message" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Looking up…" : "View My eSIM"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="container" style={{ padding: "2rem 0" }}>
          <div className="login-card">
            <h1>{order.packageName ?? "Your eSIM"}</h1>
            <p style={{ fontWeight: 700, textTransform: "capitalize" }}>
              Status: {order.status ?? "unknown"}
            </p>
            <p>
              Destination: {order.flag ? `${order.flag} ` : ""}
              {formatCountryLabel(order.country ?? "")}
            </p>
            {order.orderNumber && <p>Order: {order.orderNumber}</p>}
            {order.dataTotalGb != null && (
              <p>
                Data: {order.dataUsedGb ?? 0} GB used of {order.dataTotalGb} GB
              </p>
            )}
            {order.price != null && (
              <p>
                Paid: {order.currency ?? "USD"} {Number(order.price).toFixed(2)}
              </p>
            )}

            {order.qrCodeUrl ? (
              <p>
                <a href={order.qrCodeUrl} target="_blank" rel="noopener noreferrer">
                  Open QR / install details
                </a>
              </p>
            ) : (
              <p>
                QR delivery is still being prepared. Check the email we sent after
                payment.
              </p>
            )}

            {order.activationCode && (
              <p>
                Activation code: <strong>{order.activationCode}</strong>
              </p>
            )}

            <button
              type="button"
              className="login-btn"
              style={{ marginTop: 16, background: "transparent", color: "inherit" }}
              onClick={() => setOrder(null)}
            >
              Look up another order
            </button>
          </div>
        </div>
      )}
      <SiteFooter />
    </>
  );
}
