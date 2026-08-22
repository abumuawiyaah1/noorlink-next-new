#!/usr/bin/env node
/**
 * Scan public/images/destinations/ and regenerate lib/country-images.registry.ts
 *
 * Usage: node scripts/sync-country-images.mjs
 *
 * Add photos as `{country-slug}.jpg` (e.g. russia.jpg, colombia.jpg).
 * Regional-only art: `{name}-regional.jpg` (europe-regional.jpg, etc.)
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
  "thumbnail_option_1.png",
]);

function isCountryPhoto(name) {
  const lower = name.toLowerCase();
  if (SKIP.has(lower)) return false;
  if (!/\.jpe?g$/i.test(lower)) return false;
  if (lower.includes("regional")) return false;
  if (/\d/.test(path.basename(lower, path.extname(lower)))) return false;
  if (lower.includes("unsplash")) return false;
  return true;
}

function isRegionalPhoto(name) {
  const lower = name.toLowerCase();
  return /\.jpe?g$/i.test(lower) && lower.includes("regional") && !/\d/.test(lower);
}

const files = readdirSync(DEST_DIR);
const countryEntries = {};
const regionalEntries = {
  europe: "europe-regional.jpg",
  "asia-pacific": "asia-regional.jpg",
  "middle-east": "middle-east-regional.jpg",
  africa: "middle-east-regional.jpg",
  americas: "usa.jpg",
};

for (const file of files.sort()) {
  if (!isCountryPhoto(file)) continue;
  const slug = path.basename(file, path.extname(file)).toLowerCase();
  countryEntries[slug] = `/images/destinations/${file}`;
}

for (const [key, file] of Object.entries(regionalEntries)) {
  if (files.includes(file)) {
    regionalEntries[key] = `/images/destinations/${file}`;
  }
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
 * Add a photo: drop \`{country-slug}.jpg\` in public/images/destinations/, then sync.
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
console.log(`Updated ${path.relative(ROOT, OUT)}`);
console.log(`  Countries with photos: ${Object.keys(countryEntries).length}`);

const sellable = [
  "usa", "canada", "mexico", "panama", "costa-rica", "bahamas", "jamaica",
  "dominican-republic", "barbados", "trinidad-and-tobago", "puerto-rico",
  "uk", "france", "germany", "italy", "spain", "netherlands", "switzerland",
  "portugal", "austria", "belgium", "ireland", "sweden", "norway", "denmark",
  "finland", "iceland", "malta", "russia",
  "japan", "china", "india", "australia", "singapore", "thailand", "south-korea",
  "indonesia", "malaysia", "philippines", "vietnam", "fiji", "maldives",
  "saudi-arabia", "uae", "qatar", "kuwait", "bahrain", "oman", "turkey",
  "egypt", "jordan", "lebanon",
  "brazil", "argentina", "chile", "colombia", "peru",
  "south-africa", "nigeria", "morocco",
];

const missing = sellable.filter((slug) => !countryEntries[slug]).sort();
if (missing.length) {
  console.log(`\n  Still need photos (${missing.length}):`);
  for (const slug of missing) console.log(`    - ${slug}.jpg`);
} else {
  console.log("\n  All sellable countries have photos.");
}
