"use client";

import { FormEvent, useState } from "react";
import {
  fetchAffiliateDashboard,
  requestAffiliatePayout,
  type AffiliateDashboard,
} from "@/lib/affiliate-api";

export function PartnerLoginPanel() {
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

  if (!dashboard) {
    return (
      <form className="help-form partner-portal__panel" onSubmit={handleSubmit}>
        <h2>Sign in to your partner account</h2>
        <p className="help-intro">
          Use the partner code and email on file with NoorLink. No password needed — read-only
          access to your link, balance, and payouts.
        </p>

        <label htmlFor="partner-code">Partner code</label>
        <input
          id="partner-code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="YOURCODE"
          required
        />

        <label htmlFor="partner-login-email">Email on file</label>
        <input
          id="partner-login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@organization.com"
          required
        />

        {error ? (
          <p className="help-form__status" style={{ color: "var(--error)" }} role="alert">
            {error}
          </p>
        ) : null}

        <button type="submit" disabled={loading}>
          {loading ? "Loading…" : "View dashboard"}
        </button>

        <p className="partner-portal__terms-note">
          By signing in, you agree to the{" "}
          <a href="/partners/terms">Partner Program Terms</a>.
        </p>
      </form>
    );
  }

  return (
    <div className="help-form partner-portal__panel partner-portal__dashboard">
      <h2>{dashboard.displayName ?? dashboard.code}</h2>
      <p className="help-intro">
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
            <strong>Paid to date:</strong> ${((dashboard.paidTotalCents ?? 0) / 100).toFixed(2)}
          </p>
          {dashboard.readyForPayout ? (
            <div style={{ marginTop: "0.75rem" }}>
              <p style={{ color: "#047857" }}>
                Ready for payout — request withdrawal and our team will process within 5 business
                days.
              </p>
              <button type="button" disabled={payoutLoading} onClick={handlePayoutRequest}>
                {payoutLoading ? "Sending…" : "Request payout"}
              </button>
              {payoutMessage ? (
                <p className="help-form__status" style={{ marginTop: "0.5rem" }}>
                  {payoutMessage}
                </p>
              ) : null}
            </div>
          ) : (
            <p className="help-intro">Balance below minimum payout threshold.</p>
          )}
        </>
      ) : null}

      {dashboard.recentCommissions && dashboard.recentCommissions.length > 0 ? (
        <div style={{ marginTop: "1rem" }}>
          <h3 style={{ fontSize: "1rem", margin: "0 0 8px", color: "var(--primary)" }}>
            Recent commissions
          </h3>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--text-muted)" }}>
            {dashboard.recentCommissions.map((row) => (
              <li key={`${row.orderNumber}-${row.fulfilledAt}`}>
                {row.orderNumber} — ${((row.commissionCents ?? 0) / 100).toFixed(2)} ({row.status})
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <button
        type="button"
        className="partner-portal__ghost-btn"
        onClick={() => setDashboard(null)}
      >
        Sign in with a different account
      </button>
    </div>
  );
}
