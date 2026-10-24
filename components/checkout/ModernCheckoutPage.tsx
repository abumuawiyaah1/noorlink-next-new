"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FunnelSteps } from "@/components/layout/FunnelSteps";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SecureCheckoutTrust } from "@/components/ui/SecureCheckoutTrust";
import { createCheckoutSession } from "@/lib/checkout-api";
import { resolveCheckoutFlag } from "@/lib/country-flags";
import { formatCountryLabel } from "@/lib/country-slugs";
import { validatePromoCode } from "@/lib/promo-api";
import { isSafeStripeCheckoutUrl } from "@/lib/safe-url";
import {
  clearRememberedPromo,
  rememberPromo,
  resolvePromo,
} from "@/lib/promo-link";
import {
  getRememberedRef,
  rememberRef,
  resolveRef,
} from "@/lib/affiliate-link";
import { resolveAffiliate, type ResolvedAffiliate } from "@/lib/affiliate-api";
import { ExpressCheckoutWallets } from "@/components/checkout/ExpressCheckoutWallets";
import { PayPalCheckoutButton } from "@/components/checkout/PayPalCheckoutButton";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";

const EMAIL_STORAGE_KEY = "nl_checkout_email";
const PHONE_MQ = "(max-width: 768px)";

function parsePrice(value: string | null): number {
  if (!value) return 0;
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * null until mounted — avoids SSR→phone remount that tears down PayPal/Stripe mid-fetch.
 */
function useIsPhoneCheckout(): boolean | null {
  const [isPhone, setIsPhone] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(PHONE_MQ);
    setIsPhone(mq.matches);
    const onChange = () => setIsPhone(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isPhone;
}

export function ModernCheckoutPage() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const c = dict.checkout;
  const searchParams = useSearchParams();
  const isPhone = useIsPhoneCheckout();
  const [preferFullCheckout, setPreferFullCheckout] = useState(false);
  /** Fast one-page on phones; original form on desktop or when they choose card/more options. */
  const useFastCheckout = Boolean(isPhone) && !preferFullCheckout;

  const country = formatCountryLabel(searchParams.get("country") ?? "Your destination");
  const flag = resolveCheckoutFlag(searchParams.get("flag"), country);
  const packageId = searchParams.get("packageId") ?? searchParams.get("package_id");
  const plan = searchParams.get("plan") ?? "Selected plan";
  const price = parsePrice(searchParams.get("price"));
  const initialPromo = resolvePromo(searchParams);
  const affiliateRef = resolveRef(searchParams);

  const [affiliateInfo, setAffiliateInfo] = useState<ResolvedAffiliate | null>(null);

  const [email, setEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [promoInput, setPromoInput] = useState(initialPromo);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const wantsTopUp =
    searchParams.get("wantsTopUp") === "1" ||
    searchParams.get("wants_topup") === "1" ||
    searchParams.get("wantsTopup") === "true";

  useEffect(() => {
    if (searchParams.get("canceled") === "1") {
      setError(c.paymentCanceled);
    }
  }, [searchParams, c.paymentCanceled]);

  useEffect(() => {
    if (!affiliateRef) return;
    rememberRef(affiliateRef);
    void resolveAffiliate(affiliateRef).then(setAffiliateInfo);
  }, [affiliateRef]);

  const affiliateDiscountEstimate = useMemo(() => {
    if (!affiliateInfo?.valid || !affiliateInfo.customerDiscountPercent || appliedPromo) {
      return 0;
    }
    return Math.round(price * affiliateInfo.customerDiscountPercent) / 100;
  }, [affiliateInfo, price, appliedPromo]);

  const effectiveDiscount = appliedPromo ? discountAmount : affiliateDiscountEstimate;

  const finalPrice = useMemo(
    () => Math.max(0.01, price - effectiveDiscount),
    [price, effectiveDiscount],
  );
  const formattedTotal = useMemo(() => finalPrice.toFixed(2), [finalPrice]);
  const payLabel = submitting
    ? useFastCheckout
      ? c.openingPay
      : c.redirectingStripe
    : useFastCheckout
      ? t(dict, "checkout.payContinue", { amount: formattedTotal })
      : t(dict, "checkout.payNow", { amount: formattedTotal });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    try {
      const remembered = window.localStorage.getItem(EMAIL_STORAGE_KEY);
      if (remembered?.includes("@")) setEmail(remembered);
    } catch {
      /* ignore */
    }
  }, []);

  const applyPromo = useCallback(
    async (codeOverride?: string) => {
      const code = (codeOverride ?? promoInput).trim();
      if (!code) {
        setPromoError(c.enterPromo);
        return;
      }

      setValidatingPromo(true);
      setPromoError(null);
      setPromoMessage(null);

      if (!packageId?.trim()) {
        setPromoError(c.selectPlanPromo);
        return;
      }

      const result = await validatePromoCode({
        code,
        country,
        price,
        packageId: packageId.trim(),
      });

      setValidatingPromo(false);

      if (!result.valid) {
        setAppliedPromo(null);
        setDiscountAmount(0);
        setPromoError(result.error ?? result.message ?? c.invalidPromo);
        return;
      }

      setAppliedPromo(result.code ?? code.toUpperCase());
      setDiscountAmount(result.discountAmount ?? 0);
      rememberPromo(result.code ?? code);
      setPromoMessage(
        result.percentOff
          ? t(dict, "checkout.promoPercentOff", { percent: result.percentOff }) +
            (result.endsAt && !useFastCheckout ? ` · ${result.endsAt.slice(0, 10)}` : "")
          : c.promoApplied,
      );
    },
    [promoInput, price, packageId, country, useFastCheckout],
  );

  useEffect(() => {
    if (!initialPromo.trim()) return;
    void applyPromo(initialPromo);
    // Apply URL/remembered promo once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearPromo() {
    setAppliedPromo(null);
    setDiscountAmount(0);
    setPromoInput("");
    setPromoMessage(null);
    setPromoError(null);
    clearRememberedPromo();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (trimmedEmail && !trimmedEmail.includes("@")) {
      setError(useFastCheckout ? c.invalidEmailFast : c.invalidEmailFull);
      return;
    }

    if (!packageId?.trim()) {
      setError(c.missingPlan);
      return;
    }

    if (price <= 0) {
      setError(c.invalidPrice);
      return;
    }

    setSubmitting(true);

    try {
      if (trimmedEmail) {
        try {
          window.localStorage.setItem(EMAIL_STORAGE_KEY, trimmedEmail);
        } catch {
          /* ignore */
        }
      }

      const result = await createCheckoutSession({
        email: trimmedEmail || undefined,
        country,
        price,
        flag: flag || undefined,
        travelDate: travelDate || undefined,
        packageId: packageId || undefined,
        promoCode: appliedPromo || undefined,
        affiliateRef: affiliateRef || undefined,
        wantsTopUp: wantsTopUp || undefined,
        language: locale,
      });

      if (!result.success || !result.checkoutUrl) {
        setError(
          result.error ??
            (useFastCheckout ? c.startPayFailed : c.startStripeFailed),
        );
        setSubmitting(false);
        return;
      }

      if (!isSafeStripeCheckoutUrl(result.checkoutUrl)) {
        setError(c.invalidRedirect);
        setSubmitting(false);
        return;
      }

      window.location.assign(result.checkoutUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : c.unexpectedError);
      setSubmitting(false);
    }
  }

  // Wait until viewport is known so we don't mount PayPal on desktop tree then remount on phone.
  if (isPhone === null) {
    return (
      <div className="nl-checkout">
        <a href="#main-content" className="skip-link">
          {c.skipLink}
        </a>
        <SiteHeader />
        <main id="main-content">
          <div className="container" style={{ padding: "2rem 1rem" }}>
            <p className="checkout-express__hint">{c.loading}</p>
          </div>
        </main>
      </div>
    );
  }

  if (useFastCheckout) {
    return (
      <div className="nl-checkout nl-checkout--fast">
        <a href="#main-content" className="skip-link">
          {c.skipLink}
        </a>
        <SiteHeader />
        <main id="main-content">
          <div className="container checkout-fast">
            <form className="checkout-fast__form" onSubmit={handleSubmit}>
              <div className="card checkout-fast__card">
                <div className="summary-plan">
                  <span className="summary-plan__flag">{flag}</span>
                  <div>
                    <strong>{plan}</strong>
                    <p>{country}</p>
                  </div>
                </div>

                <div className="summary-row summary-total checkout-fast__total">
                  <span>{c.total}</span>
                  <strong>${formattedTotal}</strong>
                </div>
                {discountAmount > 0 && (
                  <p className="checkout-fast__discount" role="status">
                    {t(dict, "checkout.promoSaved", {
                      amount: discountAmount.toFixed(2),
                    })}
                    {appliedPromo ? ` (${appliedPromo})` : ""}
                  </p>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-email">
                    {c.emailLabel}{" "}
                    <span className="form-label-optional">{c.optional}</span>
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    inputMode="email"
                    className="form-input"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={c.emailPlaceholder}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-travel-date">
                    {c.arrivalDate}
                  </label>
                  <input
                    id="checkout-travel-date"
                    type="date"
                    className="form-input"
                    value={travelDate}
                    onChange={(event) => setTravelDate(event.target.value)}
                  />
                  <p className="checkout-fast__hint">
                    {c.arrivalHint}
                  </p>
                </div>

                <div className="form-group checkout-promo-inline">
                  <label className="form-label" htmlFor="checkout-promo">
                    {c.promoCode}
                  </label>
                  <PromoFields
                    promoInput={promoInput}
                    setPromoInput={setPromoInput}
                    appliedPromo={appliedPromo}
                    validatingPromo={validatingPromo}
                    promoMessage={promoMessage}
                    promoError={promoError}
                    onApply={() => void applyPromo()}
                    onClear={clearPromo}
                    applyLabel={c.apply}
                    clearLabel={c.clear}
                  />
                </div>

                <div className="checkout-trust-badges" aria-label="Trust">
                  <span>🔒 {c.stripeSecure}</span>
                  <span>📱 {c.qrByEmail}</span>
                  <span>
                    ↩{" "}
                    <Link href={localizedPath("/refund", locale)} target="_blank" rel="noopener noreferrer">
                      {c.refundIfFails}
                    </Link>
                  </span>
                </div>

                <ExpressCheckoutWallets
                  amountCents={Math.round(finalPrice * 100)}
                  payload={{
                    email,
                    country,
                    price,
                    flag: flag || undefined,
                    travelDate: travelDate || undefined,
                    packageId: packageId || undefined,
                    promoCode: appliedPromo || undefined,
                    affiliateRef: affiliateRef || undefined,
                    wantsTopUp: wantsTopUp || undefined,
                    language: locale,
                  }}
                  onError={(message) => setError(message || null)}
                />

                <PayPalCheckoutButton
                  payload={{
                    email,
                    country,
                    price,
                    flag: flag || undefined,
                    travelDate: travelDate || undefined,
                    packageId: packageId || undefined,
                    promoCode: appliedPromo || undefined,
                    affiliateRef: affiliateRef || undefined,
                    wantsTopUp: wantsTopUp || undefined,
                    language: locale,
                  }}
                  disabled={submitting}
                  onError={(message) => setError(message || null)}
                />

                <button
                  type="submit"
                  className={`pay-btn${submitting ? " loading" : ""}`}
                  disabled={submitting}
                >
                  {payLabel}
                </button>

                <p className="checkout-fast__wallets">
                  {c.orMoreOptions}
                </p>
                <button
                  type="button"
                  className="checkout-fast__alt"
                  onClick={() => setPreferFullCheckout(true)}
                >
                  {c.preferFullForm}
                </button>
                <p className="checkout-fast__legal">
                  {c.agreePrefix}{" "}
                  <Link href={localizedPath("/terms", locale)} target="_blank" rel="noopener noreferrer">
                    {c.terms}
                  </Link>{" "}
                  {c.and}{" "}
                  <Link href={localizedPath("/privacy", locale)} target="_blank" rel="noopener noreferrer">
                    {c.privacy}
                  </Link>
                  .{" "}
                  <Link href={localizedPath("/refund", locale)} target="_blank" rel="noopener noreferrer">
                    {c.refundIfFails}
                  </Link>
                  .
                </p>

                {error && (
                  <p className="error-message" role="alert">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="nl-checkout">
      <a href="#main-content" className="skip-link">
        {c.skipLink}
      </a>

      <SiteHeader />
      {isPhone && preferFullCheckout && (
        <p className="checkout-switch-back">
          <button
            type="button"
            className="checkout-switch-back__btn"
            onClick={() => setPreferFullCheckout(false)}
          >
            {c.backQuick}
          </button>
        </p>
      )}
      <Breadcrumbs
        items={[
          { href: localizedPath("/", locale), label: dict.common.home },
          {
            href: localizedPath("/destinations", locale),
            label: dict.nav.destinations,
          },
          { label: c.title },
        ]}
      />
      <FunnelSteps
        current={2}
        ariaLabel={dict.common.checkoutProgress}
        steps={[
          { n: 1, label: c.stepChoose },
          { n: 2, label: c.stepDetails },
          { n: 3, label: c.stepPay },
          { n: 4, label: c.stepActivate },
        ]}
      />
      <div className="checkout-trust-wrap">
        <div className="checkout-trust">
          <span>{c.trustPayments}</span>
          <span>{c.trustNoStore}</span>
          <span>
            <Link href={localizedPath("/refund", locale)} target="_blank" rel="noopener noreferrer">
              {c.refundIfFails}
            </Link>
          </span>
        </div>
        <SecureCheckoutTrust variant="marks" showSsl />
        <p
          className="secure-badge"
          style={{ margin: 0, width: "fit-content" }}
        >
          <i className="fas fa-shield-alt" aria-hidden="true" /> {c.verifiedSecure}
        </p>
      </div>

      <main id="main-content">
        <div className="container">
          <form className="checkout-grid" onSubmit={handleSubmit}>
            <div className="details-section">
              <div className="card">
                <h2>
                  <i
                    className="fas fa-envelope"
                    style={{ color: "var(--accent)" }}
                    aria-hidden="true"
                  />{" "}
                  {c.contactInfo}
                </h2>
                <div className="form-note">
                  {c.contactNote}
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="checkout-email">
                    {c.emailLabelFull}{" "}
                    <span className="form-label-optional">{c.optional}</span>
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    className="form-input"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={c.emailPlaceholder}
                  />
                </div>
              </div>

              <div className="card">
                <h2>
                  <i
                    className="fas fa-calendar-alt"
                    style={{ color: "var(--accent)" }}
                    aria-hidden="true"
                  />{" "}
                  {c.tripDetails}
                </h2>
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-travel-date">
                    {c.arrivalDateOptional}
                  </label>
                  <input
                    id="checkout-travel-date"
                    type="date"
                    className="form-input"
                    value={travelDate}
                    onChange={(event) => setTravelDate(event.target.value)}
                  />
                </div>
              </div>

              <div className="card checkout-promo-card">
                <h2>
                  <i
                    className="fas fa-tag"
                    style={{ color: "var(--accent)" }}
                    aria-hidden="true"
                  />{" "}
                  {c.promoSection}
                </h2>
                <PromoFields
                  promoInput={promoInput}
                  setPromoInput={setPromoInput}
                  appliedPromo={appliedPromo}
                  validatingPromo={validatingPromo}
                  promoMessage={promoMessage}
                  promoError={promoError}
                  onApply={() => void applyPromo()}
                  onClear={clearPromo}
                  applyLabel={c.apply}
                  clearLabel={c.clear}
                />
              </div>

              {error && (
                <p className="error-message" role="alert">
                  {error}
                </p>
              )}
            </div>

            <aside className="summary-section">
              <div className="card summary-card">
                <h2>{c.orderSummary}</h2>
                <div className="summary-plan">
                  <span className="summary-plan__flag">{flag}</span>
                  <div>
                    <strong>{plan}</strong>
                    <p>{country}</p>
                  </div>
                </div>
                <div className="summary-row">
                  <span>{c.subtotal}</span>
                  <strong>${price.toFixed(2)}</strong>
                </div>
                {discountAmount > 0 && (
                  <div className="summary-row summary-row--discount">
                    <span>
                      {c.insiderDiscount}
                      {appliedPromo ? ` (${appliedPromo})` : ""}
                    </span>
                    <strong>- ${discountAmount.toFixed(2)}</strong>
                  </div>
                )}
                <div className="summary-row">
                  <span>{c.delivery}</span>
                  <strong>{c.deliveryValue}</strong>
                </div>
                <div className="summary-row summary-total">
                  <span>{c.total}</span>
                  <strong>${formattedTotal}</strong>
                </div>

                <div className="checkout-trust-badges" aria-label="Trust">
                  <span>🔒 {c.stripeSecure}</span>
                  <span>📱 {c.qrByEmail}</span>
                  <span>
                    ↩{" "}
                    <Link href={localizedPath("/refund", locale)} target="_blank" rel="noopener noreferrer">
                      {c.refundIfFails}
                    </Link>
                  </span>
                </div>

                <ExpressCheckoutWallets
                  amountCents={Math.round(finalPrice * 100)}
                  payload={{
                    email,
                    country,
                    price,
                    flag: flag || undefined,
                    travelDate: travelDate || undefined,
                    packageId: packageId || undefined,
                    promoCode: appliedPromo || undefined,
                    affiliateRef: affiliateRef || undefined,
                    wantsTopUp: wantsTopUp || undefined,
                    language: locale,
                  }}
                  onError={(message) => setError(message || null)}
                />

                <PayPalCheckoutButton
                  payload={{
                    email,
                    country,
                    price,
                    flag: flag || undefined,
                    travelDate: travelDate || undefined,
                    packageId: packageId || undefined,
                    promoCode: appliedPromo || undefined,
                    affiliateRef: affiliateRef || undefined,
                    wantsTopUp: wantsTopUp || undefined,
                    language: locale,
                  }}
                  disabled={submitting}
                  onError={(message) => setError(message || null)}
                />

                <button
                  type="submit"
                  className={`pay-btn${submitting ? " loading" : ""}`}
                  disabled={submitting}
                >
                  {payLabel}
                </button>
                <p className="summary-next-step">
                  Card, bank, or more options on the next secure Stripe step.
                </p>
                <p className="checkout-pay-legal">
                  {c.agreePrefix}{" "}
                  <Link href={localizedPath("/terms", locale)} target="_blank" rel="noopener noreferrer">
                    {c.terms}
                  </Link>{" "}
                  {c.and}{" "}
                  <Link href={localizedPath("/privacy", locale)} target="_blank" rel="noopener noreferrer">
                    {c.privacy}
                  </Link>
                  .{" "}
                  <Link href={localizedPath("/refund", locale)} target="_blank" rel="noopener noreferrer">
                    {c.refundIfFails}
                  </Link>
                  .
                </p>
              </div>
            </aside>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function PromoFields({
  promoInput,
  setPromoInput,
  appliedPromo,
  validatingPromo,
  promoMessage,
  promoError,
  onApply,
  onClear,
  applyLabel,
  clearLabel,
}: {
  promoInput: string;
  setPromoInput: (value: string) => void;
  appliedPromo: string | null;
  validatingPromo: boolean;
  promoMessage: string | null;
  promoError: string | null;
  onApply: () => void;
  onClear: () => void;
  applyLabel: string;
  clearLabel: string;
}) {
  return (
    <>
      <div className="checkout-promo-row">
        <input
          id="checkout-promo"
          type="text"
          className="form-input"
          value={promoInput}
          onChange={(event) => setPromoInput(event.target.value.toUpperCase())}
          placeholder="INSIDER-SEP26"
          disabled={Boolean(appliedPromo)}
        />
        {appliedPromo ? (
          <button
            type="button"
            className="checkout-promo-btn checkout-promo-btn--ghost"
            onClick={onClear}
          >
            {clearLabel}
          </button>
        ) : (
          <button
            type="button"
            className="checkout-promo-btn"
            disabled={validatingPromo}
            onClick={onApply}
          >
            {validatingPromo ? "…" : applyLabel}
          </button>
        )}
      </div>
      {promoMessage && (
        <p className="checkout-promo-note checkout-promo-note--ok" role="status">
          {promoMessage}
        </p>
      )}
      {promoError && (
        <p className="checkout-promo-note checkout-promo-note--error" role="alert">
          {promoError}
        </p>
      )}
    </>
  );
}
