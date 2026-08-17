"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PsychologicalPrice } from "@/components/ui/PsychologicalPrice";
import { CountrySearch } from "@/components/search/CountrySearch";
import {
  fetchPlansByCountry,
  type EsimPlan,
  type PlanCategory,
  type PlansByCountryResponse,
} from "@/lib/plans-api";
import "@/styles/plans-dynamic.css";

type PlanTab = PlanCategory;

type TravelerPlansPageProps = {
  countryId: string;
  initialData?: PlansByCountryResponse | null;
  initialError?: string | null;
};

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

function PlanCard({
  plan,
  countryName,
  flag,
}: {
  plan: EsimPlan;
  countryName: string;
  flag?: string;
}) {
  const badge = badgeLabel(plan);
  const highlighted =
    plan.planCategory !== "fixed" ||
    plan.displayBadge === "flexible" ||
    plan.isPayAsYouGo ||
    plan.isRechargeable;

  const checkoutParams = new URLSearchParams({
    country: countryName,
    price: plan.price.toFixed(2),
  });
  if (flag) checkoutParams.set("flag", flag);
  if (plan.name) checkoutParams.set("plan", plan.name);
  // Real catalog UUIDs link to esim_packages; tmpl-* IDs resolve via country/price.
  if (plan.id) checkoutParams.set("packageId", plan.id);
  const checkoutHref = `/checkout?${checkoutParams.toString()}`;

  return (
    <article
      className={`plans-card${highlighted ? " plans-card--payg" : ""}${plan.displayBadge === "best_choice" ? " plans-card--best" : ""}`}
    >
      {badge && (
        <span
          className={`plans-card__badge${plan.displayBadge === "best_choice" ? " plans-card__badge--best" : ""}`}
        >
          {badge}
        </span>
      )}
      <h3 className="plans-card__name">{plan.name}</h3>
      <div className="plans-card__metrics">
        <div className="plans-card__metric">
          <span className="plans-card__metric-label">Data</span>
          <span className="plans-card__metric-value">
            {formatDataAmount(plan)}
          </span>
        </div>
        <div className="plans-card__metric">
          <span className="plans-card__metric-label">Duration</span>
          <span className="plans-card__metric-value">
            {formatDuration(plan.durationDays)}
          </span>
        </div>
      </div>
      <div className="plans-card__price">
        <PsychologicalPrice
          parts={plan.formattedPriceParts}
          currency={plan.currency}
        />
        {plan.planCategory === "flexible" && <small> starting rate</small>}
      </div>
      <Link href={checkoutHref} className="plans-card__cta">
        Select Plan
      </Link>
    </article>
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

const TABS: { id: PlanTab; label: string }[] = [
  { id: "fixed", label: "Fixed Data" },
  { id: "unlimited", label: "Unlimited" },
  { id: "flexible", label: "Flexible" },
];

function pickInitialTab(data: PlansByCountryResponse): PlanTab {
  return TABS.find((tab) => (data.planGroups[tab.id]?.length ?? 0) > 0)?.id ?? "fixed";
}

export function TravelerPlansPage({
  countryId,
  initialData = null,
  initialError = null,
}: TravelerPlansPageProps) {
  const [data, setData] = useState<PlansByCountryResponse | null>(initialData);
  const [loading, setLoading] = useState(!initialData && !initialError);
  const [error, setError] = useState<string | null>(initialError);
  const [activeTab, setActiveTab] = useState<PlanTab>(
    initialData ? pickInitialTab(initialData) : "fixed",
  );

  useEffect(() => {
    if (initialData || initialError) return;

    let cancelled = false;

    async function loadPlans() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchPlansByCountry(countryId);
        if (cancelled) return;

        setData(response);
        const firstTab = TABS.find(
          (tab) => (response.planGroups[tab.id]?.length ?? 0) > 0,
        );
        if (firstTab) setActiveTab(firstTab.id);
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

  const title = data?.countryName ?? countryId.replace(/-/g, " ");
  const flag = data?.flag;
  const visiblePlans = data?.planGroups[activeTab] ?? [];

  return (
    <main className="plans-page">
      <div className="plans-page__inner">
        <header className="plans-page__header">
          <span className="plans-page__eyebrow">Global Traveler</span>
          <h1 className="plans-page__title">
            {flag ? `${flag} ` : ""}
            {title}
          </h1>
          <p className="plans-page__subtitle">
            Premium data for international travelers — fixed bundles, unlimited
            roaming, or flexible pay-as-you-go, priced live from our catalog.
          </p>
          <CountrySearch
            initialQuery={title}
            placeholder="Search another country..."
          />
        </header>

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
              If this persists, the backend may be unreachable. Confirm the API is
              running and try again shortly.
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
            <div className="plans-tabs" role="tablist" aria-label="Plan types">
              {TABS.map((tab) => {
                const count = data.planGroups[tab.id]?.length ?? 0;
                if (count === 0) return null;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`plans-tab${activeTab === tab.id ? " is-active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                    <span className="plans-tab__count">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="plans-grid" role="tabpanel">
              {visiblePlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  countryName={data.countryName ?? title}
                  flag={flag}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
