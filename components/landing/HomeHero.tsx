import { HeroSearch } from "@/components/landing/HeroSearch";
import { SITE_IMAGES } from "@/lib/site-images";

export function HomeHero() {
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
        <p className="hero-kicker">Install before you fly.</p>
        <h1>
          Stay Connected,
          <br />
          No Matter Where You Are.
        </h1>
        <p className="hero-lede">
          High-speed eSIM data in 190+ countries — ready when you land.
          <br />
          Hassle-free travel, skip the kiosk, roaming, and hidden fees, and keep
          your number.
        </p>
        <HeroSearch />
      </div>
    </section>
  );
}
