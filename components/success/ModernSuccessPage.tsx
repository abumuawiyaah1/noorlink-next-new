"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FunnelSteps } from "@/components/layout/FunnelSteps";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { OrderUsageSummary } from "@/components/orders/OrderUsageSummary";
import { EsimInstallPanel } from "@/components/orders/EsimInstallPanel";
import { LandingReadyChecklist } from "@/components/orders/LandingReadyChecklist";
import { rememberEmail, rememberOrderId, resolveCustomerStatus } from "@/lib/my-esims";
import { GiftEsimCard } from "@/components/success/GiftEsimCard";
import { ReferAFriendCard } from "@/components/success/ReferAFriendCard";
import { ReviewRequestCard } from "@/components/review/ReviewRequestCard";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";
import { formatCountryLabel } from "@/lib/country-slugs";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import {
  isPilgrimageOrder,
  PILGRIM_GIFT_GUIDES,
} from "@/lib/pilgrim-gift-guides";
import { lookupOrder, lookupOrderByPaymentIntent, lookupOrderBySession, type LookedUpOrder } from "@/lib/orders-api";
import { isSafeQrCodeUrl, safeExternalHref } from "@/lib/safe-url";

const EMAIL_STORAGE_KEY = "nl_checkout_email";

function resolveLookupEmail(emailParam: string | null): string {
  if (emailParam?.includes("@")) return emailParam.trim();
  if (typeof window === "undefined") return "";
  try {
    const remembered = window.localStorage.getItem(EMAIL_STORAGE_KEY);
    if (remembered?.includes("@")) return remembered.trim();
  } catch {
    /* ignore */
  }
  return "";
}

function SuccessContent() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const s = dict.successPage;
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const paymentIntentId = searchParams.get("payment_intent");
  const orderIdParam = searchParams.get("orderId") ?? searchParams.get("order_id");
  const giftReturn = searchParams.get("gift") === "1";
  const countryParam = formatCountryLabel(searchParams.get("country") ?? "");
  const priceParam = searchParams.get("price");
  const emailParam = searchParams.get("email");
  const planParam = searchParams.get("plan");

  const [order, setOrder] = useState<LookedUpOrder | null>(null);
  const [loading, setLoading] = useState(
    Boolean(sessionId || paymentIntentId || orderIdParam),
  );
  const [pollCount, setPollCount] = useState(0);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [pollingStopped, setPollingStopped] = useState(false);

  const MAX_POLLS = 20;

  const refresh = useCallback(async (): Promise<{
    order: LookedUpOrder | null;
    hardFail: boolean;
    error?: string;
  }> => {
    const lookupEmail = resolveLookupEmail(emailParam);
    if (sessionId) {
      if (!lookupEmail) {
        setLoading(false);
        return { order: null, hardFail: false };
      }
      const result = await lookupOrderBySession(sessionId, lookupEmail);
      if (result.order) setOrder(result.order);
      setLoading(false);
      const status = result.status ?? 0;
      const hardFail = Boolean(result.error && status >= 500);
      if (hardFail) setLookupError(result.error ?? s.lookupUnavailable);
      return { order: result.order, hardFail, error: result.error };
    }
    if (paymentIntentId) {
      if (!lookupEmail) {
        setLoading(false);
        return { order: null, hardFail: false };
      }
      const result = await lookupOrderByPaymentIntent(paymentIntentId, lookupEmail);
      if (result.order) setOrder(result.order);
      setLoading(false);
      const status = result.status ?? 0;
      const hardFail = Boolean(result.error && status >= 500);
      if (hardFail) setLookupError(result.error ?? s.lookupUnavailable);
      return { order: result.order, hardFail, error: result.error };
    }
    if (orderIdParam && lookupEmail) {
      const result = await lookupOrder(lookupEmail, orderIdParam);
      if (result.order) setOrder(result.order);
      setLoading(false);
      const status = result.status ?? 0;
      const hardFail = Boolean(result.error && status >= 500);
      if (hardFail) setLookupError(result.error ?? s.lookupUnavailable);
      return { order: result.order, hardFail, error: result.error };
    }
    setLoading(false);
    return { order: null, hardFail: false };
  }, [sessionId, paymentIntentId, orderIdParam, emailParam, s.lookupUnavailable]);

  useEffect(() => {
    if (!sessionId && !paymentIntentId && !(orderIdParam && emailParam)) {
      setLoading(false);
      return;
    }
    if (pollingStopped) return;
    if (order && !order.fulfillmentPending && order.qrCodeUrl) return;
    if (pollCount >= MAX_POLLS) {
      setPollingStopped(true);
      setLookupError((prev) => prev ?? s.stillPreparing);
      return;
    }

    let cancelled = false;
    const delay = pollCount === 0 ? 0 : Math.min(30_000, Math.round(8000 * Math.pow(1.35, pollCount - 1)));
    const timer = window.setTimeout(() => {
      void (async () => {
        const result = await refresh();
        if (cancelled) return;
        if (result.hardFail) {
          setPollingStopped(true);
          return;
        }
        if (result.order && !result.order.fulfillmentPending && result.order.qrCodeUrl) {
          setPollingStopped(true);
          return;
        }
        setPollCount((n) => n + 1);
      })();
    }, delay);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [
    sessionId,
    paymentIntentId,
    orderIdParam,
    emailParam,
    refresh,
    order,
    pollCount,
    pollingStopped,
    s.stillPreparing,
  ]);

  useEffect(() => {
    if (!order?.orderNumber) return;
    if (order.email) rememberEmail(order.email);
    rememberOrderId(order.orderNumber);
  }, [order?.orderNumber, order?.email]);

  const country = formatCountryLabel(order?.country ?? countryParam);
  const email = order?.email ?? emailParam;
  const plan = order?.packageName ?? planParam;
  const price =
    order?.price != null
      ? order.price.toFixed(2)
      : priceParam ?? "0.00";
  const orderNumber = order?.orderNumber;
  const dashboardQuery = `${
    email ? `?email=${encodeURIComponent(email)}` : ""
  }${orderNumber ? `${email ? "&" : "?"}orderId=${encodeURIComponent(orderNumber)}` : ""}`;
  const dashboardHref = `${localizedPath("/dashboard", locale)}${dashboardQuery}`;
  const supportQuery = `?subject=${encodeURIComponent(s.supportSubject)}${
    email ? `&email=${encodeURIComponent(email)}` : ""
  }${orderNumber ? `&orderId=${encodeURIComponent(orderNumber)}` : ""}`;
  const supportHref = `${localizedPath("/support", locale)}${supportQuery}`;
  const giftPriceFallback = Number.parseFloat(priceParam ?? "0");
  const giftCardPrice =
    order?.price ?? (Number.isFinite(giftPriceFallback) && giftPriceFallback > 0
      ? giftPriceFallback
      : undefined);
  const qrHref = safeExternalHref(order?.qrCodeUrl, isSafeQrCodeUrl);
  const isGiftPurchase = giftReturn || Boolean(order?.isGift);
  const showPilgrimGuides =
    !isGiftPurchase && isPilgrimageOrder(country, plan ?? undefined);
  const giftRecipientLabel =
    order?.giftRecipientName && order?.giftRecipientEmail
      ? `${order.giftRecipientName} (${order.giftRecipientEmail})`
      : order?.giftRecipientEmail ?? s.yourFriend;

  const planSuffix = plan
    ? t(dict, "successPage.planSuffix", { plan })
    : "";
  const emailSuffix = email
    ? t(dict, "successPage.emailSuffix", { email })
    : "";

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: localizedPath("/", locale), label: dict.common.home },
          {
            href: localizedPath("/destinations", locale),
            label: dict.nav.destinations,
          },
          { label: s.crumbConfirmed },
        ]}
      />
      <FunnelSteps
        current={4}
        steps={[
          { n: 1, label: dict.checkout.stepChoose },
          { n: 2, label: dict.checkout.stepDetails },
          { n: 3, label: dict.checkout.stepPay },
          { n: 4, label: dict.checkout.stepActivate },
        ]}
      />

      <div className="container">
        <div className="success-banner">
          <div className="check-icon">
            <i className="fas fa-check-circle" aria-hidden="true" />
          </div>
          <h1>{isGiftPurchase ? s.giftTitle : s.title}</h1>
          <p>
            {isGiftPurchase ? (
              <>
                {t(dict, "successPage.giftPreparingBefore", {
                  recipient: giftRecipientLabel,
                })}
                {orderNumber ? (
                  <>
                    {" "}
                    · <span className="order-id-inline">{orderNumber}</span>
                  </>
                ) : null}
                .
              </>
            ) : (
              t(dict, "successPage.preparing", {
                country,
                planSuffix,
                emailSuffix,
              })
            )}
          </p>
          <p>
            {s.orderTotal} <strong>${price}</strong>
            {orderNumber ? (
              <>
                {" "}
                · <span className="order-id-inline">{orderNumber}</span>
              </>
            ) : null}
          </p>
        </div>

        {lookupError ? (
          <p className="error-message" role="alert" style={{ marginTop: 16 }}>
            {lookupError}
          </p>
        ) : null}

        {order && !isGiftPurchase ? <OrderUsageSummary order={order} /> : null}

        {order &&
        !isGiftPurchase &&
        !order.fulfillmentPending &&
        (order.qrCodeUrl || order.iosTapLink || order.lpaString) ? (
          <EsimInstallPanel order={order} />
        ) : null}

        {order && !isGiftPurchase && !order.fulfillmentPending ? (
          <LandingReadyChecklist
            installed={resolveCustomerStatus(order).installed}
            preview
          />
        ) : null}

        {qrHref && order && !order.fulfillmentPending && !isGiftPurchase ? (
          <ReviewRequestCard orderId={order.orderNumber} compact />
        ) : null}

        {showPilgrimGuides ? (
          <aside className="pilgrim-gift-guides" aria-label={s.pilgrimGuidesAria}>
            <p className="pilgrim-gift-guides__kicker">{s.pilgrimKicker}</p>
            <h2 className="pilgrim-gift-guides__title">{s.pilgrimTitle}</h2>
            <p className="pilgrim-gift-guides__text">{s.pilgrimText}</p>
            <ul className="pilgrim-gift-guides__list">
              {PILGRIM_GIFT_GUIDES.map((guide) => {
                const copy = s.guides[guide.id as keyof typeof s.guides];
                return (
                  <li key={guide.id}>
                    <a
                      className="pilgrim-gift-guides__link"
                      href={guide.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="pilgrim-gift-guides__link-title">
                        {copy?.title ?? guide.title}
                      </span>
                      <span className="pilgrim-gift-guides__link-blurb">
                        {copy?.blurb ?? guide.blurb}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </aside>
        ) : null}

        {!isGiftPurchase ? (
        <div className="ticket-card">
          <div className="ticket-header">
            <strong>{s.whatNext}</strong>
            <span className="order-id">
              {loading ? s.loadingOrder : orderNumber ?? s.usuallyMinutes}
            </span>
          </div>
          <div className="ticket-body">
            <div className="qr-area">
              <div className="qr-placeholder" aria-hidden="true">
                {qrHref ? "✓" : "✉️"}
              </div>
              {qrHref ? (
                <>
                  <p className="scan-instruction">{s.qrReady}</p>
                  <p className="email-note" style={{ marginTop: 8 }}>
                    {s.preferEmail}
                  </p>
                </>
              ) : (
                <p className="scan-instruction">{s.qrPending}</p>
              )}
            </div>
            <div className="details-area">
              <h3>{s.installTitle}</h3>
              <div className="next-timeline">
                <div className="next-step">
                  <span>1</span>
                  <div>
                    <strong>{s.step1Title}</strong>
                    <p>{s.step1Body}</p>
                  </div>
                </div>
                <div className="next-step">
                  <span>2</span>
                  <div>
                    <strong>{s.step2Title}</strong>
                    <p>{s.step2Body}</p>
                  </div>
                </div>
                <div className="next-step">
                  <span>3</span>
                  <div>
                    <strong>{s.step3Title}</strong>
                    <p>{s.step3Body}</p>
                  </div>
                </div>
              </div>
              <ol className="install-steps">
                <li>{s.ol1}</li>
                <li>{s.ol2}</li>
                <li>{s.ol3}</li>
              </ol>
              <p className="email-note">
                {s.emailNoteBefore}{" "}
                <Link href={dashboardHref}>{dict.nav.myEsims}</Link>{" "}
                {s.emailNoteOr}{" "}
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>{s.whatsappSupport}</a>.
              </p>
              <div className="success-actions">
                <Link href={dashboardHref} className="btn-nav">
                  {s.trackOrder}
                </Link>
                <Link href={supportHref} className="btn-nav btn-nav--secondary">
                  {dict.common.contactSupport}
                </Link>
              </div>
            </div>
          </div>
        </div>
        ) : (
        <div className="ticket-card gift-sent-card">
          <div className="ticket-header">
            <strong>{s.whatNext}</strong>
            <span className="order-id">
              {loading ? s.loadingOrder : orderNumber ?? s.usuallyMinutes}
            </span>
          </div>
          <div className="ticket-body gift-sent-card__body">
            <ol className="install-steps">
              <li>{s.giftOl1}</li>
              <li>{s.giftOl2}</li>
              <li>{s.giftOl3}</li>
            </ol>
            <p className="email-note">
              {s.giftEmailNoteBefore}{" "}
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>{s.whatsappSupport}</a>.
            </p>
            <div className="success-actions">
              <Link href={localizedPath("/gift", locale)} className="btn-nav">
                {s.sendAnother}
              </Link>
              <Link
                href={localizedPath("/destinations", locale)}
                className="btn-nav btn-nav--secondary"
              >
                {s.browseDestinations}
              </Link>
            </div>
          </div>
        </div>
        )}

        <div className="loyalty-grid">
          {!isGiftPurchase ? (
            <GiftEsimCard
              buyerEmail={email}
              country={order?.country ?? countryParam}
              packageId={order?.packageId ?? undefined}
              plan={plan ?? undefined}
              price={giftCardPrice}
              flag={order?.flag ?? undefined}
            />
          ) : null}
          {!isGiftPurchase ? <ReferAFriendCard email={email} orderNumber={orderNumber} /> : null}
        </div>
        {isGiftPurchase ? (
          <div className="loyalty-grid loyalty-grid--single">
            <ReferAFriendCard email={email} orderNumber={orderNumber} />
          </div>
        ) : null}
      </div>
      <SiteFooter />
    </>
  );
}

export function ModernSuccessPage() {
  const [locale] = useLocaleState();
  const loading = getDictionary(locale).common.loading;
  return (
    <Suspense fallback={<main className="container">{loading}</main>}>
      <SuccessContent />
    </Suspense>
  );
}
