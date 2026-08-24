"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { CompatibilityModal } from "@/components/modals/CompatibilityModal";
import { PaymentMethodBadges } from "@/components/v2/PaymentMethodBadges";
import { V2SiteHeader } from "@/components/v2/V2SiteHeader";
import { useCurrency } from "@/components/v2/context/CurrencyContext";
import { createCheckoutSession } from "@/lib/checkout-api";
import { formatCountryLabel } from "@/lib/country-slugs";
import { previewPath } from "@/lib/v2/preview-paths";

function parsePrice(value: string | null): number {
  if (!value) return 0;
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function V2CheckoutPage() {
  const searchParams = useSearchParams();
  const { formatPrice } = useCurrency();

  const country = formatCountryLabel(searchParams.get("country") ?? "Your destination");
  const flag = searchParams.get("flag") ?? "🌍";
  const packageId = searchParams.get("packageId") ?? searchParams.get("package_id");
  const plan = searchParams.get("plan") ?? "Selected plan";
  const price = parsePrice(searchParams.get("price")) || 12;
  const isRegional = searchParams.get("productType") === "regional";

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [esimAttested, setEsimAttested] = useState(false);
  const [compatOpen, setCompatOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const displayTotal = useMemo(() => formatPrice(price), [formatPrice, price]);
  const payLabel = submitting ? "Redirecting to Stripe…" : `Pay ${displayTotal}`;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!esimAttested) {
      setError("Please confirm your device is eSIM compatible and network-unlocked.");
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
        setError(result.error ?? "We could not start Stripe checkout. Please try again.");
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
    <div className="v2-checkout">
      <V2SiteHeader />
      <main className="v2-main v2-main--narrow">
        <nav className="v2-breadcrumbs" aria-label="Breadcrumb">
          <Link href={previewPath("/")}>Home</Link>
          <span>/</span>
          <span>Checkout</span>
        </nav>

        <div className="v2-checkout__grid">
          <form className="v2-checkout__form" onSubmit={handleSubmit}>
            <h1>Express checkout</h1>
            <p className="v2-checkout__sub">Guest checkout — email only, no account required.</p>

            <PaymentMethodBadges />

            <label className="v2-field">
              <span>Email for eSIM delivery *</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </label>

            <label className="v2-field">
              <span>Phone (optional)</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 …"
                autoComplete="tel"
              />
            </label>

            <label className="v2-field">
              <span>Arrival date (optional)</span>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </label>

            <label className="v2-checkbox">
              <input
                type="checkbox"
                checked={esimAttested}
                onChange={(e) => setEsimAttested(e.target.checked)}
              />
              <span>
                I confirm my device is <strong>eSIM compatible</strong> and{" "}
                <strong>network-unlocked</strong>. *
              </span>
            </label>
            <button
              type="button"
              className="v2-link-btn v2-checkout__compat-link"
              onClick={() => setCompatOpen(true)}
            >
              Not sure? Check device compatibility
            </button>

            <label className="v2-checkbox">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" target="_blank">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" target="_blank">
                  Privacy Policy
                </Link>
                . *
              </span>
            </label>

            {error ? (
              <p className="v2-error" role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit" className="v2-btn v2-btn--accent v2-btn--lg v2-btn--block" disabled={submitting}>
              {payLabel}
            </button>
            <p className="v2-checkout__note">
              After payment you&apos;ll land on the live success page (Stripe config). Use{" "}
              <Link href={previewPath("/dashboard")}>My eSIMs</Link> or{" "}
              <Link href={previewPath("/success?demo=1")}>activation preview</Link> to see v2 install UI.
            </p>
          </form>

          <aside className="v2-checkout__summary">
            <h2>Order summary</h2>
            <p className="v2-checkout__plan">
              {flag} {country}
              {isRegional ? " (regional)" : ""}
            </p>
            <p className="v2-checkout__plan-name">{plan}</p>
            <p className="v2-checkout__total">{displayTotal}</p>
            <ul className="v2-checkout__perks">
              <li>Instant eSIM delivery</li>
              <li>Hotspot enabled</li>
              <li>Zero hidden fees</li>
            </ul>
          </aside>
        </div>
      </main>

      <CompatibilityModal isOpen={compatOpen} onClose={() => setCompatOpen(false)} />
    </div>
  );
}
