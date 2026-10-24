"use client";

import type { LookedUpOrder } from "@/lib/orders-api";
import type { CustomerStatus } from "@/lib/my-esims";
import { LOCALE_META } from "@/lib/i18n/config";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { renderTemplate } from "@/lib/i18n/template";
import { useLocaleState } from "@/lib/i18n/use-locale";

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
  const used =
    order.dataUsedGb != null
      ? order.dataUsedGb
      : total != null && order.dataRemainingGb != null
        ? Math.max(0, total - order.dataRemainingGb)
        : null;
  if (total == null || total <= 0 || used == null) return null;
  return Math.min(100, Math.round((used / total) * 100));
}

function formatUsd(value: number): string {
  return `$${Number(value).toFixed(2)}`;
}

function formatGb(value: number): string {
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.?0+$/, "");
}

export function OrderUsageSummary({
  order,
  compact = false,
  customerStatus,
  onRefreshUsage,
  refreshing = false,
}: OrderUsageSummaryProps) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const ui = dict.ordersUi;
  const dateLocale = LOCALE_META[locale].htmlLang;
  const formatWhen = (iso: string) => new Date(iso).toLocaleString(dateLocale);
  const isWallet =
    order.usageMode === "wallet" ||
    ((order.walletBalanceUsd != null || order.walletChargedUsd != null) &&
      order.dataRemainingGb == null &&
      order.dataUsedGb == null);

  const usedGb =
    order.dataUsedGb != null
      ? order.dataUsedGb
      : order.dataTotalGb != null && order.dataRemainingGb != null
        ? Math.max(0, Number(order.dataTotalGb) - Number(order.dataRemainingGb))
        : null;

  const showData =
    !isWallet &&
    (order.dataRemainingGb != null ||
      order.dataUsedGb != null ||
      (order.dataTotalGb != null && order.usageSyncedAt != null));
  const showDays =
    order.validityDays != null && order.daysRemaining != null;
  const showWallet =
    isWallet &&
    (order.walletBalanceUsd != null || order.walletChargedUsd != null);
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
          {ui.qrPreparing}
        </p>
      ) : null}

      <div className="order-usage__hero">
        {showData && order.dataRemainingGb != null ? (
          <div className="order-usage__hero-stat">
            <span>{ui.dataLeft}</span>
            <strong>
              {formatGb(order.dataRemainingGb)}
              <small>GB</small>
            </strong>
            {order.dataTotalGb != null ? (
              <em>{t(dict, "ordersUi.ofGb", { n: formatGb(order.dataTotalGb) })}</em>
            ) : null}
          </div>
        ) : null}

        {showData && usedGb != null ? (
          <div className="order-usage__hero-stat">
            <span>{ui.dataUsed}</span>
            <strong>
              {formatGb(usedGb)}
              <small>GB</small>
            </strong>
            {order.dataTotalGb != null ? (
              <em>{t(dict, "ordersUi.ofGbPlan", { n: formatGb(order.dataTotalGb) })}</em>
            ) : null}
          </div>
        ) : null}

        {showData &&
        order.dataRemainingGb == null &&
        usedGb == null &&
        order.dataTotalGb != null ? (
          <div className="order-usage__hero-stat">
            <span>{ui.dataLabel}</span>
            <strong className="order-usage__hero-stat--muted">
              {formatGb(order.dataTotalGb)} GB
            </strong>
            <em>
              {customerStatus?.installed
                ? ui.usageAfterNetwork
                : ui.usageInstallFirst}
            </em>
          </div>
        ) : null}

        {showWallet && order.walletBalanceUsd != null ? (
          <div className="order-usage__hero-stat">
            <span>{ui.walletLeft}</span>
            <strong>{formatUsd(Number(order.walletBalanceUsd))}</strong>
            <em>{ui.payAsYouGoShort}</em>
          </div>
        ) : null}

        {showWallet && order.walletChargedUsd != null ? (
          <div className="order-usage__hero-stat">
            <span>{ui.walletUsed}</span>
            <strong>{formatUsd(Number(order.walletChargedUsd))}</strong>
            <em>{ui.dataCharged}</em>
          </div>
        ) : null}

        {!showData && !showWallet && !order.fulfillmentPending ? (
          <div className="order-usage__hero-stat">
            <span>{ui.dataLabel}</span>
            <strong className="order-usage__hero-stat--muted">
              {order.dataTotalGb != null ? `${formatGb(order.dataTotalGb)} GB` : "—"}
            </strong>
            <em>
              {customerStatus?.installed
                ? ui.remainingAfterNetwork
                : ui.remainingInstallFirst}
            </em>
          </div>
        ) : null}

        {showDays ? (
          <div className="order-usage__hero-stat">
            <span>{ui.daysRemaining}</span>
            <strong>
              {order.daysRemaining}
              <small>{order.daysRemaining === 1 ? ui.dayUnit : ui.daysUnit}</small>
            </strong>
            {order.validityDays != null ? (
              <em>{t(dict, "ordersUi.validityPlan", { n: order.validityDays })}</em>
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
          aria-label={ui.dataUsed}
        >
          <span style={{ width: `${pct}%` }} />
        </div>
      ) : null}

      {showData && usedGb != null && order.dataRemainingGb != null ? (
        <p className="order-usage__fine-print" style={{ marginTop: 8 }}>
          {t(dict, "ordersUi.gbUsed", { n: formatGb(usedGb) })}
          {pct != null ? ` (${pct}%)` : ""}
          {order.usageSyncedAt
            ? ` · ${t(dict, "ordersUi.updatedAt", { time: formatWhen(order.usageSyncedAt) })}`
            : ""}
        </p>
      ) : null}

      {(showData || showWallet) && order.usageSyncedAt && !(showData && usedGb != null && order.dataRemainingGb != null) ? (
        <p className="order-usage__fine-print" style={{ marginTop: 8 }}>
          {t(dict, "ordersUi.updatedCap", { time: formatWhen(order.usageSyncedAt) })}
          {showWallet && order.walletFundedUsd != null
            ? ` · ${t(dict, "ordersUi.funded", { amount: formatUsd(Number(order.walletFundedUsd)) })}`
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
          {refreshing ? ui.refreshing : ui.usageRefresh}
        </button>
      ) : null}

      {!compact ? (
        <p className="order-usage__fine-print">
          {renderTemplate(ui.finePrint, {
            terms: <a href="/terms">{ui.terms}</a>,
            refund: <a href="/refund">{ui.refundPolicy}</a>,
          })}
        </p>
      ) : null}
    </div>
  );
}
