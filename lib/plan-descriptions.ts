import type { Locale } from "@/lib/i18n/config";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import type { EsimPlan } from "@/lib/plans-api";

export type PlanCopy = {
  description: string;
  highlights: string[];
};

type DescribeOptions = {
  countryLabel?: string;
  isRegional?: boolean;
  locale?: Locale | string | null;
};

function formatGb(plan: EsimPlan): string | null {
  if (plan.dataGb == null) return null;
  const value = Number(plan.dataGb);
  return Number.isInteger(value) ? `${value}GB` : `${value}GB`;
}

function formatDays(
  plan: EsimPlan,
  dict: ReturnType<typeof getDictionary>,
): string {
  if (plan.durationDays == null) return t(dict, "planCopy.flexibleValidity");
  return plan.durationDays === 1
    ? t(dict, "planCopy.dayOne")
    : t(dict, "planCopy.daysN", { n: plan.durationDays });
}

/**
 * Customer-facing plan copy from provider-style pack specs
 * (data amount, validity, category — Access/Citrus fixed & PAYG patterns).
 */
export function describeEsimPlan(
  plan: EsimPlan,
  options: DescribeOptions = {},
): PlanCopy {
  const dict = getDictionary(options.locale);
  const place =
    options.countryLabel?.trim() || t(dict, "planCopy.thisDestination");
  const speed = t(dict, "planCopy.speedLabel");
  const gb = formatGb(plan);
  const days = formatDays(plan, dict);
  const regional = Boolean(options.isRegional);

  if (plan.planCategory === "unlimited" || /unlimited/i.test(plan.name)) {
    const isDailyFup =
      /umrah unlimited|3gb\/day|fup1mbps|daily/i.test(plan.name) ||
      (plan.dataGb === 3 && (plan.durationDays ?? 0) <= 14);
    if (isDailyFup) {
      const tripDays = plan.durationDays ?? 7;
      return {
        description: t(dict, "planCopy.dailyFupDesc", {
          days: tripDays,
          speed,
        }),
        highlights: [
          t(dict, "planCopy.dailyFupH1", { days: tripDays }),
          t(dict, "planCopy.dailyFupH2"),
          t(dict, "planCopy.dailyFupH3"),
        ],
      };
    }
    return {
      description: regional
        ? t(dict, "planCopy.unlimitedRegionalDesc", { days, speed })
        : t(dict, "planCopy.unlimitedCountryDesc", { place, days, speed }),
      highlights: [
        t(dict, "planCopy.unlimitedH1", { days }),
        t(dict, "planCopy.coverageSpeed", { speed }),
        regional
          ? t(dict, "planCopy.oneEsimRegional")
          : t(dict, "planCopy.coverageIn", { place }),
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
        ? t(dict, "planCopy.paygRegionalDesc", { speed })
        : t(dict, "planCopy.paygCountryDesc", { place, speed }),
      highlights: [
        t(dict, "planCopy.flexibleTopUps"),
        t(dict, "planCopy.coverageSpeed", { speed }),
        t(dict, "planCopy.idealUnpredictable"),
      ],
    };
  }

  // Fixed packs (Access-style: GB + days + speed)
  const dataLabel = gb ?? t(dict, "planCopy.fixedData");
  return {
    description: regional
      ? t(dict, "planCopy.fixedRegionalDesc", {
          data: dataLabel,
          days,
          speed,
        })
      : t(dict, "planCopy.fixedCountryDesc", {
          data: dataLabel,
          days,
          speed,
          place,
        }),
    highlights: [
      t(dict, "planCopy.dataDays", { data: dataLabel, days }),
      t(dict, "planCopy.coverageSpeed", { speed }),
      regional
        ? t(dict, "planCopy.oneQrRegional")
        : t(dict, "planCopy.hotspotMostDevices"),
    ],
  };
}
