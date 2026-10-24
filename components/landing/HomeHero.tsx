"use client";

import { HeroSearch } from "@/components/landing/HeroSearch";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { SITE_IMAGES } from "@/lib/site-images";

export function HomeHero() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);

  return (
    <section className="hero">
      <picture className="hero__media" aria-hidden="true">
        <source
          media="(max-width: 768px)"
          srcSet={SITE_IMAGES.heroMobile}
          type="image/webp"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero__img"
          src={SITE_IMAGES.hero}
          alt=""
          width={1600}
          height={1600}
          decoding="async"
          fetchPriority="high"
        />
      </picture>
      <div className="hero__overlay" aria-hidden="true" />
      <div className="container hero-content">
        <p className="hero-brand" aria-label="NoorLink">
          <span className="hero-brand__noor">Noor</span>
          <span className="hero-brand__link">Link</span>
        </p>
        <p className="hero-kicker">{dict.home.kicker}</p>
        <h1>
          {dict.home.headlineLine1}
          <br />
          {dict.home.headlineLine2}
        </h1>
        <p className="hero-lede">{dict.home.lede}</p>
        <HeroSearch />
      </div>
    </section>
  );
}
