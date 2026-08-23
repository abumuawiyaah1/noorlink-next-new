"use client";

import Link from "next/link";
import { useId, useState } from "react";
import {
  plansPathForRegion,
  REGIONAL_PRODUCTS,
  type RegionalRouteSlug,
} from "@/lib/regional-products";
import {
  WORLD_MAP_OTHER_PATHS,
  WORLD_MAP_REGION_PATHS,
  WORLD_MAP_VIEWBOX,
  type MapRegionSlug,
} from "@/components/landing/world-map-paths";

const MAP_REGIONS = [
  "north-america",
  "south-america",
  "europe",
  "africa",
  "middle-east",
  "asia-pacific",
] as const satisfies readonly MapRegionSlug[];

/** Classic world-regions palette (readable, not brand-purple). */
const REGION_FILL: Record<MapRegionSlug, string> = {
  "north-america": "#e8a090",
  "south-america": "#5f9e6e",
  europe: "#6b5b95",
  africa: "#c4a35a",
  "middle-east": "#d9786a",
  "asia-pacific": "#4a9e9a",
};

const REGION_LABELS: Record<
  MapRegionSlug,
  { x: number; y: number; short: string }
> = {
  "north-america": { x: 190, y: 200, short: "North America" },
  "south-america": { x: 270, y: 420, short: "South America" },
  europe: { x: 490, y: 165, short: "Europe" },
  africa: { x: 505, y: 330, short: "Africa" },
  "middle-east": { x: 575, y: 245, short: "Middle East" },
  "asia-pacific": { x: 740, y: 230, short: "Asia Pacific" },
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
          Interactive world regions map for NoorLink eSIM plans. Select a
          colored region to view multi-country coverage.
        </p>
        <svg
          className="regional-map__svg regional-map__svg--geo"
          viewBox={WORLD_MAP_VIEWBOX}
          role="img"
          aria-label="World regions map of regional eSIM coverage"
        >
          <defs>
            <filter id={`${reactId}-glow`} x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodColor="#05191a"
                floodOpacity="0.25"
              />
            </filter>
          </defs>

          <rect x="0" y="0" width="950" height="620" fill="#f4f7f8" rx="0" />

          {/* Unassigned land (muted) */}
          <g className="regional-map__other" aria-hidden="true">
            {WORLD_MAP_OTHER_PATHS.map((path) => (
              <path key={path.id} d={path.d} className="regional-map__other-shape" />
            ))}
          </g>

          {MAP_REGIONS.map((slug) => {
            const product = REGIONAL_PRODUCTS[slug];
            const label = REGION_LABELS[slug];
            const isActive = active === slug;
            const fill = REGION_FILL[slug];

            return (
              <a
                key={slug}
                href={plansPathForRegion(slug)}
                className={`regional-map__hit regional-map__hit--geo${isActive ? " is-active" : ""}`}
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
                <g filter={isActive ? `url(#${reactId}-glow)` : undefined}>
                  {WORLD_MAP_REGION_PATHS[slug].map((path) => (
                    <path
                      key={path.id}
                      d={path.d}
                      className="regional-map__geo-shape"
                      fill={isActive ? "var(--accent)" : fill}
                    />
                  ))}
                </g>
                <text
                  x={label.x}
                  y={label.y}
                  className="regional-map__geo-label"
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
            <circle cx="860" cy="545" r="48" className="regional-map__global-ring" />
            <circle cx="860" cy="545" r="36" className="regional-map__global-core" />
            <text
              x="860"
              y="541"
              textAnchor="middle"
              className="regional-map__global-title"
            >
              Global
            </text>
            <text
              x="860"
              y="559"
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
              {active ? "Selected region" : "Tap a region on the map"}
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
