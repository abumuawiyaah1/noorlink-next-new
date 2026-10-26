"use client";

import { useEffect, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CountryPlansHero } from "@/components/plans/CountryPlansHero";
import { CompatibilityModal } from "@/components/modals/CompatibilityModal";
import { PsychologicalPrice } from "@/components/ui/PsychologicalPrice";
import { PhoneDeviceIcon } from "@/components/ui/PhoneDeviceIcon";
import { CountrySearch } from "@/components/search/CountrySearch";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";
import { PilgrimCarrierRow } from "@/components/pilgrimage/PilgrimCarrierRow";
import { PilgrimageInspiration } from "@/components/pilgrimage/PilgrimageInspiration";
import { TrustProofBanner } from "@/components/landing/TrustProofBanner";
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
  type PilgrimRouteKey,
  type PilgrimRoutePackKey,
  type PilgrimRoutePackVariants,
  ME_REGIONAL_API_ID,
  PILGRIM_ROUTE_META,
  getPilgrimRouteMeta,
  resolvePilgrimRoutePacks,
  resolvePilgrimRoutePlanForKey,
} from "@/lib/pilgrim-route-plans";
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
import { PILGRIM_GIFT_GUIDES } from "@/lib/pilgrim-gift-guides";
import { type Dictionary, getDictionary, t } from "@/lib/i18n/dictionaries";
import {
  localizedBrandLine,
  localizedCompareTable,
  localizedGbPerDay,
  localizedGccCountries,
  localizedGccUi,
  localizedRoutePlanName,
  splitGccPlaceholder,
  withLocalizedRouteMeta,
  withLocalizedTierMeta,
} from "@/lib/i18n/pilgrimage";
import { renderTemplate } from "@/lib/i18n/template";
import { useLocaleState } from "@/lib/i18n/use-locale";
import "@/styles/hajj-umrah.css";
import "@/styles/plans-dynamic.css";

const SAUDI_COUNTRY_ID = "saudi-arabia";
const HAJJ_WHATSAPP_MESSAGE =
  "Hi NoorLink — I have a question about Hajj & Umrah eSIM plans before I buy.";

type PilgrimSelectionPageProps = {
  countryImage: string;
  initialData?: PlansByCountryResponse | null;
  initialMeData?: PlansByCountryResponse | null;
  initialError?: string | null;
  initialPromo?: string;
  initialRef?: string;
};

type PurchaseFocus = "saudi" | "route";

/** Sentinels so localized fallbacks follow the locale after load. */
const ERROR_NO_PLANS = "__no_plans__";
const ERROR_LOAD_FAILED = "__load_failed__";

function buildCheckoutHref(
  plan: EsimPlan,
  price: number,
  promo?: string,
  ref?: string,
  opts?: {
    country?: string;
    flag?: string;
    planName?: string;
    isRegional?: boolean;
  },
): string {
  const params = new URLSearchParams({
    country: opts?.country ?? "Saudi Arabia",
    price: price.toFixed(2),
    flag: opts?.flag ?? "🇸🇦",
  });
  if (plan.countryId) params.set("country_id", plan.countryId);
  const planName = opts?.planName ?? plan.name;
  if (planName) params.set("plan", planName);
  if (plan.id) params.set("packageId", plan.id);
  if (opts?.isRegional) params.set("productType", "regional");
  return withAttribution(`/checkout?${params.toString()}`, { promo, ref });
}

function tierBadge(tier: PilgrimTierOffer): "popular" | "best" | null {
  if (tier.recommended) return "popular";
  if (tier.plan?.displayBadge === "best_choice") return "best";
  return null;
}

/** Hover / focus / tap on the `{gcc}` slot shows included GCC country names + flags. */
function GccBonusHover({ locale }: { locale: string }) {
  const ui = localizedGccUi(locale);
  const countries = localizedGccCountries(locale);
  return (
    <span className="pilgrim-gcc-hint">
      <button
        type="button"
        className="pilgrim-gcc-hint__trigger"
        aria-label={ui.aria}
        onClick={(event) => event.stopPropagation()}
      >
        {ui.plusLabel}
      </button>
      <span className="pilgrim-gcc-hint__panel" role="tooltip">
        <span className="pilgrim-gcc-hint__panel-title">{ui.panelTitle}</span>
        <ul className="pilgrim-gcc-hint__list">
          {countries.map((country) => (
            <li key={country.name}>
              <span aria-hidden="true">{country.flag}</span>
              <span>{country.name}</span>
            </li>
          ))}
        </ul>
      </span>
    </span>
  );
}

function RouteDescriptionWithGccHover({
  text,
  locale,
}: {
  text: string;
  locale: string;
}) {
  const parts = splitGccPlaceholder(text);
  if (!parts) return <>{text}</>;
  return (
    <>
      {parts[0]}
      <GccBonusHover locale={locale} />
      {parts[1]}
    </>
  );
}

function TierCard({
  dict,
  locale,
  tier,
  selected,
  connectedDataGb,
  umrahUnlimitedDays,
  onSelect,
  onConnectedDataGbChange,
  onUmrahUnlimitedDaysChange,
}: {
  dict: Dictionary;
  locale: string;
  tier: PilgrimTierOffer;
  selected: boolean;
  connectedDataGb: ConnectedPilgrimDataGb;
  umrahUnlimitedDays: UmrahUnlimitedDays;
  onSelect: () => void;
  onConnectedDataGbChange: (gb: ConnectedPilgrimDataGb) => void;
  onUmrahUnlimitedDaysChange: (days: UmrahUnlimitedDays) => void;
}) {
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
    locale,
  );

  const badge = tierBadge(tier);

  return (
    <article
      className={`pilgrim-card pilgrim-card--selectable${tier.recommended ? " is-recommended" : ""}${selected ? " is-selected" : ""}${badge === "best" ? " is-best-choice" : ""}`}
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
      aria-label={t(dict, "pilgrimagePage.selectAria", { title: tier.title })}
    >
      {badge && (
        <span
          className={`pilgrim-card__badge${badge === "best" ? " pilgrim-card__badge--best" : ""}`}
        >
          {badge === "best" ? dict.plansPage.bestChoice : dict.pilgrimagePage.mostPopular}
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
        <div className="pilgrim-data-picker" role="group" aria-label={dict.pilgrimagePage.dataAllowance}>
          <span className="pilgrim-data-picker__label">{dict.pilgrimagePage.dataAllowance}</span>
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
                    {t(dict, "pilgrimagePage.daysShort", { n: variant.durationDays ?? 30 })}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isUnlimited && (
        <div className="pilgrim-data-picker" role="group" aria-label={dict.pilgrimagePage.tripLength}>
          <span className="pilgrim-data-picker__label">{dict.pilgrimagePage.tripLength}</span>
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
                  <span className="pilgrim-data-picker__gb">
                    {t(dict, "pilgrimagePage.daysShort", { n: days })}
                  </span>
                  <span className="pilgrim-data-picker__meta">
                    {localizedGbPerDay(locale)}
                  </span>
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
        {selected ? dict.pilgrimagePage.selected : dict.pilgrimagePage.selectPlan}
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

function resolveInitialRoutePacks(
  initialMeData?: PlansByCountryResponse | null,
): PilgrimRoutePackVariants {
  return resolvePilgrimRoutePacks(initialMeData?.plans ?? []);
}

export function PilgrimSelectionPage({
  countryImage,
  initialData = null,
  initialMeData = null,
  initialError = null,
  initialPromo = "",
  initialRef = "",
}: PilgrimSelectionPageProps) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const pil = dict.pilgrimagePage;
  const [promo, setPromo] = useState(() => normalizePromoCode(initialPromo));
  const [refCode, setRefCode] = useState(() => normalizeRefCode(initialRef));
  const [tiers, setTiers] = useState<PilgrimTierOffer[]>(() =>
    resolveInitialTiers(initialData),
  );
  const [routePacks, setRoutePacks] = useState<PilgrimRoutePackVariants>(() =>
    resolveInitialRoutePacks(initialMeData),
  );
  const [loading, setLoading] = useState(!initialData && !initialError);
  const [error, setError] = useState<string | null>(initialError);
  const [purchaseFocus, setPurchaseFocus] = useState<PurchaseFocus | null>(null);
  const [selectedTier, setSelectedTier] = useState<PilgrimTierKey | null>(null);
  const [connectedDataGb, setConnectedDataGb] = useState<ConnectedPilgrimDataGb>(10);
  const [umrahUnlimitedDays, setUmrahUnlimitedDays] =
    useState<UmrahUnlimitedDays>(10);
  const [selectedRoute, setSelectedRoute] =
    useState<PilgrimRouteKey>("saudi-morocco");
  const [routePack, setRoutePack] = useState<PilgrimRoutePackKey>("premium");
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
    if (initialData?.plans?.length) {
      if (!initialMeData?.plans?.length) {
        let cancelled = false;
        void (async () => {
          try {
            const me = await fetchPlansByCountry(ME_REGIONAL_API_ID);
            if (!cancelled) setRoutePacks(resolvePilgrimRoutePacks(me.plans));
          } catch (err) {
            console.error("[PilgrimSelectionPage] ME regional load failed:", err);
            if (!cancelled) setRoutePacks(resolvePilgrimRoutePacks([]));
          }
        })();
        return () => {
          cancelled = true;
        };
      }
      return;
    }

    let cancelled = false;

    async function loadPilgrimPlans() {
      setLoading(true);
      setError(null);

      try {
        const [saudi, me] = await Promise.all([
          fetchPlansByCountry(SAUDI_COUNTRY_ID),
          fetchPlansByCountry(ME_REGIONAL_API_ID).catch((err) => {
            console.error("[PilgrimSelectionPage] ME regional load failed:", err);
            return null;
          }),
        ]);
        if (cancelled) return;

        const resolved = resolvePilgrimTiers(saudi.plans);
        setTiers(resolved);
        setRoutePacks(resolvePilgrimRoutePacks(me?.plans ?? []));

        if (resolved.length === 0) {
          setError(ERROR_NO_PLANS);
        }
      } catch (err: unknown) {
        console.error("[PilgrimSelectionPage] Load failed:", {
          countryId: SAUDI_COUNTRY_ID,
          error: err,
        });
        if (cancelled) return;

        setTiers([]);
        setRoutePacks(resolvePilgrimRoutePacks([]));
        setError(err instanceof Error ? err.message : ERROR_LOAD_FAILED);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadPilgrimPlans();

    return () => {
      cancelled = true;
    };
  }, [initialData, initialMeData]);

  const localizedTiers = useMemo(
    () => tiers.map((tier) => withLocalizedTierMeta(tier, locale)),
    [tiers, locale],
  );

  const localizedRoutes = useMemo(
    () => PILGRIM_ROUTE_META.map((route) => withLocalizedRouteMeta(route, locale)),
    [locale],
  );

  const compareTable = useMemo(() => localizedCompareTable(locale), [locale]);

  const activeTier = useMemo(() => {
    if (!selectedTier) return null;
    return localizedTiers.find((tier) => tier.key === selectedTier) ?? null;
  }, [localizedTiers, selectedTier]);

  const activeRouteMeta = useMemo(
    () => withLocalizedRouteMeta(getPilgrimRouteMeta(selectedRoute), locale),
    [selectedRoute, locale],
  );

  const routePlanNameParts = (plan: EsimPlan) => {
    const gb = plan.dataGb ?? (plan.id.includes("premium") ? 10 : 5);
    const days = plan.durationDays ?? (plan.id.includes("premium") ? 30 : 15);
    return { gb, days };
  };

  const activeRoutePlan = useMemo(
    () => resolvePilgrimRoutePlanForKey(routePacks, routePack, selectedRoute),
    [routePacks, routePack, selectedRoute],
  );

  const activePlan = useMemo(() => {
    if (!purchaseFocus) return null;
    if (purchaseFocus === "route") return activeRoutePlan;
    if (!activeTier) return null;
    if (activeTier.key === "connected") {
      return resolveConnectedPilgrimPlan(activeTier, connectedDataGb);
    }
    if (activeTier.key === "unlimited") {
      return resolveUmrahUnlimitedPlan(activeTier, umrahUnlimitedDays);
    }
    return activeTier.plan;
  }, [
    purchaseFocus,
    activeRoutePlan,
    activeTier,
    connectedDataGb,
    umrahUnlimitedDays,
  ]);

  let activePlanLabel = "";
  if (purchaseFocus && activePlan) {
    if (purchaseFocus === "route") {
      const { gb, days } = routePlanNameParts(activeRoutePlan);
      activePlanLabel = localizedRoutePlanName(
        activeRouteMeta.title,
        gb,
        days,
        locale,
      );
    } else if (activeTier) {
      if (activeTier.key === "connected") {
        activePlanLabel = `${activeTier.title} · ${connectedDataGb}GB`;
      } else if (activeTier.key === "unlimited") {
        activePlanLabel = `${activeTier.title} · ${t(dict, "pilgrimagePage.daysShort", { n: umrahUnlimitedDays })}`;
      } else {
        activePlanLabel = activeTier.title;
      }
    }
  }

  const checkoutHref = useMemo(() => {
    if (!activePlan) return "#";
    if (purchaseFocus === "route") {
      const { gb, days } = routePlanNameParts(activePlan);
      return buildCheckoutHref(activePlan, activePlan.price, promo, refCode, {
        country: activeRouteMeta.checkoutCountry,
        flag: activeRouteMeta.flag,
        planName: localizedRoutePlanName(
          activeRouteMeta.title,
          gb,
          days,
          locale,
        ),
        isRegional: true,
      });
    }
    return buildCheckoutHref(activePlan, activePlan.price, promo, refCode);
  }, [activePlan, purchaseFocus, activeRouteMeta, promo, refCode, locale]);

  const stickyParts = activePlan?.formattedPriceParts ?? { dollars: "0", cents: "0" };

  const cheapest = useMemo(() => {
    const prices = tiers.flatMap((tier) => {
      if (tier.key === "connected" && tier.connectedVariants) {
        return [tier.connectedVariants.gb10.price, tier.connectedVariants.gb20.price];
      }
      if (tier.key === "unlimited" && tier.unlimitedVariants) {
        const { d1, d3, d5, d7, d10, d14, d15, d30 } = tier.unlimitedVariants;
        return [
          ...(d1 ? [d1.price] : []),
          ...(d3 ? [d3.price] : []),
          ...(d5 ? [d5.price] : []),
          d7.price,
          d10.price,
          ...(d14 ? [d14.price] : []),
          ...(d15 ? [d15.price] : []),
          ...(d30 ? [d30.price] : []),
        ];
      }
      if (typeof tier.plan?.price === "number") return [tier.plan.price];
      return [];
    });
    prices.push(
      ...PILGRIM_ROUTE_META.flatMap((route) => [
        resolvePilgrimRoutePlanForKey(routePacks, "plus", route.key).price,
        resolvePilgrimRoutePlanForKey(routePacks, "premium", route.key).price,
      ]),
    );
    if (prices.length === 0) return null;
    return Math.min(...prices);
  }, [tiers, routePacks]);

  return (
    <>
      <SiteHeader />
      <main className="pilgrim-page plans-page">
        <CountryPlansHero src={countryImage} alt={pil.heroAlt}>
          <Breadcrumbs
            onDark
            items={[
              { href: "/", label: dict.common.home },
              { href: "/destinations", label: dict.nav.destinations },
              { label: dict.nav.hajjUmrah },
            ]}
          />
          <header className="plans-page__header">
            <div className="plans-page__brand">
              <span className="plans-page__eyebrow">{localizedBrandLine(locale)}</span>
              <p className="plans-page__tagline">{pil.tagline}</p>
            </div>
            <div className="plans-page__search-wrap">
              <CountrySearch placeholder={dict.plansPage.searchOther} />
            </div>
            <h1 className="plans-page__destination">
              <span className="plans-page__destination-flag" aria-hidden="true">
                🇸🇦
              </span>
              <span className="plans-page__destination-name">
                {pil.headline}
              </span>
            </h1>
            <p className="plans-page__regional-sub">
              {pil.regionalSub}
            </p>
          </header>
        </CountryPlansHero>

        <div className="pilgrim-page__inner plans-page__inner">
          {!loading && !error && tiers.length > 0 && (
            <>
              <div className="plans-trust">
                <div className="plans-trust__copy">
                  <p className="plans-trust__network">
                    {pil.trustNetwork}
                  </p>
                  <p className="plans-trust__meta">
                    {dict.common.installBeforeFly}
                    {cheapest != null
                      ? ` · ${t(dict, "destinationsPage.fromPrice", { price: `$${cheapest.toFixed(2)}` })}`
                      : ""}
                  </p>
                </div>
                <button
                  type="button"
                  className="plans-trust__compat"
                  onClick={() => setCompatibilityOpen(true)}
                >
                  <PhoneDeviceIcon className="plans-trust__compat-phone" />
                  {dict.home.ctaPhoneCheck}
                </button>
              </div>

              <TrustProofBanner className="trust-proof-banner--pilgrim" />

              <div className="plans-reassurance">
                <span>{pil.reassurance1}</span>
                <span>{pil.reassurance2}</span>
                <span>{pil.reassurance3}</span>
              </div>

              <PilgrimCarrierRow />

              <PilgrimageInspiration />

              <h2 className="plans-picker__title">{pil.pickerTitle}</h2>
              <p className="plans-picker__hint">{pil.pickerHint}</p>
            </>
          )}

          {loading && (
            <div className="pilgrim-page__loading" aria-busy="true" aria-live="polite">
              <p className="pilgrim-page__loading-text">{pil.loadingPlans}</p>
              <div className="pilgrim-grid pilgrim-grid--skeleton" aria-hidden="true">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="pilgrim-card pilgrim-card--skeleton" />
                ))}
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="pilgrim-page__error" role="alert">
              <p className="pilgrim-page__error-title">{pil.errorTitle}</p>
              <p className="pilgrim-page__error-detail">
                {error === ERROR_NO_PLANS
                  ? pil.noPlans
                  : error === ERROR_LOAD_FAILED
                    ? dict.plansPage.loadError
                    : error}
              </p>
              <p className="pilgrim-page__error-hint">
                {renderTemplate(pil.errorHint, {
                  whatsapp: (
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>
                      {dict.ordersUi.messageWhatsApp}
                    </a>
                  ),
                })}
              </p>
            </div>
          )}

          {!loading && !error && localizedTiers.length > 0 && (
            <section className="pilgrim-grid" aria-label={pil.gridAria}>
              {localizedTiers.map((tier) => (
                <TierCard
                  key={tier.key}
                  dict={dict}
                  locale={locale}
                  tier={tier}
                  selected={purchaseFocus === "saudi" && selectedTier === tier.key}
                  connectedDataGb={connectedDataGb}
                  umrahUnlimitedDays={umrahUnlimitedDays}
                  onSelect={() => {
                    setPurchaseFocus("saudi");
                    setSelectedTier(tier.key);
                  }}
                  onConnectedDataGbChange={(gb) => {
                    setConnectedDataGb(gb);
                    setPurchaseFocus("saudi");
                    setSelectedTier("connected");
                  }}
                  onUmrahUnlimitedDaysChange={(days) => {
                    setUmrahUnlimitedDays(days);
                    setPurchaseFocus("saudi");
                    setSelectedTier("unlimited");
                  }}
                />
              ))}
            </section>
          )}

          {!loading && !error && localizedTiers.length > 0 && (
            <section
              className="pilgrim-routes"
              aria-labelledby="pilgrim-routes-title"
            >
              <h2 id="pilgrim-routes-title" className="pilgrim-routes__title">
                {pil.routesTitle}
              </h2>
              <p className="pilgrim-routes__hint">{pil.routesHint}</p>
              <div className="pilgrim-routes__grid">
                {localizedRoutes.map((route) => {
                  const selected =
                    purchaseFocus === "route" && selectedRoute === route.key;
                  return (
                    <article
                      key={route.key}
                      className={`pilgrim-card pilgrim-card--selectable pilgrim-card--route${selected ? " is-selected" : ""}${routePack === "premium" && selected ? " is-recommended" : ""}`}
                      onClick={() => {
                        setPurchaseFocus("route");
                        setSelectedRoute(route.key);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setPurchaseFocus("route");
                          setSelectedRoute(route.key);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selected}
                      aria-label={t(dict, "pilgrimagePage.selectAria", { title: route.title })}
                    >
                      {selected && routePack === "premium" && (
                        <span className="pilgrim-card__badge">{pil.bestMultiDay}</span>
                      )}
                      <p className="pilgrim-card__tier">{route.subtitle}</p>
                      <h3 className="pilgrim-card__title">
                        <span aria-hidden="true">{route.flag} </span>
                        {route.title}
                      </h3>
                      <div className="pilgrim-card__details">
                        <p className="pilgrim-card__desc">
                          <RouteDescriptionWithGccHover
                            text={route.description}
                            locale={locale}
                          />
                        </p>
                        <ul className="pilgrim-card__highlights">
                          {route.highlights.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div
                        className="pilgrim-data-picker"
                        role="group"
                        aria-label={`${route.title} — ${pil.dataAllowance}`}
                      >
                        <span className="pilgrim-data-picker__label">{pil.dataAllowance}</span>
                        <div className="pilgrim-data-picker__options">
                          {([
                            ["plus", routePacks.plus] as const,
                            ["premium", routePacks.premium] as const,
                          ]).map(([key, variant]) => {
                            const active =
                              selected && routePack === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                className={`pilgrim-data-picker__option${active ? " is-active" : ""}`}
                                aria-pressed={active}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setPurchaseFocus("route");
                                  setSelectedRoute(route.key);
                                  setRoutePack(key);
                                }}
                              >
                                <span className="pilgrim-data-picker__gb">
                                  {variant.dataGb ?? (key === "plus" ? 5 : 10)} GB
                                </span>
                                <span className="pilgrim-data-picker__meta">
                                  {t(dict, "pilgrimagePage.daysShort", {
                                    n: variant.durationDays ?? (key === "plus" ? 15 : 30),
                                  })}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="pilgrim-price-wrap">
                        <PsychologicalPrice
                          parts={
                            resolvePilgrimRoutePlanForKey(
                              routePacks,
                              selected && routePack ? routePack : "premium",
                              route.key,
                            ).formattedPriceParts
                          }
                          currency={routePacks.premium.currency}
                        />
                      </div>
                      <button
                        type="button"
                        className="pilgrim-card__cta"
                        onClick={(event) => {
                          event.stopPropagation();
                          setPurchaseFocus("route");
                          setSelectedRoute(route.key);
                        }}
                      >
                        {selected ? dict.pilgrimagePage.selected : dict.pilgrimagePage.selectPlan}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {!loading && !error && tiers.length > 0 && (
            <div className="pilgrim-support-cta">
              <p className="pilgrim-support-cta__text">
                {pil.supportCtaText}
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(HAJJ_WHATSAPP_MESSAGE)}`}
                className="pilgrim-support-cta__button"
                target="_blank"
                rel="noopener noreferrer"
              >
                {pil.askWhatsApp}
              </a>
            </div>
          )}

          {activePlan && (
            <p className="pilgrim-install-note">
              {pil.installNote}
            </p>
          )}

          {activePlan && (
            <div className="pilgrim-desktop-cta">
              <div>
                <p className="pilgrim-desktop-cta__label">{pil.yourSelection}</p>
                <p className="pilgrim-desktop-cta__plan">{activePlanLabel}</p>
              </div>
              <div className="pilgrim-desktop-cta__price">
                <PsychologicalPrice
                  parts={stickyParts}
                  currency={activePlan.currency}
                />
              </div>
              <a
                href={checkoutHref}
                className="pilgrim-desktop-cta__button"
              >
                {pil.continueCheckout}
              </a>
            </div>
          )}

          <section
            className="pilgrim-gift-downloads"
            aria-labelledby="pilgrim-gift-downloads-title"
          >
            <h2 id="pilgrim-gift-downloads-title" className="pilgrim-gift-downloads__title">
              {pil.giftTitle}
            </h2>
            <p className="pilgrim-gift-downloads__text">{pil.giftText}</p>
            <ul className="pilgrim-gift-downloads__list">
              {PILGRIM_GIFT_GUIDES.map((guide) => {
                const copy =
                  dict.successPage.guides[
                    guide.id as keyof typeof dict.successPage.guides
                  ];
                return (
                  <li key={guide.id}>
                    <a
                      className="pilgrim-gift-downloads__link"
                      href={guide.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="pilgrim-gift-downloads__link-title">
                        {copy?.title ?? guide.title}
                      </span>
                      <span className="pilgrim-gift-downloads__link-blurb">
                        {copy?.blurb ?? guide.blurb}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="pilgrim-compare" aria-labelledby="pilgrim-compare-title">
            <h2 id="pilgrim-compare-title" className="pilgrim-compare__title">
              {compareTable.title}
            </h2>
            <p className="pilgrim-compare__subtitle">{compareTable.subtitle}</p>
            <div className="pilgrim-compare__table-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">{compareTable.headers.benefit}</th>
                    <th scope="col">{compareTable.headers.basic}</th>
                    <th scope="col">{compareTable.headers.connected}</th>
                    <th scope="col">{compareTable.headers.unlimited}</th>
                    <th scope="col">{compareTable.headers.routes}</th>
                  </tr>
                </thead>
                <tbody>
                  {compareTable.rows.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      {row.cells.map((cell, index) => (
                        <td key={index}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {activePlan && (
          <div className="pilgrim-sticky-cta" role="region" aria-label={pil.purchaseAria}>
            <div className="pilgrim-sticky-cta__meta">
              <span className="pilgrim-sticky-cta__label">{pil.selectedPlan}</span>
              <span className="pilgrim-sticky-cta__plan">{activePlanLabel}</span>
              <PsychologicalPrice
                parts={stickyParts}
                currency={activePlan.currency}
              />
            </div>
            <a
              href={checkoutHref}
              className="pilgrim-sticky-cta__button"
            >
              {dict.common.continue}
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
