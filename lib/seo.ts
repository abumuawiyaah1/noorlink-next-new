import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  LOCALES,
  type Locale,
} from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/path";

export const SITE_NAME = "NoorLink";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://noorlink.co"
);

/** Default social share image (1200×630). */
export const DEFAULT_OG_IMAGE = "/images/og.jpg";

/** BCP 47 tags used in hreflang / Open Graph. */
export const LOCALE_HREFLANG: Record<Locale, string> = {
  en: "en-US",
  es: "es-ES",
  ar: "ar-SA",
};

export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  ar: "ar_SA",
};

export const NOINDEX_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Self-canonical + hreflang map for a bare path (no locale prefix).
 * `availableLocales` defaults to all site locales; pass a subset for partial pSEO.
 */
export function buildLocaleAlternates(
  barePath: string,
  availableLocales: readonly Locale[] = LOCALES,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const locale of availableLocales) {
    languages[LOCALE_HREFLANG[locale]] = absoluteUrl(
      localizedPath(barePath, locale),
    );
  }
  languages["x-default"] = absoluteUrl(
    localizedPath(barePath, DEFAULT_LOCALE),
  );
  const canonicalLocale = availableLocales.includes(DEFAULT_LOCALE)
    ? DEFAULT_LOCALE
    : availableLocales[0] ?? DEFAULT_LOCALE;
  return {
    canonical: absoluteUrl(localizedPath(barePath, canonicalLocale)),
    languages,
  };
}

export function buildPageMetadata(input: {
  title: string;
  description: string;
  /** Bare path without locale prefix, e.g. `/esim/turkey`. */
  path: string;
  image?: string;
  noIndex?: boolean;
  /** Page locale; drives canonical prefix + OG locale. */
  locale?: Locale;
  /** Locales that have a real version of this page (hreflang). */
  availableLocales?: readonly Locale[];
}): Metadata {
  const locale = input.locale ?? DEFAULT_LOCALE;
  const available = input.availableLocales ?? LOCALES;
  const localized = localizedPath(input.path, locale);
  const url = absoluteUrl(localized);
  const image = absoluteUrl(input.image ?? DEFAULT_OG_IMAGE);
  const alternates = buildLocaleAlternates(input.path, available);
  // Self-referencing canonical for this locale (overrides default en canonical).
  alternates.canonical = url;

  return {
    title: input.title,
    description: input.description,
    alternates,
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: OG_LOCALE[locale],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: input.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
    ...(input.noIndex ? { robots: NOINDEX_ROBOTS } : {}),
  };
}

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NoorLink | Instant Travel eSIMs",
    template: "%s",
  },
  description:
    "Instant high-speed travel eSIM data in 190+ countries. Install before you fly — no physical SIM, no roaming shock.",
  icons: { icon: "/images/favicon.png" },
  openGraph: {
    title: "NoorLink | Instant Travel eSIMs",
    description:
      "Install before you fly. Travel eSIM data in 190+ countries, plus dedicated Hajj & Umrah coverage for Makkah and Madinah.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: "NoorLink — install before you fly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@noorlink",
    title: "NoorLink | Instant Travel eSIMs",
    description:
      "Install before you fly. Travel eSIM data in 190+ countries, plus dedicated Hajj & Umrah coverage.",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
};
