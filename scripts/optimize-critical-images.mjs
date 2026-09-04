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
  { src: "public/images/world-hands.jpg", out: "public/images/world-hands.webp", width: 1200, quality: 72 },
  { src: "public/images/destinations/saudi-arabia.jpg", out: "public/images/destinations/saudi-arabia.webp", width: 1400, quality: 72 },
];

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
})();
