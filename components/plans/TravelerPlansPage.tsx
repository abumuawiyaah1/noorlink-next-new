"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CountryPlansHero } from "@/components/plans/CountryPlansHero";
import { CompatibilityModal } from "@/components/modals/CompatibilityModal";
import { RegionalCoveragePanel } from "@/components/plans/RegionalCoveragePanel";
import { PlansPopularStory } from "@/components/plans/PlansPopularStory";
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
import { describeEsimPlan } from "@/lib/plan-descriptions";
import {
  plansPathForRegion,
  recommendRegionalForCountry,
  singleCountryPlansPath,
  type RegionalProduct,
} from "@/lib/regional-products";
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
import { getDictionary, t, type Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { localizeRegionalProduct } from "@/lib/i18n/regional";
import { useLocaleState } from "@/lib/i18n/use-locale";
import "@/styles/plans-dynamic.css";

type PlanTab = PlanCategory;

type TravelerPlansPageProps = {
  countryId: string;
  countryImage: string;
  initialData?: PlansByCountryResponse | null;
  initialError?: string | null;
  regional?: RegionalProduct;
  initialPromo?: string;
  initialRef?: string;
};

function planFaqs(dict: Dictionary) {
  return [
    { q: t(dict, "plansPage.installWhenQ"), a: t(dict, "plansPage.installWhenA") },
    { q: t(dict, "plansPage.startWhenQ"), a: t(dict, "plansPage.startWhenA") },
    { q: t(dict, "plansPage.hotspotQ"), a: t(dict, "plansPage.hotspotA") },
    { q: t(dict, "plansPage.lockedQ"), a: t(dict, "plansPage.lockedA") },
  ];
}

function regionalFaqs(dict: Dictionary, borderAnswer: string) {
  return [
    {
      q: t(dict, "plansPage.regionalFaqOneEsimQ"),
      a: t(dict, "plansPage.regionalFaqOneEsimA"),
    },
    {
      q: t(dict, "plansPage.borderFaqQ"),
      a: borderAnswer,
    },
    {
      q: t(dict, "plansPage.regionalFaqStartQ"),
      a: t(dict, "plansPage.regionalFaqStartA"),
    },
    {
      q: t(dict, "plansPage.regionalFaqWhatsAppQ"),
      a: t(dict, "plansPage.regionalFaqWhatsAppA"),
    },
    {
      q: t(dict, "plansPage.regionalFaqHotspotShortQ"),
      a: t(dict, "plansPage.regionalFaqHotspotShortA"),
    },
  ];
}

function formatDataAmount(plan: EsimPlan, dict: Dictionary): string {
  if (plan.planCategory === "unlimited") return t(dict, "plansPage.unlimited");
  if (plan.planCategory === "flexible" || plan.isPayAsYouGo || plan.isRechargeable) {
    return t(dict, "plansPage.payg");
  }
  if (plan.dataGb == null) return "—";
  const value = Number(plan.dataGb);
  return Number.isInteger(value) ? `${value} GB` : `${value} GB`;
}

function formatDuration(days: number | undefined, dict: Dictionary): string {
  if (days == null) return t(dict, "plansPage.flexible");
  return days === 1
    ? t(dict, "plansPage.dayOne")
    : t(dict, "plansPage.daysN", { n: days });
}

function badgeLabel(plan: EsimPlan, dict: Dictionary): string | null {
  if (plan.displayBadge === "best_choice") return t(dict, "plansPage.bestChoice");
  if (plan.displayBadge === "flexible") return t(dict, "plansPage.flexible");
  return null;
}

function checkoutHref(
  plan: EsimPlan,
  countryName: string,
  flag?: string,
  isRegional?: boolean,
  promo?: string,
  ref?: string,
  wantsTopUp?: boolean,
): string {
  const checkoutParams = new URLSearchParams({
    country: countryName,
    price: plan.price.toFixed(2),
  });
  if (flag) checkoutParams.set("flag", flag);
  if (plan.name) checkoutParams.set("plan", plan.name);
  if (plan.id) checkoutParams.set("packageId", plan.id);
  if (isRegional) checkoutParams.set("productType", "regional");
  if (wantsTopUp) checkoutParams.set("wantsTopUp", "1");
  const href = `/checkout?${checkoutParams.toString()}`;
  return withAttribution(href, { promo, ref });
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
  isRegional,
  selected,
  checkoutHref,
  onSelect,
}: {
  plan: EsimPlan;
  countryName: string;
  isRegional?: boolean;
  selected: boolean;
  checkoutHref: string;
  onSelect: (planId: string) => void;
}) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const badge = badgeLabel(plan, dict);
  const best = plan.displayBadge === "best_choice";
  const copy = describeEsimPlan(plan, {
    countryLabel: countryName,
    isRegional,
    locale,
  });

  return (
    <div
      role="button"
      tabIndex={0}
      className={`plans-row${best ? " is-best" : ""}${selected ? " is-selected" : ""}`}
      aria-pressed={selected}
      aria-label={`${formatDataAmount(plan, dict)} · ${formatDuration(plan.durationDays, dict)}, $${plan.price.toFixed(2)}. ${copy.description}`}
      onClick={() => onSelect(plan.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(plan.id);
        }
      }}
    >
      <span className="plans-row__data">{formatDataAmount(plan, dict)}</span>
      <span className="plans-row__duration">
        {formatDuration(plan.durationDays, dict)}
      </span>
      <span className="plans-row__price">
        <PsychologicalPrice
          parts={plan.formattedPriceParts}
          amountUsd={plan.price}
          currency={plan.currency}
        />
        {plan.planCategory === "flexible" && (
          <small className="plans-row__from">
            {" "}
            {t(dict, "plansPage.starting")}
          </small>
        )}
      </span>
      {badge ? <span className="plans-row__badge">{badge}</span> : <span />}
      <a
        href={checkoutHref}
        className="plans-row__cta"
        onClick={(event) => {
          event.stopPropagation();
          onSelect(plan.id);
        }}
      >
        {t(dict, "plansPage.checkout")}
      </a>
      <div className="plans-row__details">
        <p className="plans-row__desc">{copy.description}</p>
        <ul className="plans-row__highlights">
          {copy.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PlansFaq({
  countryName,
  regional,
}: {
  countryName: string;
  regional?: RegionalProduct;
}) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const [open, setOpen] = useState<string | null>(null);
  const faqs = regional
    ? regionalFaqs(dict, localizeRegionalProduct(regional, locale).faqBorder)
    : planFaqs(dict);
  const waText = t(dict, "plansPage.faqWhatsAppPrefill", {
    country: countryName,
  });

  return (
    <section className="plans-faq" aria-labelledby="plans-faq-heading">
      <div className="plans-faq__head">
        <div className="plans-faq__intro-block">
          <h2 id="plans-faq-heading">{t(dict, "plansPage.faqTitle")}</h2>
          <p className="plans-faq__intro">
            {t(dict, "plansPage.faqContactBefore")}{" "}
            <a
              className="plans-faq__contact-link"
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(dict, "plansPage.faqContactLink")}
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

const PLAN_SECTIONS: { id: PlanTab; labelKey: string }[] = [
  { id: "fixed", labelKey: "plansPage.standard" },
  { id: "unlimited", labelKey: "plansPage.unlimited" },
  { id: "flexible", labelKey: "plansPage.flexible" },
];

function PlanSection({
  label,
  plans,
  countryName,
  flag,
  isRegional,
  selectedPlanId,
  onSelectPlan,
  promo,
  refCode,
  wantsTopUp,
}: {
  label: string;
  plans: EsimPlan[];
  countryName: string;
  flag?: string;
  isRegional?: boolean;
  selectedPlanId: string | null;
  onSelectPlan: (planId: string) => void;
  promo?: string;
  refCode?: string;
  wantsTopUp?: boolean;
}) {
  const sorted = sortPlans(plans);
  if (sorted.length === 0) return null;

  return (
    <section className="plans-section" aria-label={label}>
      <h3 className="plans-section__title">{label}</h3>
      <div className="plans-rows">
        {sorted.map((plan) => (
          <PlanRow
            key={plan.id}
            plan={plan}
            countryName={countryName}
            isRegional={isRegional}
            selected={selectedPlanId === plan.id}
            checkoutHref={checkoutHref(
              plan,
              countryName,
              flag,
              isRegional,
              promo,
              refCode,
              wantsTopUp,
            )}
            onSelect={onSelectPlan}
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
  initialPromo = "",
  initialRef = "",
}: TravelerPlansPageProps) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const [promo, setPromo] = useState(() => normalizePromoCode(initialPromo));
  const [refCode, setRefCode] = useState(() => normalizeRefCode(initialRef));
  const [data, setData] = useState<PlansByCountryResponse | null>(initialData);
  const [loading, setLoading] = useState(!initialData && !initialError);
  const [error, setError] = useState<string | null>(initialError);
  const [compatOpen, setCompatOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [wantsTopUp, setWantsTopUp] = useState(false);

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
            : t(dict, "plansPage.loadError"),
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

  const localizedRegional = useMemo(
    () => (regional ? localizeRegionalProduct(regional, locale) : undefined),
    [regional, locale],
  );
  const title =
    localizedRegional?.displayName ??
    formatCountryLabel(data?.countryName ?? countryId);
  const flag = regional?.flag ?? resolveCountryFlag(countryId, data?.flag);
  // Checkout + API identifiers stay in English so order data is locale-independent.
  const checkoutCountryName = regional?.displayName ?? title;
  const layoverRecommendation = useMemo(() => {
    if (regional) return null;
    return recommendRegionalForCountry(checkoutCountryName);
  }, [regional, checkoutCountryName]);
  const cheapest = useMemo(() => {
    const all = data?.plans ?? [];
    if (all.length === 0) return null;
    return all.reduce((best, plan) => (plan.price < best.price ? plan : best));
  }, [data]);

  const selectedPlan = useMemo(() => {
    if (!selectedPlanId || !data?.plans) return null;
    return data.plans.find((plan) => plan.id === selectedPlanId) ?? null;
  }, [data, selectedPlanId]);

  const selectedCheckoutHref = useMemo(() => {
    if (!selectedPlan) return "#";
    return checkoutHref(
      selectedPlan,
      checkoutCountryName,
      flag,
      Boolean(regional),
      promo,
      refCode,
      wantsTopUp,
    );
  }, [
    selectedPlan,
    checkoutCountryName,
    flag,
    regional,
    promo,
    refCode,
    wantsTopUp,
  ]);

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
            { href: localizedPath("/", locale), label: dict.common.home },
            {
              href: localizedPath("/destinations", locale),
              label: dict.nav.destinations,
            },
            ...(regional
              ? [
                  {
                    href: localizedPath("/destinations", locale),
                    label: t(dict, "plansPage.regionalEsim"),
                  },
                ]
              : []),
            { label: title },
          ]}
        />
        <header className="plans-page__header">
          <div className="plans-page__brand">
            <span className="plans-page__eyebrow">
              {regional ? t(dict, "plansPage.regionalEsim") : "NoorLink"}
            </span>
            <p className="plans-page__tagline">
              {localizedRegional
                ? localizedRegional.heroTagline
                : t(dict, "plansPage.enjoyTravel")}
            </p>
          </div>
          <div className="plans-page__search-wrap">
            <CountrySearch placeholder={t(dict, "plansPage.searchOther")} />
          </div>
          <h1 className="plans-page__destination">
            <span className="plans-page__destination-flag" aria-hidden="true">
              {flag}
            </span>
            <span className="plans-page__destination-name">{title}</span>
          </h1>
          {regional && (
            <p className="plans-page__regional-sub">
              {t(dict, "plansPage.oneQr")} ·{" "}
              {t(dict, "plansPage.coversN", { n: regional.countries.length })} ·{" "}
              {t(dict, "plansPage.hotspotIncluded")}
            </p>
          )}
        </header>
      </CountryPlansHero>

      <div className="plans-page__inner">
        {loading && (
          <div className="plans-page__loading" aria-busy="true" aria-live="polite">
            <p className="plans-page__loading-text">
              {t(dict, "plansPage.loadingPlans")}
            </p>
            <SkeletonGrid />
          </div>
        )}

        {!loading && error && (
          <div className="plans-page__error" role="alert">
            <p className="plans-page__error-title">
              {t(dict, "plansPage.couldNotLoad")}
            </p>
            <p className="plans-page__error-detail">{error}</p>
            <p className="plans-page__error-hint">
              {t(dict, "plansPage.errorHint")}
            </p>
          </div>
        )}

        {!loading && !error && data?.plans.length === 0 && (
          <p className="plans-page__empty">
            {t(dict, "plansPage.noPlans")}{" "}
            <Link
              href={localizedPath("/destinations", locale)}
              className="plans-page__inline-link"
            >
              {dict.nav.destinations}
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
                    ? t(dict, "plansPage.regionalCoverage", {
                        n: regional.countries.length,
                      })
                    : formatCountryNetworkLabel(countryId)}
                </p>
                <p className="plans-trust__meta">
                  {t(dict, "plansPage.enjoyTravel")}
                  {cheapest
                    ? ` · ${t(dict, "plansPage.fromPrice", {
                        price: cheapest.price.toFixed(2),
                      })}`
                    : ""}
                </p>
              </div>
              <button
                type="button"
                className="plans-trust__compat"
                onClick={() => setCompatOpen(true)}
              >
                {t(dict, "plansPage.checkCompat")}
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
                {t(dict, "plansPage.singleCountryBefore")}{" "}
                <Link href={singleCountryPlansPath(regional)}>
                  {t(dict, "plansPage.singleCountryLink")}
                </Link>{" "}
                {t(dict, "plansPage.singleCountryAfter")}
              </p>
            )}

            {!regional && layoverRecommendation && (
              <p className="plans-regional-single-hint">
                {t(dict, "plansPage.layoverBefore", {
                  country: checkoutCountryName,
                })}{" "}
                <Link href={plansPathForRegion(layoverRecommendation.routeSlug)}>
                  {t(dict, "plansPage.layoverLink", {
                    region: localizeRegionalProduct(layoverRecommendation, locale)
                      .shortName,
                  })}
                </Link>{" "}
                {t(dict, "plansPage.layoverAfter")}
              </p>
            )}

            <div className="plans-reassurance">
              <span>{t(dict, "plansPage.readyBeforeFly")}</span>
              <span>{t(dict, "plansPage.gotYouCovered")}</span>
              <span>{t(dict, "plansPage.support247")}</span>
            </div>

            <h2 className="plans-picker__title">
              {t(dict, "plansPage.choosePackage")}
            </h2>
            <p className="plans-picker__hint">
              {t(dict, "plansPage.pickerHintBefore")}{" "}
              <strong>{t(dict, "plansPage.checkout")}</strong>{" "}
              {t(dict, "plansPage.pickerHintAfter")}
            </p>
            <label className="plans-topup-pref">
              <input
                type="checkbox"
                checked={wantsTopUp}
                onChange={(event) => setWantsTopUp(event.target.checked)}
              />
              <span>{t(dict, "plansPage.topUpPref")}</span>
            </label>
            <div className="plans-sections">
              {PLAN_SECTIONS.map((section) => (
                <PlanSection
                  key={section.id}
                  label={t(dict, section.labelKey)}
                  plans={data.planGroups[section.id] ?? []}
                  countryName={checkoutCountryName}
                  flag={flag}
                  isRegional={Boolean(regional)}
                  selectedPlanId={selectedPlanId}
                  onSelectPlan={setSelectedPlanId}
                  promo={promo}
                  refCode={refCode}
                  wantsTopUp={wantsTopUp}
                />
              ))}
            </div>

            {selectedPlan && (
              <div className="plans-desktop-cta">
                <div>
                  <p className="plans-desktop-cta__label">
                    {t(dict, "plansPage.yourSelection")}
                  </p>
                  <p className="plans-desktop-cta__plan">
                    {formatDataAmount(selectedPlan, dict)} ·{" "}
                    {formatDuration(selectedPlan.durationDays, dict)}
                  </p>
                </div>
                <div className="plans-desktop-cta__price">
                  <PsychologicalPrice
                  parts={selectedPlan.formattedPriceParts}
                  amountUsd={selectedPlan.price}
                  currency={selectedPlan.currency}
                  />
                </div>
                <a href={selectedCheckoutHref} className="plans-desktop-cta__button">
                  {t(dict, "plansPage.checkout")}
                </a>
              </div>
            )}

            <PlansFaq countryName={checkoutCountryName} regional={regional} />

            {!regional && (
              <PlansPopularStory
                countryId={countryId}
                countryName={checkoutCountryName}
              />
            )}
          </>
        )}
      </div>
    </main>
      {selectedPlan && (
        <div
          className="plans-sticky-cta"
          role="region"
          aria-label={t(dict, "plansPage.purchaseAria")}
        >
          <div className="plans-sticky-cta__meta">
            <span className="plans-sticky-cta__label">
              {t(dict, "plansPage.selectedPlan")}
            </span>
            <span className="plans-sticky-cta__plan">
              {formatDataAmount(selectedPlan, dict)} ·{" "}
              {formatDuration(selectedPlan.durationDays, dict)}
            </span>
            <PsychologicalPrice
                  parts={selectedPlan.formattedPriceParts}
                  amountUsd={selectedPlan.price}
                  currency={selectedPlan.currency}
            />
          </div>
          <a href={selectedCheckoutHref} className="plans-sticky-cta__button">
            {t(dict, "plansPage.continue")}
          </a>
        </div>
      )}
      <SiteFooter />
      <CompatibilityModal
        isOpen={compatOpen}
        onClose={() => setCompatOpen(false)}
      />
    </>
  );
}
