"use client";

import { useEffect, useState } from "react";
import { fetchCustomerReferralLink } from "@/lib/affiliate-api";

type Props = {
  email?: string | null;
  orderNumber?: string | null;
};

export function ReferAFriendCard({ email, orderNumber }: Props) {
  const [linkUrl, setLinkUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!email?.includes("@")) return;
    let cancelled = false;
    setLoading(true);
    void fetchCustomerReferralLink(email, orderNumber ?? undefined).then((result) => {
      if (cancelled) return;
      if (result.success && result.url) setLinkUrl(result.url);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [email, orderNumber]);

  async function copyLink() {
    if (!linkUrl) return;
    try {
      await navigator.clipboard.writeText(linkUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="loyalty-card card-refer">
      <p className="refer-title">Give friends 10% off — get 10% off your next trip</p>
      <p style={{ fontSize: "0.9rem" }}>
        Share your personal link. When a friend completes an order, we email you a
        single-use 10% reward for your next eSIM.
      </p>
      {loading ? (
        <p className="gift-note">Preparing your link…</p>
      ) : linkUrl ? (
        <>
          <div className="coupon-code" style={{ fontSize: "0.85rem", wordBreak: "break-all" }}>
            {linkUrl.replace(/^https?:\/\//, "")}
          </div>
          <button type="button" className="btn-nav" onClick={() => void copyLink()} style={{ marginTop: 12 }}>
            {copied ? "Copied!" : "Copy link"}
          </button>
        </>
      ) : (
        <p className="gift-note">Your link will appear once your order email is confirmed.</p>
      )}
    </div>
  );
}
