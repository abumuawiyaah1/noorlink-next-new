#!/usr/bin/env node
/**
 * Scan public/images/destinations/ and regenerate lib/country-images.registry.ts
 *
 * Usage: node scripts/sync-country-images.mjs
 *
 * Prefer WebP cards. Add photos as `{country-slug}.webp` (or .jpg then run
 * `node scripts/optimize-critical-images.mjs` / destination WebP batch).
 * Regional-only art: `{name}-regional.webp`
 */
import { readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DEST_DIR = path.join(ROOT, "public/images/destinations");
const OUT = path.join(ROOT, "lib/country-images.registry.ts");

const SKIP = new Set([
  "placeholder.jpg",
  "placeholder.webp",
  "thumbnail_option_1.png",
  "thumbnail_option_1.webp",
]);

function baseSlug(name) {
  return path.basename(name, path.extname(name)).toLowerCase();
}

function isCountryPhoto(name) {
  const lower = name.toLowerCase();
  if (SKIP.has(lower)) return false;
  if (!/\.(jpe?g|webp)$/i.test(lower)) return false;
  if (lower.includes("regional")) return false;
  if (/\d/.test(baseSlug(lower))) return false;
  if (lower.includes("unsplash")) return false;
  return true;
}

function isRegionalPhoto(name) {
  const lower = name.toLowerCase();
  return (
    /\.(jpe?g|webp)$/i.test(lower) &&
    lower.includes("regional") &&
    !/\d/.test(baseSlug(lower))
  );
}

/** Prefer .webp over .jpg when both exist. */
function pickBest(filesBySlug) {
  const out = {};
  for (const [slug, files] of Object.entries(filesBySlug)) {
    const webp = files.find((f) => f.toLowerCase().endsWith(".webp"));
    out[slug] = `/images/destinations/${webp ?? files[0]}`;
  }
  return out;
}

const files = readdirSync(DEST_DIR);
const countryFiles = {};
const regionalFiles = {};

for (const file of files.sort()) {
  if (isCountryPhoto(file)) {
    const slug = baseSlug(file);
    (countryFiles[slug] ??= []).push(file);
  } else if (isRegionalPhoto(file)) {
    const slug = baseSlug(file).replace(/-regional$/, "");
    (regionalFiles[slug] ??= []).push(file);
  }
}

const countryEntries = pickBest(countryFiles);
const regionalRaw = pickBest(regionalFiles);

const regionalEntries = {
  caribbean: regionalRaw.caribbean,
  africa: regionalRaw.africa,
  americas: regionalRaw["north-america"] ?? regionalRaw.americas,
  "north-america": regionalRaw["north-america"],
  "asia-pacific": regionalRaw["asia-pacific"] ?? regionalRaw.asia,
  europe: regionalRaw.europe,
  "middle-east": regionalRaw["middle-east"],
  "south-america": regionalRaw["south-america"],
  global: regionalRaw.global,
};

// Drop undefined keys
for (const key of Object.keys(regionalEntries)) {
  if (!regionalEntries[key]) delete regionalEntries[key];
}

function formatRecord(record) {
  return Object.entries(record)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, src]) => `  ${JSON.stringify(slug)}: ${JSON.stringify(src)},`)
    .join("\n");
}

const content = `/**
 * Country photo registry — synced from public/images/destinations/.
 * Run: node scripts/sync-country-images.mjs
 *
 * Add a photo: drop \`{country-slug}.webp\` (or .jpg) in public/images/destinations/, then sync.
 */
export const COUNTRY_IMAGE_REGISTRY: Record<string, string> = {
${formatRecord(countryEntries)}
};

/** Regional multi-country products only — never used as a stand-in for a single country. */
export const REGIONAL_IMAGE_REGISTRY: Record<string, string> = {
${formatRecord(regionalEntries)}
};
`;

writeFileSync(OUT, content);
console.log(
  `Wrote ${Object.keys(countryEntries).length} countries + ${Object.keys(regionalEntries).length} regionals → ${path.relative(ROOT, OUT)}`,
);
