"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FunnelSteps } from "@/components/layout/FunnelSteps";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { createCheckoutSession } from "@/lib/checkout-api";
import { formatCountryLabel } from "@/lib/country-slugs";

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

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const formattedTotal = useMemo(() => price.toFixed(2), [price]);

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
      });

      if (!result.success || !result.checkoutUrl) {
        setError(
          result.error ??
            "We could not start Stripe checkout. Please try again.",
        );
        setSubmitting(false);
        return;
      }

      // Hosted Stripe Checkout (external) — full navigation required.
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
    <>
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
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 6 }}>
                    We email a checkout confirmation now. Your eSIM QR code arrives
                    after payment — check spam/junk if it is missing.
                  </p>
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
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 6 }}>
                    Saved with your order for support. SMS alerts are not sent yet.
                  </p>
                </div>
              </div>

              <div className="card">
                <h2>
                  <i className="fas fa-calendar-alt" style={{ color: "var(--accent)" }} aria-hidden="true" />{" "}
                  2. Trip Details
                </h2>
                <div className="form-note">
                  These details help support if you need help with setup or timing.
                </div>
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

              <div className="card">
                <h2>
                  <i className="fas fa-file-contract" style={{ color: "var(--accent)" }} aria-hidden="true" />{" "}
                  3. Terms &amp; Privacy
                </h2>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: 12 }}>
                  Please read our policies before paying. They open in a new tab so you can keep this checkout page open.
                </p>
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
                  <span>Delivery</span>
                  <strong>QR by email</strong>
                </div>
                <div className="summary-row">
                  <span>Support</span>
                  <strong>24/7 WhatsApp</strong>
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
                  {submitting ? "Redirecting to Stripe…" : `Pay $${formattedTotal}`}
                </button>
                <p className="summary-next-step">
                  Next step: secure Stripe payment, then we email your order
                  confirmation immediately.
                </p>
                <div className="summary-checklist">
                  <div>Secure Stripe checkout</div>
                  <div>Card details never stored on NoorLink</div>
                  <div>Refund policy available before payment</div>
                </div>
              </div>
            </aside>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
