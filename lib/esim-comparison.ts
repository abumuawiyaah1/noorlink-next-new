/**
 * Competitive comparison for /compare.
 * Translatable copy lives in messages/{locale}.comparePage; this module keeps
 * structural provider metadata + JSON-LD helpers (English schema default).
 */

import { getDictionary } from "@/lib/i18n/dictionaries";

export type CompareCellKind = "yes" | "limited" | "no" | "text";

export type CompareCell = {
  kind: CompareCellKind;
  label: string;
  note?: string;
};

export type CompareProvider = {
  id: string;
  name: string;
  highlight?: boolean;
  blurb: string;
};

export type CompareRow = {
  id: string;
  label: string;
  hint?: string;
  cells: Record<string, CompareCell>;
};

export type EsimCompareGuideSection = {
  id: string;
  title: string;
  body: string;
  links: { href: string; label: string }[];
};

export type EsimCompareFaq = { q: string; a: string };

/** Brand names stay Latin / English across locales. */
export const ESIM_COMPARE_PROVIDER_META: {
  id: string;
  name: string;
  highlight?: boolean;
}[] = [
  { id: "noorlink", name: "NoorLink", highlight: true },
  { id: "airalo", name: "Airalo" },
  { id: "holafly", name: "Holafly" },
  { id: "nomad", name: "Nomad" },
  { id: "saily", name: "Saily" },
  { id: "gigsky", name: "GigSky" },
  { id: "maya", name: "Maya Mobile" },
];

/** Visible freshness signal for SEO + trust. Update when the chart is reviewed. */
export const ESIM_COMPARE_UPDATED_ISO = "2026-09-25";

export function getEsimCompareProviders(
  compare: ReturnType<typeof getDictionary>["comparePage"],
): CompareProvider[] {
  return ESIM_COMPARE_PROVIDER_META.map((meta) => ({
    ...meta,
    blurb: compare.providers[meta.id as keyof typeof compare.providers].blurb,
  }));
}

export function getEsimCompareRows(
  compare: ReturnType<typeof getDictionary>["comparePage"],
): CompareRow[] {
  return compare.rows.map((row) => ({
    id: row.id,
    label: row.label,
    hint: row.hint || undefined,
    cells: Object.fromEntries(
      Object.entries(row.cells).map(([providerId, cell]) => [
        providerId,
        {
          kind: cell.kind as CompareCellKind,
          label: cell.label,
          ...("note" in cell && cell.note ? { note: cell.note } : {}),
        },
      ]),
    ),
  }));
}

/** English defaults for JSON-LD / backwards-compatible imports. */
const enCompare = getDictionary("en").comparePage;

export const ESIM_COMPARE_PROVIDERS = getEsimCompareProviders(enCompare);
export const ESIM_COMPARE_ROWS = getEsimCompareRows(enCompare);
export const ESIM_COMPARE_DISCLAIMER = enCompare.disclaimer;
export const ESIM_COMPARE_UPDATED_LABEL = enCompare.updatedLabel;
export const ESIM_COMPARE_GUIDES: EsimCompareGuideSection[] = enCompare.guides;
export const ESIM_COMPARE_FAQS: EsimCompareFaq[] = enCompare.faqs;

export function esimCompareFaqJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ESIM_COMPARE_FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function esimCompareItemListJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: enCompare.itemListName,
    itemListElement: ESIM_COMPARE_PROVIDERS.map((provider, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: provider.name,
      description: provider.blurb,
    })),
  };
}
