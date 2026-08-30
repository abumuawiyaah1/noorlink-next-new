"use client";

import type { LookedUpOrder } from "@/lib/orders-api";

type OrderUsageSummaryProps = {
  order: LookedUpOrder;
  compact?: boolean;
};

function usagePercent(order: LookedUpOrder): number | null {
  const total = order.dataTotalGb;
  const remaining = order.dataRemainingGb;
  if (total == null || total <= 0 || remaining == null) return null;
  const used = Math.max(0, total - remaining);
  return Math.min(100, Math.round((used / total) * 100));
}

export function OrderUsageSummary({ order, compact = false }: OrderUsageSummaryProps) {
  const pct = usagePercent(order);
  const showData = order.dataTotalGb != null && order.dataRemainingGb != null;
  const showDays =
    order.validityDays != null && order.daysRemaining != null;
  const activationLabel = (() => {
    const status = (order.activationStatus ?? "").toLowerCase();
    if (status === "active" || status === "installed" || status === "activated") {
      return "Installed & active";
    }
    if (status === "provisioned") {
      return "Ready to install — not activated yet";
    }
    if (status === "expired") {
      return "Plan expired";
    }
    return null;
  })();

  if (!showData && !showDays && !order.fulfillmentPending && !activationLabel) {
    return null;
  }

  return (
    <div className={`order-usage${compact ? " order-usage--compact" : ""}`}>
      {order.fulfillmentPending ? (
        <p className="order-usage__pending" role="status">
          Your QR code is being prepared — usually within 1–2 minutes. This page
          refreshes automatically.
        </p>
      ) : null}

      {activationLabel ? (
        <div className="order-usage__block">
          <div className="order-usage__label-row">
            <span>Activation</span>
            <strong>{activationLabel}</strong>
          </div>
          {order.usageSyncedAt ? (
            <p className="order-usage__fine-print" style={{ marginTop: 6 }}>
              Usage updated {new Date(order.usageSyncedAt).toLocaleString()}
            </p>
          ) : null}
        </div>
      ) : null}

      {showData ? (
        <div className="order-usage__block">
          <div className="order-usage__label-row">
            <span>Data remaining</span>
            <strong>
              {order.dataRemainingGb} GB
              {order.dataTotalGb != null ? ` of ${order.dataTotalGb} GB` : ""}
            </strong>
          </div>
          {pct != null ? (
            <div
              className="order-usage__bar"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Data used"
            >
              <span style={{ width: `${pct}%` }} />
            </div>
          ) : null}
        </div>
      ) : null}

      {showDays ? (
        <div className="order-usage__block">
          <div className="order-usage__label-row">
            <span>Validity</span>
            <strong>
              {order.daysRemaining} day{order.daysRemaining === 1 ? "" : "s"} left
              {order.validityDays != null ? ` (${order.validityDays}-day plan)` : ""}
            </strong>
          </div>
        </div>
      ) : null}

      {!compact ? (
        <p className="order-usage__fine-print">
          Unused data expires when your validity period ends. No rollover. See{" "}
          <a href="/terms">Terms</a> and <a href="/refund">Refund Policy</a>.
        </p>
      ) : null}
    </div>
  );
}
