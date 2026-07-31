"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { lookupOrder, type AutomationOrder } from "@/lib/automation-api";

function statusColor(status: string): string {
  const key = status.toLowerCase();
  if (key === "active" || key === "delivered" || key === "paid") return "#10B981";
  if (key === "expired" || key === "failed" || key === "refunded") return "#EF4444";
  if (key.includes("low")) return "#F59E0B";
  return "#6B7280";
}

function formatExpiry(createdAt: string | undefined): string {
  if (!createdAt) return "—";
  try {
    return new Date(createdAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return createdAt;
  }
}

export function ModernDashboardPage() {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<AutomationOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    setQrOpen(false);

    try {
      const result = await lookupOrder(orderId, email);
      if (!result.found || !result.order) {
        setOrder(null);
        setError("Order not found. Check your email and order ID.");
        return;
      }
      setOrder(result.order);
    } catch (err) {
      console.error("[dashboard] order lookup failed", err);
      setOrder(null);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to reach NoorLink Automation. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  const color = order ? statusColor(order.status) : "#6B7280";
  const dataTotal = order?.dataTotalGb ?? 0;
  const dataUsed = order?.dataUsedGb ?? 0;
  const dataLeft =
    dataTotal > 0 ? Math.max(0, Number((dataTotal - dataUsed).toFixed(2))) : 0;

  return (
    <>
      <SiteHeader logoClassName="logo" />

      {!order ? (
        <div id="login-view">
          <div className="login-card">
            <div style={{ fontSize: "3rem", marginBottom: 20 }}>🔒</div>
            <h1>Manage eSIM</h1>
            <p>
              Enter the email and order ID from your purchase confirmation to
              load your plan from NoorLink Automation.
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

              <button type="submit" className="login-btn" disabled={busy}>
                {busy ? "Looking up…" : "View My eSIM"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="container" style={{ padding: "2rem 0" }}>
          <div className="login-card">
            <h1>{order.packageName}</h1>
            <p style={{ color, fontWeight: 700 }}>
              {order.status} · {order.flag ?? ""} {order.country}
            </p>
            <p>Order #{order.orderNumber}</p>
            {dataTotal > 0 ? (
              <p>
                Data remaining: {dataLeft} GB / {dataTotal} GB
              </p>
            ) : (
              <p>Data allowance will appear once your eSIM is provisioned.</p>
            )}
            <p>Created: {formatExpiry(order.createdAt)}</p>

            <button
              type="button"
              className="login-btn"
              onClick={() => setQrOpen((open) => !open)}
            >
              {qrOpen ? "Hide QR Code" : "Show QR Code"}
            </button>

            {qrOpen && (
              <div style={{ marginTop: 20, textAlign: "center" }}>
                {order.qrCodeUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={order.qrCodeUrl}
                    alt="eSIM install QR code"
                    width={180}
                    height={180}
                    style={{ borderRadius: 12, background: "#fff" }}
                  />
                ) : (
                  <div
                    style={{
                      width: 180,
                      height: 180,
                      margin: "0 auto",
                      background: "#111",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 12,
                    }}
                  >
                    QR pending
                  </div>
                )}
                {order.activationCode ? (
                  <p style={{ marginTop: 12, fontSize: "0.9rem" }}>
                    Activation code: <strong>{order.activationCode}</strong>
                  </p>
                ) : null}
              </div>
            )}

            <button
              type="button"
              className="login-btn"
              style={{ marginTop: 16, background: "transparent", color: "inherit" }}
              onClick={() => setOrder(null)}
            >
              Sign out
            </button>

            <p style={{ marginTop: 16, fontSize: "0.85rem" }}>
              Need help? <Link href="/support">Contact support</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
