"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CountryPlansHero } from "@/components/plans/CountryPlansHero";
import { CompatibilityModal } from "@/components/modals/CompatibilityModal";
import { RegionalCoveragePanel } from "@/components/plans/RegionalCoveragePanel";
import { PsychologicalPrice } from "@/components/ui/PsychologicalPrice";
import { CountrySearch } from "@/components/search/CountrySearch";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";
import { resolveCountryFlag } from "@/lib/country-flags";
import { formatCountryLabel, normalizeCountrySlug } from "@/lib/country-slugs";
import { formatCountryNetworkLabel } from "@/lib/country-networks";
import {
  fetchPlansByCountry,
  type EsimPlan,
  type PlanCategory,
  type PlansByCountryResponse,
} from "@/lib/plans-api";
import {
  REGIONAL_FAQS,
  singleCountryPlansPath,
  type RegionalProduct,
} from "@/lib/regional-products";
import "@/styles/plans-dynamic.css";

type PlanTab = PlanCategory;

type TravelerPlansPageProps = {
  countryId: string;
  countryImage: string;
  initialData?: PlansByCountryResponse | null;
  initialError?: string | null;
  regional?: RegionalProduct;
};

const PLAN_FAQS = [
  {
    q: "When should I install?",
    a: "Install on Wi‑Fi before you fly if you like. The data package typically starts when the eSIM connects to a supported network at the destination — not at checkout.",
  },
  {
    q: "When does the plan start?",
    a: "Usually when you turn the eSIM on for mobile data in the coverage country. You can keep your main number for WhatsApp and calls.",
  },
  {
    q: "Can I use hotspot?",
    a: "Yes. Hotspot / tethering is included so a laptop or travel companion can share the same plan.",
  },
  {
    q: "What if my phone is locked?",
    a: "The device must support eSIM and be carrier-unlocked. Use Check compatibility above. A locked phone is the most common reason an install fails.",
  },
] as const;

function formatDataAmount(plan: EsimPlan): string {
  if (plan.planCategory === "unlimited") return "Unlimited";
  if (plan.planCategory === "flexible" || plan.isPayAsYouGo || plan.isRechargeable) {
    return "Pay-As-You-Go";
  }
  if (plan.dataGb == null) return "—";
  const value = Number(plan.dataGb);
  return Number.isInteger(value) ? `${value} GB` : `${value} GB`;
}

function formatDuration(days?: number): string {
  if (days == null) return "Flexible";
  return days === 1 ? "1 day" : `${days} days`;
}

function badgeLabel(plan: EsimPlan): string | null {
  if (plan.displayBadge === "best_choice") return "Best Choice";
  if (plan.displayBadge === "flexible") return "Flexible";
  return null;
}

function checkoutHref(
  plan: EsimPlan,
  countryName: string,
  flag?: string,
  isRegional?: boolean,
): string {
  const checkoutParams = new URLSearchParams({
    country: countryName,
    price: plan.price.toFixed(2),
  });
  if (flag) checkoutParams.set("flag", flag);
  if (plan.name) checkoutParams.set("plan", plan.name);
  if (plan.id) checkoutParams.set("packageId", plan.id);
  if (isRegional) checkoutParams.set("productType", "regional");
  return `/checkout?${checkoutParams.toString()}`;
}

function sortPlans(plans: EsimPlan[]): EsimPlan[] {
  return [...plans].sort((a, b) => {
    const duration = (a.durationDays ?? 999) - (b.durationDays ?? 999);
    if (duration !== 0) return duration;
    const data = (a.dataGb ?? 0) - (b.dataGb ?? 0);
    if (data !== 0) return data;
    return a.price - b.price;
  });
}

function PlanRow({
  plan,
  countryName,
  flag,
  isRegional,
}: {
  plan: EsimPlan;
  countryName: string;
  flag?: string;
  isRegional?: boolean;
}) {
  const badge = badgeLabel(plan);
  const best = plan.displayBadge === "best_choice";
  const href = checkoutHref(plan, countryName, flag, isRegional);

  return (
    <a
      href={href}
      className={`plans-row${best ? " is-best" : ""}`}
      aria-label={`Buy ${formatDataAmount(plan)} for ${formatDuration(plan.durationDays)}, $${plan.price.toFixed(2)}`}
    >
      <span className="plans-row__data">{formatDataAmount(plan)}</span>
      <span className="plans-row__duration">{formatDuration(plan.durationDays)}</span>
      <span className="plans-row__price">
        <PsychologicalPrice
          parts={plan.formattedPriceParts}
          currency={plan.currency}
        />
        {plan.planCategory === "flexible" && (
          <small className="plans-row__from"> starting</small>
        )}
      </span>
      {badge ? <span className="plans-row__badge">{badge}</span> : <span />}
      <span className="plans-row__cta">Select</span>
    </a>
  );
}

function PlansFaq({
  countryName,
  regional,
}: {
  countryName: string;
  regional?: RegionalProduct;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const faqs = regional
    ? REGIONAL_FAQS.map((item) =>
        item.q === "Do I need a new plan when I cross borders?"
          ? { ...item, a: regional.faqBorder }
          : item,
      )
    : PLAN_FAQS;

  return (
    <section className="plans-faq" aria-labelledby="plans-faq-heading">
      <div className="plans-faq__head">
        <div className="plans-faq__intro-block">
          <h2 id="plans-faq-heading">Quick questions &amp; answers</h2>
          <p className="plans-faq__intro">
            Contact us if you have questions —{" "}
            <a
              className="plans-faq__contact-link"
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I have a question about the ${countryName} eSIM.`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              message us on WhatsApp
            </a>
            .
          </p>
        </div>
      </div>
      <div className="plans-faq__list">
        {faqs.map((item) => {
          const isOpen = open === item.q;
          return (
            <div key={item.q} className="plans-faq__item">
              <button
                type="button"
                className="plans-faq__q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : item.q)}
              >
                {item.q}
                <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <p className="plans-faq__a">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SkeletonGrid() {
  return (
    <div className="plans-skeleton-grid" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="plans-skeleton-card" />
      ))}
    </div>
  );
}

const PLAN_SECTIONS: { id: PlanTab; label: string }[] = [
  { id: "fixed", label: "Standard" },
  { id: "unlimited", label: "Unlimited" },
  { id: "flexible", label: "Flexible" },
];

function PlanSection({
  label,
  plans,
  countryName,
  flag,
  isRegional,
}: {
  label: string;
  plans: EsimPlan[];
  countryName: string;
  flag?: string;
  isRegional?: boolean;
}) {
  if (plans.length === 0) return null;

  return (
    <section className="plans-section" aria-labelledby={`plans-section-${label}`}>
      <h3 className="plans-section__title" id={`plans-section-${label}`}>
        {label}
      </h3>
      <div className="plans-rows">
        {sortPlans(plans).map((plan) => (
          <PlanRow
            key={plan.id}
            plan={plan}
            countryName={countryName}
            flag={flag}
            isRegional={isRegional}
          />
        ))}
      </div>
    </section>
  );
}

export function TravelerPlansPage({
  countryId,
  countryImage,
  initialData = null,
  initialError = null,
  regional,
}: TravelerPlansPageProps) {
  const [data, setData] = useState<PlansByCountryResponse | null>(initialData);
  const [loading, setLoading] = useState(!initialData && !initialError);
  const [error, setError] = useState<string | null>(initialError);
  const [compatOpen, setCompatOpen] = useState(false);

  useEffect(() => {
    if (initialData) return;

    let cancelled = false;

    async function loadPlans() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchPlansByCountry(countryId);
        if (cancelled) return;

        setData(response);
      } catch (err: unknown) {
        console.error("[TravelerPlansPage] Load failed:", {
          countryId,
          error: err,
        });
        if (cancelled) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load plans. The service may be temporarily unavailable.",
        );
        setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadPlans();

    return () => {
      cancelled = true;
    };
  }, [countryId, initialData, initialError]);

  const title = regional?.displayName ?? formatCountryLabel(data?.countryName ?? countryId);
  const flag = regional?.flag ?? resolveCountryFlag(countryId, data?.flag);
  const checkoutCountryName = regional?.displayName ?? title;
  const cheapest = useMemo(() => {
    const all = data?.plans ?? [];
    if (all.length === 0) return null;
    return all.reduce((best, plan) => (plan.price < best.price ? plan : best));
  }, [data]);

  return (
    <>
      <SiteHeader />
      <main className="plans-page">
      <CountryPlansHero
        src={countryImage}
        alt={`${title} travel destination`}
      >
        <Breadcrumbs
          onDark
          items={[
            { href: "/", label: "Home" },
            { href: "/destinations", label: "Destinations" },
            ...(regional
              ? [{ href: "/destinations", label: "Regional" }]
              : []),
            { label: title },
          ]}
        />
        <header className="plans-page__header">
          <div className="plans-page__brand">
            <span className="plans-page__eyebrow">
              {regional ? "Multi-country eSIM" : "NoorLink"}
            </span>
            <p className="plans-page__tagline">
              {regional ? regional.heroTagline : "Enjoy hassle-free travel"}
            </p>
          </div>
          <div className="plans-page__search-wrap">
            <CountrySearch placeholder="Search for another country..." />
          </div>
          <h1 className="plans-page__destination">
            <span className="plans-page__destination-flag" aria-hidden="true">
              {flag}
            </span>
            <span className="plans-page__destination-name">{title}</span>
          </h1>
          {regional && (
            <p className="plans-page__regional-sub">
              One QR · {regional.countries.length} countries · Hotspot included
            </p>
          )}
        </header>
      </CountryPlansHero>

      <div className="plans-page__inner">
        {loading && (
          <div className="plans-page__loading" aria-busy="true" aria-live="polite">
            <p className="plans-page__loading-text">Loading plans…</p>
            <SkeletonGrid />
          </div>
        )}

        {!loading && error && (
          <div className="plans-page__error" role="alert">
            <p className="plans-page__error-title">Could not load plans</p>
            <p className="plans-page__error-detail">{error}</p>
            <p className="plans-page__error-hint">
              Please try again in a moment, choose another destination, or contact
              support if you need help placing the order.
            </p>
          </div>
        )}

        {!loading && !error && data?.plans.length === 0 && (
          <p className="plans-page__empty">
            No plans found for this destination yet. Browse more from{" "}
            <Link href="/destinations" className="plans-page__inline-link">
              Destinations
            </Link>
            .
          </p>
        )}

        {!loading && !error && data && data.plans.length > 0 && (
          <>
            <div className="plans-trust">
              <div className="plans-trust__copy">
                <p className="plans-trust__network">
                  {regional
                    ? `Multi-country coverage · ${regional.countries.length} destinations`
                    : formatCountryNetworkLabel(countryId)}
                </p>
                <p className="plans-trust__meta">
                  Enjoy hassle-free travel
                  {cheapest
                    ? ` · From $${cheapest.price.toFixed(2)}`
                    : ""}
                </p>
              </div>
              <button
                type="button"
                className="plans-trust__compat"
                onClick={() => setCompatOpen(true)}
              >
                Check compatibility
              </button>
            </div>

            {regional && (
              <RegionalCoveragePanel
                product={regional}
                coverageCountries={data.coverageCountries}
                coverageExclusions={data.coverageExclusions}
              />
            )}

            {regional && (
              <p className="plans-regional-single-hint">
                Only staying in one country?{" "}
                <Link href={singleCountryPlansPath(regional)}>
                  See single-country plans
                </Link>{" "}
                — often better value for a single stop.
              </p>
            )}

            <div className="plans-reassurance">
              <span>Ready before you fly</span>
              <span>We&apos;ve got you covered</span>
              <span>24/7 support when you need it</span>
            </div>

            <h2 className="plans-picker__title">Choose your package</h2>
            <p className="plans-picker__hint">
              Pick your plan, check out in minutes on secure Stripe checkout, and
              you&apos;ll be connected before you know it — the price you see here
              is the price you pay.
            </p>
            <div className="plans-sections">
              {PLAN_SECTIONS.map((section) => (
                <PlanSection
                  key={section.id}
                  label={section.label}
                  plans={data.planGroups[section.id] ?? []}
                  countryName={checkoutCountryName}
                  flag={flag}
                  isRegional={Boolean(regional)}
                />
              ))}
            </div>

            <PlansFaq countryName={checkoutCountryName} regional={regional} />
          </>
        )}
      </div>
    </main>
      <SiteFooter />
      <CompatibilityModal
        isOpen={compatOpen}
        onClose={() => setCompatOpen(false)}
      />
    </>
  );
}
