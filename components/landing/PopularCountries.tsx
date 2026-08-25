"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  PENDING_PRICE_LABEL,
  useLiveStartingPrices,
} from "@/components/destinations/useLiveStartingPrices";
import { getCountryFlag } from "@/lib/country-flags";
import type { DestinationCard } from "@/lib/destinations-catalog";
import { fetchTrendingCountrySignals } from "@/lib/analytics-api";
import {
  buildHybridPopularCountryIds,
  cardsForPopularIds,
  defaultPopularCountryCards,
  resolvePopularSeason,
} from "@/lib/popular-countries";

export function PopularCountries() {
  const [cards, setCards] = useState<DestinationCard[]>(() =>
    defaultPopularCountryCards(),
  );
  const [seasonLabel, setSeasonLabel] = useState(
    () => resolvePopularSeason().label,
  );
  const livePrices = useLiveStartingPrices(cards.map((card) => card.priceCountryId));

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const season = resolvePopularSeason();
      const trending = await fetchTrendingCountrySignals();
      if (cancelled) return;

      const ids = buildHybridPopularCountryIds({
        season,
        trending,
      });
      setSeasonLabel(season.label);
      setCards(cardsForPopularIds(ids));
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="popular-countries" aria-labelledby="popular-countries-heading">
      <div className="container">
        <h2 id="popular-countries-heading" className="sr-only">
          Popular countries
        </h2>
        <p className="sr-only">
          Showing {seasonLabel} picks mixed with live traveler interest.
        </p>

        <div className="popular-countries__track" role="list">
          {cards.map((card) => {
            const price = livePrices[card.priceCountryId]?.label ?? PENDING_PRICE_LABEL;
            const flag = getCountryFlag(card.priceCountryId);
            return (
              <Link
                key={card.id}
                href={card.href}
                className="popular-country"
                role="listitem"
                aria-label={`View ${card.title} plans, ${price}`}
              >
                <span className="popular-country__flag" aria-hidden="true">
                  {flag}
                </span>
                <span className="popular-country__name">{card.title}</span>
                <span
                  className={`popular-country__price${livePrices[card.priceCountryId] ? "" : " is-pending"}`}
                >
                  {price}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
