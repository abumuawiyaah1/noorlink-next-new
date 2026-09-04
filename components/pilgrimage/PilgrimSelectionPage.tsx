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
  PILGRIM_ROUTE_GCC_BONUS,
  PILGRIM_ROUTE_META,
  brandedRoutePlanName,
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
import { PILGRIMAGE_BRAND_LINE } from "@/lib/brand";
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

function tierBadge(tier: PilgrimTierOffer): string | null {
  if (tier.recommended) return "Most Popular";
  if (tier.plan?.displayBadge === "best_choice") return "Best Choice";
  return null;
}

/** Hover / focus / tap on “plus GCC” shows included GCC country names + flags. */
function GccBonusHover() {
  return (
    <span className="pilgrim-gcc-hint">
      <button
        type="button"
        className="pilgrim-gcc-hint__trigger"
        aria-label="GCC countries included"
        onClick={(event) => event.stopPropagation()}
      >
        plus GCC
      </button>
      <span className="pilgrim-gcc-hint__panel" role="tooltip">
        <span className="pilgrim-gcc-hint__panel-title">Included GCC Coverage</span>
        <ul className="pilgrim-gcc-hint__list">
          {PILGRIM_ROUTE_GCC_BONUS.map((country) => (
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

function RouteDescriptionWithGccHover({ text }: { text: string }) {
  const marker = "plus GCC";
  const idx = text.indexOf(marker);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <GccBonusHover />
      {text.slice(idx + marker.length)}
    </>
  );
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
        <span className="pilgrim-card__badge">Coming Soon</span>
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
            Coming Soon — WhatsApp us for early access.
          </p>
        </div>
        <button type="button" className="pilgrim-card__cta" disabled>
          Coming Soon
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
        <div className="pilgrim-data-picker" role="group" aria-label="Data Allowance">
          <span className="pilgrim-data-picker__label">Data Allowance</span>
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
        <div className="pilgrim-data-picker" role="group" aria-label="Trip Length">
          <span className="pilgrim-data-picker__label">Trip Length</span>
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
        {selected ? "Selected" : "Select Plan"}
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
  const [purchaseFocus, setPurchaseFocus] = useState<PurchaseFocus>("saudi");
  const [selectedTier, setSelectedTier] = useState<PilgrimTierKey>("connected");
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
          setError("No pilgrimage plans are available for Saudi Arabia yet.");
        }
      } catch (err: unknown) {
        console.error("[PilgrimSelectionPage] Load failed:", {
          countryId: SAUDI_COUNTRY_ID,
          error: err,
        });
        if (cancelled) return;

        setTiers([]);
        setRoutePacks(resolvePilgrimRoutePacks([]));
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
  }, [initialData, initialMeData]);

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

  const activeRouteMeta = useMemo(
    () => getPilgrimRouteMeta(selectedRoute),
    [selectedRoute],
  );

  const activeRoutePlan = useMemo(
    () => resolvePilgrimRoutePlanForKey(routePacks, routePack, selectedRoute),
    [routePacks, routePack, selectedRoute],
  );

  const activePlan = useMemo(() => {
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

  const activePlanLabel = useMemo(() => {
    if (purchaseFocus === "route") {
      return brandedRoutePlanName(activeRouteMeta, activeRoutePlan);
    }
    if (!activeTier) return "";
    if (activeTier.key === "connected") {
      return `${activeTier.title} · ${connectedDataGb}GB`;
    }
    if (activeTier.key === "unlimited") {
      return `${activeTier.title} · ${umrahUnlimitedDays} days`;
    }
    return activeTier.title;
  }, [
    purchaseFocus,
    activeRouteMeta,
    activeRoutePlan,
    activeTier,
    connectedDataGb,
    umrahUnlimitedDays,
  ]);

  const checkoutHref = useMemo(() => {
    if (!activePlan) return "#";
    if (purchaseFocus === "route") {
      return buildCheckoutHref(activePlan, activePlan.price, promo, refCode, {
        country: activeRouteMeta.checkoutCountry,
        flag: activeRouteMeta.flag,
        planName: brandedRoutePlanName(activeRouteMeta, activePlan),
        isRegional: true,
      });
    }
    return buildCheckoutHref(activePlan, activePlan.price, promo, refCode);
  }, [activePlan, purchaseFocus, activeRouteMeta, promo, refCode]);

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
                Stay Connected in al-Haramayn
              </span>
            </h1>
            <p className="plans-page__regional-sub">
              Makkah &amp; Madinah eSIM · Hotspot Included · 24/7 WhatsApp Support
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
                    Install Before You Fly
                    {cheapest != null ? ` · From $${cheapest.toFixed(2)}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  className="plans-trust__compat"
                  onClick={() => setCompatibilityOpen(true)}
                >
                  <PhoneDeviceIcon className="plans-trust__compat-phone" />
                  Check Compatibility
                </button>
              </div>

              <TrustProofBanner className="trust-proof-banner--pilgrim" />

              <div className="plans-reassurance">
                <span>Ready Before You Fly</span>
                <span>We&apos;ve Got You Covered</span>
                <span>24/7 WhatsApp Support</span>
              </div>

              <PilgrimCarrierRow />

              <PilgrimageInspiration />

              <h2 className="plans-picker__title">Choose Your Pilgrimage Plan</h2>
              <p className="plans-picker__hint">
                Fixed Saudi packs or honest day-pass unlimited (3GB/day, then 1 Mbps).
                The price you see is the price you pay — not surprises, not hidden
                fees. Hotspot is included on every plan below.
              </p>
            </>
          )}

          {loading && (
            <div className="pilgrim-page__loading" aria-busy="true" aria-live="polite">
              <p className="pilgrim-page__loading-text">Loading Plans…</p>
              <div className="pilgrim-grid pilgrim-grid--skeleton" aria-hidden="true">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="pilgrim-card pilgrim-card--skeleton" />
                ))}
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="pilgrim-page__error" role="alert">
              <p className="pilgrim-page__error-title">Could Not Load Plans</p>
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
                  selected={purchaseFocus === "saudi" && selectedTier === tier.key}
                  connectedDataGb={connectedDataGb}
                  umrahUnlimitedDays={umrahUnlimitedDays}
                  onSelect={() => {
                    if (tier.comingSoon) return;
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

          {!loading && !error && tiers.length > 0 && (
            <section
              className="pilgrim-routes"
              aria-labelledby="pilgrim-routes-title"
            >
              <h2 id="pilgrim-routes-title" className="pilgrim-routes__title">
                Also Stopping in Turkey, Egypt, or Morocco?
              </h2>
              <p className="pilgrim-routes__hint">
                One eSIM for your travel stop and your Hajj or Umrah — GCC coverage
                included as a bonus. Pick the route that matches your trip.
              </p>
              <div className="pilgrim-routes__grid">
                {PILGRIM_ROUTE_META.map((route) => {
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
                      aria-label={`Select ${route.title}`}
                    >
                      {selected && routePack === "premium" && (
                        <span className="pilgrim-card__badge">Best for Multi-Day</span>
                      )}
                      <p className="pilgrim-card__tier">{route.subtitle}</p>
                      <h3 className="pilgrim-card__title">
                        <span aria-hidden="true">{route.flag} </span>
                        {route.title}
                      </h3>
                      <div className="pilgrim-card__details">
                        <p className="pilgrim-card__desc">
                          <RouteDescriptionWithGccHover text={route.description} />
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
                        aria-label={`${route.title} data allowance`}
                      >
                        <span className="pilgrim-data-picker__label">Data Allowance</span>
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
                                  {variant.durationDays ?? (key === "plus" ? 15 : 30)}{" "}
                                  days
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
                        {selected ? "Selected" : "Select Plan"}
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
              Install on Wi‑Fi before you fly. Your data package starts when the eSIM
              connects in a covered country — not at checkout.
            </p>
          )}

          {activePlan && (
            <div className="pilgrim-desktop-cta">
              <div>
                <p className="pilgrim-desktop-cta__label">Your Selection</p>
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
                Continue to Checkout
              </a>
            </div>
          )}

          <section
            className="pilgrim-gift-downloads"
            aria-labelledby="pilgrim-gift-downloads-title"
          >
            <h2 id="pilgrim-gift-downloads-title" className="pilgrim-gift-downloads__title">
              Download Before You Fly
            </h2>
            <p className="pilgrim-gift-downloads__text">
              Free al-Haramayn guides for your phone — also included with your
              pilgrimage eSIM purchase. Not required to use your plan.
            </p>
            <ul className="pilgrim-gift-downloads__list">
              {PILGRIM_GIFT_GUIDES.map((guide) => (
                <li key={guide.id}>
                  <a
                    className="pilgrim-gift-downloads__link"
                    href={guide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="pilgrim-gift-downloads__link-title">
                      {guide.title}
                    </span>
                    <span className="pilgrim-gift-downloads__link-blurb">
                      {guide.blurb}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="pilgrim-compare" aria-labelledby="pilgrim-compare-title">
            <h2 id="pilgrim-compare-title" className="pilgrim-compare__title">
              Benefits Comparison
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
                    <th scope="col">Saudi + Turkey / Egypt / Morocco</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Coverage</td>
                    <td>Makkah &amp; Madinah</td>
                    <td>Makkah &amp; Madinah</td>
                    <td>Makkah &amp; Madinah</td>
                    <td>Saudi + Turkey, Egypt, or Morocco</td>
                  </tr>
                  <tr>
                    <td>Data Allowance</td>
                    <td>5GB · 30 days</td>
                    <td>10GB or 20GB</td>
                    <td>3GB/day · then 1 Mbps</td>
                    <td>5GB / 15d or 10GB / 30d</td>
                  </tr>
                  <tr>
                    <td>Trip Length</td>
                    <td>30 days</td>
                    <td>30 days</td>
                    <td>7 or 10 days</td>
                    <td>15 or 30 days</td>
                  </tr>
                  <tr>
                    <td>Hotspot Sharing</td>
                    <td>Included</td>
                    <td>Included</td>
                    <td>Included</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>WhatsApp Support</td>
                    <td>24/7</td>
                    <td>24/7</td>
                    <td>24/7</td>
                    <td>24/7</td>
                  </tr>
                  <tr>
                    <td>Video Calls &amp; Live Updates</td>
                    <td>Light use</td>
                    <td>Regular use</td>
                    <td>Heavy daily use</td>
                    <td>Multi-country trip use</td>
                  </tr>
                  <tr>
                    <td>Best For</td>
                    <td>Short stays</td>
                    <td>Most first-time pilgrims</td>
                    <td>Travelers who prefer day-pass unlimited</td>
                    <td>Days in Turkey/Egypt/Morocco + Saudi</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {activePlan && (
          <div className="pilgrim-sticky-cta" role="region" aria-label="Purchase">
            <div className="pilgrim-sticky-cta__meta">
              <span className="pilgrim-sticky-cta__label">Selected Plan</span>
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
