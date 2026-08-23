"use client";

import Link from "next/link";
import { useId, useState } from "react";
import {
  plansPathForRegion,
  REGIONAL_PRODUCTS,
  type RegionalRouteSlug,
} from "@/lib/regional-products";

/** Map-facing regions (Global is a separate CTA). */
const MAP_REGIONS = [
  "north-america",
  "south-america",
  "europe",
  "africa",
  "middle-east",
  "asia-pacific",
] as const satisfies readonly RegionalRouteSlug[];

type MapRegionSlug = (typeof MAP_REGIONS)[number];

/**
 * Simplified continent silhouettes for a brand-first 2D map.
 * Paths are stylized for recognition, not geographic precision.
 */
const REGION_PATHS: Record<MapRegionSlug, string> = {
  "north-america":
    "M148 72 L210 58 L268 72 L292 98 L278 138 L248 168 L218 188 L188 208 L158 228 L138 248 L112 228 L98 188 L108 148 L128 108 Z M188 228 L208 248 L198 268 L168 258 L158 238 Z",
  "south-america":
    "M218 278 L248 268 L268 298 L278 348 L258 408 L228 448 L208 428 L198 378 L188 328 L198 298 Z",
  europe:
    "M448 78 L498 68 L538 88 L548 118 L528 148 L498 158 L468 148 L448 128 L438 98 Z M468 148 L478 168 L458 178 L448 158 Z",
  africa:
    "M458 188 L508 178 L548 198 L568 248 L558 318 L528 368 L488 388 L458 358 L448 298 L448 238 Z",
  "middle-east":
    "M548 148 L588 138 L618 158 L628 198 L608 228 L568 218 L548 188 Z",
  "asia-pacific":
    "M628 78 L718 58 L808 78 L868 118 L888 168 L868 208 L808 228 L748 218 L688 198 L648 168 L628 128 Z M788 248 L838 238 L868 268 L848 298 L808 288 L788 268 Z M808 328 L848 318 L868 348 L848 368 L818 358 Z",
};

const REGION_LABELS: Record<
  MapRegionSlug,
  { x: number; y: number; short: string }
> = {
  "north-america": { x: 188, y: 148, short: "N. America" },
  "south-america": { x: 228, y: 358, short: "S. America" },
  europe: { x: 488, y: 108, short: "Europe" },
  africa: { x: 508, y: 278, short: "Africa" },
  "middle-east": { x: 588, y: 178, short: "Middle East" },
  "asia-pacific": { x: 758, y: 148, short: "Asia Pacific" },
};

export function RegionalWorldMap() {
  const reactId = useId();
  const titleId = `${reactId}-map-title`;
  const [active, setActive] = useState<MapRegionSlug | "global" | null>(null);

  const previewSlug: RegionalRouteSlug =
    active && active !== "global" ? active : "europe";
  const preview = REGIONAL_PRODUCTS[previewSlug];
  const isGlobal = active === "global";

  return (
    <div className="regional-map">
      <div className="regional-map__canvas" role="group" aria-labelledby={titleId}>
        <p id={titleId} className="sr-only">
          Interactive map of NoorLink regional eSIM plans. Select a region to
          view multi-country coverage.
        </p>
        <svg
          className="regional-map__svg"
          viewBox="0 0 1000 500"
          role="img"
          aria-label="World map of regional eSIM coverage"
        >
          <defs>
            <linearGradient id={`${reactId}-ocean`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e8f2f2" />
              <stop offset="100%" stopColor="#f7fafb" />
            </linearGradient>
            <filter id={`${reactId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="6"
                floodColor="#0f3d3e"
                floodOpacity="0.18"
              />
            </filter>
          </defs>

          <rect
            x="0"
            y="0"
            width="1000"
            height="500"
            rx="28"
            fill={`url(#${reactId}-ocean)`}
          />

          <g opacity="0.18" stroke="#0f3d3e" strokeWidth="1" fill="none">
            <path d="M40 120 H960" />
            <path d="M40 250 H960" />
            <path d="M40 380 H960" />
          </g>

          {MAP_REGIONS.map((slug) => {
            const product = REGIONAL_PRODUCTS[slug];
            const label = REGION_LABELS[slug];
            const isActive = active === slug;

            return (
              <a
                key={slug}
                href={plansPathForRegion(slug)}
                className={`regional-map__hit${isActive ? " is-active" : ""}`}
                aria-label={`${product.displayName} — ${product.countries.length} countries`}
                onMouseEnter={() => setActive(slug)}
                onFocus={() => setActive(slug)}
                onMouseLeave={() =>
                  setActive((current) => (current === slug ? null : current))
                }
                onBlur={() =>
                  setActive((current) => (current === slug ? null : current))
                }
              >
                <path
                  d={REGION_PATHS[slug]}
                  className="regional-map__shape"
                  filter={isActive ? `url(#${reactId}-glow)` : undefined}
                />
                <text
                  x={label.x}
                  y={label.y}
                  className="regional-map__label"
                  textAnchor="middle"
                >
                  {label.short}
                </text>
              </a>
            );
          })}

          <a
            href={plansPathForRegion("global")}
            className={`regional-map__global${isGlobal ? " is-active" : ""}`}
            aria-label="Global Regional eSIM — multi-region coverage"
            onMouseEnter={() => setActive("global")}
            onFocus={() => setActive("global")}
            onMouseLeave={() =>
              setActive((current) => (current === "global" ? null : current))
            }
            onBlur={() =>
              setActive((current) => (current === "global" ? null : current))
            }
          >
            <circle cx="900" cy="420" r="48" className="regional-map__global-ring" />
            <circle cx="900" cy="420" r="36" className="regional-map__global-core" />
            <text
              x="900"
              y="416"
              textAnchor="middle"
              className="regional-map__global-title"
            >
              Global
            </text>
            <text
              x="900"
              y="434"
              textAnchor="middle"
              className="regional-map__global-sub"
            >
              100+
            </text>
          </a>
        </svg>
      </div>

      <aside className="regional-map__panel" aria-live="polite">
        {isGlobal ? (
          <>
            <span className="regional-map__panel-kicker">Multi-region</span>
            <h3>{REGIONAL_PRODUCTS.global.displayName}</h3>
            <p>{REGIONAL_PRODUCTS.global.heroTagline}</p>
            <p className="regional-map__panel-meta">
              {REGIONAL_PRODUCTS.global.countries.length}+ featured destinations
            </p>
            <Link
              href={plansPathForRegion("global")}
              className="regional-map__panel-cta"
            >
              See Global plans →
            </Link>
          </>
        ) : (
          <>
            <span className="regional-map__panel-kicker">
              {active ? "Selected region" : "Start with a region"}
            </span>
            <h3>
              {preview.flag} {preview.displayName}
            </h3>
            <p>{preview.heroTagline}</p>
            <p className="regional-map__panel-meta">
              Covers {preview.countries.length} countries · One QR
            </p>
            <Link
              href={plansPathForRegion(preview.routeSlug)}
              className="regional-map__panel-cta"
            >
              See {preview.shortName} plans →
            </Link>
          </>
        )}
      </aside>
    </div>
  );
}
