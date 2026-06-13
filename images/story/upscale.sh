#!/usr/bin/env bash
# Upscale story source PNGs with Upscayl (macOS app bundle). Never deletes sources.
# Usage: ./upscale.sh [model] [deliver_width] [slug-prefix]
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
UPSCAYL_BIN="/Applications/Upscayl.app/Contents/Resources/bin/upscayl-bin"
MODELS="/Applications/Upscayl.app/Contents/Resources/models"
MODEL="${1:-high-fidelity-4x}"
DELIVER_WIDTH="${2:-3200}"
SLUG_PREFIX="${3:-}"

if [[ ! -x "$UPSCAYL_BIN" ]]; then
  echo "Upscayl not found at $UPSCAYL_BIN" >&2
  exit 1
fi

mkdir -p "$ROOT/upscaled" "$ROOT/compare"

mapfile -t SOURCES < <(find "$ROOT/source" -maxdepth 1 -name '*.png' | sort)
for src in "${SOURCES[@]}"; do
  base="$(basename "$src" .png)"
  base="${base%-scene}"
  base="${base%-siwa}"
  if [[ -n "$SLUG_PREFIX" && "$base" != "$SLUG_PREFIX"* ]]; then
    continue
  fi
  out_png="$ROOT/upscaled/${base}-${MODEL}.png"
  out_webp="$ROOT/upscaled/${base}-${MODEL}-${DELIVER_WIDTH}w.webp"
  live_webp="$ROOT/${base}.webp"

  if [[ -f "$out_png" && "$src" -ot "$out_png" ]]; then
    echo "skip png: $out_png"
  else
    echo "upscale: $src -> $out_png ($MODEL)"
    "$UPSCAYL_BIN" -i "$src" -o "$out_png" -m "$MODELS" -n "$MODEL" -s 4 -f png
  fi

  echo "webp: $out_webp"
  magick "$out_png" -resize "${DELIVER_WIDTH}x" -quality 88 -define webp:method=6 "$out_webp"
  cp "$out_webp" "$live_webp"
  echo "installed: $live_webp"
done

echo "Done. Live WebPs updated from ${MODEL} @ ${DELIVER_WIDTH}px wide."
