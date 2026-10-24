"use client";

import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { localizedSeasonLabel } from "@/lib/i18n/popular-stories";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { getPopularStory } from "@/lib/popular-moments";
import { resolvePopularSeason } from "@/lib/popular-countries";
import { normalizeCountrySlug } from "@/lib/country-slugs";

type Props = {
  countryId: string;
  countryName: string;
};

/**
 * Seasonal / festivity story below plan picker — keeps checkout focus on top.
 */
export function PlansPopularStory({ countryId, countryName }: Props) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const season = resolvePopularSeason();
  const slug = normalizeCountrySlug(countryId);
  const aliases: Record<string, string> = {
    "united-kingdom": "uk",
    "united-states": "usa",
    us: "usa",
  };
  const storyId = aliases[slug] ?? slug;
  const story = getPopularStory(storyId, season.id, new Date(), locale);
  const seasonLabel = localizedSeasonLabel(season.id, locale);

  return (
    <section
      className="plans-popular-story"
      aria-labelledby="plans-popular-story-heading"
    >
      <div className="plans-popular-story__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={story.image}
          alt={`${countryName} — ${story.reason}`}
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="plans-popular-story__copy">
        <p className="plans-popular-story__kicker">{seasonLabel}</p>
        <h2 id="plans-popular-story-heading">{story.reason}</h2>
        <p className="plans-popular-story__lead">
          {t(dict, "popular.storyLead", { country: countryName })}
        </p>
        <ul className="plans-popular-story__tips">
          <li>{story.tips[0]}</li>
          <li>{story.tips[1]}</li>
        </ul>
      </div>
    </section>
  );
}
