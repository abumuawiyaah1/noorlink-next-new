import { API_BASE } from "@/lib/api-client";

export type ResolvedAffiliate = {
  valid: boolean;
  code?: string;
  type?: string;
  displayName?: string;
  organizationName?: string;
  customerDiscountPercent?: number;
  landingPath?: string;
  paysCash?: boolean;
  message?: string;
};

export type CustomerReferralLink = {
  success: boolean;
  code?: string;
  url?: string;
  customerDiscountPercent?: number;
  referrerRewardPercent?: number;
  message?: string;
};

export type AffiliateDashboard = {
  success: boolean;
  code?: string;
  type?: string;
  displayName?: string;
  referralUrl?: string;
  customerDiscountPercent?: number;
  commissionPercent?: number;
  paysCash?: boolean;
  approvedBalanceCents?: number;
  paidTotalCents?: number;
  payoutMinimumCents?: number;
  readyForPayout?: boolean;
  recentCommissions?: Array<{
    orderNumber?: string;
    commissionCents?: number;
    status?: string;
    fulfilledAt?: string;
  }>;
  message?: string;
};

export async function resolveAffiliate(ref: string): Promise<ResolvedAffiliate> {
  const code = ref.trim();
  if (!code) return { valid: false, message: "Missing referral code." };

  const url = `${API_BASE}/api/affiliate/resolve?ref=${encodeURIComponent(code)}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = (await res.json()) as Record<string, unknown>;
    return {
      valid: Boolean(data.valid),
      code: typeof data.code === "string" ? data.code : undefined,
      type: typeof data.type === "string" ? data.type : undefined,
      displayName:
        typeof data.displayName === "string" ? data.displayName : undefined,
      organizationName:
        typeof data.organizationName === "string"
          ? data.organizationName
          : undefined,
      customerDiscountPercent:
        typeof data.customerDiscountPercent === "number"
          ? data.customerDiscountPercent
          : undefined,
      landingPath:
        typeof data.landingPath === "string" ? data.landingPath : undefined,
      paysCash: typeof data.paysCash === "boolean" ? data.paysCash : undefined,
      message: typeof data.message === "string" ? data.message : undefined,
    };
  } catch {
    return { valid: false, message: "Could not verify referral link." };
  }
}

export async function fetchCustomerReferralLink(
  email: string,
  orderNumber?: string,
): Promise<CustomerReferralLink> {
  const params = new URLSearchParams({ email: email.trim() });
  if (orderNumber) params.set("orderNumber", orderNumber);

  const url = `${API_BASE}/api/affiliate/referral-link?${params.toString()}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    return (await res.json()) as CustomerReferralLink;
  } catch {
    return { success: false, message: "Could not load your referral link." };
  }
}

export async function fetchAffiliateDashboard(
  code: string,
  email: string,
): Promise<AffiliateDashboard> {
  const params = new URLSearchParams({
    code: code.trim(),
    email: email.trim(),
  });
  const url = `${API_BASE}/api/affiliate/dashboard?${params.toString()}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    return (await res.json()) as AffiliateDashboard;
  } catch {
    return { success: false, message: "Could not load partner dashboard." };
  }
}

export type AffiliatePayoutRequestResult = {
  success: boolean;
  code?: string;
  approvedBalanceCents?: number;
  message?: string;
};

export async function requestAffiliatePayout(
  code: string,
  email: string,
): Promise<AffiliatePayoutRequestResult> {
  const url = `${API_BASE}/api/affiliate/payout-request`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code.trim(), email: email.trim() }),
    });
    return (await res.json()) as AffiliatePayoutRequestResult;
  } catch {
    return { success: false, message: "Could not send payout request." };
  }
}
