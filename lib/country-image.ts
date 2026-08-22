import { getCountryImageUrl, hasCountryPhoto } from "@/lib/country-images";

/** Destination photo for a country plans page — real photo or honest placeholder only. */
export function getCountryImage(countryId: string): string {
  return getCountryImageUrl(countryId);
}

export { hasCountryPhoto };
