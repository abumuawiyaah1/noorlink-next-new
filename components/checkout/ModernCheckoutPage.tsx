"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FunnelSteps } from "@/components/layout/FunnelSteps";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { createCheckoutSession } from "@/lib/checkout-api";
import { formatCountryLabel } from "@/lib/country-slugs";
import { validatePromoCode } from "@/lib/promo-api";
import {
  clearRememberedPromo,
  rememberPromo,
  resolvePromo,
} from "@/lib/promo-link";
import { ExpressCheckoutWallets } from "@/components/checkout/ExpressCheckoutWallets";

const EMAIL_STORAGE_KEY = "nl_checkout_email";
const PHONE_MQ = "(max-width: 768px)";

function parsePrice(value: string | null): number {
  if (!value) return 0;
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function subscribePhoneMq(onChange: () => void) {
  const mq = window.matchMedia(PHONE_MQ);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getPhoneMqSnapshot() {
  return window.matchMedia(PHONE_MQ).matches;
}

/** Phone → fast checkout. Desktop SSR/default → original full form. */
function useIsPhoneCheckout() {
  return useSyncExternalStore(subscribePhoneMq, getPhoneMqSnapshot, () => false);
}

export function ModernCheckoutPage() {
  const searchParams = useSearchParams();
  const isPhone = useIsPhoneCheckout();
  const [preferFullCheckout, setPreferFullCheckout] = useState(false);
  /** Fast one-page on phones; original form on desktop or when they choose card/more options. */
  const useFastCheckout = isPhone && !preferFullCheckout;

  const country = formatCountryLabel(searchParams.get("country") ?? "Your destination");
  const flag = searchParams.get("flag") ?? "🌍";
  const packageId = searchParams.get("packageId") ?? searchParams.get("package_id");
  const plan = searchParams.get("plan") ?? "Selected plan";
  const price = parsePrice(searchParams.get("price")) || 12;
  const initialPromo = resolvePromo(searchParams);

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

  const finalPrice = useMemo(
    () => Math.max(0.01, price - discountAmount),
    [price, discountAmount],
  );
  const formattedTotal = useMemo(() => finalPrice.toFixed(2), [finalPrice]);
  const payLabel = submitting
    ? useFastCheckout
      ? "Opening secure pay…"
      : "Redirecting to Stripe…"
    : useFastCheckout
      ? `Continue to pay $${formattedTotal}`
      : `Pay $${formattedTotal}`;

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
        setPromoError("Enter a promo code.");
        return;
      }

      setValidatingPromo(true);
      setPromoError(null);
      setPromoMessage(null);

      const result = await validatePromoCode({
        code,
        price,
        packageId: packageId || undefined,
      });

      setValidatingPromo(false);

      if (!result.valid) {
        setAppliedPromo(null);
        setDiscountAmount(0);
        setPromoError(result.error ?? result.message ?? "Invalid promo code.");
        return;
      }

      setAppliedPromo(result.code ?? code.toUpperCase());
      setDiscountAmount(result.discountAmount ?? 0);
      rememberPromo(result.code ?? code);
      setPromoMessage(
        result.percentOff
          ? `${result.percentOff}% off applied${
              result.endsAt && !useFastCheckout ? ` · ends ${result.endsAt.slice(0, 10)}` : ""
            }`
          : "Promo applied.",
      );
    },
    [promoInput, price, packageId, useFastCheckout],
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

    if (!email.trim()) {
      setError(
        useFastCheckout
          ? "Enter your email for the QR code."
          : "Please enter your email address.",
      );
      return;
    }

    if (price <= 0) {
      setError("Invalid plan price. Please go back and select a plan again.");
      return;
    }

    setSubmitting(true);

    try {
      try {
        window.localStorage.setItem(EMAIL_STORAGE_KEY, email.trim());
      } catch {
        /* ignore */
      }

      const result = await createCheckoutSession({
        email: email.trim(),
        country,
        price,
        flag: flag || undefined,
        travelDate: travelDate || undefined,
        packageId: packageId || undefined,
        promoCode: appliedPromo || undefined,
        wantsTopUp: wantsTopUp || undefined,
      });

      if (!result.success || !result.checkoutUrl) {
        setError(
          result.error ??
            (useFastCheckout
              ? "We could not start payment. Please try again."
              : "We could not start Stripe checkout. Please try again."),
        );
        setSubmitting(false);
        return;
      }

      window.location.assign(result.checkoutUrl);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unexpected error starting payment.",
      );
      setSubmitting(false);
    }
  }

  if (useFastCheckout) {
    return (
      <div className="nl-checkout nl-checkout--fast">
        <a href="#main-content" className="skip-link">
          Skip to main content
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
                  <span>Total</span>
                  <strong>${formattedTotal}</strong>
                </div>
                {discountAmount > 0 && (
                  <p className="checkout-fast__discount" role="status">
                    Promo saved ${discountAmount.toFixed(2)}
                    {appliedPromo ? ` (${appliedPromo})` : ""}
                  </p>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-email">
                    Email for your QR code
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    autoComplete="email"
                    autoFocus
                    inputMode="email"
                    className="form-input"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-travel-date">
                    Arrival date
                  </label>
                  <input
                    id="checkout-travel-date"
                    type="date"
                    className="form-input"
                    value={travelDate}
                    onChange={(event) => setTravelDate(event.target.value)}
                  />
                  <p className="checkout-fast__hint">
                    So we can remind you to install before you fly.
                  </p>
                </div>

                <div className="form-group checkout-promo-inline">
                  <label className="form-label" htmlFor="checkout-promo">
                    Promo code
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
                  />
                </div>

                <div className="checkout-trust-badges" aria-label="Trust">
                  <span>🔒 Stripe secure</span>
                  <span>📱 QR by email</span>
                  <span>↩ Easy refunds</span>
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
                    wantsTopUp: wantsTopUp || undefined,
                  }}
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
                  Or continue for card and more payment options
                </p>
                <button
                  type="button"
                  className="checkout-fast__alt"
                  onClick={() => setPreferFullCheckout(true)}
                >
                  Prefer the full checkout form?
                </button>
                <p className="checkout-fast__legal">
                  By paying you agree to the{" "}
                  <Link href="/terms" target="_blank" rel="noopener noreferrer">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
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
        Skip to main content
      </a>

      <SiteHeader />
      {isPhone && preferFullCheckout && (
        <p className="checkout-switch-back">
          <button
            type="button"
            className="checkout-switch-back__btn"
            onClick={() => setPreferFullCheckout(false)}
          >
            ← Back to quick checkout
          </button>
        </p>
      )}
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/destinations", label: "Destinations" },
          { label: "Checkout" },
        ]}
      />
      <FunnelSteps
        current={2}
        steps={[
          { n: 1, label: "Choose plan" },
          { n: 2, label: "Your details" },
          { n: 3, label: "Pay securely" },
          { n: 4, label: "Activate" },
        ]}
      />
      <div className="checkout-trust">
        <span>Apple Pay · Google Pay · Link · card</span>
        <span>Card details never stored</span>
        <span>Refund policy available</span>
      </div>
      <p
        className="secure-badge"
        style={{ margin: "12px auto 0", width: "fit-content" }}
      >
        <i className="fas fa-shield-alt" aria-hidden="true" /> Verified Secure
        Checkout
      </p>

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
                  1. Contact Information
                </h2>
                <div className="form-note">
                  We use this to send two emails: your payment confirmation first,
                  then your QR code and install details.
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="checkout-email">
                    Email address
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    autoComplete="email"
                    autoFocus
                    className="form-input"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
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
                  2. Trip Details
                </h2>
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-travel-date">
                    Arrival date (optional)
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
                  3. Promo code
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
                <h2>Order Summary</h2>
                <div className="summary-plan">
                  <span className="summary-plan__flag">{flag}</span>
                  <div>
                    <strong>{plan}</strong>
                    <p>{country}</p>
                  </div>
                </div>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <strong>${price.toFixed(2)}</strong>
                </div>
                {discountAmount > 0 && (
                  <div className="summary-row summary-row--discount">
                    <span>
                      Insider discount
                      {appliedPromo ? ` (${appliedPromo})` : ""}
                    </span>
                    <strong>- ${discountAmount.toFixed(2)}</strong>
                  </div>
                )}
                <div className="summary-row">
                  <span>Delivery</span>
                  <strong>QR by email</strong>
                </div>
                <div className="summary-row summary-total">
                  <span>Total</span>
                  <strong>${formattedTotal}</strong>
                </div>

                <div className="checkout-trust-badges" aria-label="Trust">
                  <span>🔒 Stripe secure</span>
                  <span>📱 QR by email</span>
                  <span>↩ Refund policy</span>
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
                    wantsTopUp: wantsTopUp || undefined,
                  }}
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
                  By paying you agree to the{" "}
                  <Link href="/terms" target="_blank" rel="noopener noreferrer">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
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
}: {
  promoInput: string;
  setPromoInput: (value: string) => void;
  appliedPromo: string | null;
  validatingPromo: boolean;
  promoMessage: string | null;
  promoError: string | null;
  onApply: () => void;
  onClear: () => void;
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
            Remove
          </button>
        ) : (
          <button
            type="button"
            className="checkout-promo-btn"
            disabled={validatingPromo}
            onClick={onApply}
          >
            {validatingPromo ? "Checking…" : "Apply"}
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
