/**
 * Regional plan templates — same source of truth as
 * noorlink-automation/app/api/regional_inventory.py
 *
 * Used when Supabase /api/v1/plans is unavailable (503) or empty,
 * so travelers always see sellable plans.
 */
import type {
  EsimPlan,
  PlanCategoryGroups,
  PlansByCountryResponse,
} from "@/lib/plans-api";
import { normalizeCountrySlug } from "@/lib/country-slugs";

type TemplatePlan = {
  name: string;
  data?: string;
  sharedData?: string;
  days: number;
  price: number;
  popular?: boolean;
  lines?: number;
};

type RegionalTemplate = {
  name: string;
  currency: string;
  plans: Record<string, TemplatePlan>;
};

const REGIONAL_TEMPLATES: Record<string, RegionalTemplate> = {
  europe: {
    name: "Europe",
    currency: "USD",
    plans: {
      basic: { name: "Basic", data: "5GB", days: 7, price: 19.99 },
      standard: {
        name: "Standard",
        data: "10GB",
        days: 15,
        price: 34.99,
        popular: true,
      },
      premium: { name: "Premium", data: "UNLIMITED*", days: 30, price: 69.99 },
      family: {
        name: "Family Bundle",
        lines: 4,
        sharedData: "50GB",
        days: 30,
        price: 89.99,
      },
    },
  },
  "asia-pacific": {
    name: "Asia Pacific",
    currency: "USD",
    plans: {
      basic: { name: "Basic", data: "3GB", days: 7, price: 14.99 },
      standard: {
        name: "Standard",
        data: "7GB",
        days: 15,
        price: 24.99,
        popular: true,
      },
      premium: { name: "Premium", data: "UNLIMITED*", days: 30, price: 49.99 },
      family: {
        name: "Family Bundle",
        lines: 4,
        sharedData: "35GB",
        days: 30,
        price: 79.99,
      },
    },
  },
  "middle-east": {
    name: "Middle East",
    currency: "USD",
    plans: {
      basic: { name: "Basic", data: "5GB", days: 7, price: 17.99 },
      standard: {
        name: "Standard",
        data: "10GB",
        days: 15,
        price: 29.99,
        popular: true,
      },
      premium: { name: "Premium", data: "UNLIMITED*", days: 30, price: 59.99 },
      family: {
        name: "Family Bundle",
        lines: 4,
        sharedData: "60GB",
        days: 30,
        price: 94.99,
      },
    },
  },
  africa: {
    name: "Africa",
    currency: "USD",
    plans: {
      basic: { name: "Basic", data: "3GB", days: 7, price: 12.99 },
      standard: {
        name: "Standard",
        data: "5GB",
        days: 15,
        price: 22.99,
        popular: true,
      },
      premium: { name: "Premium", data: "UNLIMITED*", days: 30, price: 44.99 },
      family: {
        name: "Family Bundle",
        lines: 4,
        sharedData: "30GB",
        days: 30,
        price: 69.99,
      },
    },
  },
  "north-america": {
    name: "North America",
    currency: "USD",
    plans: {
      basic: { name: "Basic", data: "3GB", days: 7, price: 16.99 },
      standard: {
        name: "Standard",
        data: "10GB",
        days: 15,
        price: 29.99,
        popular: true,
      },
      premium: { name: "Premium", data: "UNLIMITED*", days: 30, price: 64.99 },
      family: {
        name: "Family Bundle",
        lines: 4,
        sharedData: "80GB",
        days: 30,
        price: 109.99,
      },
    },
  },
  "south-america": {
    name: "South America",
    currency: "USD",
    plans: {
      basic: { name: "Basic", data: "3GB", days: 7, price: 13.99 },
      standard: {
        name: "Standard",
        data: "7GB",
        days: 15,
        price: 23.99,
        popular: true,
      },
      premium: { name: "Premium", data: "UNLIMITED*", days: 30, price: 44.99 },
      family: {
        name: "Family Bundle",
        lines: 4,
        sharedData: "40GB",
        days: 30,
        price: 74.99,
      },
    },
  },
};

/** country slug → [display name, template key] */
const COUNTRY_HINTS: Record<string, [string, string]> = {
  usa: ["United States", "north-america"],
  "united-states": ["United States", "north-america"],
  us: ["United States", "north-america"],
  canada: ["Canada", "north-america"],
  mexico: ["Mexico", "north-america"],
  panama: ["Panama", "north-america"],
  "costa-rica": ["Costa Rica", "north-america"],
  bahamas: ["Bahamas", "north-america"],
  uk: ["United Kingdom", "europe"],
  "united-kingdom": ["United Kingdom", "europe"],
  france: ["France", "europe"],
  germany: ["Germany", "europe"],
  italy: ["Italy", "europe"],
  spain: ["Spain", "europe"],
  netherlands: ["Netherlands", "europe"],
  switzerland: ["Switzerland", "europe"],
  portugal: ["Portugal", "europe"],
  austria: ["Austria", "europe"],
  belgium: ["Belgium", "europe"],
  ireland: ["Ireland", "europe"],
  sweden: ["Sweden", "europe"],
  norway: ["Norway", "europe"],
  denmark: ["Denmark", "europe"],
  finland: ["Finland", "europe"],
  iceland: ["Iceland", "europe"],
  malta: ["Malta", "europe"],
  europe: ["Europe", "europe"],
  japan: ["Japan", "asia-pacific"],
  china: ["China", "asia-pacific"],
  india: ["India", "asia-pacific"],
  australia: ["Australia", "asia-pacific"],
  singapore: ["Singapore", "asia-pacific"],
  thailand: ["Thailand", "asia-pacific"],
  "south-korea": ["South Korea", "asia-pacific"],
  korea: ["South Korea", "asia-pacific"],
  indonesia: ["Indonesia", "asia-pacific"],
  malaysia: ["Malaysia", "asia-pacific"],
  philippines: ["Philippines", "asia-pacific"],
  vietnam: ["Vietnam", "asia-pacific"],
  fiji: ["Fiji", "asia-pacific"],
  maldives: ["Maldives", "asia-pacific"],
  "saudi-arabia": ["Saudi Arabia", "middle-east"],
  uae: ["United Arab Emirates", "middle-east"],
  "united-arab-emirates": ["United Arab Emirates", "middle-east"],
  qatar: ["Qatar", "middle-east"],
  kuwait: ["Kuwait", "middle-east"],
  bahrain: ["Bahrain", "middle-east"],
  oman: ["Oman", "middle-east"],
  turkey: ["Turkey", "middle-east"],
  egypt: ["Egypt", "middle-east"],
  jordan: ["Jordan", "middle-east"],
  lebanon: ["Lebanon", "middle-east"],
  brazil: ["Brazil", "south-america"],
  argentina: ["Argentina", "south-america"],
  chile: ["Chile", "south-america"],
  colombia: ["Colombia", "south-america"],
  peru: ["Peru", "south-america"],
  "south-africa": ["South Africa", "africa"],
  nigeria: ["Nigeria", "africa"],
  morocco: ["Morocco", "africa"],
};

const FLAG_BY_COUNTRY: Record<string, string> = {
  usa: "🇺🇸",
  turkey: "🇹🇷",
  "saudi-arabia": "🇸🇦",
  uae: "🇦🇪",
  uk: "🇬🇧",
  france: "🇫🇷",
  germany: "🇩🇪",
  italy: "🇮🇹",
  spain: "🇪🇸",
  japan: "🇯🇵",
  colombia: "🇨🇴",
  europe: "🇪🇺",
};

const PLAN_ORDER = ["basic", "standard", "premium", "family"] as const;

function parseGb(label: string): number | undefined {
  const upper = label.toUpperCase();
  if (upper.includes("UNLIMITED")) return undefined;
  const match = label.match(/(\d+(?:\.\d+)?)\s*GB/i);
  return match ? Number(match[1]) : undefined;
}

function priceParts(price: number): { dollars: string; cents: string } {
  const dollars = Math.floor(price);
  const cents = Math.round((price - dollars) * 100);
  return { dollars: String(dollars), cents: String(cents).padStart(2, "0") };
}

function toEsimPlan(
  countryId: string,
  planKey: string,
  plan: TemplatePlan,
  currency: string,
): EsimPlan {
  const dataLabel = plan.sharedData || plan.data || "10GB";
  const unlimited = dataLabel.toUpperCase().includes("UNLIMITED");
  const category = unlimited ? "unlimited" : "fixed";

  return {
    id: `regional:${countryId}:${planKey}`,
    countryId,
    name: plan.name,
    dataGb: parseGb(dataLabel),
    durationDays: plan.days,
    price: plan.price,
    formattedPriceParts: priceParts(plan.price),
    currency,
    isRechargeable: false,
    isPayAsYouGo: false,
    pricingStrategy: "MANUAL",
    marginStatus: "manual",
    planCategory: category,
    displayBadge: plan.popular ? "best_choice" : unlimited ? "flexible" : null,
  };
}

function addFlexPlan(countryId: string, currency: string): EsimPlan {
  return {
    id: `regional:${countryId}:flex`,
    countryId,
    name: "Flex Data",
    dataGb: 5,
    durationDays: 30,
    price: 25,
    formattedPriceParts: priceParts(25),
    currency,
    isRechargeable: true,
    isPayAsYouGo: true,
    pricingStrategy: "MANUAL",
    marginStatus: "manual",
    planCategory: "flexible",
    displayBadge: "flexible",
  };
}

/** True for synthetic regional SKUs (omit packageId at checkout). */
export function isRegionalFallbackPlanId(id: string): boolean {
  return id.startsWith("regional:");
}

/**
 * Build a PlansByCountryResponse from regional templates.
 * Always returns at least Basic/Standard/Premium/Family (+ Flex).
 */
export function buildRegionalPlansFallback(
  countryId: string,
): PlansByCountryResponse {
  const slug = normalizeCountrySlug(countryId);
  const hint = COUNTRY_HINTS[slug];
  const displayName =
    hint?.[0] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const templateKey = hint?.[1] ?? "europe";
  const template = REGIONAL_TEMPLATES[templateKey] ?? REGIONAL_TEMPLATES.europe;

  const plans: EsimPlan[] = PLAN_ORDER.filter((key) => template.plans[key]).map(
    (key) => toEsimPlan(slug, key, template.plans[key], template.currency),
  );
  plans.push(addFlexPlan(slug, template.currency));

  const planGroups: PlanCategoryGroups = {
    fixed: plans.filter((p) => p.planCategory === "fixed"),
    unlimited: plans.filter((p) => p.planCategory === "unlimited"),
    flexible: plans.filter((p) => p.planCategory === "flexible"),
  };

  return {
    success: true,
    countryId: slug,
    countryName: displayName,
    flag: FLAG_BY_COUNTRY[slug],
    plans,
    planGroups,
  };
}
