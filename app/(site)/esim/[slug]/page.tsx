import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EsimDestinationHub } from "@/components/pseo/EsimDestinationHub";
import { getCountryImage } from "@/lib/country-image";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import {
  getIndexedPseoDestinations,
  getPseoAvailableLocales,
  getPseoDestination,
  getPseoLocaleCopy,
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

  // Unpublished rows exist for staging but stay out of sitemap; still noindex.
  const locale = await getRequestLocale();
  const available = getPseoAvailableLocales(destination);
  if (!available.includes(locale) && locale !== "en") {
    // Fall back to EN copy on hub; metadata already has EN in alternates.
  }

  return <EsimDestinationHub destination={destination} locale={locale} />;
}
