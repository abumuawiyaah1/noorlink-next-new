import type { Locale } from "@/lib/i18n/config";

export type PseoWave = "A" | "B" | "C" | "D";

export type PseoFaqItem = {
  question: string;
  answer: string;
};

export type PseoLocaleCopy = {
  /** Short SEO title fragment / H1 country name */
  countryName: string;
  /** Meta + intro — unique per locale */
  intro: string;
  /** Destination-specific roaming / travel tip */
  roamingTip: string;
  /** Optional extra FAQ answer (appended after defaults). */
  faqDataHint?: string;
};

export type PseoDestination = {
  slug: string;
  /** Checkout / plans path (Saudi uses /hajj-umrah). */
  plansPath: string;
  wave: PseoWave;
  /** Only true rows enter sitemap + generateStaticParams for public index. */
  isIndexed: boolean;
  primaryCarrier: string;
  secondaryCarrier?: string;
  apnName: string;
  apnNotes: string;
  supportedFrequencies: string;
  popularCities: string[];
  /** Optional full FAQ override (otherwise generated from templates). */
  faqs?: PseoFaqItem[];
  /** Locales that have real copy (not empty stubs). */
  locales: Partial<Record<Locale, PseoLocaleCopy>> & { en: PseoLocaleCopy };
};
