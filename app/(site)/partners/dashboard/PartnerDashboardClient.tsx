"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { fetchAffiliateDashboard, requestAffiliatePayout, type AffiliateDashboard } from "@/lib/affiliate-api";
import "@/styles/content-pages.css";

export function PartnerDashboardClient() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [dashboard, setDashboard] = useState<AffiliateDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [payoutMessage, setPayoutMessage] = useState<string | null>(null);
  const [savedCode, setSavedCode] = useState("");
  const [savedEmail, setSavedEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const result = await fetchAffiliateDashboard(code, email);
    setLoading(false);
    if (!result.success) {
      setDashboard(null);
      setError(result.message ?? "Partner account not found for that email.");
      return;
    }
    setDashboard(result);
    setSavedCode(code.trim());
    setSavedEmail(email.trim());
    setPayoutMessage(null);
  }

  async function handlePayoutRequest() {
    if (!savedCode || !savedEmail) return;
    setPayoutLoading(true);
    setPayoutMessage(null);
    const result = await requestAffiliatePayout(savedCode, savedEmail);
    setPayoutLoading(false);
    setPayoutMessage(result.message ?? (result.success ? "Request sent." : "Request failed."));
  }

  return (
    <div className="container" style={{ maxWidth: 640, padding: "2rem 1rem 4rem" }}>
      <p className="text-muted small">
        <Link href="/partners">← Partner programs</Link>
      </p>
      <h1 style={{ color: "var(--primary, #0F3D3E)" }}>Partner dashboard</h1>
      <p style={{ color: "#334155" }}>
        Enter your partner code and the email on file with NoorLink. Read-only — payouts are
        processed manually by our team.
      </p>

      {!dashboard ? (
        <form onSubmit={handleSubmit} className="login-card" style={{ marginTop: "1.5rem" }}>
          <div className="input-group">
            <label htmlFor="partner-code">Partner code</label>
            <input
              id="partner-code"
              className="input-field"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="YOURCODE"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="partner-email">Email on file</label>
            <input
              id="partner-email"
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organization.com"
              required
            />
          </div>
          {error ? (
            <p className="error-message" role="alert">
              {error}
            </p>
          ) : null}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Loading…" : "View dashboard"}
          </button>
        </form>
      ) : (
        <div className="login-card" style={{ marginTop: "1.5rem" }}>
          <h2>{dashboard.displayName ?? dashboard.code}</h2>
          <p>
            <strong>Code:</strong> {dashboard.code} · <strong>Type:</strong> {dashboard.type}
          </p>
          {dashboard.referralUrl ? (
            <p>
              <strong>Your link:</strong>{" "}
              <a href={dashboard.referralUrl}>{dashboard.referralUrl}</a>
            </p>
          ) : null}
          {dashboard.customerDiscountPercent != null ? (
            <p>
              <strong>Audience discount:</strong> {dashboard.customerDiscountPercent}%
            </p>
          ) : null}
          {dashboard.paysCash && dashboard.commissionPercent != null ? (
            <>
              <p>
                <strong>Approved balance:</strong> $
                {((dashboard.approvedBalanceCents ?? 0) / 100).toFixed(2)}
                {dashboard.payoutMinimumCents != null
                  ? ` (minimum payout $${(dashboard.payoutMinimumCents / 100).toFixed(2)})`
                  : ""}
              </p>
              <p>
                <strong>Paid to date:</strong> $
                {((dashboard.paidTotalCents ?? 0) / 100).toFixed(2)}
              </p>
              {dashboard.readyForPayout ? (
                <div style={{ marginTop: "0.75rem" }}>
                  <p style={{ color: "#047857" }}>
                    Ready for payout — request withdrawal and our team will process within 5 business
                    days.
                  </p>
                  <button
                    type="button"
                    className="login-btn"
                    disabled={payoutLoading}
                    onClick={handlePayoutRequest}
                  >
                    {payoutLoading ? "Sending…" : "Request payout"}
                  </button>
                  {payoutMessage ? (
                    <p className="order-lookup-note" style={{ marginTop: "0.5rem" }}>
                      {payoutMessage}
                    </p>
                  ) : null}
                </div>
              ) : (
                <p className="order-lookup-note">Balance below minimum payout threshold.</p>
              )}
            </>
          ) : null}
          {dashboard.recentCommissions && dashboard.recentCommissions.length > 0 ? (
            <div style={{ marginTop: "1rem" }}>
              <h3 style={{ fontSize: "1rem" }}>Recent commissions</h3>
              <ul style={{ fontSize: "0.9rem", color: "#334155" }}>
                {dashboard.recentCommissions.map((row) => (
                  <li key={`${row.orderNumber}-${row.fulfilledAt}`}>
                    {row.orderNumber} — ${((row.commissionCents ?? 0) / 100).toFixed(2)} (
                    {row.status})
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <button
            type="button"
            className="login-btn login-btn--ghost"
            style={{ marginTop: "1rem" }}
            onClick={() => setDashboard(null)}
          >
            Look up another account
          </button>
        </div>
      )}
    </div>
  );
}
