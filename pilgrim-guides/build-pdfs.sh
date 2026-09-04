#!/usr/bin/env bash
# Build NoorLink pilgrim gift PDFs (Chrome headless).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HTML_DIR="$ROOT/pilgrim-guides/html"
OUT_DIR="$ROOT/public/guides/pilgrimage"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

mkdir -p "$OUT_DIR"

print_pdf() {
  local src="$1"
  local dest="$2"
  local file_url
  file_url="file://${src}"
  echo "Printing $(basename "$dest")…"
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --no-pdf-header-footer \
    --print-to-pdf="$dest" \
    "$file_url" \
    2>/dev/null
}

print_pdf "$HTML_DIR/01-duas-for-the-journey.html" "$OUT_DIR/noorlink-gift-duas-al-haramayn.pdf"
print_pdf "$HTML_DIR/02-makkah-madinah-orientation.html" "$OUT_DIR/noorlink-gift-orientation-makkah-madinah.pdf"
print_pdf "$HTML_DIR/03-places-of-meaning.html" "$OUT_DIR/noorlink-gift-places-of-meaning.pdf"

ls -lh "$OUT_DIR"/*.pdf
echo "Done."
