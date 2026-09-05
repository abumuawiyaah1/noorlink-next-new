/**
 * Rebuild critical WebP assets for PageSpeed (home + Hajj).
 * Usage: node scripts/optimize-critical-images.mjs
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const jobs = [
  { src: "public/images/hero.jpg", out: "public/images/hero.webp", width: 1600, quality: 72 },
  { src: "public/images/hero.jpg", out: "public/images/hero-800.webp", width: 800, quality: 70 },
  { src: "public/images/hero.jpg", out: "public/images/hero-640.webp", width: 640, quality: 68 },
  { src: "public/images/map-texture.jpg", out: "public/images/map-texture.webp", width: 900, quality: 68 },
  { src: "public/images/how-it-works/choose-plan.png", out: "public/images/how-it-works/choose-plan.webp", width: 176, quality: 75 },
  { src: "public/images/how-it-works/get-qr.png", out: "public/images/how-it-works/get-qr.webp", width: 176, quality: 75 },
  { src: "public/images/how-it-works/scan-connect.png", out: "public/images/how-it-works/scan-connect.webp", width: 176, quality: 75 },
  { src: "public/images/trust-stats/countries.png", out: "public/images/trust-stats/countries.webp", width: 800, quality: 72 },
  { src: "public/images/trust-stats/qr-delivery.png", out: "public/images/trust-stats/qr-delivery.webp", width: 800, quality: 72 },
  { src: "public/images/trust-stats/hotspot.png", out: "public/images/trust-stats/hotspot.webp", width: 800, quality: 72 },
  { src: "public/images/trust-stats/support.png", out: "public/images/trust-stats/support.webp", width: 800, quality: 72 },
  { src: "public/images/pilgrimage/makkah-haram.png", out: "public/images/pilgrimage/makkah-haram.webp", width: 900, quality: 72 },
  { src: "public/images/pilgrimage/madinah-mosque.png", out: "public/images/pilgrimage/madinah-mosque.webp", width: 900, quality: 72 },
  { src: "public/images/pilgrimage/pilgrim-preparation.png", out: "public/images/pilgrimage/pilgrim-preparation.webp", width: 900, quality: 72 },
  { src: "public/images/ramadan-bg.jpg", out: "public/images/ramadan-bg.webp", width: 1600, quality: 70 },
  { src: "public/images/ramadan-feature.jpg", out: "public/images/ramadan-feature.webp", width: 900, quality: 72 },
  { src: "public/images/ramadan-feature.jpg", out: "public/images/ramadan-feature-sm.webp", width: 640, quality: 68 },
  { src: "public/images/world-hands.jpg", out: "public/images/world-hands.webp", width: 1200, quality: 72 },
  { src: "public/images/destinations/saudi-arabia.jpg", out: "public/images/destinations/saudi-arabia.webp", width: 1400, quality: 72 },
];

async function emitDestinationSmVariants() {
  const dir = path.join(process.cwd(), "public/images/destinations");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".webp") && !f.endsWith("-sm.webp"));
  for (const file of files) {
    const inPath = path.join(dir, file);
    const outPath = path.join(dir, file.replace(/\.webp$/i, "-sm.webp"));
    await sharp(inPath)
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 70, effort: 5 })
      .toFile(outPath);
  }
  console.log(`Destination -sm variants: ${files.length}`);
}

async function emitWhyNoorLinkVariants() {
  const dir = path.join(process.cwd(), "public/images/trust-stats");
  const hiw = path.join(process.cwd(), "public/images/how-it-works");
  const cards = [
    { src: path.join(hiw, "get-qr.png"), out: "qr-delivery-card.webp", position: "centre" },
    { src: path.join(dir, "countries.png"), out: "countries-card.webp", position: "centre" },
    // Desk phone + laptop share scene (hotspot-share.jpg)
    { src: path.join(dir, "hotspot-share.jpg"), out: "hotspot-share-card.webp", position: "centre" },
    { src: path.join(dir, "support.png"), out: "support-card.webp", position: "north" },
    { src: path.join(dir, "refund-cash.jpg"), out: "refund-noorlink-card.webp", position: "centre" },
  ];
  const thumbs = [
    ["qr-delivery.png", "qr-delivery-thumb.webp"],
    ["countries.png", "countries-thumb.webp"],
    ["hotspot-share.jpg", "hotspot-thumb.webp"],
    ["support.png", "support-thumb.webp"],
  ];

  for (const job of cards) {
    if (!fs.existsSync(job.src)) continue;
    const outPath = path.join(dir, job.out);
    await sharp(job.src)
      .rotate()
      .resize(560, 240, { fit: "cover", position: job.position })
      .webp({ quality: 72, effort: 6 })
      .toFile(outPath);
    console.log(`${job.out}  ${(fs.statSync(outPath).size / 1024).toFixed(0)}KB`);
  }

  for (const [src, out] of thumbs) {
    const inPath = path.join(dir, src);
    if (!fs.existsSync(inPath)) continue;
    const outPath = path.join(dir, out);
    await sharp(inPath)
      .rotate()
      .resize(96, 96, { fit: "cover", position: "centre" })
      .webp({ quality: 70, effort: 6 })
      .toFile(outPath);
    console.log(`${out}  ${(fs.statSync(outPath).size / 1024).toFixed(0)}KB`);
  }
}

(async () => {
  for (const job of jobs) {
    const inPath = path.join(process.cwd(), job.src);
    const outPath = path.join(process.cwd(), job.out);
    if (!fs.existsSync(inPath)) {
      console.log("SKIP", job.src);
      continue;
    }
    const before = fs.statSync(inPath).size;
    await sharp(inPath)
      .rotate()
      .resize({ width: job.width, withoutEnlargement: true })
      .webp({ quality: job.quality, effort: 6 })
      .toFile(outPath);
    const after = fs.statSync(outPath).size;
    console.log(`${job.out}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`);
  }
  await emitDestinationSmVariants();
  await emitWhyNoorLinkVariants();
})();
