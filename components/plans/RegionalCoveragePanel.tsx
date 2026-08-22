"use client";

import { useState } from "react";
import type { RegionalProduct } from "@/lib/regional-products";

type RegionalCoveragePanelProps = {
  product: RegionalProduct;
  coverageCountries?: string[];
  coverageExclusions?: string[];
};

export function RegionalCoveragePanel({
  product,
  coverageCountries,
  coverageExclusions,
}: RegionalCoveragePanelProps) {
  const [expanded, setExpanded] = useState(false);
  const countries = coverageCountries ?? [...product.countries];
  const exclusions = coverageExclusions ?? [...product.exclusions];
  const preview = countries.slice(0, 8);
  const rest = countries.length - preview.length;

  return (
    <section className="plans-regional-coverage" aria-labelledby="regional-coverage-heading">
      <div className="plans-regional-coverage__head">
        <h2 id="regional-coverage-heading">
          Covers {countries.length} countries
        </h2>
        <p>{product.heroTagline}</p>
      </div>

      <ul className="plans-regional-coverage__chips" aria-label="Countries covered">
        {(expanded ? countries : preview).map((country) => (
          <li key={country}>{country}</li>
        ))}
        {!expanded && rest > 0 && (
          <li className="plans-regional-coverage__more">+{rest} more</li>
        )}
      </ul>

      {countries.length > preview.length && (
        <button
          type="button"
          className="plans-regional-coverage__toggle"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
        >
          {expanded ? "Show fewer countries" : `Show all ${countries.length} countries`}
        </button>
      )}

      {exclusions.length > 0 && (
        <p className="plans-regional-coverage__exclusions">
          Not included on this plan: {exclusions.join(", ")}.
        </p>
      )}
    </section>
  );
}
