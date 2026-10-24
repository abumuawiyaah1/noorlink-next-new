"use client";

import { useEffect, useState } from "react";
import { fetchCustomerReferralLink } from "@/lib/affiliate-api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

type Props = {
  email?: string | null;
  orderNumber?: string | null;
};

export function ReferAFriendCard({ email, orderNumber }: Props) {
  const [locale] = useLocaleState();
  const r = getDictionary(locale).successPage.refer;
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
      <p className="refer-title">{r.title}</p>
      <p style={{ fontSize: "0.9rem" }}>{r.copy}</p>
      {loading ? (
        <p className="gift-note">{r.preparing}</p>
      ) : linkUrl ? (
        <>
          <div className="refer-link">{linkUrl.replace(/^https?:\/\//, "")}</div>
          <button
            type="button"
            className="btn-nav btn-nav--accent"
            onClick={() => void copyLink()}
            style={{ marginTop: 12 }}
          >
            {copied ? r.copied : r.copyLink}
          </button>
        </>
      ) : (
        <p className="gift-note">{r.waiting}</p>
      )}
    </div>
  );
}
