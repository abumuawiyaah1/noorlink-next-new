"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  children: ReactNode;
};

export function CountryPlansHero({ src, alt, children }: Props) {
  const [loaded, setLoaded] = useState(false);

  const markLoaded = useCallback(() => setLoaded(true), []);

  // Preloaded/cached images may finish before onLoad attaches.
  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <section className="plans-page__hero" aria-label={alt}>
      <div className={`plans-page__hero-media${loaded ? " is-loaded" : ""}`}>
        {!loaded && <span className="plans-page__hero-shimmer" aria-hidden="true" />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={markLoaded}
          onError={markLoaded}
        />
      </div>
      <div className="plans-page__hero-overlay" aria-hidden="true" />
      <div className="plans-page__hero-content">{children}</div>
    </section>
  );
}
