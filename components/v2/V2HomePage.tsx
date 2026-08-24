"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CompatibilityModal } from "@/components/modals/CompatibilityModal";
import { DeviceChecker } from "@/components/landing/DeviceChecker";
import { CarrierBadgeRow } from "@/components/v2/CarrierBadgeRow";
import { TrustRatingBadge } from "@/components/v2/TrustRatingBadge";
import { V2HeroSearch } from "@/components/v2/V2HeroSearch";
import { V2SiteHeader } from "@/components/v2/V2SiteHeader";
import { previewPath } from "@/lib/v2/preview-paths";

export function V2HomePage() {
  const [compatOpen, setCompatOpen] = useState(false);

  useEffect(() => {
    function onOpen() {
      setCompatOpen(true);
    }
    window.addEventListener("noorlink:open-compatibility", onOpen);
    return () => window.removeEventListener("noorlink:open-compatibility", onOpen);
  }, []);

  return (
    <>
      <V2SiteHeader />
      <main className="v2-main">
        <section className="v2-hero">
          <div className="v2-hero__content">
            <p className="v2-hero__eyebrow">Instant 5G data · No roaming fees</p>
            <h1 className="v2-hero__title">
              Instant 5G Data in Saudi Arabia &amp; Worldwide
            </h1>
            <p className="v2-hero__sub">
              Built for Umrah &amp; Hajj pilgrims and international travelers. eSIM delivered by
              email in minutes — install before you fly.
            </p>
            <V2HeroSearch />
            <CarrierBadgeRow />
            <TrustRatingBadge />
            <div className="v2-hero__ctas">
              <Link href={previewPath("/hajj-umrah")} className="v2-btn v2-btn--accent v2-btn--lg">
                Get Umrah Pass
              </Link>
              <Link href={previewPath("/success?demo=1")} className="v2-btn v2-btn--ghost v2-btn--lg">
                Preview activation UI
              </Link>
            </div>
          </div>
        </section>

        <section className="v2-section v2-trust-strip">
          <ul className="v2-trust-strip__list">
            <li>⚡ Instant eSIM delivery</li>
            <li>📶 Hotspot enabled</li>
            <li>🌍 190+ countries</li>
            <li>💬 24/7 WhatsApp support</li>
          </ul>
        </section>

        <section className="v2-section">
          <h2 className="v2-section__title">How it works</h2>
          <ol className="v2-steps">
            <li>
              <strong>Choose your pass</strong>
              <span>Saudi Umrah, regional, or global data</span>
            </li>
            <li>
              <strong>Pay securely</strong>
              <span>Apple Pay, Google Pay, or card via Stripe</span>
            </li>
            <li>
              <strong>Scan &amp; go</strong>
              <span>QR or one-tap install — no shop visit</span>
            </li>
          </ol>
        </section>

        <section className="v2-section v2-section--muted">
          <DeviceChecker />
        </section>

        <section className="v2-section">
          <h2 className="v2-section__title">Popular corridors</h2>
          <div className="v2-corridor-grid">
            <Link href={previewPath("/hajj-umrah")} className="v2-corridor-card v2-corridor-card--featured">
              <span>🇸🇦</span>
              <strong>Saudi Umrah Pass</strong>
              <p>Lite · Connected · Full Devotion</p>
            </Link>
            <Link href={previewPath("/plans/regional/middle-east")} className="v2-corridor-card">
              <span>🌍</span>
              <strong>Middle East</strong>
              <p>15 countries incl. SA, TR, EG</p>
            </Link>
            <Link href={previewPath("/plans/regional/global")} className="v2-corridor-card">
              <span>🌐</span>
              <strong>Global</strong>
              <p>Worldwide travel data</p>
            </Link>
          </div>
        </section>
      </main>

      <footer className="v2-footer">
        <p>Storefront v2 preview · <Link href="/">Back to live site</Link></p>
      </footer>

      <CompatibilityModal isOpen={compatOpen} onClose={() => setCompatOpen(false)} />
    </>
  );
}
