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
  type PopularSeasonId,
} from "@/lib/popular-countries";
import { getPopularStory } from "@/lib/popular-moments";

type PopularCard = DestinationCard & { reason: string };

function withReasons(
  cards: DestinationCard[],
  seasonId: PopularSeasonId,
): PopularCard[] {
  return cards.map((card) => ({
    ...card,
    reason: getPopularStory(card.id, seasonId).reason,
  }));
}

export function PopularCountries() {
  const season = resolvePopularSeason();
  const [cards, setCards] = useState<PopularCard[]>(() =>
    withReasons(defaultPopularCountryCards(), season.id),
  );
  const [seasonLabel, setSeasonLabel] = useState(season.label);
  const livePrices = useLiveStartingPrices(cards.map((card) => card.priceCountryId));

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const nextSeason = resolvePopularSeason();
      const trending = await fetchTrendingCountrySignals();
      if (cancelled) return;

      const ids = buildHybridPopularCountryIds({
        season: nextSeason,
        trending,
      });
      setSeasonLabel(nextSeason.label);
      setCards(withReasons(cardsForPopularIds(ids), nextSeason.id));
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
          <p>
            Eight countries worth opening right now — tap one to see plans.
          </p>
        </div>

        <div className="popular-countries__grid" role="list">
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
                aria-label={`View ${card.title} plans, ${card.reason}, ${price}`}
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
                  <span className="popular-country__reason-peek">{card.reason}</span>
                </div>
                <div className="popular-country__body">
                  <span className="popular-country__name">{card.title}</span>
                  <span className="popular-country__reason">{card.reason}</span>
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
