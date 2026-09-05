"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  PENDING_PRICE_LABEL,
  useLiveStartingPrices,
} from "@/components/destinations/useLiveStartingPrices";
import { getCountryFlag } from "@/lib/country-flags";
import { destinationCardSrcSet } from "@/lib/country-images";
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
        <div className="popular-countries__header">
          <span className="why-kicker">{seasonLabel} picks</span>
          <h2 id="popular-countries-heading">Popular destinations</h2>
          <p>Seasonal favorites mixed with where travelers are looking right now.</p>
        </div>

        <div className="popular-countries__track" role="list">
          {cards.map((card, index) => {
            const price = livePrices[card.priceCountryId]?.label ?? PENDING_PRICE_LABEL;
            const flag = getCountryFlag(card.priceCountryId);
            const image = destinationCardSrcSet(card.image);
            return (
              <Link
                key={card.id}
                href={card.href}
                className="popular-country"
                role="listitem"
                aria-label={`View ${card.title} plans, ${price}`}
              >
                <div className="popular-country__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="popular-country__img"
                    src={image.src}
                    srcSet={image.srcSet}
                    sizes="(max-width: 768px) 42vw, 160px"
                    alt={`${card.title} travel destination`}
                    width={400}
                    height={400}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index < 2 ? "high" : "auto"}
                  />
                  <span className="popular-country__flag" aria-hidden="true">
                    {flag}
                  </span>
                </div>
                <div className="popular-country__body">
                  <span className="popular-country__name">{card.title}</span>
                  <span
                    className={`popular-country__price${livePrices[card.priceCountryId] ? "" : " is-pending"}`}
                  >
                    {price}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
