#!/usr/bin/env bash
# Upscale story source PNGs with Upscayl NCNN (macOS app bundle or Linux binary). Never deletes sources.
# Usage: ./upscale.sh [model] [deliver_width] [slug-prefix]
# Env: UPSCAYL_BIN, UPSCAYL_MODELS — override paths (required on Linux remote hosts).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
MODEL="${1:-high-fidelity-4x}"
DELIVER_WIDTH="${2:-3200}"
SLUG_PREFIX="${3:-}"

if [[ -n "${UPSCAYL_BIN:-}" && -x "$UPSCAYL_BIN" ]]; then
  :
elif [[ -x "/Applications/Upscayl.app/Contents/Resources/bin/upscayl-bin" ]]; then
  UPSCAYL_BIN="/Applications/Upscayl.app/Contents/Resources/bin/upscayl-bin"
  UPSCAYL_MODELS="${UPSCAYL_MODELS:-/Applications/Upscayl.app/Contents/Resources/models}"
elif [[ -x "$ROOT/tools/upscayl-bin" ]]; then
  UPSCAYL_BIN="$ROOT/tools/upscayl-bin"
  UPSCAYL_MODELS="${UPSCAYL_MODELS:-$ROOT/tools/models}"
elif command -v upscayl-bin >/dev/null 2>&1; then
  UPSCAYL_BIN="$(command -v upscayl-bin)"
  UPSCAYL_MODELS="${UPSCAYL_MODELS:-$(dirname "$UPSCAYL_BIN")/models}"
else
  echo "Upscayl binary not found. Set UPSCAYL_BIN or install under $ROOT/tools/" >&2
  exit 1
fi

MODELS="${UPSCAYL_MODELS:?UPSCAYL_MODELS required}"
MAGICK="${MAGICK:-magick}"
if ! command -v "$MAGICK" >/dev/null 2>&1; then
  MAGICK=convert
fi
if ! command -v "$MAGICK" >/dev/null 2>&1; then
  echo "ImageMagick (magick or convert) required." >&2
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
  "$MAGICK" "$out_png" -resize "${DELIVER_WIDTH}x" -quality 88 -define webp:method=6 "$out_webp"
  cp "$out_webp" "$live_webp"
  echo "installed: $live_webp"
done

echo "Done. Live WebPs updated from ${MODEL} @ ${DELIVER_WIDTH}px wide."
