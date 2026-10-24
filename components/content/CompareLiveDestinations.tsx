"use client";

import Link from "next/link";
import { useLiveStartingPrices } from "@/components/destinations/useLiveStartingPrices";
import { getCountryFlag } from "@/lib/country-flags";
import { DESTINATION_CARDS } from "@/lib/destinations-catalog";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";

const COMPARE_DESTINATION_IDS = ["saudi-arabia", "turkey", "egypt"] as const;

export function CompareLiveDestinations() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const c = dict.comparePage;

  const cards = COMPARE_DESTINATION_IDS.map((id) =>
    DESTINATION_CARDS.find((card) => card.id === id),
  ).filter((card): card is (typeof DESTINATION_CARDS)[number] => Boolean(card));

  const livePrices = useLiveStartingPrices(
    cards.map((card) => card.priceCountryId),
  );

  return (
    <section
      id="live-plans"
      className="esim-compare-plans"
      aria-labelledby="esim-compare-plans-heading"
    >
      <div className="content-section-head">
        <span className="content-kicker">{c.liveKicker}</span>
        <h2 id="esim-compare-plans-heading">{c.liveTitle}</h2>
        <p>{c.liveLede}</p>
      </div>

      <div className="esim-compare-plans__grid">
        {cards.map((card) => {
          const price =
            livePrices[card.priceCountryId]?.label ??
            card.priceLabel ??
            dict.common.seePlans;
          const hasLive = Boolean(livePrices[card.priceCountryId]);
          const flag = getCountryFlag(card.priceCountryId);
          const blurb =
            card.id === "saudi-arabia" ? c.saudiBlurb : card.description;

          return (
            <Link
              key={card.id}
              href={localizedPath(card.href, locale)}
              className="esim-compare-plans__card"
              aria-label={t(dict, "comparePage.plansAria", {
                title: card.title,
                price,
              })}
            >
              <span className="esim-compare-plans__flag" aria-hidden="true">
                {flag}
              </span>
              <strong>{card.title}</strong>
              <span className="esim-compare-plans__blurb">{blurb}</span>
              <span
                className={`esim-compare-plans__price${hasLive ? "" : " is-pending"}`}
              >
                {price}
              </span>
            </Link>
          );
        })}
      </div>

      <p className="esim-compare-plans__more">
        <Link href={localizedPath("/destinations", locale)}>
          {c.browseAllDestinations}
        </Link>
      </p>
    </section>
  );
}
