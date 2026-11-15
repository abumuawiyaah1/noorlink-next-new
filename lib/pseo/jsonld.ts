import type { PseoDestination, PseoFaqItem } from "@/lib/pseo/types";
import { absoluteUrl } from "@/lib/seo";

type BreadcrumbInput = { name: string; path: string };

export function buildPseoFaqJsonLd(faqs: PseoFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildPseoBreadcrumbJsonLd(items: BreadcrumbInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Lightweight offer pointing shoppers to live plans (not a hard price promise). */
export function buildPseoOfferJsonLd(input: {
  destination: PseoDestination;
  countryName: string;
  description: string;
  plansPath: string;
  fromPriceUsd?: number | null;
}) {
  const { destination, countryName, description, plansPath, fromPriceUsd } =
    input;
  const offer: Record<string, unknown> = {
    "@type": "Offer",
    url: absoluteUrl(plansPath),
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "NoorLink",
      url: absoluteUrl("/"),
    },
  };
  if (fromPriceUsd != null && fromPriceUsd > 0) {
    offer.priceCurrency = "USD";
    offer.price = fromPriceUsd.toFixed(2);
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${countryName} travel eSIM`,
    description,
    brand: { "@type": "Brand", name: "NoorLink" },
    category: "Travel eSIM",
    url: absoluteUrl(`/esim/${destination.slug}`),
    offers: offer,
  };
}
