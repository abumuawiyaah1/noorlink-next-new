"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FunnelSteps } from "@/components/layout/FunnelSteps";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { OrderUsageSummary } from "@/components/orders/OrderUsageSummary";
import { ReferAFriendCard } from "@/components/success/ReferAFriendCard";
import { ReviewRequestCard } from "@/components/review/ReviewRequestCard";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";
import { formatCountryLabel } from "@/lib/country-slugs";
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
  const qrHref = safeExternalHref(order?.qrCodeUrl, isSafeQrCodeUrl);

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
          <h1>Payment confirmed</h1>
          <p>
            Your eSIM for {country}
            {plan ? ` (${plan})` : ""} is being prepared
            {email ? ` — delivery goes to ${email}` : ""}.
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

        {order ? <OrderUsageSummary order={order} /> : null}

        {qrHref && order && !order.fulfillmentPending ? (
          <ReviewRequestCard orderId={order.orderNumber} compact />
        ) : null}

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
                {qrHref ? "📲" : "✉️"}
              </div>
              {qrHref ? (
                <>
                  <p className="scan-instruction">Your QR is ready</p>
                  <a
                    href={qrHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-nav"
                    style={{ display: "inline-block", marginTop: 12 }}
                  >
                    Open QR / install
                  </a>
                </>
              ) : (
                <p className="scan-instruction">
                  The QR code is not shown here. It arrives in a second email after
                  payment confirms.
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
                    <strong>QR delivery email</strong>
                    <p>The second email includes the QR code and install details.</p>
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
                <li>Open the delivery email and find the QR code.</li>
                <li>
                  On iPhone: Settings → Cellular → Add eSIM. On Android: Settings →
                  Network → SIMs → Add eSIM.
                </li>
                <li>Scan the QR, turn the line on, and enable data roaming.</li>
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

        <div className="loyalty-grid">
          <div className="loyalty-card card-gift">
            <div className="gift-title">
              <i className="fas fa-gift" aria-hidden="true" /> Share &amp; save
            </div>
            <p style={{ fontSize: "0.9rem" }}>
              Give friends 10% off — earn 10% off your next trip when they buy.
            </p>
          </div>
          <ReferAFriendCard email={email} orderNumber={orderNumber} />
        </div>
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
