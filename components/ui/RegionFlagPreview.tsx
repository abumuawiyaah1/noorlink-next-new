"use client";

import { flagForCountryLabel } from "@/lib/country-flags";
import type { RegionalRouteSlug } from "@/lib/regional-products";
import { getRegionalProduct } from "@/lib/regional-products";

type Props = {
  routeSlug: RegionalRouteSlug;
  /** How many flags to show in the hover panel before “+N”. */
  previewCount?: number;
  className?: string;
};

/**
 * Hover/focus-only preview of country flags in a region.
 * Click the parent link for the full list + plans.
 */
export function RegionFlagPreview({
  routeSlug,
  previewCount = 12,
  className = "",
}: Props) {
  const product = getRegionalProduct(routeSlug);
  if (!product) return null;

  const countries = [...product.countries];
  const panel = countries.slice(0, previewCount);
  const panelRest = countries.length - panel.length;

  return (
    <div
      className={`region-flag-preview${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <div className="region-flag-preview__panel">
        <p className="region-flag-preview__title">
          {countries.length} destinations — click for the full list
        </p>
        <ul className="region-flag-preview__flags">
          {panel.map((name) => (
            <li key={name}>
              <span>{flagForCountryLabel(name)}</span>
              <span className="region-flag-preview__name">{name}</span>
            </li>
          ))}
          {panelRest > 0 && (
            <li className="region-flag-preview__more">+{panelRest} more</li>
          )}
        </ul>
      </div>
    </div>
  );
}
