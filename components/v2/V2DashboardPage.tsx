"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ActivationHub, type ActivationData } from "@/components/v2/ActivationHub";
import { V2SiteHeader } from "@/components/v2/V2SiteHeader";
import { lookupOrder, type LookedUpOrder } from "@/lib/orders-api";
import { formatCountryLabel } from "@/lib/country-slugs";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";
import { useCurrency } from "@/components/v2/context/CurrencyContext";
import { previewPath } from "@/lib/v2/preview-paths";

function orderToActivation(order: LookedUpOrder, email: string): ActivationData {
  return {
    qrCodeUrl: order.qrCodeUrl,
    lpaString: order.activationCode?.startsWith("LPA:") ? order.activationCode : null,
    activationCode: order.activationCode,
    orderNumber: order.orderNumber,
    email: order.email ?? email,
  };
}

export function V2DashboardPage() {
  const { formatPrice } = useCurrency();
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<LookedUpOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const result = await lookupOrder(email, orderId);
    setLoading(false);
    if (!result.found || !result.order) {
      setOrder(null);
      setError(result.error ?? "Order not found.");
      return;
    }
    setOrder(result.order);
  }

  return (
    <>
      <V2SiteHeader />
      <main className="v2-main v2-main--narrow">
        <h1>My eSIMs</h1>
        <p className="v2-dashboard__sub">
          Look up your order to view QR, one-tap install, and top-up options.
        </p>

        {!order ? (
          <form className="v2-dashboard__form" onSubmit={handleSubmit}>
            <label className="v2-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="v2-field">
              <span>Order ID</span>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="NL-123456"
                required
              />
            </label>
            {error ? (
              <p className="v2-error" role="alert">
                {error}
              </p>
            ) : null}
            <button type="submit" className="v2-btn v2-btn--primary" disabled={loading}>
              {loading ? "Looking up…" : "Find my eSIM"}
            </button>
          </form>
        ) : (
          <div className="v2-dashboard__result">
            <div className="v2-dashboard__card">
              <h2>{order.packageName ?? "Your eSIM"}</h2>
              <p>
                {order.flag} {formatCountryLabel(order.country ?? "")}
              </p>
              <p>
                Status: <strong>{order.status ?? "unknown"}</strong>
              </p>
              {order.price != null ? (
                <p>Paid: {formatPrice(Number(order.price))}</p>
              ) : null}
              {order.dataTotalGb != null ? (
                <div className="v2-usage-bar" aria-label="Data usage">
                  <div
                    className="v2-usage-bar__fill"
                    style={{
                      width: `${Math.min(100, ((order.dataUsedGb ?? 0) / order.dataTotalGb) * 100)}%`,
                    }}
                  />
                  <span>
                    {order.dataUsedGb ?? 0} / {order.dataTotalGb} GB used
                  </span>
                </div>
              ) : null}
            </div>

            <ActivationHub data={orderToActivation(order, email)} />

            <div className="v2-topup-teaser">
              <h3>Top up this eSIM</h3>
              <p>Add data to your active pass without a new QR (provider-dependent).</p>
              <button type="button" className="v2-btn v2-btn--accent" disabled>
                Top up — coming with Telna integration
              </button>
            </div>

            <div className="v2-dashboard__actions">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="v2-btn v2-btn--whatsapp">
                WhatsApp support
              </a>
              <button type="button" className="v2-btn v2-btn--ghost" onClick={() => setOrder(null)}>
                Look up another order
              </button>
            </div>
          </div>
        )}

        <p className="v2-dashboard__demo">
          <Link href={previewPath("/success?demo=1")}>See demo activation screen →</Link>
        </p>
      </main>
    </>
  );
}
