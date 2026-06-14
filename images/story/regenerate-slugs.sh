#!/usr/bin/env bash
# Install + upscale ONLY slugs listed in regenerate-queue.txt (not all founders).
# After generating PNGs in Cursor assets:  {slug}-scene.png
# Usage: images/story/regenerate-slugs.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$ROOT/../.." && pwd)"
QUEUE="$ROOT/regenerate-queue.txt"
SSH=(ssh -o IgnoreUnknown=UseKeychain)
RSYNC=(rsync -az -e "ssh -o IgnoreUnknown=UseKeychain")

mapfile -t SLUGS < <(grep -v '^#' "$QUEUE" | grep -v '^[[:space:]]*$' || true)
if [[ ${#SLUGS[@]} -eq 0 ]]; then
  echo "No slugs in $QUEUE" >&2
  exit 1
fi

echo "==> Install ${#SLUGS[@]} queued scene(s) from Cursor assets"
"$ROOT/install-assets.sh" --force

REMOTE_DIR=great-man-theory-upscale
echo "==> Sync queued sources to skg@cursor"
for slug in "${SLUGS[@]}"; do
  src="$ROOT/source/${slug}-scene.png"
  [[ -f "$src" ]] || { echo "missing source: $src" >&2; continue; }
  "${RSYNC[@]}" "$src" "skg@100.78.226.106:$REMOTE_DIR/source/"
done

echo "==> Upscale on remote (high-fidelity-4x @ 3200px)"
for slug in "${SLUGS[@]}"; do
  echo "  $slug"
  "${SSH[@]}" skg@100.78.226.106 "bash -lc 'cd $REMOTE_DIR && ./upscale.sh high-fidelity-4x 3200 $(printf %q "$slug")'" || true
done

echo "==> Pull WebPs"
for slug in "${SLUGS[@]}"; do
  "${RSYNC[@]}" "skg@100.78.226.106:$REMOTE_DIR/${slug}.webp" "$ROOT/" 2>/dev/null || true
done

echo "Done. ${#SLUGS[@]} slug(s) processed."
