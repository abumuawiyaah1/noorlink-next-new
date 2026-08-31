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
        <h1>Install before you fly.</h1>
        <p>
          High-speed eSIM data in 190+ countries — ready when you land, with no
          physical SIM swap.
        </p>
        <HeroSearch />
      </div>
    </section>
  );
}
