/** Normalize URL slug or label to backend `country_id`. */
export function normalizeCountrySlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function plansPathForCountry(countryId: string): string {
  const slug = normalizeCountrySlug(countryId);
  if (
    slug === "saudi-arabia" ||
    slug === "umrah" ||
    slug === "hajj" ||
    slug === "sauditurkey" ||
    slug === "saudiegypt" ||
    slug === "saudimorocco" ||
    slug === "saudi-turkey" ||
    slug === "saudi-egypt" ||
    slug === "saudi-morocco"
  ) {
    return "/hajj-umrah";
  }
  return `/plans/${slug}`;
}

/** Display label for a country slug or API name. */
export function formatCountryLabel(input: string): string {
  return input
    .trim()
    .replace(/[-_]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}
