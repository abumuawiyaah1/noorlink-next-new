"use client";

import { useEffect, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CountryPlansHero } from "@/components/plans/CountryPlansHero";
import { CompatibilityModal } from "@/components/modals/CompatibilityModal";
import { PsychologicalPrice } from "@/components/ui/PsychologicalPrice";
import { CountrySearch } from "@/components/search/CountrySearch";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";
import { PilgrimCarrierRow } from "@/components/pilgrimage/PilgrimCarrierRow";
import { PilgrimageInspiration } from "@/components/pilgrimage/PilgrimageInspiration";
import {
  fetchPlansByCountry,
  type EsimPlan,
  type PlansByCountryResponse,
} from "@/lib/plans-api";
import {
  type ConnectedPilgrimDataGb,
  type PilgrimTierKey,
  type PilgrimTierOffer,
  type UmrahUnlimitedDays,
  availableUmrahUnlimitedDays,
  resolveConnectedPilgrimPlan,
  resolvePilgrimPlanCopy,
  resolvePilgrimTiers,
  resolveUmrahUnlimitedPlan,
} from "@/lib/pilgrim-tiers";
import {
  getRememberedPromo,
  normalizePromoCode,
  rememberPromo,
} from "@/lib/promo-link";
import {
  getRememberedRef,
  normalizeRefCode,
  rememberRef,
  withAttribution,
} from "@/lib/affiliate-link";
import { PILGRIMAGE_BRAND_LINE } from "@/lib/brand";
import "@/styles/hajj-umrah.css";
import "@/styles/plans-dynamic.css";

const SAUDI_COUNTRY_ID = "saudi-arabia";
const HAJJ_WHATSAPP_MESSAGE =
  "Hi NoorLink — I have a question about Hajj & Umrah eSIM plans before I buy.";

type PilgrimSelectionPageProps = {
  countryImage: string;
  initialData?: PlansByCountryResponse | null;
  initialError?: string | null;
  initialPromo?: string;
  initialRef?: string;
};

function buildCheckoutHref(
  plan: EsimPlan,
  price: number,
  promo?: string,
  ref?: string,
): string {
  const params = new URLSearchParams({
    country: "Saudi Arabia",
    price: price.toFixed(2),
    flag: "🇸🇦",
  });
  if (plan.countryId) params.set("country_id", plan.countryId);
  if (plan.name) params.set("plan", plan.name);
  if (plan.id) params.set("packageId", plan.id);
  return withAttribution(`/checkout?${params.toString()}`, { promo, ref });
}

function tierBadge(tier: PilgrimTierOffer): string | null {
  if (tier.recommended) return "Most Popular";
  if (tier.plan?.displayBadge === "best_choice") return "Best Choice";
  return null;
}

function TierCard({
  tier,
  selected,
  connectedDataGb,
  umrahUnlimitedDays,
  onSelect,
  onConnectedDataGbChange,
  onUmrahUnlimitedDaysChange,
}: {
  tier: PilgrimTierOffer;
  selected: boolean;
  connectedDataGb: ConnectedPilgrimDataGb;
  umrahUnlimitedDays: UmrahUnlimitedDays;
  onSelect: () => void;
  onConnectedDataGbChange: (gb: ConnectedPilgrimDataGb) => void;
  onUmrahUnlimitedDaysChange: (days: UmrahUnlimitedDays) => void;
}) {
  if (tier.comingSoon) {
    const copy = resolvePilgrimPlanCopy(tier, null);
    return (
      <article className="pilgrim-card pilgrim-card--coming-soon">
        <span className="pilgrim-card__badge">Coming soon</span>
        <p className="pilgrim-card__tier">{tier.subtitle}</p>
        <h2 className="pilgrim-card__title">{tier.title}</h2>
        <div className="pilgrim-card__details">
          <p className="pilgrim-card__desc">{copy.description}</p>
          <ul className="pilgrim-card__highlights">
            {copy.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="pilgrim-price-wrap">
          <p className="pilgrim-card__coming-soon-note">
            Coming soon — WhatsApp us for early access.
          </p>
        </div>
        <button type="button" className="pilgrim-card__cta" disabled>
          Coming soon
        </button>
      </article>
    );
  }

  const isConnected = tier.key === "connected" && tier.connectedVariants;
  const isUnlimited = tier.key === "unlimited" && tier.unlimitedVariants;
  const unlimitedDays = isUnlimited ? availableUmrahUnlimitedDays(tier) : [];
  const plan = isConnected
    ? resolveConnectedPilgrimPlan(tier, connectedDataGb)
    : isUnlimited
      ? resolveUmrahUnlimitedPlan(tier, umrahUnlimitedDays)
      : tier.plan;
  if (!plan) return null;

  const copy = resolvePilgrimPlanCopy(
    tier,
    plan,
    connectedDataGb,
    umrahUnlimitedDays,
  );

  const badge = tierBadge(tier);

  return (
    <article
      className={`pilgrim-card pilgrim-card--selectable${tier.recommended ? " is-recommended" : ""}${selected ? " is-selected" : ""}${badge === "Best Choice" ? " is-best-choice" : ""}`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`Select ${tier.title}`}
    >
      {badge && (
        <span
          className={`pilgrim-card__badge${badge === "Best Choice" ? " pilgrim-card__badge--best" : ""}`}
        >
          {badge}
        </span>
      )}

      <p className="pilgrim-card__tier">{tier.subtitle}</p>
      <h2 className="pilgrim-card__title">{tier.title}</h2>
      <div className="pilgrim-card__details">
        <p className="pilgrim-card__desc">{copy.description}</p>
        <ul className="pilgrim-card__highlights">
          {copy.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {isConnected && (
        <div className="pilgrim-data-picker" role="group" aria-label="Data allowance">
          <span className="pilgrim-data-picker__label">Data allowance</span>
          <div className="pilgrim-data-picker__options">
            {([10, 20] as const).map((gb) => {
              const variant =
                gb === 10
                  ? tier.connectedVariants!.gb10
                  : tier.connectedVariants!.gb20;
              const active = connectedDataGb === gb;
              return (
                <button
                  key={gb}
                  type="button"
                  className={`pilgrim-data-picker__option${active ? " is-active" : ""}`}
                  aria-pressed={active}
                  onClick={(event) => {
                    event.stopPropagation();
                    onConnectedDataGbChange(gb);
                  }}
                >
                  <span className="pilgrim-data-picker__gb">{gb} GB</span>
                  <span className="pilgrim-data-picker__meta">
                    {variant.durationDays ?? 30} days
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isUnlimited && (
        <div className="pilgrim-data-picker" role="group" aria-label="Trip length">
          <span className="pilgrim-data-picker__label">Trip length</span>
          <div
            className={`pilgrim-data-picker__options${unlimitedDays.length > 2 ? " pilgrim-data-picker__options--triple" : ""}`}
          >
            {unlimitedDays.map((days) => {
              const active = umrahUnlimitedDays === days;
              return (
                <button
                  key={days}
                  type="button"
                  className={`pilgrim-data-picker__option${active ? " is-active" : ""}`}
                  aria-pressed={active}
                  onClick={(event) => {
                    event.stopPropagation();
                    onUmrahUnlimitedDaysChange(days);
                  }}
                >
                  <span className="pilgrim-data-picker__gb">{days} days</span>
                  <span className="pilgrim-data-picker__meta">3GB/day</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="pilgrim-price-wrap">
        <PsychologicalPrice
          parts={plan.formattedPriceParts}
          currency={plan.currency}
        />
      </div>

      <button
        type="button"
        className="pilgrim-card__cta"
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
      >
        {selected ? "Selected" : "Select plan"}
      </button>
    </article>
  );
}

function resolveInitialTiers(
  initialData?: PlansByCountryResponse | null,
): PilgrimTierOffer[] {
  if (!initialData?.plans?.length) return [];
  return resolvePilgrimTiers(initialData.plans);
}

export function PilgrimSelectionPage({
  countryImage,
  initialData = null,
  initialError = null,
  initialPromo = "",
  initialRef = "",
}: PilgrimSelectionPageProps) {
  const [promo, setPromo] = useState(() => normalizePromoCode(initialPromo));
  const [refCode, setRefCode] = useState(() => normalizeRefCode(initialRef));
  const [tiers, setTiers] = useState<PilgrimTierOffer[]>(() =>
    resolveInitialTiers(initialData),
  );
  const [loading, setLoading] = useState(!initialData && !initialError);
  const [error, setError] = useState<string | null>(initialError);
  const [selectedTier, setSelectedTier] = useState<PilgrimTierKey>("connected");
  const [connectedDataGb, setConnectedDataGb] = useState<ConnectedPilgrimDataGb>(10);
  const [umrahUnlimitedDays, setUmrahUnlimitedDays] =
    useState<UmrahUnlimitedDays>(10);
  const [compatibilityOpen, setCompatibilityOpen] = useState(false);

  // Keep selected unlimited length valid when catalog only has 7/10d.
  useEffect(() => {
    const unlimited = tiers.find((tier) => tier.key === "unlimited");
    if (!unlimited) return;
    const allowed = availableUmrahUnlimitedDays(unlimited);
    if (!allowed.includes(umrahUnlimitedDays)) {
      setUmrahUnlimitedDays(allowed.includes(10) ? 10 : allowed[0]!);
    }
  }, [tiers, umrahUnlimitedDays]);

  useEffect(() => {
    const fromProp = normalizePromoCode(initialPromo);
    if (fromProp) {
      rememberPromo(fromProp);
      setPromo(fromProp);
      return;
    }
    const remembered = getRememberedPromo();
    if (remembered) setPromo(remembered);
  }, [initialPromo]);

  useEffect(() => {
    const fromProp = normalizeRefCode(initialRef);
    if (fromProp) {
      rememberRef(fromProp);
      setRefCode(fromProp);
      return;
    }
    const remembered = getRememberedRef();
    if (remembered) setRefCode(remembered);
  }, [initialRef]);

  useEffect(() => {
    if (initialData?.plans?.length) return;

    let cancelled = false;

    async function loadPilgrimPlans() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchPlansByCountry(SAUDI_COUNTRY_ID);
        if (cancelled) return;

        const resolved = resolvePilgrimTiers(response.plans);
        setTiers(resolved);

        if (resolved.length === 0) {
          setError("No pilgrimage plans are available for Saudi Arabia yet.");
        }
      } catch (err: unknown) {
        console.error("[PilgrimSelectionPage] Load failed:", {
          countryId: SAUDI_COUNTRY_ID,
          error: err,
        });
        if (cancelled) return;

        setTiers([]);
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load plans. The service may be temporarily unavailable.",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadPilgrimPlans();

    return () => {
      cancelled = true;
    };
  }, [initialData]);

  const activeTier = useMemo(() => {
    const selected =
      tiers.find((tier) => tier.key === selectedTier && !tier.comingSoon) ?? null;
    return (
      selected ??
      tiers.find((tier) => tier.recommended && !tier.comingSoon) ??
      tiers.find((tier) => !tier.comingSoon && tier.plan) ??
      null
    );
  }, [tiers, selectedTier]);

  const activePlan = useMemo(() => {
    if (!activeTier) return null;
    if (activeTier.key === "connected") {
      return resolveConnectedPilgrimPlan(activeTier, connectedDataGb);
    }
    if (activeTier.key === "unlimited") {
      return resolveUmrahUnlimitedPlan(activeTier, umrahUnlimitedDays);
    }
    return activeTier.plan;
  }, [activeTier, connectedDataGb, umrahUnlimitedDays]);

  const activePlanLabel = useMemo(() => {
    if (!activeTier) return "";
    if (activeTier.key === "connected") {
      return `${activeTier.title} · ${connectedDataGb}GB`;
    }
    if (activeTier.key === "unlimited") {
      return `${activeTier.title} · ${umrahUnlimitedDays} days`;
    }
    return activeTier.title;
  }, [activeTier, connectedDataGb, umrahUnlimitedDays]);

  const checkoutPrice = activePlan?.price ?? 0;
  const stickyParts = activePlan?.formattedPriceParts ?? { dollars: "0", cents: "0" };

  const cheapest = useMemo(() => {
    const prices = tiers.flatMap((tier) => {
      if (tier.key === "connected" && tier.connectedVariants) {
        return [tier.connectedVariants.gb10.price, tier.connectedVariants.gb20.price];
      }
      if (tier.key === "unlimited" && tier.unlimitedVariants) {
        const { d7, d10, d14 } = tier.unlimitedVariants;
        return [d7.price, d10.price, ...(d14 ? [d14.price] : [])];
      }
      if (typeof tier.plan?.price === "number") return [tier.plan.price];
      return [];
    });
    if (prices.length === 0) return null;
    return Math.min(...prices);
  }, [tiers]);

  return (
    <>
      <SiteHeader />
      <main className="pilgrim-page plans-page">
        <CountryPlansHero src={countryImage} alt="Saudi Arabia pilgrimage destination">
          <Breadcrumbs
            onDark
            items={[
              { href: "/", label: "Home" },
              { href: "/destinations", label: "Destinations" },
              { label: "Hajj & Umrah" },
            ]}
          />
          <header className="plans-page__header">
            <div className="plans-page__brand">
              <span className="plans-page__eyebrow">{PILGRIMAGE_BRAND_LINE}</span>
              <p className="plans-page__tagline">
                Hajj &amp; Umrah — install at home, stay connected the moment you
                arrive in Saudi Arabia.
              </p>
            </div>
            <div className="plans-page__search-wrap">
              <CountrySearch placeholder="Search for another country..." />
            </div>
            <h1 className="plans-page__destination">
              <span className="plans-page__destination-flag" aria-hidden="true">
                🇸🇦
              </span>
              <span className="plans-page__destination-name">
                Connectivity for your Pilgrimage
              </span>
            </h1>
            <p className="plans-page__regional-sub">
              Pilgrimage eSIM · Hotspot included · 24/7 WhatsApp support
            </p>
          </header>
        </CountryPlansHero>

        <div className="pilgrim-page__inner plans-page__inner">
          {!loading && !error && tiers.length > 0 && (
            <>
              <div className="plans-trust">
                <div className="plans-trust__copy">
                  <p className="plans-trust__network">
                    Saudi Arabia coverage · Makkah &amp; Madinah ready
                  </p>
                  <p className="plans-trust__meta">
                    Enjoy hassle-free travel
                    {cheapest != null ? ` · From $${cheapest.toFixed(2)}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  className="plans-trust__compat"
                  onClick={() => setCompatibilityOpen(true)}
                >
                  Check compatibility
                </button>
              </div>

              <div className="plans-reassurance">
                <span>Ready before you fly</span>
                <span>We&apos;ve got you covered</span>
                <span>24/7 WhatsApp support</span>
              </div>

              <PilgrimCarrierRow />

              <PilgrimageInspiration />

              <div className="pilgrim-trip-guide" aria-labelledby="pilgrim-trip-guide-title">
                <h2 id="pilgrim-trip-guide-title" className="pilgrim-trip-guide__title">
                  Which plan fits your trip?
                </h2>
                <ul className="pilgrim-trip-guide__list">
                  <li>
                    <strong>3–7 day Umrah</strong>
                    <span>Lite Explorer · 5GB</span>
                  </li>
                  <li>
                    <strong>First pilgrimage · 10–14 days</strong>
                    <span>Connected · 10GB</span>
                  </li>
                  <li>
                    <strong>Longer stay or more video</strong>
                    <span>Connected · 20GB</span>
                  </li>
                  <li>
                    <strong>Do not want to count GB</strong>
                    <span>Umrah Unlimited · 3GB/day</span>
                  </li>
                </ul>
              </div>

              <h2 className="plans-picker__title">Choose your pilgrimage plan</h2>
              <p className="plans-picker__hint">
                Fixed Saudi packs or honest day-pass unlimited (3GB/day, then 1 Mbps).
                The price you see is the price you pay at secure checkout. Hotspot is
                included on every plan below.
              </p>
            </>
          )}

          {loading && (
            <div className="pilgrim-page__loading" aria-busy="true" aria-live="polite">
              <p className="pilgrim-page__loading-text">Loading plans…</p>
              <div className="pilgrim-grid pilgrim-grid--skeleton" aria-hidden="true">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="pilgrim-card pilgrim-card--skeleton" />
                ))}
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="pilgrim-page__error" role="alert">
              <p className="pilgrim-page__error-title">Could not load plans</p>
              <p className="pilgrim-page__error-detail">{error}</p>
              <p className="pilgrim-page__error-hint">
                Please try again shortly, or{" "}
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>message us on WhatsApp</a>.
              </p>
            </div>
          )}

          {!loading && !error && tiers.length > 0 && (
            <section className="pilgrim-grid" aria-label="Travel profile plans">
              {tiers.map((tier) => (
                <TierCard
                  key={tier.key}
                  tier={tier}
                  selected={selectedTier === tier.key}
                  connectedDataGb={connectedDataGb}
                  umrahUnlimitedDays={umrahUnlimitedDays}
                  onSelect={() => {
                    if (tier.comingSoon) return;
                    setSelectedTier(tier.key);
                  }}
                  onConnectedDataGbChange={(gb) => {
                    setConnectedDataGb(gb);
                    setSelectedTier("connected");
                  }}
                  onUmrahUnlimitedDaysChange={(days) => {
                    setUmrahUnlimitedDays(days);
                    setSelectedTier("unlimited");
                  }}
                />
              ))}
            </section>
          )}

          {!loading && !error && tiers.length > 0 && (
            <div className="pilgrim-support-cta">
              <p className="pilgrim-support-cta__text">
                Not sure which plan to pick? Our team helps pilgrims every day.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(HAJJ_WHATSAPP_MESSAGE)}`}
                className="pilgrim-support-cta__button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask on WhatsApp
              </a>
            </div>
          )}

          {activePlan && (
            <p className="pilgrim-install-note">
              Install on Wi‑Fi before you fly. Your data package typically starts when
              the eSIM connects to a Saudi network — not at checkout.
            </p>
          )}

          {activePlan && (
            <div className="pilgrim-desktop-cta">
              <div>
                <p className="pilgrim-desktop-cta__label">Your selection</p>
                <p className="pilgrim-desktop-cta__plan">{activePlanLabel}</p>
              </div>
              <div className="pilgrim-desktop-cta__price">
                <PsychologicalPrice
                  parts={stickyParts}
                  currency={activePlan.currency}
                />
              </div>
              <a
                href={buildCheckoutHref(activePlan, checkoutPrice, promo, refCode)}
                className="pilgrim-desktop-cta__button"
              >
                Continue to checkout
              </a>
            </div>
          )}

          <section className="pilgrim-essentials" aria-labelledby="pilgrim-essentials-title">
            <h2 id="pilgrim-essentials-title" className="pilgrim-essentials__title">
              Pilgrim essentials
            </h2>
            <p className="pilgrim-essentials__text">
              Prepare your devices before travel. Official apps and our compatibility
              check help ensure a smooth arrival in the Kingdom.
            </p>
            <div className="pilgrim-essentials__links">
              <a
                className="pilgrim-essentials__link"
                href="https://www.nusuk.sa/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nusuk installation guide
              </a>
              <a
                className="pilgrim-essentials__link"
                href="https://ta.sdaia.gov.sa/home"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tawakkalna setup guide
              </a>
              <button
                type="button"
                className="pilgrim-essentials__button"
                onClick={() => setCompatibilityOpen(true)}
              >
                Compatibility Checker
              </button>
            </div>
          </section>

          <section className="pilgrim-compare" aria-labelledby="pilgrim-compare-title">
            <h2 id="pilgrim-compare-title" className="pilgrim-compare__title">
              Benefits comparison
            </h2>
            <p className="pilgrim-compare__subtitle">
              Compare data, hotspot, and support across our pilgrimage profiles.
            </p>
            <div className="pilgrim-compare__table-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Benefit</th>
                    <th scope="col">Basic</th>
                    <th scope="col">Connected</th>
                    <th scope="col">Umrah Unlimited</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Coverage</td>
                    <td>Makkah &amp; Madinah</td>
                    <td>Makkah &amp; Madinah</td>
                    <td>Makkah &amp; Madinah</td>
                  </tr>
                  <tr>
                    <td>Data allowance</td>
                    <td>5GB · 30 days</td>
                    <td>10GB or 20GB</td>
                    <td>3GB/day · then 1 Mbps</td>
                  </tr>
                  <tr>
                    <td>Trip length</td>
                    <td>30 days</td>
                    <td>30 days</td>
                    <td>7 or 10 days</td>
                  </tr>
                  <tr>
                    <td>Hotspot sharing</td>
                    <td>Included</td>
                    <td>Included</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>WhatsApp support</td>
                    <td>24/7</td>
                    <td>24/7</td>
                    <td>24/7</td>
                  </tr>
                  <tr>
                    <td>Video calls &amp; live updates</td>
                    <td>Light use</td>
                    <td>Regular use</td>
                    <td>Heavy daily use</td>
                  </tr>
                  <tr>
                    <td>Best for</td>
                    <td>Short stays</td>
                    <td>Most first-time pilgrims</td>
                    <td>Travelers who prefer day-pass unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {activePlan && (
          <div className="pilgrim-sticky-cta" role="region" aria-label="Purchase">
            <div className="pilgrim-sticky-cta__meta">
              <span className="pilgrim-sticky-cta__label">Selected plan</span>
              <span className="pilgrim-sticky-cta__plan">{activePlanLabel}</span>
              <PsychologicalPrice
                parts={stickyParts}
                currency={activePlan.currency}
              />
            </div>
            <a
              href={buildCheckoutHref(activePlan, checkoutPrice, promo, refCode)}
              className="pilgrim-sticky-cta__button"
            >
              Continue
            </a>
          </div>
        )}
      </main>
      <SiteFooter />
      <CompatibilityModal
        isOpen={compatibilityOpen}
        onClose={() => setCompatibilityOpen(false)}
      />
    </>
  );
}
