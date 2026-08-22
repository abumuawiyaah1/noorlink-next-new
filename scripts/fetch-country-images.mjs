#!/usr/bin/env node
/**
 * Download missing country hero photos from Wikimedia Commons (free licenses).
 *
 * Usage: node scripts/fetch-country-images.mjs
 *        node scripts/fetch-country-images.mjs russia colombia  (subset)
 *
 * Then: npm run sync-country-images && npm run optimize-images
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DEST_DIR = path.join(ROOT, "public/images/destinations");
const ATTRIBUTION = path.join(ROOT, "public/images/destinations/ATTRIBUTION.md");

/** slug → Wikimedia search query (landmark / skyline) */
const SEARCH_QUERIES = {
  argentina: "Buenos Aires skyline Argentina",
  australia: "Sydney Opera House harbour",
  austria: "Vienna Austria cityscape",
  bahamas: "Nassau Bahamas beach",
  bahrain: "Manama Bahrain skyline",
  barbados: "Bridgetown Barbados",
  belgium: "Grand Place Brussels",
  chile: "Santiago Chile Andes",
  colombia: "Bogota Colombia skyline",
  "costa-rica": "Arenal Volcano Costa Rica landscape",
  denmark: "Copenhagen Nyhavn",
  "dominican-republic": "Punta Cana Dominican Republic beach",
  egypt: "Pyramids Giza Egypt",
  fiji: "Fiji islands beach",
  finland: "Helsinki Finland harbour",
  iceland: "Reykjavik Iceland",
  india: "Taj Mahal India",
  indonesia: "Bali Indonesia rice terrace",
  ireland: "Dublin Ireland city",
  jamaica: "Montego Bay Jamaica",
  jordan: "Petra Jordan",
  kuwait: "Kuwait City towers",
  lebanon: "Beirut Lebanon",
  malaysia: "Kuala Lumpur Petronas",
  maldives: "Maldives overwater resort",
  malta: "Valletta Malta",
  morocco: "Marrakech Morocco",
  netherlands: "Amsterdam canals Netherlands",
  nigeria: "Lagos Nigeria skyline",
  norway: "Geirangerfjord Norway landscape",
  oman: "Sultan Qaboos Grand Mosque Muscat Oman",
  panama: "Panama City skyline",
  peru: "Machu Picchu Peru",
  philippines: "Manila Philippines bay",
  portugal: "Lisbon Portugal tram",
  "puerto-rico": "San Juan Puerto Rico",
  qatar: "Doha Qatar skyline",
  russia: "Saint Petersburg Russia",
  singapore: "Marina Bay Singapore",
  "south-africa": "Cape Town Table Mountain",
  "south-korea": "Seoul South Korea skyline",
  sweden: "Stockholm Sweden",
  switzerland: "Swiss Alps Matterhorn",
  "trinidad-and-tobago": "Maracas Beach Trinidad",
  vietnam: "Ha Long Bay Vietnam",
};

const SELLABLE = Object.keys(SEARCH_QUERIES);

const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function commonsSearch(query) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: `${query} filetype:bitmap`,
    gsrnamespace: "6",
    gsrlimit: "8",
    prop: "imageinfo",
    iiprop: "url|extmetadata|mime",
    iiurlwidth: "1400",
    format: "json",
    origin: "*",
  });

  const res = await fetch(`${COMMONS_API}?${params}`, {
    headers: { "User-Agent": "NoorLink/1.0 (destination photos; contact@noorlink.co)" },
  });
  if (!res.ok) throw new Error(`Commons API ${res.status}`);
  const data = await res.json();
  const pages = data.query?.pages;
  if (!pages) return null;

  const candidates = Object.values(pages)
    .map((page) => {
      const info = page.imageinfo?.[0];
      if (!info?.thumburl) return null;
      const mime = info.mime ?? "";
      if (!mime.startsWith("image/")) return null;
      if (mime.includes("svg") || mime.includes("gif")) return null;
      const license =
        info.extmetadata?.LicenseShortName?.value ??
        info.extmetadata?.UsageTerms?.value ??
        "See Wikimedia Commons";
      return {
        title: page.title?.replace(/^File:/, "") ?? query,
        url: info.thumburl,
        license: license.replace(/<[^>]+>/g, "").trim(),
        width: info.thumbwidth ?? 0,
        height: info.thumbheight ?? 0,
      };
    })
    .filter(Boolean)
    .filter((c) => c.width >= 800 && c.height >= 500)
    .sort((a, b) => b.width * b.height - a.width * a.height);

  return candidates[0] ?? null;
}

async function downloadImage(url, destPath) {
  const res = await fetch(url, {
    headers: { "User-Agent": "NoorLink/1.0 (destination photos; contact@noorlink.co)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Download failed ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(destPath, buf);

  try {
    execFileSync("sips", ["-Z", "1200", "-s", "format", "jpeg", "-s", "formatOptions", "80", destPath, "--out", destPath], {
      stdio: "pipe",
    });
  } catch {
    // Keep original if sips fails (non-macOS).
  }
}

function loadAttribution() {
  if (!existsSync(ATTRIBUTION)) {
    return "# Destination photo credits (Wikimedia Commons)\n\n";
  }
  return readFileSync(ATTRIBUTION, "utf8");
}

function appendAttribution(slug, entry) {
  const header = `# Destination photo credits (Wikimedia Commons)\n\n`;
  let body = loadAttribution();
  if (!body.startsWith("#")) body = header + body;
  const line = `- **${slug}.jpg** — ${entry.title} ([Commons](https://commons.wikimedia.org/wiki/File:${encodeURIComponent(entry.title.replace(/ /g, "_"))})) — ${entry.license}\n`;
  const lineRe = new RegExp(`^- \\*\\*${slug}\\.jpg\\*\\* —.*\\n`, "m");
  if (lineRe.test(body)) {
    body = body.replace(lineRe, line);
  } else {
    body += line;
  }
  writeFileSync(ATTRIBUTION, body);
}

async function fetchOne(slug, force = false) {
  const out = path.join(DEST_DIR, `${slug}.jpg`);
  if (existsSync(out) && !force) {
    console.log(`  skip ${slug} (exists)`);
    return { slug, status: "skipped" };
  }

  const query = SEARCH_QUERIES[slug];
  if (!query) {
    console.log(`  skip ${slug} (no query)`);
    return { slug, status: "no-query" };
  }

  try {
    const hit = await commonsSearch(query);
    if (!hit) {
      console.log(`  fail ${slug} (no Commons result)`);
      return { slug, status: "not-found" };
    }

    await downloadImage(hit.url, out);
    appendAttribution(slug, hit);
    console.log(`  ok   ${slug} ← ${hit.title.slice(0, 60)}`);
    return { slug, status: "ok", title: hit.title };
  } catch (err) {
    console.log(`  fail ${slug}: ${err.message}`);
    return { slug, status: "error", error: err.message };
  }
}

async function main() {
  mkdirSync(DEST_DIR, { recursive: true });
  const force = process.argv.includes("--force");
  const args = process.argv.slice(2).filter((a) => a !== "--force");
  const targets = args.length > 0 ? args.filter((s) => SEARCH_QUERIES[s]) : SELLABLE;

  if (targets.length === 0) {
    console.error("No valid slugs. Example: node scripts/fetch-country-images.mjs russia");
    process.exit(1);
  }

  console.log(`Fetching ${targets.length} country photos from Wikimedia Commons…\n`);
  const results = [];

  for (const slug of targets) {
    results.push(await fetchOne(slug, force));
    await sleep(350);
  }

  const ok = results.filter((r) => r.status === "ok").length;
  const failed = results.filter((r) => r.status === "not-found" || r.status === "error");
  console.log(`\nDone: ${ok} downloaded, ${failed.length} failed, ${results.filter((r) => r.status === "skipped").length} skipped`);
  if (failed.length) {
    console.log("\nRetry manually or adjust SEARCH_QUERIES for:");
    for (const f of failed) console.log(`  - ${f.slug}`);
  }
  console.log("\nNext: npm run sync-country-images && npm run optimize-images");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
