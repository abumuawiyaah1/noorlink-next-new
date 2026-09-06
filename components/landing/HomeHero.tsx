"use client";

import { HeroSearch } from "@/components/landing/HeroSearch";

export function HomeHero() {
  return (
    <section className="hero">
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
          <span className="hero-lede__short">
            High-speed eSIM data in 190+ countries — ready when you land.
          </span>
          <span className="hero-lede__full">
            High-speed eSIM data in 190+ countries — ready when you land.
            <br />
            Hassle-free travel, skip the kiosk, roaming, and hidden fees, and keep
            your number.
          </span>
        </p>
        <HeroSearch />
      </div>
    </section>
  );
}
