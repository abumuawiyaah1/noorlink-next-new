#!/usr/bin/env node
/**
 * Download missing country hero photos from Wikimedia Commons (free licenses).
 *
 * Usage: node scripts/fetch-country-images.mjs
 *        node scripts/fetch-country-images.mjs kenya ghana  (subset)
 *        node scripts/fetch-country-images.mjs --missing     (only slugs without a photo)
 *
 * Then: npm run sync-country-images && npm run optimize-images
 *
 * Goal: keep a deep photo library so any sellable country can show a real place
 * image (backend can originate plans for many countries; UI should not look empty).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DEST_DIR = path.join(ROOT, "public/images/destinations");
const ATTRIBUTION = path.join(ROOT, "public/images/destinations/ATTRIBUTION.md");

/** slug → Wikimedia search query (landmark / skyline / place atmosphere) */
const SEARCH_QUERIES = {
  // Americas
  argentina: "Buenos Aires skyline Argentina",
  aruba: "Eagle Beach Aruba",
  bahamas: "Nassau Bahamas beach",
  barbados: "Bridgetown Barbados",
  belize: "Caye Caulker Belize Barrier Reef Aerial",
  bolivia: "La Paz Bolivia city",
  brazil: "Rio de Janeiro Brazil Sugarloaf",
  "cayman-islands": "Grand Cayman Seven Mile Beach",
  canada: "Toronto Canada skyline",
  chile: "Santiago Chile Andes",
  colombia: "Cartagena Colombia old city",
  "costa-rica": "Arenal Volcano Costa Rica landscape",
  "dominican-republic": "Punta Cana Dominican Republic beach",
  ecuador: "Quito Ecuador historic center",
  guatemala: "Semuc Champey Guatemala",
  honduras: "West Bay Beach Roatan Honduras",
  jamaica: "Montego Bay Jamaica beach",
  mexico: "Mexico City Zocalo",
  panama: "Panama City skyline",
  paraguay: "Asuncion Paraguay",
  peru: "Machu Picchu Peru",
  "puerto-rico": "San Juan Puerto Rico",
  "trinidad-and-tobago": "Maracas Beach Trinidad",
  uruguay: "Montevideo Uruguay",
  usa: "New York City skyline Manhattan",
  venezuela: "Caracas Venezuela",

  // Europe
  austria: "Vienna Austria cityscape",
  belgium: "Grand Place Brussels",
  bulgaria: "Sofia Bulgaria",
  croatia: "Dubrovnik Croatia old town",
  cyprus: "Limassol Cyprus coast",
  czechia: "Prague Czech Republic old town",
  denmark: "Copenhagen Nyhavn",
  finland: "Helsinki Finland harbour",
  france: "Paris France Eiffel Tower",
  germany: "Berlin Germany Brandenburg Gate",
  greece: "Santorini Greece white buildings",
  hungary: "Budapest Hungary parliament",
  iceland: "Reykjavik Iceland",
  ireland: "Dublin Ireland city",
  italy: "Rome Italy Colosseum",
  malta: "Valletta Malta",
  netherlands: "Amsterdam canals Netherlands",
  norway: "Geirangerfjord Norway landscape",
  poland: "Krakow Poland old town",
  portugal: "Lisbon Portugal tram",
  romania: "Bucharest Romania",
  russia: "Saint Petersburg Russia",
  spain: "Barcelona Spain Sagrada Familia",
  sweden: "Stockholm Sweden",
  switzerland: "Swiss Alps Matterhorn",
  uk: "London United Kingdom Thames",
  ukraine: "Kyiv Ukraine",

  // Asia / Pacific
  australia: "Sydney Opera House harbour",
  bangladesh: "Dhaka Bangladesh",
  cambodia: "Angkor Wat Cambodia",
  china: "Shanghai Bund China",
  fiji: "Fiji islands beach",
  "hong-kong": "Hong Kong skyline Victoria Harbour",
  india: "Taj Mahal India",
  indonesia: "Bali Indonesia rice terrace",
  japan: "Tokyo Japan Shibuya",
  malaysia: "Kuala Lumpur Petronas",
  maldives: "Maldives overwater bungalow",
  "new-zealand": "Queenstown New Zealand",
  pakistan: "Lahore Pakistan Badshahi Mosque",
  philippines: "Manila Philippines bay",
  singapore: "Marina Bay Singapore",
  "south-korea": "Seoul South Korea skyline",
  "sri-lanka": "Colombo Sri Lanka",
  taiwan: "Taipei Taiwan 101",
  thailand: "Bangkok Thailand Wat Arun",
  vietnam: "Ha Long Bay Vietnam",

  // Middle East
  bahrain: "Manama Bahrain skyline",
  egypt: "Pyramids Giza Egypt",
  israel: "Jerusalem Old City",
  jordan: "Petra Jordan",
  kuwait: "Kuwait City towers",
  lebanon: "Beirut Lebanon",
  oman: "Sultan Qaboos Grand Mosque Muscat Oman",
  qatar: "Doha Qatar skyline",
  "saudi-arabia": "Riyadh Saudi Arabia skyline",
  turkey: "Istanbul Turkey Bosphorus",
  uae: "Dubai UAE Burj Khalifa",

  // Africa (priority expansion)
  algeria: "Algiers Algeria casbah",
  ethiopia: "Addis Ababa Ethiopia",
  ghana: "Accra Ghana Independence Square",
  kenya: "Nairobi Kenya skyline",
  morocco: "Marrakech Morocco medina",
  nigeria: "Lagos Nigeria skyline",
  rwanda: "Kigali Rwanda",
  senegal: "Dakar Senegal",
  "south-africa": "Cape Town Table Mountain",
  tanzania: "Zanzibar Tanzania beach",
  tunisia: "Tunis Tunisia medina",
  uganda: "Kampala Uganda",
  zambia: "Victoria Falls Zambia",
};

const SELLABLE = Object.keys(SEARCH_QUERIES);

const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function hasLocalPhoto(slug) {
  return (
    existsSync(path.join(DEST_DIR, `${slug}.webp`)) ||
    existsSync(path.join(DEST_DIR, `${slug}.jpg`)) ||
    existsSync(path.join(DEST_DIR, `${slug}.jpeg`))
  );
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
    execFileSync(
      "sips",
      ["-Z", "1200", "-s", "format", "jpeg", "-s", "formatOptions", "80", destPath, "--out", destPath],
      { stdio: "pipe" },
    );
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
  if (!force && hasLocalPhoto(slug)) {
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
  const missingOnly = process.argv.includes("--missing");
  const args = process.argv
    .slice(2)
    .filter((a) => a !== "--force" && a !== "--missing");

  let targets =
    args.length > 0 ? args.filter((s) => SEARCH_QUERIES[s]) : [...SELLABLE];

  if (missingOnly || args.length === 0) {
    targets = targets.filter((slug) => force || !hasLocalPhoto(slug));
  }

  if (targets.length === 0) {
    console.log("Nothing to fetch — library already covers requested slugs.");
    const onDisk = readdirSync(DEST_DIR).filter((f) =>
      /\.(jpe?g|webp)$/i.test(f) && !f.includes("regional") && !/\d/.test(f),
    );
    console.log(`Local destination photos: ~${onDisk.length} files`);
    process.exit(0);
  }

  console.log(`Fetching ${targets.length} country photos from Wikimedia Commons…\n`);
  const results = [];

  for (const slug of targets) {
    results.push(await fetchOne(slug, force));
    await sleep(350);
  }

  const ok = results.filter((r) => r.status === "ok").length;
  const failed = results.filter((r) => r.status === "not-found" || r.status === "error");
  console.log(
    `\nDone: ${ok} downloaded, ${failed.length} failed, ${results.filter((r) => r.status === "skipped").length} skipped`,
  );
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
