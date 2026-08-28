import { absoluteUrl } from "@/lib/seo";

export function productJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: input.image ? absoluteUrl(input.image) : undefined,
    brand: {
      "@type": "Brand",
      name: "NoorLink",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "9.99",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(input.path),
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path?: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? absoluteUrl(item.path) : undefined,
    })),
  };
}
