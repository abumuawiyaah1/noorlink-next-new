"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FunnelSteps } from "@/components/layout/FunnelSteps";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { createCheckoutSession } from "@/lib/checkout-api";
import { formatCountryLabel } from "@/lib/country-slugs";
import { validatePromoCode } from "@/lib/promo-api";

function parsePrice(value: string | null): number {
  if (!value) return 0;
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function ModernCheckoutPage() {
  const searchParams = useSearchParams();

  const country = formatCountryLabel(searchParams.get("country") ?? "Your destination");
  const flag = searchParams.get("flag") ?? "🌍";
  const packageId = searchParams.get("packageId") ?? searchParams.get("package_id");
  const plan = searchParams.get("plan") ?? "Selected plan";
  const price = parsePrice(searchParams.get("price")) || 12;
  const isRegional = searchParams.get("productType") === "regional";
  const initialPromo = searchParams.get("promo") ?? searchParams.get("code") ?? "";

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [promoInput, setPromoInput] = useState(initialPromo);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const finalPrice = useMemo(
    () => Math.max(0.01, price - discountAmount),
    [price, discountAmount],
  );
  const formattedTotal = useMemo(() => finalPrice.toFixed(2), [finalPrice]);
  const payLabel = submitting ? "Redirecting to Stripe…" : `Pay $${formattedTotal}`;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (!initialPromo.trim()) return;
    void applyPromo(initialPromo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function applyPromo(codeOverride?: string) {
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
    setPromoMessage(
      result.percentOff
        ? `${result.percentOff}% off applied${result.endsAt ? ` · ends ${result.endsAt.slice(0, 10)}` : ""}`
        : "Promo applied.",
    );
  }

  function clearPromo() {
    setAppliedPromo(null);
    setDiscountAmount(0);
    setPromoInput("");
    setPromoMessage(null);
    setPromoError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }

    if (price <= 0) {
      setError("Invalid plan price. Please go back and select a plan again.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await createCheckoutSession({
        email: email.trim(),
        country,
        price,
        flag: flag || undefined,
        phone: phone.trim() || undefined,
        travelDate: travelDate || undefined,
        packageId: packageId || undefined,
        promoCode: appliedPromo || undefined,
      });

      if (!result.success || !result.checkoutUrl) {
        setError(
          result.error ??
            "We could not start Stripe checkout. Please try again.",
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

  return (
    <div className="nl-checkout">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <SiteHeader />
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
        <span>Stripe checkout</span>
        <span>Card details never stored</span>
        <span>Refund policy available</span>
      </div>
      <p className="secure-badge" style={{ margin: "12px auto 0", width: "fit-content" }}>
        <i className="fas fa-shield-alt" aria-hidden="true" /> Verified Secure Checkout
      </p>

      <main id="main-content">
        <div className="container">
          <form className="checkout-grid" onSubmit={handleSubmit}>
            <div className="details-section">
              <div className="card">
                <h2>
                  <i className="fas fa-envelope" style={{ color: "var(--accent)" }} aria-hidden="true" />{" "}
                  1. Contact Information
                </h2>
                <div className="form-note">
                  We use this to send two emails: your payment confirmation first,
                  then your QR code and install details.
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-email">
                    Email address
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    autoComplete="email"
                    className="form-input"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-phone">
                    Phone (optional)
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    autoComplete="tel"
                    className="form-input"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+1 555 000 0000"
                  />
                </div>
              </div>

              <div className="card">
                <h2>
                  <i className="fas fa-calendar-alt" style={{ color: "var(--accent)" }} aria-hidden="true" />{" "}
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
                  <i className="fas fa-tag" style={{ color: "var(--accent)" }} aria-hidden="true" />{" "}
                  3. Promo code
                </h2>
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
                    <button type="button" className="checkout-promo-btn checkout-promo-btn--ghost" onClick={clearPromo}>
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="checkout-promo-btn"
                      disabled={validatingPromo}
                      onClick={() => void applyPromo()}
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
              </div>

              <div className="card">
                <h2>
                  <i className="fas fa-file-contract" style={{ color: "var(--accent)" }} aria-hidden="true" />{" "}
                  4. Terms &amp; Privacy
                </h2>
                <div className="policy-links">
                  <Link href="/terms" target="_blank" rel="noopener noreferrer">
                    Read Terms of Service
                  </Link>
                  <Link href="/privacy" target="_blank" rel="noopener noreferrer">
                    Read Privacy Policy
                  </Link>
                </div>
                <div className="checkbox-container">
                  <input
                    id="checkout-terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(event) => setTermsAccepted(event.target.checked)}
                    required
                  />
                  <label className="checkbox-text" htmlFor="checkout-terms">
                    I have read and agree to the Terms of Service and Privacy Policy.
                  </label>
                </div>
                <button
                  type="submit"
                  className={`pay-btn pay-btn--inline${submitting ? " loading" : ""}`}
                  disabled={submitting}
                >
                  {payLabel}
                </button>
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
                    <span>Insider discount{appliedPromo ? ` (${appliedPromo})` : ""}</span>
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
                <button
                  type="submit"
                  className={`pay-btn${submitting ? " loading" : ""}`}
                  disabled={submitting}
                >
                  {payLabel}
                </button>
              </div>
            </aside>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
