"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { localizeRegionalProduct } from "@/lib/i18n/regional";
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

const REGION_FILL: Record<MapRegionSlug, string> = {
  "north-america": "#0f3d3e",
  "south-america": "#1f6f70",
  europe: "#148a8c",
  africa: "#ffad5a",
  "middle-east": "#ff9500",
  "asia-pacific": "#e68600",
};

/** Shared with regional plan cards so map + squares stay in sync. */
export const REGION_BRAND_COLORS: Record<MapRegionSlug | "global", string> = {
  ...REGION_FILL,
  global: "linear-gradient(135deg, #0f3d3e, #ff9500)",
};

const REGION_LABELS: Record<
  MapRegionSlug,
  { x: number; y: number }
> = {
  "north-america": { x: 190, y: 200 },
  "south-america": { x: 270, y: 420 },
  europe: { x: 490, y: 165 },
  africa: { x: 505, y: 330 },
  "middle-east": { x: 575, y: 245 },
  "asia-pacific": { x: 740, y: 230 },
};

export function RegionalWorldMap() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const regionalUi = dict.regional;
  const reactId = useId();
  const titleId = `${reactId}-map-title`;
  const [active, setActive] = useState<MapRegionSlug | "global" | null>(null);

  const previewSlug: RegionalRouteSlug =
    active && active !== "global" ? active : "europe";
  const preview = localizeRegionalProduct(REGIONAL_PRODUCTS[previewSlug], locale);
  const globalProduct = localizeRegionalProduct(REGIONAL_PRODUCTS.global, locale);
  const isGlobal = active === "global";

  return (
    <div className="regional-map">
      <div className="regional-map__canvas" role="group" aria-labelledby={titleId}>
        <p id={titleId} className="sr-only">
          {regionalUi.mapAria}
        </p>
        <svg
          className="regional-map__svg regional-map__svg--geo"
          viewBox={WORLD_MAP_VIEWBOX}
          role="img"
          aria-label={regionalUi.mapSvgAria}
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
                aria-label={t(dict, "regional.regionAria", {
                  name: regionalUi.regionNames[slug],
                  n: product.countries.length,
                })}
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
                  {regionalUi.regionNames[slug]}
                </text>
              </a>
            );
          })}

          <a
            href={plansPathForRegion("global")}
            className={`regional-map__global${isGlobal ? " is-active" : ""}`}
            aria-label={regionalUi.globalAria}
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
              {regionalUi.global}
            </text>
            <text
              x="860"
              y="559"
              textAnchor="middle"
              className="regional-map__global-sub"
            >
              193
            </text>
          </a>
        </svg>
      </div>

      <aside className="regional-map__panel" aria-live="polite">
        {isGlobal ? (
          <>
            <span className="regional-map__panel-kicker">{regionalUi.multiRegion}</span>
            <h3>{globalProduct.displayName}</h3>
            <p>{globalProduct.heroTagline}</p>
            <p className="regional-map__panel-meta">
              {t(dict, "regional.covers", {
                n: globalProduct.countries.length,
              })}
            </p>
            <Link
              href={plansPathForRegion("global")}
              className="regional-map__panel-cta"
            >
              {regionalUi.seeGlobalPlans}
            </Link>
          </>
        ) : (
          <>
            <span className="regional-map__panel-kicker">
              {active ? regionalUi.selectedRegion : regionalUi.tapRegion}
            </span>
            <h3>
              {preview.flag} {preview.displayName}
            </h3>
            <p>{preview.heroTagline}</p>
            <p className="regional-map__panel-meta">
              {t(dict, "regional.covers", { n: preview.countries.length })}
            </p>
            <Link
              href={plansPathForRegion(preview.routeSlug)}
              className="regional-map__panel-cta"
            >
              {t(dict, "regional.seePlans", {
                region: regionalUi.regionNames[previewSlug],
              })}
            </Link>
          </>
        )}
      </aside>
    </div>
  );
}
