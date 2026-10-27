"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLiveStartingPrices } from "@/components/destinations/useLiveStartingPrices";
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
import { formatMoneyLabel } from "@/lib/currency/format";
import { useCurrency } from "@/lib/currency/use-currency";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { localizedSeasonLabel } from "@/lib/i18n/popular-stories";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { localizedPath } from "@/lib/i18n/path";
import { localizeDestinationCard } from "@/lib/i18n/destinations";
import type { Locale } from "@/lib/i18n/config";

type PopularCard = DestinationCard & { reason: string };

function withReasons(
  cards: DestinationCard[],
  seasonId: PopularSeasonId,
  locale: Locale,
): PopularCard[] {
  return cards.map((card) => ({
    ...card,
    reason: getPopularStory(card.id, seasonId, new Date(), locale).reason,
    href: localizedPath(card.href, locale),
  }));
}

export function PopularCountries() {
  const [locale] = useLocaleState();
  const { currency, rates } = useCurrency();
  const dict = getDictionary(locale);
  const season = resolvePopularSeason();
  const [cards, setCards] = useState<PopularCard[]>(() =>
    withReasons(defaultPopularCountryCards(), season.id, locale),
  );
  const [seasonLabel, setSeasonLabel] = useState(
    localizedSeasonLabel(season.id, locale),
  );
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
      setSeasonLabel(localizedSeasonLabel(nextSeason.id, locale));
      setCards(withReasons(cardsForPopularIds(ids), nextSeason.id, locale));
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <section className="popular-countries" aria-labelledby="popular-countries-heading">
      <div className="container">
        <div className="popular-countries__header">
          <span className="why-kicker">{t(dict, "popular.seasonPicks", { season: seasonLabel })}</span>
          <h2 id="popular-countries-heading">{dict.popular.title}</h2>
        </div>

        <div className="popular-countries__grid" role="list">
          {cards.map((rawCard, index) => {
            const card = localizeDestinationCard(rawCard, locale);
            const live = livePrices[card.priceCountryId];
            const price = live
              ? t(dict, "destinationsPage.fromPrice", {
                  price: formatMoneyLabel(live.amount, currency, rates, locale),
                })
              : dict.common.seePlans;
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
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index < 4 ? "high" : "auto"}
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
