"use client";

import { useState } from "react";
import { flagForCountryLabel } from "@/lib/country-flags";
import type { RegionalProduct } from "@/lib/regional-products";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { localizeRegionalProduct } from "@/lib/i18n/regional";

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
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const [expanded, setExpanded] = useState(false);
  const countries = coverageCountries ?? [...product.countries];
  const exclusions = coverageExclusions ?? [...product.exclusions];
  const preview = countries.slice(0, 8);
  const rest = countries.length - preview.length;

  return (
    <section className="plans-regional-coverage" aria-labelledby="regional-coverage-heading">
      <div className="plans-regional-coverage__head">
        <h2 id="regional-coverage-heading">
          {t(dict, "plansPage.coversN", { n: countries.length })}
        </h2>
        <p>{localizeRegionalProduct(product, locale).heroTagline}</p>
      </div>

      <ul
        className="plans-regional-coverage__chips"
        aria-label={dict.common.countriesCoveredAria}
      >
        {(expanded ? countries : preview).map((country) => (
          <li key={country}>
            <span className="plans-regional-coverage__flag" aria-hidden="true">
              {flagForCountryLabel(country)}
            </span>
            <span>{country}</span>
          </li>
        ))}
        {!expanded && rest > 0 && (
          <li className="plans-regional-coverage__more">
            {t(dict, "common.nMore", { n: rest })}
          </li>
        )}
      </ul>

      {countries.length > preview.length && (
        <button
          type="button"
          className="plans-regional-coverage__toggle"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
        >
          {expanded ? t(dict, "plansPage.showFewer") : t(dict, "plansPage.showMore")}
        </button>
      )}

      {exclusions.length > 0 && (
        <p className="plans-regional-coverage__exclusions">
          {t(dict, "plansPage.notIncluded")}: {exclusions.join(", ")}.
        </p>
      )}
    </section>
  );
}
