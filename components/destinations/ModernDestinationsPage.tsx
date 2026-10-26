"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  DESTINATION_FILTERS,
  filterDestinationCards,
  type DestinationCard,
  type DestinationFilterId,
} from "@/lib/destinations-catalog";
import { DestinationCardMedia } from "@/components/ui/DestinationCardMedia";
import { RegionFlagPreview } from "@/components/ui/RegionFlagPreview";
import { getCountryFlag } from "@/lib/country-flags";
import {
  useLiveStartingPrices,
} from "@/components/destinations/useLiveStartingPrices";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { localizeDestinationCard } from "@/lib/i18n/destinations";
import { getRegionalProductByApiId } from "@/lib/regional-products";
import { fetchTrendingCountrySignals } from "@/lib/analytics-api";
import {
  buildHybridPopularCountryIds,
  cardsForPopularIds,
  defaultPopularCountryCards,
} from "@/lib/popular-countries";
import {
  getRememberedPromo,
  normalizePromoCode,
  rememberPromo,
} from "@/lib/promo-link";
import {
  getRememberedRef,
  normalizeRefCode,
  rememberRef,
  withAttribution,
} from "@/lib/affiliate-link";

type Props = {
  initialQuery?: string;
  initialRegion?: DestinationFilterId;
  initialPromo?: string;
  initialRef?: string;
};

export function ModernDestinationsPage({
  initialQuery = "",
  initialRegion = "all",
  initialPromo = "",
  initialRef = "",
}: Props) {
  const router = useRouter();
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const [query, setQuery] = useState(initialQuery);
  const [region, setRegion] = useState<DestinationFilterId>(initialRegion);
  const [promo, setPromo] = useState(() => normalizePromoCode(initialPromo));
  const [refCode, setRefCode] = useState(() => normalizeRefCode(initialRef));
  const [trendingCards, setTrendingCards] = useState<DestinationCard[]>(() =>
    defaultPopularCountryCards(),
  );

  useEffect(() => {
    const resolved =
      normalizePromoCode(initialPromo) || getRememberedPromo();
    if (resolved) {
      rememberPromo(resolved);
      setPromo(resolved);
    }
  }, [initialPromo]);

  useEffect(() => {
    const resolved = normalizeRefCode(initialRef) || getRememberedRef();
    if (resolved) {
      rememberRef(resolved);
      setRefCode(resolved);
    }
  }, [initialRef]);

  useEffect(() => {
    let cancelled = false;

    async function hydrateTrending() {
      const trending = await fetchTrendingCountrySignals();
      if (cancelled) return;
      const ids = buildHybridPopularCountryIds({ trending });
      setTrendingCards(cardsForPopularIds(ids));
    }

    void hydrateTrending();
    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(() => {
    const trimmed = query.trim();
    // Trending tab = same 8 Popular countries (no regions / Global).
    if (region === "all" && !trimmed) return trendingCards;
    return filterDestinationCards(query, region);
  }, [query, region, trendingCards]);
  const showPopularTitle = region === "all" && !query.trim();
  const livePrices = useLiveStartingPrices(
    cards.map((card) => card.priceCountryId),
  );

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: t(dict, "common.home") },
          { label: t(dict, "nav.destinations") },
        ]}
      />

      <div className="page-header">
        <div className="container">
          <h1>{t(dict, "destinationsPage.title")}</h1>
          <p style={{ opacity: 0.8 }}>{t(dict, "destinationsPage.priceNote")}</p>
        </div>
      </div>

      <div className="search-container">
        <form
          className="search-box"
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (cards[0]) {
              router.push(withAttribution(cards[0].href, { promo, ref: refCode }));
            }
          }}
        >
          <input
            type="search"
            value={query}
            placeholder={t(dict, "destinationsPage.searchPlaceholder")}
            aria-label={t(dict, "destinationsPage.searchPlaceholder")}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" className="search-btn" aria-label={t(dict, "common.search")}>
            🔍
          </button>
        </form>
      </div>

      <div className="container">
        <div className="filter-bar" role="tablist" aria-label={t(dict, "destinationsPage.filterAria")}>
          {DESTINATION_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={region === filter.id}
              className={`filter-btn${region === filter.id ? " active" : ""}`}
              onClick={() => setRegion(filter.id)}
            >
              {filter.id === "all"
                ? `🔥 ${t(dict, `destinationsPage.filters.${filter.id}`)}`
                : t(dict, `destinationsPage.filters.${filter.id}`)}
            </button>
          ))}
        </div>

        {showPopularTitle && (
          <h2 className="dest-popular-title">
            {t(dict, "destinationsPage.popularTitle")}
          </h2>
        )}

        <div className="dest-grid">
          {cards.map((rawCard, index) => {
            const card = localizeDestinationCard(rawCard, locale);
            const livePrice = livePrices[card.priceCountryId];
            const priceLabel = livePrice
              ? t(dict, "destinationsPage.fromPrice", {
                  price: `$${livePrice.amount.toFixed(2)}`,
                })
              : t(dict, "destinationsPage.seePlans");
            const regional = getRegionalProductByApiId(card.priceCountryId);

            return (
              <Link
                key={card.id}
                href={withAttribution(card.href, { promo, ref: refCode })}
                className={`card ${card.className}${regional ? " region-card" : ""}`}
                aria-label={
                  regional
                    ? `${t(dict, "destinationsPage.seePlans")}: ${card.title}, ${priceLabel}`
                    : `${t(dict, "destinationsPage.seePlans")}: ${card.title}, ${priceLabel}`
                }
              >
                <DestinationCardMedia
                  src={card.image}
                  alt={`${card.title} — travel eSIM destination`}
                  priority={index < 3}
                />
                {regional ? (
                  <RegionFlagPreview routeSlug={regional.routeSlug} />
                ) : null}
                <div className="card-body">
                  <h3>
                    <span className="card-flag" aria-hidden="true">
                      {getCountryFlag(card.priceCountryId)}
                    </span>{" "}
                    {card.title}
                  </h3>
                  <p className="card-desc">{card.description}</p>
                  <ul className="card-tips">
                    {card.thingsToDo.slice(0, 3).map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                  <span
                    className={`card-price${livePrice ? "" : " is-pending"}`}
                    aria-busy={!livePrice}
                  >
                    {priceLabel}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {cards.length === 0 && (
          <p style={{ textAlign: "center", padding: "2rem 0", opacity: 0.75 }}>
            {t(dict, "destinationsPage.empty")}
          </p>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
