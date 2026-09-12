/** Customer-facing helpers for My eSIMs. */

import type { LookedUpOrder } from "@/lib/orders-api";

export const MY_ESIMS_EMAIL_KEY = "nl_myesims_email";

export type CustomerStatusTone = "ready" | "active" | "low" | "pending" | "expired" | "neutral";

export type CustomerStatus = {
  label: string;
  tone: CustomerStatusTone;
  installed: boolean;
  runningLow: boolean;
};

export function readRememberedEmail(): string {
  if (typeof window === "undefined") return "";
  try {
    return (window.localStorage.getItem(MY_ESIMS_EMAIL_KEY) || "").trim();
  } catch {
    return "";
  }
}

export function rememberEmail(email: string): void {
  if (typeof window === "undefined") return;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return;
  try {
    window.localStorage.setItem(MY_ESIMS_EMAIL_KEY, normalized);
  } catch {
    /* ignore */
  }
}

export function forgetRememberedEmail(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(MY_ESIMS_EMAIL_KEY);
  } catch {
    /* ignore */
  }
}

export function resolveCustomerStatus(order: LookedUpOrder): CustomerStatus {
  const raw = (order.status ?? "").toLowerCase();
  const activation = (order.activationStatus ?? "").toLowerCase();
  const pending = Boolean(order.fulfillmentPending);

  if (raw === "expired" || activation === "expired") {
    return { label: "Expired", tone: "expired", installed: true, runningLow: false };
  }
  if (raw === "refunded" || raw === "failed") {
    return { label: "Unavailable", tone: "neutral", installed: false, runningLow: false };
  }
  if (pending || raw === "paid" || raw === "processing") {
    return { label: "Preparing", tone: "pending", installed: false, runningLow: false };
  }

  const installed =
    activation === "active" ||
    activation === "installed" ||
    activation === "activated" ||
    raw === "active";

  const usagePct =
    order.usagePct != null
      ? order.usagePct
      : order.dataTotalGb != null &&
          order.dataRemainingGb != null &&
          order.dataTotalGb > 0
        ? Math.min(
            100,
            Math.round(
              ((order.dataTotalGb - order.dataRemainingGb) / order.dataTotalGb) * 100,
            ),
          )
        : null;
  const runningLow =
    (usagePct != null && usagePct >= 80) ||
    (order.dataRemainingGb != null &&
      order.dataTotalGb != null &&
      order.dataTotalGb > 0 &&
      order.dataRemainingGb / order.dataTotalGb <= 0.2) ||
    (order.daysRemaining != null && order.daysRemaining <= 2 && order.daysRemaining >= 0);

  if (runningLow && installed) {
    return { label: "Running low", tone: "low", installed: true, runningLow: true };
  }
  if (installed) {
    return { label: "Installed", tone: "active", installed: true, runningLow: false };
  }
  if (raw === "delivered" || activation === "provisioned") {
    return { label: "Ready to install", tone: "ready", installed: false, runningLow: false };
  }
  return { label: "Ready", tone: "ready", installed: false, runningLow: false };
}
