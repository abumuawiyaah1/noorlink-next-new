"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CompatibilityModal } from "@/components/modals/CompatibilityModal";
import { PsychologicalPrice } from "@/components/ui/PsychologicalPrice";
import {
  fetchPlansByCountry,
  type EsimPlan,
  type PlansByCountryResponse,
} from "@/lib/plans-api";
import {
  type PilgrimTierKey,
  type PilgrimTierOffer,
  computeGroupSavings,
  resolvePilgrimTiers,
  splitPricePerPerson,
} from "@/lib/pilgrim-tiers";
import "@/styles/hajj-umrah.css";

const SAUDI_COUNTRY_ID = "saudi-arabia";
const GROUP_SIZES = [2, 3, 4, 5, 6, 7, 8];

type PilgrimSelectionPageProps = {
  initialData?: PlansByCountryResponse | null;
  initialError?: string | null;
};

function buildCheckoutHref(plan: EsimPlan, price: number): string {
  const params = new URLSearchParams({
    country: "Saudi Arabia",
    price: price.toFixed(2),
    plan: plan.name,
    packageId: plan.id,
    flag: "🇸🇦",
  });
  return `/checkout?${params.toString()}`;
}

function tierBadge(tier: PilgrimTierOffer): string | null {
  if (tier.recommended) return "Most Popular";
  if (tier.plan?.displayBadge === "best_choice") return "Best Choice";
  return null;
}

function TierCard({
  tier,
  selected,
  groupSize,
  individualReferencePrice,
  onSelect,
  onGroupSizeChange,
}: {
  tier: PilgrimTierOffer;
  selected: boolean;
  groupSize: number;
  individualReferencePrice: number;
  onSelect: () => void;
  onGroupSizeChange: (size: number) => void;
}) {
  const plan = tier.plan;
  if (!plan) return null;

  const display = tier.hasGroupCalculator
    ? splitPricePerPerson(plan.price, plan.formattedPriceParts, groupSize)
    : { price: plan.price, formattedPriceParts: plan.formattedPriceParts };

  const badge = tierBadge(tier);
  const savings = tier.hasGroupCalculator
    ? computeGroupSavings(individualReferencePrice, display.price, groupSize)
    : null;

  return (
    <article
      className={`pilgrim-card${tier.recommended ? " is-recommended" : ""}${selected ? " is-selected" : ""}${badge === "Best Choice" ? " is-best-choice" : ""}`}
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
      <p className="pilgrim-card__desc">{tier.description}</p>

      <ul className="pilgrim-card__highlights">
        {tier.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="pilgrim-price-wrap">
        <PsychologicalPrice
          parts={display.formattedPriceParts}
          currency={plan.currency}
        />
        {tier.hasGroupCalculator && (
          <div className="pilgrim-group-calc">
            <label className="pilgrim-group-calc__label" htmlFor={`group-${tier.key}`}>
              Group size
            </label>
            <select
              id={`group-${tier.key}`}
              value={groupSize}
              onChange={(e) => onGroupSizeChange(Number(e.target.value))}
            >
              {GROUP_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size} pilgrims
                </option>
              ))}
            </select>
            <p className="pilgrim-group-calc__per-person">
              Cost per user at {groupSize} travelers
            </p>
            {savings != null && savings.perPersonSavings > 0 && (
              <p className="pilgrim-group-calc__savings">
                Save ${savings.perPersonSavings.toFixed(2)} per user vs individual
                Connected plans
              </p>
            )}
          </div>
        )}
      </div>

      <button type="button" className="pilgrim-card__cta" onClick={onSelect}>
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
  initialData = null,
  initialError = null,
}: PilgrimSelectionPageProps) {
  const [tiers, setTiers] = useState<PilgrimTierOffer[]>(() =>
    resolveInitialTiers(initialData),
  );
  const [loading, setLoading] = useState(!initialData && !initialError);
  const [error, setError] = useState<string | null>(initialError);
  const [selectedTier, setSelectedTier] = useState<PilgrimTierKey>("connected");
  const [groupSize, setGroupSize] = useState(4);
  const [compatibilityOpen, setCompatibilityOpen] = useState(false);

  useEffect(() => {
    if (initialData || initialError) return;

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
  }, [initialData, initialError]);

  const connectedTier = useMemo(
    () => tiers.find((tier) => tier.key === "connected") ?? null,
    [tiers],
  );
  const individualReferencePrice = connectedTier?.plan?.price ?? 0;

  const activeTier = useMemo(
    () =>
      tiers.find((tier) => tier.key === selectedTier) ??
      tiers.find((tier) => tier.recommended) ??
      tiers[0] ??
      null,
    [tiers, selectedTier],
  );

  const activePlan = activeTier?.plan;
  const checkoutPrice = useMemo(() => {
    if (!activePlan) return 0;
    if (activeTier?.hasGroupCalculator) {
      return splitPricePerPerson(
        activePlan.price,
        activePlan.formattedPriceParts,
        groupSize,
      ).price;
    }
    return activePlan.price;
  }, [activePlan, activeTier?.hasGroupCalculator, groupSize]);

  const stickyParts = useMemo(() => {
    if (!activePlan) return { dollars: "0", cents: "0" };
    if (activeTier?.hasGroupCalculator) {
      return splitPricePerPerson(
        activePlan.price,
        activePlan.formattedPriceParts,
        groupSize,
      ).formattedPriceParts;
    }
    return activePlan.formattedPriceParts;
  }, [activePlan, activeTier?.hasGroupCalculator, groupSize]);

  return (
    <main className="pilgrim-page">
      <div className="pilgrim-page__inner">
        <header className="pilgrim-hero">
          <span className="pilgrim-hero__eyebrow">Hajj & Umrah</span>
          <h1 className="pilgrim-hero__title">Connectivity for your Pilgrimage</h1>
          <p className="pilgrim-hero__subtitle">
            Install at home, stay connected the moment you arrive in Saudi Arabia.
          </p>
        </header>

        {loading && (
          <div className="pilgrim-page__loading" aria-busy="true" aria-live="polite">
            <p className="pilgrim-page__loading-text">Loading plans…</p>
            <div className="pilgrim-grid pilgrim-grid--skeleton" aria-hidden="true">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="pilgrim-card pilgrim-card--skeleton"
                />
              ))}
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="pilgrim-page__error" role="alert">
            <p className="pilgrim-page__error-title">Could not load plans</p>
            <p className="pilgrim-page__error-detail">{error}</p>
            <p className="pilgrim-page__error-hint">
              If this persists, the backend may be unreachable. Confirm the API is
              running and try again shortly.
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
                groupSize={groupSize}
                individualReferencePrice={individualReferencePrice}
                onSelect={() => setSelectedTier(tier.key)}
                onGroupSizeChange={setGroupSize}
              />
            ))}
          </section>
        )}

        {activePlan && (
          <div className="pilgrim-desktop-cta">
            <div>
              <p className="pilgrim-desktop-cta__label">Your selection</p>
              <p className="pilgrim-desktop-cta__plan">{activeTier?.title}</p>
            </div>
            <div className="pilgrim-desktop-cta__price">
              <PsychologicalPrice parts={stickyParts} currency={activePlan.currency} />
            </div>
            <Link
              href={buildCheckoutHref(activePlan, checkoutPrice)}
              className="pilgrim-desktop-cta__button"
            >
              Continue to checkout
            </Link>
          </div>
        )}

        <section className="pilgrim-essentials" aria-labelledby="pilgrim-essentials-title">
          <h2 id="pilgrim-essentials-title" className="pilgrim-essentials__title">
            Pilgrim Essentials
          </h2>
          <p className="pilgrim-essentials__text">
            Prepare your devices before travel. These official apps and our
            compatibility check help ensure a smooth arrival in the Kingdom.
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
              href="https://taawakkalna.sdaia.gov.sa/"
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
            Benefits Comparison
          </h2>
          <p className="pilgrim-compare__subtitle">
            Congestion-resilient access and group coordination matter most during
            peak pilgrimage periods.
          </p>
          <div className="pilgrim-compare__table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Benefit</th>
                  <th scope="col">Basic</th>
                  <th scope="col">Connected</th>
                  <th scope="col">Unlimited</th>
                  <th scope="col">Family Share</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Congestion-resilient access</td>
                  <td>Standard</td>
                  <td>Enhanced</td>
                  <td>Priority</td>
                  <td>Shared priority</td>
                </tr>
                <tr>
                  <td>Group coordination</td>
                  <td>Individual</td>
                  <td>Individual</td>
                  <td>Individual</td>
                  <td>Hotspot for full group</td>
                </tr>
                <tr>
                  <td>Video calls & live updates</td>
                  <td>Limited</td>
                  <td>Reliable</td>
                  <td>Unlimited</td>
                  <td>Shared unlimited use</td>
                </tr>
                <tr>
                  <td>Cost efficiency (4+ travelers)</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                  <td>Lowest per-user cost</td>
                </tr>
                <tr>
                  <td>Best for</td>
                  <td>Short stays</td>
                  <td>First-time pilgrims</td>
                  <td>Extended devotion</td>
                  <td>Families & groups</td>
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
            <span className="pilgrim-sticky-cta__plan">{activeTier.title}</span>
            <PsychologicalPrice parts={stickyParts} currency={activePlan.currency} />
          </div>
          <Link
            href={buildCheckoutHref(activePlan, checkoutPrice)}
            className="pilgrim-sticky-cta__button"
          >
            Continue
          </Link>
        </div>
      )}

      <CompatibilityModal
        isOpen={compatibilityOpen}
        onClose={() => setCompatibilityOpen(false)}
      />
    </main>
  );
}
