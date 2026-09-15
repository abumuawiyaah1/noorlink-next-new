"use client";

import type { LookedUpOrder } from "@/lib/orders-api";
import type { CustomerStatus } from "@/lib/my-esims";

type OrderUsageSummaryProps = {
  order: LookedUpOrder;
  compact?: boolean;
  customerStatus?: CustomerStatus;
  onRefreshUsage?: () => void;
  refreshing?: boolean;
};

function usagePercent(order: LookedUpOrder): number | null {
  if (order.usagePct != null) {
    return Math.min(100, Math.max(0, Math.round(order.usagePct)));
  }
  const total = order.dataTotalGb;
  const remaining = order.dataRemainingGb;
  if (total == null || total <= 0 || remaining == null) return null;
  const used = Math.max(0, total - remaining);
  return Math.min(100, Math.round((used / total) * 100));
}

function formatUsd(value: number): string {
  return `$${Number(value).toFixed(2)}`;
}

export function OrderUsageSummary({
  order,
  compact = false,
  customerStatus,
  onRefreshUsage,
  refreshing = false,
}: OrderUsageSummaryProps) {
  const isWallet =
    order.usageMode === "wallet" ||
    (order.walletBalanceUsd != null && order.dataRemainingGb == null);

  const usedGb =
    order.dataUsedGb != null
      ? order.dataUsedGb
      : order.dataTotalGb != null && order.dataRemainingGb != null
        ? Math.max(0, Number(order.dataTotalGb) - Number(order.dataRemainingGb))
        : null;

  const showData =
    !isWallet && order.dataTotalGb != null && order.dataRemainingGb != null;
  const showDays =
    order.validityDays != null && order.daysRemaining != null;
  const showWallet = isWallet && order.walletBalanceUsd != null;
  const pct = usagePercent(order);

  const canShowPanel =
    showData ||
    showDays ||
    showWallet ||
    order.fulfillmentPending ||
    customerStatus ||
    onRefreshUsage ||
    usedGb != null;

  if (!canShowPanel) {
    return null;
  }

  return (
    <div className={`order-usage${compact ? " order-usage--compact" : ""}`}>
      {order.fulfillmentPending ? (
        <p className="order-usage__pending" role="status">
          Your QR is being prepared — usually within a few minutes. Stay on this
          page or wait for the delivery email.
        </p>
      ) : null}

      <div className="order-usage__hero">
        {showData ? (
          <div className="order-usage__hero-stat">
            <span>Data left</span>
            <strong>
              {order.dataRemainingGb}
              <small>GB</small>
            </strong>
            {order.dataTotalGb != null ? (
              <em>of {order.dataTotalGb} GB</em>
            ) : null}
          </div>
        ) : showWallet ? (
          <div className="order-usage__hero-stat">
            <span>Wallet left</span>
            <strong>{formatUsd(Number(order.walletBalanceUsd))}</strong>
            <em>pay-as-you-go</em>
          </div>
        ) : !order.fulfillmentPending ? (
          <div className="order-usage__hero-stat">
            <span>Data</span>
            <strong className="order-usage__hero-stat--muted">
              {order.dataTotalGb != null ? `${order.dataTotalGb} GB` : "—"}
            </strong>
            <em>
              {customerStatus?.installed
                ? "Remaining data appears after the network reports usage. Tap refresh after you connect."
                : "Install first — remaining data shows after you’re on the network."}
            </em>
          </div>
        ) : null}

        {showWallet && order.walletChargedUsd != null ? (
          <div className="order-usage__hero-stat">
            <span>Used</span>
            <strong>{formatUsd(Number(order.walletChargedUsd))}</strong>
            <em>data charged</em>
          </div>
        ) : null}

        {showDays ? (
          <div className="order-usage__hero-stat">
            <span>Days left</span>
            <strong>
              {order.daysRemaining}
              <small>{order.daysRemaining === 1 ? "day" : "days"}</small>
            </strong>
            {order.validityDays != null ? (
              <em>{order.validityDays}-day plan</em>
            ) : null}
          </div>
        ) : null}
      </div>

      {(showData || showWallet) && pct != null ? (
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

      {showData && usedGb != null ? (
        <p className="order-usage__fine-print" style={{ marginTop: 8 }}>
          {usedGb} GB used
          {pct != null ? ` (${pct}%)` : ""}
          {order.usageSyncedAt
            ? ` · updated ${new Date(order.usageSyncedAt).toLocaleString()}`
            : ""}
        </p>
      ) : null}

      {showWallet && order.usageSyncedAt ? (
        <p className="order-usage__fine-print" style={{ marginTop: 8 }}>
          Updated {new Date(order.usageSyncedAt).toLocaleString()}
          {order.walletFundedUsd != null
            ? ` · funded ${formatUsd(Number(order.walletFundedUsd))}`
            : ""}
        </p>
      ) : null}

      {onRefreshUsage ? (
        <button
          type="button"
          className="order-usage__refresh"
          onClick={onRefreshUsage}
          disabled={refreshing}
        >
          {refreshing ? "Refreshing…" : "Refresh usage"}
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
