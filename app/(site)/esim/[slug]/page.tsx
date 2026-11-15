import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { EsimDestinationHub } from "@/components/pseo/EsimDestinationHub";
import { getCountryImage } from "@/lib/country-image";
import { fetchDestinationStartingPrices } from "@/lib/destination-prices";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import {
  buildPseoBreadcrumbJsonLd,
  buildPseoFaqJsonLd,
  buildPseoOfferJsonLd,
  getIndexedPseoDestinations,
  getPseoAvailableLocales,
  getPseoDestination,
  getPseoFaqs,
  getPseoLocaleCopy,
  pseoFaqCopyFromDict,
} from "@/lib/pseo";
import { buildPageMetadata } from "@/lib/seo";
import "@/styles/pseo-hub.css";

/** 30-day ISR — hubs are editorial; live prices live on /plans. */
export const revalidate = 2592000;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getIndexedPseoDestinations().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getPseoDestination(slug);
  if (!destination) {
    return buildPageMetadata({
      title: "Travel eSIM | NoorLink",
      description: "Instant travel eSIM data for your next trip.",
      path: `/esim/${slug}`,
      noIndex: true,
    });
  }

  const locale = await getRequestLocale();
  const available = getPseoAvailableLocales(destination);
  const copy = getPseoLocaleCopy(destination, locale);
  const path = `/esim/${destination.slug}`;

  return buildPageMetadata({
    title: `${copy.countryName} Travel eSIM | NoorLink`,
    description: copy.intro.slice(0, 160),
    path,
    image: getCountryImage(destination.slug),
    locale,
    availableLocales: available,
    noIndex: !destination.isIndexed,
  });
}

export default async function EsimDestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = getPseoDestination(slug);
  if (!destination) notFound();

  const locale = await getRequestLocale();
  const dict = getDictionary(locale);
  const copy = getPseoLocaleCopy(destination, locale);
  const available = getPseoAvailableLocales(destination);
  if (!available.includes(locale) && locale !== "en") {
    // Fall back to EN copy on hub; metadata already has EN in alternates.
  }

  const priceCountryId =
    destination.slug === "saudi-arabia" ? "saudi-arabia" : destination.slug;
  const prices = await fetchDestinationStartingPrices([priceCountryId]);
  const starting = prices[priceCountryId];
  const fromPriceLabel = starting
    ? t(dict, "destinationsPage.fromPrice", {
        price: `$${starting.amount.toFixed(2)}`,
      })
    : null;

  const faqs = getPseoFaqs(
    destination,
    copy.countryName,
    pseoFaqCopyFromDict(dict.pseo),
    copy.faqDataHint,
  );

  const hubPath = localizedPath(`/esim/${destination.slug}`, locale);
  const breadcrumbLd = buildPseoBreadcrumbJsonLd([
    { name: t(dict, "common.home"), path: localizedPath("/", locale) },
    { name: dict.pseo.indexNav, path: localizedPath("/esim", locale) },
    { name: copy.countryName, path: hubPath },
  ]);
  const faqLd = buildPseoFaqJsonLd(faqs);
  const offerLd = buildPseoOfferJsonLd({
    destination,
    countryName: copy.countryName,
    description: copy.intro,
    plansPath: localizedPath(destination.plansPath, locale),
    fromPriceUsd: starting?.amount ?? null,
  });

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: localizedPath("/", locale), label: t(dict, "common.home") },
          {
            href: localizedPath("/esim", locale),
            label: dict.pseo.indexNav,
          },
          { label: copy.countryName },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }}
      />
      <main>
        <EsimDestinationHub
          destination={destination}
          locale={locale}
          fromPriceLabel={fromPriceLabel}
        />
      </main>
      <SiteFooter />
    </>
  );
}
