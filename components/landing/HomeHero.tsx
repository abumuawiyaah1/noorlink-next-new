"use client";

import { HeroSearch } from "@/components/landing/HeroSearch";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";

export function HomeHero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <h1>
          Stay Connected,
          <br />
          No Matter Where You Are.
        </h1>
        <p>
          Enjoy hassle-free travel. Instant high-speed data in 190+ countries —
          no physical SIM required.
        </p>
        <HeroSearch />
        <div className="trust-badges">
          <div className="trust-pill">
            <i className="fas fa-bolt" aria-hidden="true" /> Instant delivery
          </div>
          <div className="trust-pill">
            <i className="fas fa-globe" aria-hidden="true" /> 190+ countries
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="trust-pill trust-link"
          >
            <i className="fab fa-whatsapp" aria-hidden="true" /> 24/7 support
          </a>
        </div>
      </div>
    </section>
  );
}
