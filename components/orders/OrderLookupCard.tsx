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
import { LandingReadyTag } from "@/components/orders/LandingReadyChecklist";
import { formatCountryLabel } from "@/lib/country-slugs";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";
import {
  forgetRememberedEmail,
  readRememberedEmail,
  readRememberedOrderId,
  rememberEmail,
  rememberOrderId,
  resolveCustomerStatus,
} from "@/lib/my-esims";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

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
    dataUsedGb: card.dataUsedGb,
    daysRemaining: card.daysRemaining,
    usageMode: card.usageMode,
    walletBalanceUsd: card.walletBalanceUsd,
    walletChargedUsd: card.walletChargedUsd,
    usagePct: card.usagePct,
    usageSyncedAt: card.usageSyncedAt,
    fulfillmentPending: card.fulfillmentPending,
    createdAt: card.createdAt ?? undefined,
  };
}

export function OrderLookupCard({
  title,
  description,
  submitLabel,
  initialEmail = "",
  initialOrderId = "",
  initialToken = "",
  topupSuccess = false,
  compact = false,
}: OrderLookupCardProps) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const ui = dict.ordersUi;
  const cardTitle = title ?? ui.lookupDefaultTitle;
  const cardDescription = description ?? ui.lookupDefaultDescription;
  const cardSubmitLabel = submitLabel ?? dict.lookup.submit;
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
    if (initialEmail && initialOrderId) return;
    const rememberedEmail = initialEmail.trim() || readRememberedEmail();
    const rememberedOrder = initialOrderId.trim() || readRememberedOrderId();
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberedHint(true);
    }
    if (rememberedOrder) {
      setOrderId(rememberedOrder);
    }
  }, [initialEmail, initialOrderId]);

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
        setError(result.message ?? ui.linkInvalid);
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
        setError(result.message ?? ui.noEsimsFound);
      }
    })();
    return () => {
      cancelled = true;
    };
    // Locale strings only used for fallback messages; don’t refetch on locale change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const cleanEmail = nextEmail.trim().toLowerCase();
    const cleanOrderId = nextOrderId
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, "");
    let result = await lookupOrder(cleanEmail, cleanOrderId);
    if (
      result.found &&
      result.order &&
      ["delivered", "active", "suspended"].includes(result.order.status ?? "")
    ) {
      const refreshed = await lookupOrder(cleanEmail, cleanOrderId, { refresh: true });
      // Keep the first successful lookup if live usage refresh fails.
      if (refreshed.found && refreshed.order) {
        result = refreshed;
      }
    }
    setLoading(false);
    if (!result.found || !result.order) {
      setOrder(null);
      setError(
        result.error ?? ui.orderNotFound,
      );
      return;
    }
    rememberEmail(cleanEmail);
    rememberOrderId(result.order.orderNumber ?? cleanOrderId);
    setEmail(cleanEmail);
    setOrderId(result.order.orderNumber ?? cleanOrderId);
    setOrder(result.order);
    setListMode(false);
    const nextStatus = resolveCustomerStatus(result.order);
    setInstallOpen(!nextStatus.installed);

    const siblingResult = await fetchSiblingEsims(
      cleanEmail,
      result.order.orderNumber ?? cleanOrderId,
    );
    if (siblingResult.success) {
      setSiblings(siblingResult.orders);
    }
  }

  useEffect(() => {
    if (initialToken) return;
    const emailToOpen = (initialEmail || readRememberedEmail()).trim();
    const orderToOpen = (initialOrderId || readRememberedOrderId()).trim();
    if (!emailToOpen || !orderToOpen) return;
    void openOrder(emailToOpen, orderToOpen);
    // Auto-open once from deep link or this device’s saved order.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialToken, initialEmail, initialOrderId]);

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
      setError(result.error ?? ui.refreshFailed);
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
        ? result.message ?? ui.installEmailSent
        : result.message ?? ui.resendFailed,
    );
  }

  async function handleSendMagicLink() {
    if (!email.trim()) {
      setLinkMessage(ui.enterEmailFirst);
      return;
    }
    setLinkBusy(true);
    setLinkMessage(null);
    const result = await requestMyEsimsLink(email);
    setLinkBusy(false);
    setLinkMessage(
      result.message ??
        (result.success
          ? ui.linkSent
          : ui.linkFailed),
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
          {ui.openingEsims}
        </p>
      </div>
    );
  }

  if (listMode && !order) {
    return (
      <div className={`login-card login-card--wide${compact ? " login-card--compact" : ""}`}>
        <div className="myesims-list-head">
          <div>
            <h1>{ui.yourEsims}</h1>
            <p>{email ? t(dict, "ordersUi.plansFor", { email }) : ui.choosePlan}</p>
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
            {ui.lookupWithOrderId}
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
                  {card.usageMode === "wallet" || card.walletBalanceUsd != null
                    ? [
                        card.walletBalanceUsd != null
                          ? t(dict, "ordersUi.usdLeft", {
                              amount: `$${Number(card.walletBalanceUsd).toFixed(2)}`,
                            })
                          : null,
                        card.walletChargedUsd != null
                          ? t(dict, "ordersUi.usdUsed", {
                              amount: `$${Number(card.walletChargedUsd).toFixed(2)}`,
                            })
                          : null,
                      ]
                        .filter(Boolean)
                        .join(" · ") || ui.openForDetails
                    : card.dataRemainingGb != null
                      ? `${card.dataRemainingGb} ${ui.gbLeft}${
                          card.dataUsedGb != null
                            ? ` · ${t(dict, "ordersUi.gbUsed", { n: card.dataUsedGb })}`
                            : ""
                        }`
                      : card.dataTotalGb != null
                        ? t(dict, "ordersUi.gbPlan", { n: card.dataTotalGb })
                        : ui.openForDetails}
                  {card.daysRemaining != null
                    ? ` · ${card.daysRemaining} ${card.daysRemaining === 1 ? ui.dayLeft : ui.daysLeft}`
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
        <h1>{cardTitle}</h1>
        <p>{cardDescription}</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor={compact ? "lookup-email-compact" : "lookup-email"}>
              {dict.lookup.email}
            </label>
            <input
              id={compact ? "lookup-email-compact" : "lookup-email"}
              type="email"
              className="input-field"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={dict.common.emailCheckout}
              required
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor={compact ? "lookup-order-compact" : "lookup-order"}>
              {dict.lookup.orderId}
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
            {loading ? ui.opening : cardSubmitLabel}
          </button>
        </form>

        <div className="myesims-help">
          <button
            type="button"
            className="myesims-help__toggle"
            onClick={() => setHelpOpen((open) => !open)}
            aria-expanded={helpOpen}
          >
            {helpOpen ? ui.hideHelp : ui.cantFindOrderId}
          </button>
          {helpOpen ? (
            <div className="myesims-help__body">
              <p>
                {ui.helpCheckEmail}{" "}
                <strong>NL-…</strong>
              </p>
              <p>{ui.helpMagicLink}</p>
              <button
                type="button"
                className="login-btn login-btn--ghost"
                disabled={linkBusy}
                onClick={() => void handleSendMagicLink()}
              >
                {linkBusy ? dict.lookup.sending : ui.emailMagicLink}
              </button>
              {linkMessage ? (
                <p className="order-lookup-note" role="status">
                  {linkMessage}
                </p>
              ) : null}
              <p>
                {ui.stillStuck}{" "}
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>{ui.messageWhatsApp}</a>.
              </p>
            </div>
          ) : null}
        </div>

        {rememberedHint ? (
          <p className="order-lookup-note">
            {ui.savedHint}{" "}
            <button
              type="button"
              className="lookup-action-btn"
              onClick={() => {
                forgetRememberedEmail();
                setEmail("");
                setOrderId("");
                setRememberedHint(false);
              }}
            >
              {ui.clearSaved}
            </button>
          </p>
        ) : (
          <p className="order-lookup-note">
            {ui.rememberNote}
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
            {ui.dataAdded}
          </div>
        ) : null}

        <div className="lookup-result__head">
          <div>
            <p className="myesims-kicker">
              {order.flag ? `${order.flag} ` : ""}
              {formatCountryLabel(order.country ?? "")}
            </p>
            <h1>{order.packageName ?? ui.lookupDefaultTitle}</h1>
          </div>
          {status ? (
            <span className={`lookup-status lookup-status--${status.tone}`}>
              {status.label}
            </span>
          ) : null}
        </div>

        {siblings.length > 1 ? (
          <div className="myesims-switcher">
            <span>{ui.yourEsims}</span>
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
            {ui.runningLow}
          </div>
        ) : null}

        {status?.installed ? <LandingReadyTag /> : null}

        {(order.qrCodeUrl || order.iosTapLink || order.lpaString) ? (
          status?.installed ? (
            <div className="myesims-install-toggle">
              <button
                type="button"
                className="order-usage__refresh"
                onClick={() => setInstallOpen((open) => !open)}
              >
                {installOpen ? ui.hideInstallQr : ui.showInstallQr}
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
            defaultOpen={Boolean(status?.runningLow)}
          />
        ) : null}

        {order.orderNumber ? (
          <OrderSupportThread orderNumber={order.orderNumber} email={email} />
        ) : null}

        <details className="myesims-details">
          <summary>{ui.orderDetails}</summary>
          <p>
            <strong>{ui.order}</strong> {order.orderNumber}
          </p>
          {order.price != null ? (
            <p>
              <strong>{ui.paid}</strong> {order.currency ?? "USD"}{" "}
              {Number(order.price).toFixed(2)}
            </p>
          ) : null}
        </details>

        <div className="lookup-actions">
          {!qrHref ? (
            <Link
              href={`/support?subject=${encodeURIComponent(dict.supportSubjects.installQr)}&email=${encodeURIComponent(email)}&orderId=${encodeURIComponent(order.orderNumber ?? orderId)}`}
              className="order-usage__refresh"
            >
              {ui.qrMissing}
            </Link>
          ) : null}

          {canResendQr ? (
            <button
              type="button"
              className="order-usage__refresh"
              onClick={handleResendQr}
              disabled={resendLoading}
            >
              {resendLoading ? dict.lookup.sending : dict.lookup.resendQr}
            </button>
          ) : null}

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="order-usage__refresh"
          >
            {ui.whatsappHelp}
          </a>
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
          {siblings.length > 1 ? ui.backToAll : ui.lookupAnother}
        </button>
      </div>
    </div>
  );
}
