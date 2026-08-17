import { normalizeCountrySlug } from "@/lib/country-slugs";
import { destinationCardFromQuery } from "@/lib/country-templates";
import { DESTINATION_CARDS } from "@/lib/destinations-catalog";
import { DESTINATION_IMAGES } from "@/lib/site-images";

/** Destination photo for a country plans page — catalog first, then regional template. */
export function getCountryImage(countryId: string): string {
  const slug = normalizeCountrySlug(countryId);
  if (!slug) return DESTINATION_IMAGES.europeRegional;

  const catalogMatch = DESTINATION_CARDS.find(
    (card) => card.priceCountryId === slug || card.id === slug,
  );
  if (catalogMatch) return catalogMatch.image;

  const generated = destinationCardFromQuery(slug);
  if (generated) return generated.image;

  return DESTINATION_IMAGES.europeRegional;
}
