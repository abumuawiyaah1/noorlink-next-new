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
import { GiftEsimCard } from "@/components/success/GiftEsimCard";
import { ReferAFriendCard } from "@/components/success/ReferAFriendCard";
import { ReviewRequestCard } from "@/components/review/ReviewRequestCard";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";
import { formatCountryLabel } from "@/lib/country-slugs";
import {
  isPilgrimageOrder,
  PILGRIM_GIFT_GUIDES,
} from "@/lib/pilgrim-gift-guides";
import { lookupOrderByPaymentIntent, lookupOrderBySession, type LookedUpOrder } from "@/lib/orders-api";
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
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const paymentIntentId = searchParams.get("payment_intent");
  const giftReturn = searchParams.get("gift") === "1";
  const countryParam = formatCountryLabel(searchParams.get("country") ?? "");
  const priceParam = searchParams.get("price");
  const emailParam = searchParams.get("email");
  const planParam = searchParams.get("plan");

  const [order, setOrder] = useState<LookedUpOrder | null>(null);
  const [loading, setLoading] = useState(Boolean(sessionId || paymentIntentId));

  const refresh = useCallback(async () => {
    const lookupEmail = resolveLookupEmail(emailParam);
    if (sessionId) {
      if (!lookupEmail) {
        setLoading(false);
        return;
      }
      const result = await lookupOrderBySession(sessionId, lookupEmail);
      if (result.order) setOrder(result.order);
      setLoading(false);
      return;
    }
    if (paymentIntentId) {
      if (!lookupEmail) {
        setLoading(false);
        return;
      }
      const result = await lookupOrderByPaymentIntent(paymentIntentId, lookupEmail);
      if (result.order) setOrder(result.order);
      setLoading(false);
    }
  }, [sessionId, paymentIntentId, emailParam]);

  useEffect(() => {
    if (!sessionId && !paymentIntentId) {
      setLoading(false);
      return;
    }
    void refresh();
    const pending = order?.fulfillmentPending ?? true;
    if (!pending && order?.qrCodeUrl) return;
    const timer = window.setInterval(() => {
      void refresh();
    }, 8000);
    return () => window.clearInterval(timer);
  }, [sessionId, paymentIntentId, refresh, order?.fulfillmentPending, order?.qrCodeUrl]);

  const country = formatCountryLabel(order?.country ?? countryParam);
  const email = order?.email ?? emailParam;
  const plan = order?.packageName ?? planParam;
  const price =
    order?.price != null
      ? order.price.toFixed(2)
      : priceParam ?? "0.00";
  const orderNumber = order?.orderNumber;
  const dashboardHref = `/dashboard${
    email ? `?email=${encodeURIComponent(email)}` : ""
  }${orderNumber ? `${email ? "&" : "?"}orderId=${encodeURIComponent(orderNumber)}` : ""}`;
  const supportHref = `/support?subject=${encodeURIComponent("Install / QR code")}${
    email ? `&email=${encodeURIComponent(email)}` : ""
  }${orderNumber ? `&orderId=${encodeURIComponent(orderNumber)}` : ""}`;
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
      : order?.giftRecipientEmail ?? "your friend";

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/destinations", label: "Destinations" },
          { label: "Order confirmed" },
        ]}
      />
      <FunnelSteps
        current={4}
        steps={[
          { n: 1, label: "Choose plan" },
          { n: 2, label: "Your details" },
          { n: 3, label: "Pay securely" },
          { n: 4, label: "Activate" },
        ]}
      />

      <div className="container">
        <div className="success-banner">
          <div className="check-icon">
            <i className="fas fa-check-circle" aria-hidden="true" />
          </div>
          <h1>{isGiftPurchase ? "Gift payment confirmed" : "Payment confirmed"}</h1>
          <p>
            {isGiftPurchase ? (
              <>
                We&apos;re preparing the eSIM for {giftRecipientLabel}. They&apos;ll
                receive the QR code and your message by email
                {orderNumber ? (
                  <>
                    {" "}
                    · <span className="order-id-inline">{orderNumber}</span>
                  </>
                ) : null}
                .
              </>
            ) : (
              <>
                Your eSIM for {country}
                {plan ? ` (${plan})` : ""} is being prepared
                {email ? ` — delivery goes to ${email}` : ""}.
              </>
            )}
          </p>
          <p>
            Order total: <strong>${price}</strong>
            {orderNumber ? (
              <>
                {" "}
                · <span className="order-id-inline">{orderNumber}</span>
              </>
            ) : null}
          </p>
        </div>

        {order && !isGiftPurchase ? <OrderUsageSummary order={order} /> : null}

        {order &&
        !isGiftPurchase &&
        !order.fulfillmentPending &&
        (order.qrCodeUrl || order.iosTapLink || order.lpaString) ? (
          <EsimInstallPanel order={order} />
        ) : null}

        {qrHref && order && !order.fulfillmentPending && !isGiftPurchase ? (
          <ReviewRequestCard orderId={order.orderNumber} compact />
        ) : null}

        {showPilgrimGuides ? (
          <aside className="pilgrim-gift-guides" aria-label="Complimentary pilgrimage guides">
            <p className="pilgrim-gift-guides__kicker">
              Complimentary gift with your purchase
            </p>
            <h2 className="pilgrim-gift-guides__title">
              Free al-Haramayn guides
            </h2>
            <p className="pilgrim-gift-guides__text">
              Also in your delivery email. Save on Wi‑Fi before you fly — not required
              to use your eSIM.
            </p>
            <ul className="pilgrim-gift-guides__list">
              {PILGRIM_GIFT_GUIDES.map((guide) => (
                <li key={guide.id}>
                  <a
                    className="pilgrim-gift-guides__link"
                    href={guide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="pilgrim-gift-guides__link-title">{guide.title}</span>
                    <span className="pilgrim-gift-guides__link-blurb">{guide.blurb}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        {!isGiftPurchase ? (
        <div className="ticket-card">
          <div className="ticket-header">
            <strong>What happens next</strong>
            <span className="order-id">
              {loading ? "Loading order…" : orderNumber ?? "Usually 1–2 min"}
            </span>
          </div>
          <div className="ticket-body">
            <div className="qr-area">
              <div className="qr-placeholder" aria-hidden="true">
                {qrHref ? "✓" : "✉️"}
              </div>
              {qrHref ? (
                <>
                  <p className="scan-instruction">Your install QR is ready above</p>
                  <p className="email-note" style={{ marginTop: 8 }}>
                    Prefer email? The same branded QR and one-tap links are in your
                    delivery message.
                  </p>
                </>
              ) : (
                <p className="scan-instruction">
                  Your branded QR and install links appear here as soon as payment
                  confirms — usually within a minute or two.
                </p>
              )}
            </div>
            <div className="details-area">
              <h3>Install in 3 steps</h3>
              <div className="next-timeline">
                <div className="next-step">
                  <span>1</span>
                  <div>
                    <strong>Payment confirmation</strong>
                    <p>Your first email confirms the order and shows the order ID.</p>
                  </div>
                </div>
                <div className="next-step">
                  <span>2</span>
                  <div>
                    <strong>Install on this page or email</strong>
                    <p>
                      Scan the NoorLink QR, or tap Install on iPhone / Android if you
                      can’t scan.
                    </p>
                  </div>
                </div>
                <div className="next-step">
                  <span>3</span>
                  <div>
                    <strong>Track usage here</strong>
                    <p>
                      See GB and days remaining in My eSIMs anytime during your trip.
                    </p>
                  </div>
                </div>
              </div>
              <ol className="install-steps">
                <li>Use Wi‑Fi before you install.</li>
                <li>Scan the QR or open a one-tap install link on your phone.</li>
                <li>After landing, turn the NoorLink line on and enable data roaming.</li>
              </ol>
              <p className="email-note">
                Check inbox and spam/junk. If nothing arrives within 10 minutes,
                look up the order in{" "}
                <Link href={dashboardHref}>My eSIMs</Link> or message{" "}
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>WhatsApp support</a>.
              </p>
              <div className="success-actions">
                <Link href={dashboardHref} className="btn-nav">
                  Track this order
                </Link>
                <Link href={supportHref} className="btn-nav btn-nav--secondary">
                  Contact support
                </Link>
              </div>
            </div>
          </div>
        </div>
        ) : (
        <div className="ticket-card gift-sent-card">
          <div className="ticket-header">
            <strong>What happens next</strong>
            <span className="order-id">
              {loading ? "Loading order…" : orderNumber ?? "Usually 1–2 min"}
            </span>
          </div>
          <div className="ticket-body gift-sent-card__body">
            <ol className="install-steps">
              <li>We provision the eSIM and email the QR code to your friend.</li>
              <li>You receive a confirmation email when delivery is sent.</li>
              <li>They install on Wi‑Fi before they fly — same calm NoorLink steps.</li>
            </ol>
            <p className="email-note">
              If they don&apos;t see the email within 10 minutes, ask them to check
              spam or contact{" "}
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>WhatsApp support</a>.
            </p>
            <div className="success-actions">
              <Link href="/gift" className="btn-nav">
                Send another gift
              </Link>
              <Link href="/destinations" className="btn-nav btn-nav--secondary">
                Browse destinations
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
  return (
    <Suspense fallback={<main className="container">Loading…</main>}>
      <SuccessContent />
    </Suspense>
  );
}
