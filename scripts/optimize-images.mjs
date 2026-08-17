#!/usr/bin/env node
/**
 * Resize and compress site images for fast loading.
 * Uses macOS `sips` — run: node scripts/optimize-images.mjs
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const IMAGES = path.join(ROOT, "public/images");

/** Max longest edge per category */
const SIZES = {
  hero: 1920,
  texture: 1200,
  card: 800,
  thumb: 400,
};

const HERO_IMAGES = new Set([
  "hero.jpg",
  "world-hands.jpg",
  "team.jpg",
  "ramadan-bg.jpg",
  "ramadan-feature.jpg",
]);

const TEXTURE_IMAGES = new Set(["map-texture.jpg", "map.jpg"]);

function maxEdge(file) {
  const base = path.basename(file);
  if (HERO_IMAGES.has(base)) return SIZES.hero;
  if (TEXTURE_IMAGES.has(base)) return SIZES.texture;
  if (base.includes("favicon") || base.includes("logo")) return null;
  return SIZES.card;
}

function optimizeFile(absPath) {
  const edge = maxEdge(absPath);
  if (!edge) return null;

  const before = statSync(absPath).size;
  if (before < 280_000) return { skipped: true, before, after: before };

  const tmp = `${absPath}.opt.jpg`;
  execFileSync("sips", [
    "-Z",
    String(edge),
    "-s",
    "format",
    "jpeg",
    "-s",
    "formatOptions",
    "75",
    absPath,
    "--out",
    tmp,
  ]);
  execFileSync("mv", [tmp, absPath]);
  const after = statSync(absPath).size;
  return { before, after };
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const files = walk(IMAGES);
let saved = 0;
let count = 0;

console.log(`Optimizing ${files.length} images in public/images/…\n`);

for (const file of files) {
  try {
    const result = optimizeFile(file);
    if (!result || result.skipped) continue;
    count += 1;
    saved += result.before - result.after;
    const rel = path.relative(ROOT, file);
    const pct = Math.round((1 - result.after / result.before) * 100);
    console.log(
      `${rel}: ${(result.before / 1024 / 1024).toFixed(1)}MB → ${(result.after / 1024).toFixed(0)}KB (${pct}% smaller)`,
    );
  } catch (err) {
    console.error(`Failed: ${file}`, err.message);
  }
}

console.log(
  `\nDone. Optimized ${count} files, saved ${(saved / 1024 / 1024).toFixed(1)}MB total.`,
);
