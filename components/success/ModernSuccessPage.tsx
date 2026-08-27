"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FunnelSteps } from "@/components/layout/FunnelSteps";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { OrderUsageSummary } from "@/components/orders/OrderUsageSummary";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";
import { formatCountryLabel } from "@/lib/country-slugs";
import { lookupOrderBySession, type LookedUpOrder } from "@/lib/orders-api";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const countryParam = formatCountryLabel(searchParams.get("country") ?? "");
  const priceParam = searchParams.get("price");
  const emailParam = searchParams.get("email");
  const planParam = searchParams.get("plan");

  const [order, setOrder] = useState<LookedUpOrder | null>(null);
  const [loading, setLoading] = useState(Boolean(sessionId));

  const refresh = useCallback(async () => {
    if (!sessionId) return;
    const result = await lookupOrderBySession(sessionId);
    if (result.order) {
      setOrder(result.order);
    }
    setLoading(false);
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) {
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
  }, [sessionId, refresh, order?.fulfillmentPending, order?.qrCodeUrl]);

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
                {order?.qrCodeUrl ? "📲" : "✉️"}
              </div>
              {order?.qrCodeUrl ? (
                <>
                  <p className="scan-instruction">Your QR is ready</p>
                  <a
                    href={order.qrCodeUrl}
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
              <i className="fas fa-gift" aria-hidden="true" /> A gift for you
            </div>
            <p style={{ fontSize: "0.9rem" }}>10% off your next trip</p>
            <div className="coupon-code">NOOR-VIP-10</div>
            <div className="gift-note">Valid for 1 year · Any destination</div>
          </div>
          <div className="loyalty-card card-refer">
            <p className="refer-title">Need the QR now?</p>
            <p>Use My eSIMs with the email you paid with. Support is available 24/7.</p>
            <Link href={dashboardHref} className="btn-nav">
              Open My eSIMs
            </Link>
          </div>
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
