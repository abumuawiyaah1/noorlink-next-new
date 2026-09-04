import { describeEsimPlan } from "@/lib/plan-descriptions";
import type { EsimPlan, FormattedPriceParts } from "@/lib/plans-api";

export type PilgrimTierKey = "basic" | "connected" | "unlimited";

export type PilgrimTierMeta = {
  key: PilgrimTierKey;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  recommended?: boolean;
  comingSoon?: boolean;
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
      "Hotspot included",
      "Recommended for first-time pilgrims",
    ],
    recommended: true,
  },
  {
    key: "unlimited",
    title: "Umrah Unlimited",
    subtitle: "3GB/day · day-pass",
    description:
      "3GB/day at full speed, then up to 1 Mbps — for travelers who do not want to count gigabytes.",
    highlights: [
      "3GB/day full speed · then 1 Mbps",
      "Choose 7 or 10 day trip length",
      "Hotspot included",
    ],
  },
];

export type PilgrimTierOffer = PilgrimTierMeta & {
  plan: EsimPlan | null;
  /** Connected Pilgrim: traveler picks 10GB or 20GB. */
  connectedVariants?: {
    gb10: EsimPlan;
    gb20: EsimPlan;
  };
  /** Umrah Unlimited: traveler picks trip length (14d only when catalog has it). */
  unlimitedVariants?: {
    d7: EsimPlan;
    d10: EsimPlan;
    d14?: EsimPlan;
  };
};

export type ConnectedPilgrimDataGb = 10 | 20;
export type UmrahUnlimitedDays = 7 | 10 | 14;

export type PilgrimPlanCopy = {
  description: string;
  highlights: string[];
};

/** Pilgrim-specific copy; falls back to shared provider-style descriptions. */
export function resolvePilgrimPlanCopy(
  tier: PilgrimTierOffer,
  plan: EsimPlan | null,
  connectedDataGb: ConnectedPilgrimDataGb = 10,
  umrahUnlimitedDays: UmrahUnlimitedDays = 10,
): PilgrimPlanCopy {
  if (tier.comingSoon) {
    return {
      description: tier.description,
      highlights: tier.highlights,
    };
  }

  const days = plan?.durationDays ?? 30;
  const gb = plan?.dataGb;
  const speed = "3G / 4G / 5G";

  if (tier.key === "basic") {
    return {
      description: `Saudi fixed pack: ${gb ?? 5}GB for ${days} days on ${speed}. Built for maps, WhatsApp, and arrival coordination without overbuying data.`,
      highlights: [
        `${gb ?? 5}GB high-speed data · ${days} days`,
        `${speed} on Saudi networks`,
        "Best for short Umrah or light daily use",
      ],
    };
  }

  if (tier.key === "connected") {
    if (connectedDataGb === 20) {
      return {
        description: `Saudi fixed pack: 20GB for ${days} days on ${speed}. Extra headroom for photos, navigation, and regular video calls during a fuller pilgrimage.`,
        highlights: [
          `20GB high-speed data · ${days} days`,
          `${speed} · hotspot supported on most devices`,
          "Best when you share updates and stream more often",
        ],
      };
    }
    return {
      description: `Saudi fixed pack: 10GB for ${days} days on ${speed}. The balanced pick for daily worship apps, family messaging, and maps across Makkah & Madinah.`,
      highlights: [
        `10GB high-speed data · ${days} days`,
        `${speed} · Saudi Arabia coverage`,
        "Recommended for most first-time pilgrims",
      ],
    };
  }

  if (tier.key === "unlimited" && plan) {
    const activePlan = resolveUmrahUnlimitedPlan(tier, umrahUnlimitedDays);
    return describeEsimPlan(activePlan, { countryLabel: "Saudi Arabia" });
  }

  if (plan) {
    return describeEsimPlan(plan, { countryLabel: "Saudi Arabia" });
  }

  return {
    description: tier.description,
    highlights: tier.highlights,
  };
}

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
    durationDays: 30,
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
    id: "pilgrim-umrah-unlimited-10",
    countryId: "saudi-arabia",
    name: "Umrah Unlimited 10 Days",
    dataGb: 3,
    durationDays: 10,
    price: 42.99,
    formattedPriceParts: fallbackParts(42.99),
    currency: "USD",
    isRechargeable: false,
    isPayAsYouGo: false,
    pricingStrategy: "MANUAL",
    marginStatus: "manual",
    planCategory: "unlimited",
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

const UNLIMITED_FALLBACK_7: EsimPlan = {
  ...PILGRIM_FALLBACK_PLANS.unlimited,
  id: "pilgrim-umrah-unlimited-7",
  name: "Umrah Unlimited 7 Days",
  durationDays: 7,
  price: 34.99,
  formattedPriceParts: fallbackParts(34.99),
};

const UNLIMITED_FALLBACK_14: EsimPlan = {
  ...PILGRIM_FALLBACK_PLANS.unlimited,
  id: "pilgrim-umrah-unlimited-14",
  name: "Umrah Unlimited 14 Days",
  durationDays: 14,
  price: 89.99,
  formattedPriceParts: fallbackParts(89.99),
};

function pickConnectedPlan(plans: EsimPlan[], dataGb: ConnectedPilgrimDataGb): EsimPlan | null {
  const named = plans.filter((p) => /connected pilgrim/i.test(p.name));
  const match =
    named.find((p) => p.dataGb === dataGb) ??
    plans.find((p) => p.planCategory === "fixed" && p.dataGb === dataGb) ??
    null;
  return match;
}

function pickUmrahUnlimitedPlan(
  plans: EsimPlan[],
  days: UmrahUnlimitedDays,
): EsimPlan | null {
  const candidates = plans.filter(
    (p) =>
      p.planCategory === "unlimited" ||
      /umrah unlimited/i.test(p.name),
  );
  return candidates.find((p) => p.durationDays === days) ?? null;
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

export function resolveUmrahUnlimitedPlan(
  tier: PilgrimTierOffer,
  days: UmrahUnlimitedDays,
): EsimPlan {
  if (tier.unlimitedVariants) {
    if (days === 7) return tier.unlimitedVariants.d7;
    if (days === 14) {
      return tier.unlimitedVariants.d14 ?? tier.unlimitedVariants.d10;
    }
    return tier.unlimitedVariants.d10;
  }
  if (tier.plan && tier.plan.durationDays === days) return tier.plan;
  if (days === 7) return UNLIMITED_FALLBACK_7;
  if (days === 14) return UNLIMITED_FALLBACK_14;
  return tier.plan ?? PILGRIM_FALLBACK_PLANS.unlimited;
}

/** Available unlimited trip lengths (14d only when the catalog has a live SKU). */
export function availableUmrahUnlimitedDays(
  tier: PilgrimTierOffer,
): UmrahUnlimitedDays[] {
  const variants = tier.unlimitedVariants;
  if (!variants) return [7, 10];
  return variants.d14 ? [7, 10, 14] : [7, 10];
}

export function resolvePilgrimTiers(plans: EsimPlan[]): PilgrimTierOffer[] {
  const fixed = plans
    .filter((p) => p.planCategory === "fixed")
    .sort((a, b) => a.price - b.price);
  const connectedGb10 =
    pickConnectedPlan(plans, 10) ?? fixed.find((p) => p.dataGb === 10) ?? null;
  const connectedGb20 =
    pickConnectedPlan(plans, 20) ?? fixed.find((p) => p.dataGb === 20) ?? null;
  const connected =
    connectedGb10 ??
    plans.find((p) => p.displayBadge === "best_choice") ??
    fixed[1] ??
    null;
  const unlimitedGb7 = pickUmrahUnlimitedPlan(plans, 7);
  const unlimitedGb10 = pickUmrahUnlimitedPlan(plans, 10);
  const unlimitedGb14 = pickUmrahUnlimitedPlan(plans, 14);
  const unlimited =
    unlimitedGb10 ?? unlimitedGb7 ?? unlimitedGb14 ?? null;
  const basic =
    fixed.find(
      (p) =>
        p.id !== connected?.id &&
        p.id !== unlimited?.id &&
        p.dataGb !== 10 &&
        p.dataGb !== 20 &&
        p.dataGb !== 50,
    ) ??
    fixed.find((p) => p.id !== connectedGb10?.id && p.id !== connectedGb20?.id) ??
    fixed[0] ??
    null;

  const byKey: Record<PilgrimTierKey, EsimPlan | null> = {
    basic,
    connected,
    unlimited,
  };

  return PILGRIM_TIER_META.map((meta) => {
    if (meta.comingSoon) {
      return { ...meta, plan: null };
    }
    const plan = byKey[meta.key] ?? PILGRIM_FALLBACK_PLANS[meta.key];
    const offer: PilgrimTierOffer = { ...meta, plan };
    if (meta.key === "connected") {
      offer.connectedVariants = {
        gb10: connectedGb10 ?? PILGRIM_FALLBACK_PLANS.connected,
        gb20: connectedGb20 ?? CONNECTED_FALLBACK_20,
      };
      offer.plan = offer.connectedVariants.gb10;
    }
    if (meta.key === "unlimited") {
      offer.unlimitedVariants = {
        d7: unlimitedGb7 ?? UNLIMITED_FALLBACK_7,
        d10: unlimitedGb10 ?? PILGRIM_FALLBACK_PLANS.unlimited,
        ...(unlimitedGb14 ? { d14: unlimitedGb14 } : {}),
      };
      offer.plan = offer.unlimitedVariants.d10;
    }
    return offer;
  });
}
