"use client";

import type { LookedUpOrder } from "@/lib/orders-api";

type OrderUsageSummaryProps = {
  order: LookedUpOrder;
  compact?: boolean;
  onRefreshUsage?: () => void;
  refreshing?: boolean;
};

function usagePercent(order: LookedUpOrder): number | null {
  const total = order.dataTotalGb;
  const remaining = order.dataRemainingGb;
  if (total == null || total <= 0 || remaining == null) return null;
  const used = Math.max(0, total - remaining);
  return Math.min(100, Math.round((used / total) * 100));
}

export function OrderUsageSummary({
  order,
  compact = false,
  onRefreshUsage,
  refreshing = false,
}: OrderUsageSummaryProps) {
  const pct = usagePercent(order);
  const showData = order.dataTotalGb != null && order.dataRemainingGb != null;
  const showDays =
    order.validityDays != null && order.daysRemaining != null;
  const showWallet = order.walletBalanceUsd != null;
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

  const canShowPanel =
    showData ||
    showDays ||
    showWallet ||
    order.fulfillmentPending ||
    activationLabel ||
    onRefreshUsage;

  if (!canShowPanel) {
    return null;
  }

  return (
    <div className={`order-usage${compact ? " order-usage--compact" : ""}`}>
      {order.fulfillmentPending ? (
        <p className="order-usage__pending" role="status">
          Your QR code is being prepared — usually within a few minutes. Check
          back here or wait for the delivery email.
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

      {showWallet ? (
        <div className="order-usage__block">
          <div className="order-usage__label-row">
            <span>Wallet balance</span>
            <strong>
              ${Number(order.walletBalanceUsd).toFixed(2)} remaining
            </strong>
          </div>
          <p className="order-usage__fine-print" style={{ marginTop: 6 }}>
            Pay-as-you-go line — top up below when you need more data.
          </p>
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
          {order.dataUsedGb != null ? (
            <p className="order-usage__fine-print" style={{ marginTop: 6 }}>
              {order.dataUsedGb} GB used
              {order.usagePct != null ? ` (${order.usagePct}%)` : ""}
            </p>
          ) : null}
        </div>
      ) : !order.fulfillmentPending && !showWallet ? (
        <div className="order-usage__block">
          <div className="order-usage__label-row">
            <span>Data usage</span>
            <strong>
              {order.dataTotalGb != null
                ? `${order.dataTotalGb} GB plan`
                : "Live usage unavailable"}
            </strong>
          </div>
          <p className="order-usage__fine-print" style={{ marginTop: 6 }}>
            {order.dataTotalGb != null
              ? "Plan size is on file. Live remaining data appears after the eSIM is installed and the network reports usage."
              : "We could not pull live usage for this line yet. Refresh after install, or message support with your order ID."}
          </p>
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

      {onRefreshUsage ? (
        <button
          type="button"
          className="order-usage__refresh"
          onClick={onRefreshUsage}
          disabled={refreshing}
        >
          {refreshing ? "Refreshing usage…" : "Refresh usage"}
        </button>
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
