import { API_BASE } from "@/lib/api-client";
import { debug, debugError } from "@/lib/debug";

export type LookedUpOrder = {
  id?: string;
  orderNumber?: string;
  email?: string;
  country?: string;
  flag?: string;
  packageName?: string;
  price?: number;
  currency?: string;
  status?: string;
  createdAt?: string;
  qrCodeUrl?: string | null;
  activationCode?: string | null;
  dataUsedGb?: number | null;
  dataTotalGb?: number | null;
};

export async function lookupOrder(
  email: string,
  orderId: string,
): Promise<{ found: boolean; order: LookedUpOrder | null; error?: string }> {
  const params = new URLSearchParams({
    email: email.trim(),
    orderId: orderId.trim(),
  });
  const url = `${API_BASE}/api/orders/lookup?${params.toString()}`;
  debug("orders", "lookupOrder →", { orderId: orderId.trim() });

  try {
    const response = await fetch(url, { method: "GET" });
    const data = (await response.json().catch(() => ({}))) as {
      found?: boolean;
      order?: LookedUpOrder | null;
      detail?: string;
    };
    if (!response.ok) {
      const error = data.detail ?? "Could not look up this order.";
      debugError("orders", "lookup failed", { status: response.status, error });
      return { found: false, order: null, error };
    }
    debug("orders", "lookup result", {
      found: Boolean(data.found),
      status: data.order?.status,
    });
    return { found: Boolean(data.found), order: data.order ?? null };
  } catch (err) {
    debugError("orders", "network error", err);
    return {
      found: false,
      order: null,
      error: err instanceof Error ? err.message : "Lookup failed.",
    };
  }
}
