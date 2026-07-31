"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { createCheckoutSession } from "@/lib/automation-api";

function parsePrice(value: string | null): number {
  if (!value) return 0;
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function ModernCheckoutPage() {
  const searchParams = useSearchParams();

  const country = searchParams.get("country") ?? "Your destination";
  const flag = searchParams.get("flag") ?? "🌍";
  const packageId = searchParams.get("packageId") ?? undefined;
  const planName = searchParams.get("plan") ?? undefined;
  const price = parsePrice(searchParams.get("price")) || 12;

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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

    setSubmitting(true);
    try {
      const session = await createCheckoutSession({
        country,
        price,
        email: email.trim(),
        flag,
        packageId,
      });

      if (!session.checkoutUrl) {
        throw new Error(
          session.message ||
            "Checkout session created but no payment URL was returned.",
        );
      }

      // Hand off to Stripe Checkout (created by noorlink-automation).
      window.location.assign(session.checkoutUrl);
    } catch (err) {
      console.error("[checkout] automation session failed", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to start checkout. Please try again.",
      );
      setSubmitting(false);
    }
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header>
        <div className="container nav-flex">
          <Link href="/" className="logo">
            Noor<span>Link</span>
            <sup className="logo-tm">TM</sup>
          </Link>
          <div className="secure-badge">
            <i className="fas fa-shield-alt" aria-hidden="true" /> Verified Secure Checkout
          </div>
        </div>
      </header>

      <main id="main-content">
        <div className="container">
          <form className="checkout-grid" onSubmit={handleSubmit}>
            <div className="details-section">
              <div className="card">
                <h2>
                  <i className="fas fa-envelope" style={{ color: "var(--accent)" }} aria-hidden="true" />{" "}
                  1. Contact Information
                </h2>
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-email">
                    Email address
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
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
                    className="form-input"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+1 555 000 0000"
                  />
                </div>
              </div>

              <div className="card">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(event) => setTermsAccepted(event.target.checked)}
                  />
                  I agree to the{" "}
                  <Link href="/terms">Terms</Link> and{" "}
                  <Link href="/privacy">Privacy Policy</Link>.
                </label>
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
                <div className="summary-row">
                  <span>{flag} Destination</span>
                  <strong>{country}</strong>
                </div>
                {planName ? (
                  <div className="summary-row">
                    <span>Plan</span>
                    <strong>{planName}</strong>
                  </div>
                ) : null}
                <div className="summary-row summary-total">
                  <span>Total</span>
                  <strong>${formattedTotal}</strong>
                </div>
                <button
                  type="submit"
                  className={`pay-btn${submitting ? " loading" : ""}`}
                  disabled={submitting}
                >
                  {submitting ? "Connecting to payment…" : `Pay $${formattedTotal}`}
                </button>
                <p style={{ fontSize: "0.8rem", textAlign: "center", marginTop: 15, color: "#888" }}>
                  Secure checkout via NoorLink Automation + Stripe.
                </p>
              </div>
            </aside>
          </form>
        </div>
      </main>
    </>
  );
}
