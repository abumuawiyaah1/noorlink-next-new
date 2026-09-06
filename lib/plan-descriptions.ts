import type { EsimPlan } from "@/lib/plans-api";

export type PlanCopy = {
  description: string;
  highlights: string[];
};

type DescribeOptions = {
  countryLabel?: string;
  isRegional?: boolean;
};

function formatGb(plan: EsimPlan): string | null {
  if (plan.dataGb == null) return null;
  const value = Number(plan.dataGb);
  return Number.isInteger(value) ? `${value}GB` : `${value}GB`;
}

function formatDays(plan: EsimPlan): string {
  if (plan.durationDays == null) return "flexible validity";
  return plan.durationDays === 1 ? "1 day" : `${plan.durationDays} days`;
}

/**
 * Customer-facing plan copy from provider-style pack specs
 * (data amount, validity, category — Access/Citrus fixed & PAYG patterns).
 */
export function describeEsimPlan(
  plan: EsimPlan,
  options: DescribeOptions = {},
): PlanCopy {
  const place = options.countryLabel?.trim() || "this destination";
  const speed = "3G / 4G / 5G";
  const gb = formatGb(plan);
  const days = formatDays(plan);
  const regional = Boolean(options.isRegional);

  if (plan.planCategory === "unlimited" || /unlimited/i.test(plan.name)) {
    const isDailyFup =
      /umrah unlimited|3gb\/day|fup1mbps|daily/i.test(plan.name) ||
      (plan.dataGb === 3 && (plan.durationDays ?? 0) <= 14);
    if (isDailyFup) {
      const tripDays = plan.durationDays ?? 7;
      return {
        description: `Saudi day-pass: 3GB/day at full speed for ${tripDays} days on ${speed}, then stay connected at up to 1 Mbps until each daily reset. Honest unlimited — not a fixed GB bucket.`,
        highlights: [
          `3GB/day full speed · ${tripDays} days`,
          `Then up to 1 Mbps · hotspot included`,
          `Starts when you connect in Saudi Arabia`,
        ],
      };
    }
    return {
      description: regional
        ? `Unlimited high-speed data across the region for ${days} on ${speed}. Built for continuous maps, calls, and streaming while you cross borders.`
        : `Unlimited high-speed data in ${place} for ${days} on ${speed}. Best when you do not want to watch a data counter.`,
      highlights: [
        `Unlimited data · ${days}`,
        `${speed} coverage`,
        regional ? "One eSIM across covered countries" : `Coverage in ${place}`,
      ],
    };
  }

  if (
    plan.planCategory === "flexible" ||
    plan.isPayAsYouGo ||
    plan.isRechargeable ||
    /pay-?as-?you-?go|flex/i.test(plan.name)
  ) {
    return {
      description: regional
        ? `Pay-as-you-go regional eSIM — start from this price, top up as you use data across covered countries on ${speed}.`
        : `Pay-as-you-go eSIM for ${place} — start from this price and add data only when you need it on ${speed}.`,
      highlights: [
        "Flexible top-ups",
        `${speed} coverage`,
        "Ideal when your usage is hard to predict",
      ],
    };
  }

  // Fixed packs (Access-style: GB + days + speed)
  const dataLabel = gb ?? "Fixed data";
  return {
    description: regional
      ? `Fixed pack: ${dataLabel} for ${days} on ${speed} across the region. Predictable allowance for maps, messaging, and travel apps without surprise top-ups.`
      : `Fixed pack: ${dataLabel} for ${days} on ${speed} in ${place}. Predictable allowance for maps, messaging, and travel apps.`,
    highlights: [
      `${dataLabel} · ${days}`,
      `${speed} coverage`,
      regional
        ? "One QR for regional travel"
        : "Hotspot supported on most devices",
    ],
  };
}
