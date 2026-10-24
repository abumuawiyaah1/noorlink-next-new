"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { createCheckoutSession } from "@/lib/checkout-api";
import { resolveCheckoutFlag } from "@/lib/country-flags";
import { formatCountryLabel } from "@/lib/country-slugs";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { isSafeStripeCheckoutUrl } from "@/lib/safe-url";

const EMAIL_STORAGE_KEY = "nl_checkout_email";
const MESSAGE_MAX = 280;

function parsePrice(value: string | null): number {
  if (!value) return 0;
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function GiftCheckoutContent() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const g = dict.giftPage;
  const searchParams = useSearchParams();
  const countryParam = searchParams.get("country");
  const country = formatCountryLabel(
    countryParam ?? g.defaultDestination,
  );
  const flag = resolveCheckoutFlag(searchParams.get("flag"), country);
  const packageId = searchParams.get("packageId") ?? searchParams.get("package_id");
  const plan = searchParams.get("plan") ?? g.defaultPlan;
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
      setError(g.errBuyerEmail);
      return;
    }
    if (!normalizedRecipientName) {
      setError(g.errRecipientName);
      return;
    }
    if (!normalizedRecipient.includes("@")) {
      setError(g.errRecipientEmail);
      return;
    }
    if (normalizedBuyer.toLowerCase() === normalizedRecipient.toLowerCase()) {
      setError(g.errSameEmail);
      return;
    }
    if (!packageId?.trim()) {
      setError(g.errMissingPlan);
      return;
    }
    if (price <= 0) {
      setError(g.errInvalidPrice);
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
        setError(result.error ?? g.errStartPay);
        setSubmitting(false);
        return;
      }
      if (!isSafeStripeCheckoutUrl(result.checkoutUrl)) {
        setError(g.errInvalidRedirect);
        setSubmitting(false);
        return;
      }
      window.location.assign(result.checkoutUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : g.errUnexpected);
      setSubmitting(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: localizedPath("/", locale), label: dict.common.home },
          {
            href: localizedPath("/destinations", locale),
            label: dict.nav.destinations,
          },
          { label: g.crumb },
        ]}
      />

      <main className="container gift-checkout">
        <div className="gift-checkout__intro">
          <p className="gift-checkout__kicker">{g.kicker}</p>
          <h1>{g.title}</h1>
          <p>{g.lede}</p>
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
              {g.buyerEmail}
            </label>
            <input
              id="gift-buyer-email"
              type="email"
              autoComplete="email"
              required
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              placeholder={g.buyerPlaceholder}
            />
            <p className="form-hint">{g.buyerHint}</p>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="gift-sender-name">
              {g.senderName}
            </label>
            <input
              id="gift-sender-name"
              type="text"
              maxLength={80}
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder={g.senderPlaceholder}
            />
          </div>

          <hr className="gift-checkout__divider" />

          <div className="form-group">
            <label className="form-label" htmlFor="gift-recipient-name">
              {g.recipientName}
            </label>
            <input
              id="gift-recipient-name"
              type="text"
              required
              maxLength={80}
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder={g.recipientNamePlaceholder}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="gift-recipient-email">
              {g.recipientEmail}
            </label>
            <input
              id="gift-recipient-email"
              type="email"
              autoComplete="off"
              required
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder={g.recipientEmailPlaceholder}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="gift-message">
              {g.message}
            </label>
            <textarea
              id="gift-message"
              rows={4}
              maxLength={MESSAGE_MAX}
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              placeholder={g.messagePlaceholder}
            />
            <p className="form-hint">
              {t(dict, "giftPage.charsLeft", { n: messageRemaining })}
            </p>
          </div>

          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="btn-nav btn-nav--accent gift-checkout__submit"
            disabled={submitting}
          >
            {submitting
              ? g.openingPay
              : t(dict, "giftPage.payCta", { price: formattedTotal })}
          </button>

          <p className="gift-checkout__fineprint">
            {g.fineprintBefore}{" "}
            <Link href={localizedPath("/destinations", locale)}>
              {g.chooseDifferent}
            </Link>
          </p>
        </form>
      </main>
      <SiteFooter />
    </>
  );
}

export function GiftCheckoutPage() {
  const [locale] = useLocaleState();
  const loading = getDictionary(locale).common.loading;
  return (
    <Suspense fallback={<main className="container">{loading}</main>}>
      <GiftCheckoutContent />
    </Suspense>
  );
}
