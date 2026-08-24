import type { EsimPlan, FormattedPriceParts } from "@/lib/plans-api";

export type PilgrimTierKey =
  | "basic"
  | "connected"
  | "unlimited"
  | "family";

export type PilgrimTierMeta = {
  key: PilgrimTierKey;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  recommended?: boolean;
  hasGroupCalculator?: boolean;
};

export const PILGRIM_TIER_META: PilgrimTierMeta[] = [
  {
    key: "basic",
    title: "Basic",
    subtitle: "Lite Explorer",
    description: "Essential data for maps, messaging, and arrival coordination.",
    highlights: [
      "Install before departure",
      "Makkah & Madinah coverage",
      "Ideal for short stays",
    ],
  },
  {
    key: "connected",
    title: "Connected Pilgrim",
    subtitle: "Best Choice",
    description:
      "Choose 10GB or 20GB — balanced data for daily worship, family updates, and navigation.",
    highlights: [
      "Congestion-resilient access",
      "Priority routing in holy sites",
      "Recommended for first-time pilgrims",
    ],
    recommended: true,
  },
  {
    key: "unlimited",
    title: "Unlimited Devotion",
    subtitle: "Premium · 50GB",
    description:
      "High-capacity 50GB for live streams, video calls, and full itinerary apps.",
    highlights: [
      "50GB high-speed data (30 days)",
      "Best for extended stays",
      "Superior value under network congestion",
    ],
  },
  {
    key: "family",
    title: "Family Share",
    subtitle: "Efficiency / Hotspot · 50GB",
    description:
      "One 50GB plan, shared connectivity — coordinate your group with a single hotspot.",
    highlights: [
      "Hotspot-ready for group devices",
      "Split cost across travelers",
      "Group coordination in crowded areas",
    ],
    hasGroupCalculator: true,
  },
];

export type PilgrimTierOffer = PilgrimTierMeta & {
  plan: EsimPlan | null;
  /** Connected Pilgrim: traveler picks 10GB or 20GB (Access fixed packs). */
  connectedVariants?: {
    gb10: EsimPlan;
    gb20: EsimPlan;
  };
};

export type ConnectedPilgrimDataGb = 10 | 20;

function fallbackParts(price: number): FormattedPriceParts {
  const dollars = Math.floor(price);
  const cents = Math.round((price - dollars) * 100);
  return { dollars: String(dollars), cents: String(cents) };
}

export const PILGRIM_FALLBACK_PLANS: Record<PilgrimTierKey, EsimPlan> = {
  basic: {
    id: "pilgrim-basic",
    countryId: "saudi-arabia",
    name: "Lite Explorer",
    dataGb: 5,
    durationDays: 10,
    price: 15.77,
    formattedPriceParts: fallbackParts(15.77),
    currency: "USD",
    isRechargeable: false,
    isPayAsYouGo: false,
    pricingStrategy: "AUTOMATED",
    marginStatus: "automated",
    planCategory: "fixed",
    displayBadge: null,
  },
  connected: {
    id: "pilgrim-connected-10",
    countryId: "saudi-arabia",
    name: "Connected Pilgrim 10GB",
    dataGb: 10,
    durationDays: 30,
    price: 21.77,
    formattedPriceParts: fallbackParts(21.77),
    currency: "USD",
    isRechargeable: false,
    isPayAsYouGo: false,
    pricingStrategy: "AUTOMATED",
    marginStatus: "automated",
    planCategory: "fixed",
    displayBadge: "best_choice",
  },
  unlimited: {
    id: "pilgrim-unlimited",
    countryId: "saudi-arabia",
    name: "Unlimited Devotion 50GB",
    dataGb: 50,
    durationDays: 30,
    price: 96.77,
    formattedPriceParts: fallbackParts(96.77),
    currency: "USD",
    isRechargeable: false,
    isPayAsYouGo: false,
    pricingStrategy: "AUTOMATED",
    marginStatus: "automated",
    planCategory: "unlimited",
    displayBadge: null,
  },
  family: {
    id: "pilgrim-family",
    countryId: "saudi-arabia",
    name: "Family Share 50GB",
    dataGb: 50,
    durationDays: 30,
    price: 96.77,
    formattedPriceParts: fallbackParts(96.77),
    currency: "USD",
    isRechargeable: false,
    isPayAsYouGo: false,
    pricingStrategy: "AUTOMATED",
    marginStatus: "automated",
    planCategory: "flexible",
    displayBadge: "flexible",
  },
};

const CONNECTED_FALLBACK_20: EsimPlan = {
  ...PILGRIM_FALLBACK_PLANS.connected,
  id: "pilgrim-connected-20",
  name: "Connected Pilgrim 20GB",
  dataGb: 20,
  durationDays: 30,
  price: 34.77,
  formattedPriceParts: fallbackParts(34.77),
};

function pickConnectedPlan(plans: EsimPlan[], dataGb: ConnectedPilgrimDataGb): EsimPlan | null {
  const named = plans.filter((p) => /connected pilgrim/i.test(p.name));
  const match =
    named.find((p) => p.dataGb === dataGb) ??
    plans.find((p) => p.planCategory === "fixed" && p.dataGb === dataGb) ??
    null;
  return match;
}

export function resolveConnectedPilgrimPlan(
  tier: PilgrimTierOffer,
  dataGb: ConnectedPilgrimDataGb,
): EsimPlan {
  if (tier.connectedVariants) {
    return dataGb === 20 ? tier.connectedVariants.gb20 : tier.connectedVariants.gb10;
  }
  if (tier.plan && tier.plan.dataGb === dataGb) return tier.plan;
  if (dataGb === 20) return CONNECTED_FALLBACK_20;
  return tier.plan ?? PILGRIM_FALLBACK_PLANS.connected;
}

export function resolvePilgrimTiers(plans: EsimPlan[]): PilgrimTierOffer[] {
  const fixed = plans
    .filter((p) => p.planCategory === "fixed")
    .sort((a, b) => a.price - b.price);
  const unlimited = plans.find((p) => p.planCategory === "unlimited") ?? null;
  const flexible =
    plans.find((p) => p.planCategory === "flexible" || p.isRechargeable) ?? null;
  const connectedGb10 =
    pickConnectedPlan(plans, 10) ?? fixed.find((p) => p.dataGb === 10) ?? null;
  const connectedGb20 =
    pickConnectedPlan(plans, 20) ?? fixed.find((p) => p.dataGb === 20) ?? null;
  const connected =
    connectedGb10 ??
    plans.find((p) => p.displayBadge === "best_choice") ??
    fixed[1] ??
    null;
  const basic =
    fixed.find((p) => p.id !== connected?.id && p.dataGb !== 10 && p.dataGb !== 20) ??
    fixed.find((p) => p.id !== connectedGb10?.id && p.id !== connectedGb20?.id) ??
    fixed[0] ??
    null;

  const byKey: Record<PilgrimTierKey, EsimPlan | null> = {
    basic,
    connected,
    unlimited,
    family: flexible,
  };

  return PILGRIM_TIER_META.map((meta) => {
    const plan = byKey[meta.key] ?? PILGRIM_FALLBACK_PLANS[meta.key];
    const offer: PilgrimTierOffer = { ...meta, plan };
    if (meta.key === "connected") {
      offer.connectedVariants = {
        gb10: connectedGb10 ?? PILGRIM_FALLBACK_PLANS.connected,
        gb20: connectedGb20 ?? CONNECTED_FALLBACK_20,
      };
      offer.plan = offer.connectedVariants.gb10;
    }
    return offer;
  });
}

export function splitPricePerPerson(
  price: number,
  parts: FormattedPriceParts,
  groupSize: number,
): { price: number; formattedPriceParts: FormattedPriceParts } {
  const safeSize = Math.max(1, groupSize);
  const perPerson = Math.round((price / safeSize) * 100) / 100;
  return {
    price: perPerson,
    formattedPriceParts: fallbackParts(perPerson),
  };
}

export function computeGroupSavings(
  individualPlanPrice: number,
  familyPerPersonPrice: number,
  groupSize: number,
): { perPersonSavings: number; totalSavings: number } {
  const safeSize = Math.max(1, groupSize);
  const perPersonSavings = Math.max(
    0,
    Math.round((individualPlanPrice - familyPerPersonPrice) * 100) / 100,
  );
  return {
    perPersonSavings,
    totalSavings: Math.round(perPersonSavings * safeSize * 100) / 100,
  };
}
