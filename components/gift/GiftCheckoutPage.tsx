"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { createCheckoutSession } from "@/lib/checkout-api";
import { formatCountryLabel } from "@/lib/country-slugs";
import { isSafeStripeCheckoutUrl } from "@/lib/safe-url";

const EMAIL_STORAGE_KEY = "nl_checkout_email";
const MESSAGE_MAX = 280;

function parsePrice(value: string | null): number {
  if (!value) return 0;
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function GiftCheckoutContent() {
  const searchParams = useSearchParams();
  const country = formatCountryLabel(searchParams.get("country") ?? "Your destination");
  const flag = searchParams.get("flag") ?? "🌍";
  const packageId = searchParams.get("packageId") ?? searchParams.get("package_id");
  const plan = searchParams.get("plan") ?? "Selected plan";
  const price = parsePrice(searchParams.get("price"));
  const buyerEmailParam = searchParams.get("buyerEmail") ?? searchParams.get("email") ?? "";

  const [buyerEmail, setBuyerEmail] = useState(buyerEmailParam);
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const formattedTotal = useMemo(() => price.toFixed(2), [price]);
  const messageRemaining = MESSAGE_MAX - giftMessage.length;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    const normalizedBuyer = buyerEmail.trim();
    const normalizedRecipient = recipientEmail.trim();
    const normalizedRecipientName = recipientName.trim();

    if (!normalizedBuyer.includes("@")) {
      setError("Enter your email — we send you a confirmation when the gift delivers.");
      return;
    }
    if (!normalizedRecipientName) {
      setError("Enter your friend's name.");
      return;
    }
    if (!normalizedRecipient.includes("@")) {
      setError("Enter a valid email for your friend.");
      return;
    }
    if (normalizedBuyer.toLowerCase() === normalizedRecipient.toLowerCase()) {
      setError("Recipient email must be different from yours.");
      return;
    }
    if (!packageId?.trim()) {
      setError("Missing plan. Go back to your order and try again.");
      return;
    }
    if (price <= 0) {
      setError("Invalid plan price. Go back and select a plan again.");
      return;
    }

    setSubmitting(true);
    try {
      try {
        window.localStorage.setItem(EMAIL_STORAGE_KEY, normalizedBuyer);
      } catch {
        /* ignore */
      }

      const result = await createCheckoutSession({
        email: normalizedBuyer,
        country,
        price,
        flag: flag || undefined,
        packageId: packageId.trim(),
        isGift: true,
        gift: {
          recipientEmail: normalizedRecipient,
          recipientName: normalizedRecipientName,
          giftMessage: giftMessage.trim() || undefined,
          senderName: senderName.trim() || undefined,
        },
      });

      if (!result.success || !result.checkoutUrl) {
        setError(result.error ?? "We could not start payment. Please try again.");
        setSubmitting(false);
        return;
      }
      if (!isSafeStripeCheckoutUrl(result.checkoutUrl)) {
        setError("Invalid payment redirect. Please try again or contact support.");
        setSubmitting(false);
        return;
      }
      window.location.assign(result.checkoutUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error starting payment.");
      setSubmitting(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/destinations", label: "Destinations" },
          { label: "Gift an eSIM" },
        ]}
      />

      <main className="container gift-checkout">
        <div className="gift-checkout__intro">
          <p className="gift-checkout__kicker">Gift an eSIM</p>
          <h1>Send data for their trip</h1>
          <p>
            You pay once. They receive the QR code and install steps by email —
            with your personal note.
          </p>
        </div>

        <form className="gift-checkout__card card" onSubmit={(e) => void handleSubmit(e)}>
          <div className="gift-checkout__plan">
            <span className="gift-checkout__flag" aria-hidden="true">
              {flag}
            </span>
            <div>
              <strong>{plan}</strong>
              <p>{country}</p>
            </div>
            <div className="gift-checkout__price">${formattedTotal}</div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="gift-buyer-email">
              Your email
            </label>
            <input
              id="gift-buyer-email"
              type="email"
              autoComplete="email"
              required
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <p className="form-hint">Confirmation when the gift is delivered.</p>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="gift-sender-name">
              Your name (optional)
            </label>
            <input
              id="gift-sender-name"
              type="text"
              maxLength={80}
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="How your friend will see you"
            />
          </div>

          <hr className="gift-checkout__divider" />

          <div className="form-group">
            <label className="form-label" htmlFor="gift-recipient-name">
              Friend&apos;s name
            </label>
            <input
              id="gift-recipient-name"
              type="text"
              required
              maxLength={80}
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Their first name"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="gift-recipient-email">
              Friend&apos;s email
            </label>
            <input
              id="gift-recipient-email"
              type="email"
              autoComplete="off"
              required
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="Where we send the QR code"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="gift-message">
              Personal message (optional)
            </label>
            <textarea
              id="gift-message"
              rows={4}
              maxLength={MESSAGE_MAX}
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              placeholder="Install before you fly — safe travels!"
            />
            <p className="form-hint">{messageRemaining} characters left</p>
          </div>

          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}

          <button type="submit" className="btn-nav btn-nav--accent gift-checkout__submit" disabled={submitting}>
            {submitting ? "Opening secure pay…" : `Pay $${formattedTotal} & send gift`}
          </button>

          <p className="gift-checkout__fineprint">
            Promo codes and referral discounts do not apply to gifts.{" "}
            <Link href="/destinations">Choose a different plan</Link>
          </p>
        </form>
      </main>
      <SiteFooter />
    </>
  );
}

export function GiftCheckoutPage() {
  return (
    <Suspense fallback={<main className="container">Loading…</main>}>
      <GiftCheckoutContent />
    </Suspense>
  );
}
