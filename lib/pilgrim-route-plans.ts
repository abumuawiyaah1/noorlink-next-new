import type { EsimPlan, FormattedPriceParts } from "@/lib/plans-api";
import { REGIONAL_PRODUCTS } from "@/lib/regional-products";

/** Traveler-facing multi-stop brands; same ME regional wholesale SKUs under the hood. */
export type PilgrimRouteKey = "saudi-morocco" | "saudi-turkey" | "saudi-egypt";

export type PilgrimRoutePackKey = "plus" | "premium";

export type PilgrimRouteMeta = {
  key: PilgrimRouteKey;
  title: string;
  subtitle: string;
  flag: string;
  description: string;
  highlights: string[];
  /** Checkout / receipt country label (branded). */
  checkoutCountry: string;
};

export const ME_REGIONAL_API_ID = REGIONAL_PRODUCTS["middle-east"].apiCountryId;

/**
 * Path-package retail (high → low): Morocco, Turkey, Egypt.
 * Same wholesale ME SKUs; small gaps so each route feels like its own package.
 */
export const PILGRIM_ROUTE_RETAIL: Record<
  PilgrimRouteKey,
  Record<PilgrimRoutePackKey, number>
> = {
  "saudi-morocco": { plus: 20.99, premium: 33.99 },
  "saudi-turkey": { plus: 19.99, premium: 32.99 },
  "saudi-egypt": { plus: 18.99, premium: 31.99 },
};

export const PILGRIM_ROUTE_META: PilgrimRouteMeta[] = [
  {
    key: "saudi-morocco",
    title: "Saudi + Morocco",
    subtitle: "Multi-stop",
    flag: "🇸🇦🇲🇦",
    description:
      "One eSIM for your travel in Morocco and your Hajj or Umrah — plus GCC coverage included at no extra charge.",
    highlights: [
      "Saudi Arabia + Morocco on one install",
      "GCC bonus coverage included",
      "Choose 5GB / 15 days or 10GB / 30 days",
    ],
    checkoutCountry: "Saudi + Morocco",
  },
  {
    key: "saudi-turkey",
    title: "Saudi + Turkey",
    subtitle: "Multi-stop",
    flag: "🇸🇦🇹🇷",
    description:
      "One eSIM for your travel in Turkey and your Hajj or Umrah — plus GCC coverage included at no extra charge.",
    highlights: [
      "Saudi Arabia + Turkey on one install",
      "GCC bonus coverage included",
      "Choose 5GB / 15 days or 10GB / 30 days",
    ],
    checkoutCountry: "Saudi + Turkey",
  },
  {
    key: "saudi-egypt",
    title: "Saudi + Egypt",
    subtitle: "Multi-stop",
    flag: "🇸🇦🇪🇬",
    description:
      "One eSIM for your travel in Egypt and your Hajj or Umrah — plus GCC coverage included at no extra charge.",
    highlights: [
      "Saudi Arabia + Egypt on one install",
      "GCC bonus coverage included",
      "Choose 5GB / 15 days or 10GB / 30 days",
    ],
    checkoutCountry: "Saudi + Egypt",
  },
];

/** GCC destinations included as bonus on multi-stop pilgrimage routes (Saudi is the pilgrimage stop). */
export const PILGRIM_ROUTE_GCC_BONUS: { name: string; flag: string }[] = [
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "Kuwait", flag: "🇰🇼" },
  { name: "Bahrain", flag: "🇧🇭" },
  { name: "Oman", flag: "🇴🇲" },
];

function fallbackParts(price: number): FormattedPriceParts {
  const dollars = Math.floor(price);
  const cents = Math.round((price - dollars) * 100);
  return { dollars: String(dollars), cents: String(cents) };
}

const ROUTE_FALLBACK_PLANS: Record<PilgrimRoutePackKey, EsimPlan> = {
  plus: {
    id: "regional-middle-east-plus",
    countryId: ME_REGIONAL_API_ID,
    name: "Middle East Regional 5GB · 15 Days",
    dataGb: 5,
    durationDays: 15,
    price: 19.99,
    formattedPriceParts: fallbackParts(19.99),
    currency: "USD",
    isRechargeable: false,
    isPayAsYouGo: false,
    pricingStrategy: "MANUAL",
    marginStatus: "manual",
    planCategory: "fixed",
    displayBadge: null,
  },
  premium: {
    id: "regional-middle-east-premium",
    countryId: ME_REGIONAL_API_ID,
    name: "Middle East Regional 10GB · 30 Days",
    dataGb: 10,
    durationDays: 30,
    price: 32.99,
    formattedPriceParts: fallbackParts(32.99),
    currency: "USD",
    isRechargeable: false,
    isPayAsYouGo: false,
    pricingStrategy: "MANUAL",
    marginStatus: "manual",
    planCategory: "fixed",
    displayBadge: "best_choice",
  },
};

export type PilgrimRoutePackVariants = {
  plus: EsimPlan;
  premium: EsimPlan;
};

function pickMePack(plans: EsimPlan[], pack: PilgrimRoutePackKey): EsimPlan | null {
  const wantGb = pack === "plus" ? 5 : 10;
  const wantDays = pack === "plus" ? 15 : 30;
  const byId = plans.find(
    (p) => p.id === `regional-middle-east-${pack}` || p.id.endsWith(`-${pack}`),
  );
  if (byId) return byId;
  return (
    plans.find(
      (p) =>
        !p.comingSoon &&
        p.dataGb === wantGb &&
        (p.durationDays === wantDays || wantDays === undefined),
    ) ??
    plans.find((p) => !p.comingSoon && p.dataGb === wantGb) ??
    null
  );
}

export function resolvePilgrimRoutePacks(plans: EsimPlan[]): PilgrimRoutePackVariants {
  return {
    plus: pickMePack(plans, "plus") ?? ROUTE_FALLBACK_PLANS.plus,
    premium: pickMePack(plans, "premium") ?? ROUTE_FALLBACK_PLANS.premium,
  };
}

export function resolvePilgrimRoutePlan(
  packs: PilgrimRoutePackVariants,
  pack: PilgrimRoutePackKey,
): EsimPlan {
  return pack === "plus" ? packs.plus : packs.premium;
}

/** Apply path-package retail so Morocco / Turkey / Egypt show distinct prices. */
export function withPilgrimRouteRetail(
  plan: EsimPlan,
  route: PilgrimRouteKey,
  pack: PilgrimRoutePackKey,
): EsimPlan {
  const price = PILGRIM_ROUTE_RETAIL[route][pack];
  if (plan.price === price) return plan;
  return {
    ...plan,
    price,
    formattedPriceParts: fallbackParts(price),
  };
}

export function resolvePilgrimRoutePlanForKey(
  packs: PilgrimRoutePackVariants,
  pack: PilgrimRoutePackKey,
  route: PilgrimRouteKey,
): EsimPlan {
  return withPilgrimRouteRetail(resolvePilgrimRoutePlan(packs, pack), route, pack);
}

export function brandedRoutePlanName(
  route: PilgrimRouteMeta,
  plan: EsimPlan,
): string {
  const gb = plan.dataGb ?? (plan.id.includes("premium") ? 10 : 5);
  const days = plan.durationDays ?? (plan.id.includes("premium") ? 30 : 15);
  return `${route.title} ${gb}GB · ${days} Days`;
}

export function getPilgrimRouteMeta(key: PilgrimRouteKey): PilgrimRouteMeta {
  return (
    PILGRIM_ROUTE_META.find((route) => route.key === key) ?? PILGRIM_ROUTE_META[0]!
  );
}
