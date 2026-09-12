"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  fetchMyEsimsByToken,
  fetchSiblingEsims,
  lookupOrder,
  requestMyEsimsLink,
  resendOrderEsEmail,
  type LookedUpOrder,
  type MyEsimCard,
} from "@/lib/orders-api";
import { isSafeQrCodeUrl, safeExternalHref } from "@/lib/safe-url";
import { OrderUsageSummary } from "@/components/orders/OrderUsageSummary";
import { EsimInstallPanel } from "@/components/orders/EsimInstallPanel";
import { OrderTopUpCard } from "@/components/orders/OrderTopUpCard";
import { OrderSupportThread } from "@/components/orders/OrderSupportThread";
import { ReviewRequestCard } from "@/components/review/ReviewRequestCard";
import { formatCountryLabel } from "@/lib/country-slugs";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";
import {
  forgetRememberedEmail,
  readRememberedEmail,
  rememberEmail,
  resolveCustomerStatus,
} from "@/lib/my-esims";

type OrderLookupCardProps = {
  title?: string;
  description?: string;
  submitLabel?: string;
  initialEmail?: string;
  initialOrderId?: string;
  initialToken?: string;
  topupSuccess?: boolean;
  compact?: boolean;
};

function cardToLookupStub(card: MyEsimCard, email: string): LookedUpOrder {
  return {
    orderNumber: card.orderNumber,
    email,
    country: card.country,
    flag: card.flag,
    packageName: card.packageName,
    status: card.status as LookedUpOrder["status"],
    activationStatus: card.activationStatus,
    dataRemainingGb: card.dataRemainingGb,
    dataTotalGb: card.dataTotalGb,
    daysRemaining: card.daysRemaining,
    walletBalanceUsd: card.walletBalanceUsd,
    fulfillmentPending: card.fulfillmentPending,
    createdAt: card.createdAt ?? undefined,
  };
}

export function OrderLookupCard({
  title = "Your eSIM",
  description = "Use the email and order ID from your confirmation (looks like NL-…).",
  submitLabel = "Open my eSIM",
  initialEmail = "",
  initialOrderId = "",
  initialToken = "",
  topupSuccess = false,
  compact = false,
}: OrderLookupCardProps) {
  const [email, setEmail] = useState(initialEmail);
  const [orderId, setOrderId] = useState(initialOrderId);
  const [order, setOrder] = useState<LookedUpOrder | null>(null);
  const [siblings, setSiblings] = useState<MyEsimCard[]>([]);
  const [listMode, setListMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(Boolean(initialToken));
  const [refreshingUsage, setRefreshingUsage] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [linkBusy, setLinkBusy] = useState(false);
  const [linkMessage, setLinkMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(topupSuccess);
  const [installOpen, setInstallOpen] = useState(false);

  const [rememberedHint, setRememberedHint] = useState(false);

  useEffect(() => {
    if (initialEmail) return;
    const remembered = readRememberedEmail();
    if (remembered) {
      setEmail(remembered);
      setRememberedHint(true);
    }
  }, [initialEmail]);

  useEffect(() => {
    if (!initialToken) {
      setBootstrapping(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setBootstrapping(true);
      setError(null);
      const result = await fetchMyEsimsByToken(initialToken);
      if (cancelled) return;
      setBootstrapping(false);
      if (!result.success) {
        setError(result.message ?? "This My eSIMs link is invalid or expired.");
        return;
      }
      if (result.email) {
        setEmail(result.email);
        rememberEmail(result.email);
      }
      setSiblings(result.orders);
      setListMode(true);
      setOrder(null);
      if (!result.orders.length) {
        setError(result.message ?? "No eSIMs found for this email yet.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [initialToken]);

  useEffect(() => {
    if (!showSuccess) return;
    const timer = window.setTimeout(() => setShowSuccess(false), 8000);
    return () => window.clearTimeout(timer);
  }, [showSuccess]);

  async function openOrder(nextEmail: string, nextOrderId: string) {
    setError(null);
    setLoading(true);
    setResendMessage(null);
    let result = await lookupOrder(nextEmail, nextOrderId);
    if (
      result.found &&
      result.order &&
      ["delivered", "active", "suspended"].includes(result.order.status ?? "")
    ) {
      result = await lookupOrder(nextEmail, nextOrderId, { refresh: true });
    }
    setLoading(false);
    if (!result.found || !result.order) {
      setOrder(null);
      setError(
        result.error ??
          "Order not found. Use the checkout email and the order ID from your confirmation email.",
      );
      return;
    }
    rememberEmail(nextEmail);
    setEmail(nextEmail);
    setOrderId(result.order.orderNumber ?? nextOrderId);
    setOrder(result.order);
    setListMode(false);
    const status = resolveCustomerStatus(result.order);
    setInstallOpen(!status.installed);

    const siblingResult = await fetchSiblingEsims(
      nextEmail,
      result.order.orderNumber ?? nextOrderId,
    );
    if (siblingResult.success) {
      setSiblings(siblingResult.orders);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await openOrder(email, orderId);
  }

  async function handleRefreshUsage() {
    if (!email.trim() || !orderId.trim()) return;
    setRefreshingUsage(true);
    setError(null);
    const result = await lookupOrder(email, orderId, { refresh: true });
    setRefreshingUsage(false);
    if (!result.found || !result.order) {
      setError(result.error ?? "Could not refresh usage. Try again in a moment.");
      return;
    }
    setOrder(result.order);
  }

  async function handleResendQr() {
    if (!order?.orderNumber) return;
    setResendMessage(null);
    setResendLoading(true);
    const result = await resendOrderEsEmail({
      orderId: order.orderNumber,
      email,
    });
    setResendLoading(false);
    setResendMessage(
      result.success
        ? result.message ?? "Install email sent — check inbox and spam."
        : result.message ?? "Could not resend install email.",
    );
  }

  async function handleSendMagicLink() {
    if (!email.trim()) {
      setLinkMessage("Enter your email first.");
      return;
    }
    setLinkBusy(true);
    setLinkMessage(null);
    const result = await requestMyEsimsLink(email);
    setLinkBusy(false);
    setLinkMessage(
      result.message ??
        (result.success
          ? "If we have eSIMs for that email, a link is on the way."
          : "Could not send the link."),
    );
    if (result.success) rememberEmail(email);
  }

  const status = order ? resolveCustomerStatus(order) : null;
  const qrHref = safeExternalHref(order?.qrCodeUrl, isSafeQrCodeUrl);
  const canResendQr =
    order &&
    ["delivered", "active", "suspended"].includes(order.status ?? "") &&
    Boolean(order.orderNumber);
  const countrySlug = (order?.country || "").toLowerCase().replace(/\s+/g, "-");
  const plansHref = countrySlug ? `/plans?country=${encodeURIComponent(countrySlug)}` : "/plans";

  if (bootstrapping) {
    return (
      <div className={`login-card login-card--wide${compact ? " login-card--compact" : ""}`}>
        <p className="order-lookup-note" style={{ marginTop: 0 }}>
          Opening your eSIMs…
        </p>
      </div>
    );
  }

  if (listMode && !order) {
    return (
      <div className={`login-card login-card--wide${compact ? " login-card--compact" : ""}`}>
        <div className="myesims-list-head">
          <div>
            <h1>Your eSIMs</h1>
            <p>{email ? `Plans for ${email}` : "Choose a plan to open."}</p>
          </div>
          <button
            type="button"
            className="login-btn login-btn--ghost myesims-list-head__btn"
            onClick={() => {
              setListMode(false);
              setSiblings([]);
              setOrder(null);
            }}
          >
            Look up with order ID
          </button>
        </div>

        {error ? (
          <p className="error-message" role="alert">
            {error}
          </p>
        ) : null}

        <div className="myesims-cards">
          {siblings.map((card) => {
            const stub = cardToLookupStub(card, email);
            const cardStatus = resolveCustomerStatus(stub);
            return (
              <button
                key={card.orderNumber ?? card.packageName}
                type="button"
                className={`myesims-card myesims-card--${cardStatus.tone}`}
                onClick={() => {
                  if (card.orderNumber) void openOrder(email, card.orderNumber);
                }}
              >
                <div className="myesims-card__top">
                  <strong>
                    {card.flag ? `${card.flag} ` : ""}
                    {card.packageName ?? "eSIM"}
                  </strong>
                  <span>{cardStatus.label}</span>
                </div>
                <p className="myesims-card__meta">
                  {formatCountryLabel(card.country ?? "")}
                  {card.orderNumber ? ` · ${card.orderNumber}` : ""}
                </p>
                <p className="myesims-card__stats">
                  {card.walletBalanceUsd != null
                    ? `$${Number(card.walletBalanceUsd).toFixed(2)} wallet`
                    : card.dataRemainingGb != null
                      ? `${card.dataRemainingGb} GB left`
                      : card.dataTotalGb != null
                        ? `${card.dataTotalGb} GB plan`
                        : "Open for details"}
                  {card.daysRemaining != null
                    ? ` · ${card.daysRemaining} day${card.daysRemaining === 1 ? "" : "s"} left`
                    : ""}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={`login-card${compact ? " login-card--compact" : ""}`}>
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
              autoComplete="email"
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
              autoComplete="off"
            />
          </div>

          {error ? (
            <p className="error-message" role="alert">
              {error}
            </p>
          ) : null}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Opening…" : submitLabel}
          </button>
        </form>

        <div className="myesims-help">
          <button
            type="button"
            className="myesims-help__toggle"
            onClick={() => setHelpOpen((open) => !open)}
            aria-expanded={helpOpen}
          >
            {helpOpen ? "Hide help" : "Can’t find your order ID?"}
          </button>
          {helpOpen ? (
            <div className="myesims-help__body">
              <p>
                Check the first email after payment — the order ID looks like{" "}
                <strong>NL-…</strong>
              </p>
              <p>Or email yourself a private My eSIMs link (no order ID needed):</p>
              <button
                type="button"
                className="login-btn login-btn--ghost"
                disabled={linkBusy}
                onClick={() => void handleSendMagicLink()}
              >
                {linkBusy ? "Sending…" : "Email me a My eSIMs link"}
              </button>
              {linkMessage ? (
                <p className="order-lookup-note" role="status">
                  {linkMessage}
                </p>
              ) : null}
              <p>
                Still stuck?{" "}
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>Message us on WhatsApp</a>.
              </p>
            </div>
          ) : null}
        </div>

        {rememberedHint ? (
          <p className="order-lookup-note">
            We’ll remember this email on this device.{" "}
            <button
              type="button"
              className="lookup-action-btn"
              onClick={() => {
                forgetRememberedEmail();
                setEmail("");
                setRememberedHint(false);
              }}
            >
              Clear saved email
            </button>
          </p>
        ) : (
          <p className="order-lookup-note">
            After you open an eSIM, we’ll remember your email on this device for next time.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`login-card login-card--wide${compact ? " login-card--compact" : ""}`}>
      <div className="lookup-result">
        {showSuccess ? (
          <div className="myesims-banner myesims-banner--success" role="status">
            Data added. Same QR — you’re set.
          </div>
        ) : null}

        <div className="lookup-result__head">
          <div>
            <p className="myesims-kicker">
              {order.flag ? `${order.flag} ` : ""}
              {formatCountryLabel(order.country ?? "")}
            </p>
            <h1>{order.packageName ?? "Your eSIM"}</h1>
          </div>
          {status ? (
            <span className={`lookup-status lookup-status--${status.tone}`}>
              {status.label}
            </span>
          ) : null}
        </div>

        {siblings.length > 1 ? (
          <div className="myesims-switcher">
            <span>Your eSIMs</span>
            <div className="myesims-switcher__row">
              {siblings.map((card) => (
                <button
                  key={card.orderNumber}
                  type="button"
                  className={
                    card.orderNumber === order.orderNumber
                      ? "myesims-switcher__chip is-active"
                      : "myesims-switcher__chip"
                  }
                  onClick={() => {
                    if (card.orderNumber && card.orderNumber !== order.orderNumber) {
                      void openOrder(email, card.orderNumber);
                    }
                  }}
                >
                  {card.flag ? `${card.flag} ` : ""}
                  {card.packageName ?? card.orderNumber}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <OrderUsageSummary
          order={order}
          compact
          customerStatus={status ?? undefined}
          refreshing={refreshingUsage}
          onRefreshUsage={
            ["delivered", "active", "suspended"].includes(order.status ?? "")
              ? handleRefreshUsage
              : undefined
          }
        />

        {status?.runningLow ? (
          <div className="myesims-banner myesims-banner--low" role="status">
            Running low — add data below without installing again.
          </div>
        ) : null}

        {(order.qrCodeUrl || order.iosTapLink || order.lpaString) ? (
          status?.installed ? (
            <div className="myesims-install-toggle">
              <button
                type="button"
                className="lookup-action-btn"
                onClick={() => setInstallOpen((open) => !open)}
              >
                {installOpen ? "Hide install QR" : "Show install QR again"}
              </button>
              {installOpen ? <EsimInstallPanel order={order} compact /> : null}
            </div>
          ) : (
            <EsimInstallPanel order={order} compact />
          )
        ) : null}

        {["delivered", "active", "suspended"].includes(order.status ?? "") &&
        order.orderNumber ? (
          <OrderTopUpCard
            orderNumber={order.orderNumber}
            email={email}
            countryPlansHref={plansHref}
          />
        ) : null}

        {order.orderNumber ? (
          <OrderSupportThread orderNumber={order.orderNumber} email={email} />
        ) : null}

        <details className="myesims-details">
          <summary>Order details</summary>
          <p>
            <strong>Order</strong> {order.orderNumber}
          </p>
          {order.price != null ? (
            <p>
              <strong>Paid</strong> {order.currency ?? "USD"}{" "}
              {Number(order.price).toFixed(2)}
            </p>
          ) : null}
        </details>

        <div className="lookup-actions">
          {!qrHref ? (
            <Link
              href={`/support?subject=${encodeURIComponent("Install / QR code")}&email=${encodeURIComponent(email)}&orderId=${encodeURIComponent(order.orderNumber ?? orderId)}`}
            >
              QR missing? Contact support
            </Link>
          ) : null}

          {canResendQr ? (
            <button
              type="button"
              className="lookup-action-btn"
              onClick={handleResendQr}
              disabled={resendLoading}
            >
              {resendLoading ? "Sending…" : "Resend install email"}
            </button>
          ) : null}

          <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>WhatsApp help</a>
        </div>

        {resendMessage ? (
          <p className="order-lookup-note" role="status">
            {resendMessage}
          </p>
        ) : null}

        {qrHref && status?.installed ? (
          <ReviewRequestCard orderId={order.orderNumber ?? orderId} compact />
        ) : null}

        <button
          type="button"
          className="login-btn login-btn--ghost"
          onClick={() => {
            setOrder(null);
            setListMode(siblings.length > 1);
            setInstallOpen(false);
            setResendMessage(null);
            setError(null);
          }}
        >
          {siblings.length > 1 ? "Back to all eSIMs" : "Look up another order"}
        </button>
      </div>
    </div>
  );
}
