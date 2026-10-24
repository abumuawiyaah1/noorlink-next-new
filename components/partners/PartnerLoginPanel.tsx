"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  fetchAffiliateDashboard,
  requestAffiliatePayout,
  type AffiliateDashboard,
} from "@/lib/affiliate-api";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";

type PartnerLoginPanelProps = {
  variant?: "portal" | "standalone";
};

function formatUsd(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function PartnerLoginPanel({ variant = "portal" }: PartnerLoginPanelProps) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const L = dict.partnersPage.login;

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [dashboard, setDashboard] = useState<AffiliateDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [payoutMessage, setPayoutMessage] = useState<string | null>(null);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [savedCode, setSavedCode] = useState("");
  const [savedEmail, setSavedEmail] = useState("");

  const codeFieldId = variant === "standalone" ? "partner-code-standalone" : "partner-code";
  const emailFieldId =
    variant === "standalone" ? "partner-login-email-standalone" : "partner-login-email";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const result = await fetchAffiliateDashboard(code, email);
    setLoading(false);
    if (!result.success) {
      setDashboard(null);
      setError(result.message ?? L.notFound);
      return;
    }
    setDashboard(result);
    setSavedCode(code.trim());
    setSavedEmail(email.trim());
    setPayoutMessage(null);
    setCopyMessage(null);
  }

  async function handlePayoutRequest() {
    if (!savedCode || !savedEmail) return;
    setPayoutLoading(true);
    setPayoutMessage(null);
    const result = await requestAffiliatePayout(savedCode, savedEmail);
    setPayoutLoading(false);
    setPayoutMessage(
      result.message ?? (result.success ? L.requestSent : L.requestFailed),
    );
  }

  async function handleCopyLink(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopyMessage(L.linkCopied);
    } catch {
      setCopyMessage(L.copyFailed);
    }
  }

  if (!dashboard) {
    const loginForm =
      variant === "standalone" ? (
        <form className="partner-dashboard-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor={codeFieldId}>{L.code}</label>
            <input
              id={codeFieldId}
              className="input-field"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="YOURCODE"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor={emailFieldId}>{L.email}</label>
            <input
              id={emailFieldId}
              type="email"
              autoComplete="email"
              className="input-field"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={L.emailPlaceholder}
              required
            />
          </div>

          {error ? (
            <p className="error-message" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="login-btn partner-dashboard-form__submit"
            disabled={loading}
          >
            {loading ? L.loading : L.signIn}
          </button>
        </form>
      ) : (
        <form className="help-form partner-portal__panel" onSubmit={handleSubmit}>
          <label htmlFor={codeFieldId}>{L.code}</label>
          <input
            id={codeFieldId}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="YOURCODE"
            required
          />

          <label htmlFor={emailFieldId}>{L.email}</label>
          <input
            id={emailFieldId}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={L.emailPlaceholder}
            required
          />

          {error ? (
            <p className="help-form__status partner-dashboard-form__error" role="alert">
              {error}
            </p>
          ) : null}

          <button type="submit" className="partner-dashboard-form__submit" disabled={loading}>
            {loading ? L.loading : L.signIn}
          </button>
        </form>
      );

    if (variant === "standalone") {
      return (
        <div className="login-card partner-dashboard-card">
          <span className="partner-dashboard-card__icon" aria-hidden="true">
            🤝
          </span>
          <h1>{L.standaloneTitle}</h1>
          <p>{L.standaloneLede}</p>
          {loginForm}
          <p className="partner-dashboard-card__note">
            {L.notPartnerYet}{" "}
            <Link href={localizedPath("/partners#apply", locale)}>{L.applyLink}</Link>
          </p>
        </div>
      );
    }

    return loginForm;
  }

  const dashboardView = (
    <div className="partner-dashboard">
      <header className="partner-dashboard__head">
        <h2>{dashboard.displayName ?? dashboard.code}</h2>
        <p className="partner-dashboard__meta">
          <strong>{L.codeLabel}</strong> {dashboard.code} · <strong>{L.typeLabel}</strong>{" "}
          {dashboard.type}
        </p>
      </header>

      {dashboard.referralUrl ? (
        <section className="partner-dashboard__card" aria-labelledby="partner-referral-heading">
          <h3 id="partner-referral-heading">{L.referralLink}</h3>
          <div className="partner-dashboard__link-row">
            <a href={dashboard.referralUrl} className="partner-dashboard__link">
              {dashboard.referralUrl}
            </a>
            <button
              type="button"
              className="partner-dashboard__copy-btn"
              onClick={() => void handleCopyLink(dashboard.referralUrl!)}
            >
              {L.copyLink}
            </button>
          </div>
          {copyMessage ? (
            <p className="partner-dashboard__copy-note" role="status">
              {copyMessage}
            </p>
          ) : null}
        </section>
      ) : null}

      <div className="partner-dashboard__details">
        {dashboard.customerDiscountPercent != null ? (
          <article className="partner-dashboard__stat">
            <span className="partner-dashboard__stat-label">{L.audienceDiscount}</span>
            <strong className="partner-dashboard__stat-value">
              {dashboard.customerDiscountPercent}%
            </strong>
          </article>
        ) : null}

        {dashboard.paysCash && dashboard.commissionPercent != null ? (
          <>
            <article className="partner-dashboard__stat">
              <span className="partner-dashboard__stat-label">{L.approvedBalance}</span>
              <strong className="partner-dashboard__stat-value">
                {formatUsd(dashboard.approvedBalanceCents ?? 0)}
              </strong>
              {dashboard.payoutMinimumCents != null ? (
                <span className="partner-dashboard__stat-note">
                  {t(dict, "partnersPage.login.minPayout", {
                    amount: formatUsd(dashboard.payoutMinimumCents),
                  })}
                </span>
              ) : null}
            </article>
            <article className="partner-dashboard__stat">
              <span className="partner-dashboard__stat-label">{L.paidToDate}</span>
              <strong className="partner-dashboard__stat-value">
                {formatUsd(dashboard.paidTotalCents ?? 0)}
              </strong>
            </article>
          </>
        ) : null}
      </div>

      {dashboard.paysCash && dashboard.commissionPercent != null ? (
        dashboard.readyForPayout ? (
          <div className="partner-dashboard__callout partner-dashboard__callout--ready">
            <p>{L.readyPayout}</p>
            <button
              type="button"
              className="partner-dashboard__payout-btn"
              disabled={payoutLoading}
              onClick={handlePayoutRequest}
            >
              {payoutLoading ? L.sending : L.requestPayout}
            </button>
            {payoutMessage ? (
              <p className="partner-dashboard__status" role="status">
                {payoutMessage}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="partner-dashboard__hint">{L.belowMin}</p>
        )
      ) : null}

      {dashboard.recentCommissions && dashboard.recentCommissions.length > 0 ? (
        <section
          className="partner-dashboard__commissions"
          aria-labelledby="partner-commissions-heading"
        >
          <h3 id="partner-commissions-heading">{L.recentCommissions}</h3>
          <ul className="partner-dashboard__commission-list">
            {dashboard.recentCommissions.map((row) => (
              <li key={`${row.orderNumber}-${row.fulfilledAt}`}>
                <span>{row.orderNumber}</span>
                <span>{formatUsd(row.commissionCents ?? 0)}</span>
                <span className="partner-dashboard__commission-status">{row.status}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <button
        type="button"
        className="partner-dashboard__ghost-btn"
        onClick={() => {
          setDashboard(null);
          setCopyMessage(null);
          setPayoutMessage(null);
        }}
      >
        {L.signInDifferent}
      </button>
    </div>
  );

  if (variant === "standalone") {
    return (
      <div className="login-card partner-dashboard-card partner-dashboard-card--wide">
        {dashboardView}
      </div>
    );
  }

  return (
    <div className="help-form partner-portal__panel partner-portal__dashboard">
      {dashboardView}
    </div>
  );
}
