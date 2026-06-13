#!/usr/bin/env bash
# Copy generated scene PNGs from Cursor assets into images/story/source/
# Usage: images/story/install-assets.sh [--force] [assets_dir]
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
ASSETS="${1:-${STORY_ASSETS_DIR:-$HOME/.cursor/projects/Users-djmango-github-great-man-theory/assets}}"
SRC="$ROOT/source"
FORCE=false
if [[ "${1:-}" == "--force" ]]; then
  FORCE=true
  ASSETS="${2:-${STORY_ASSETS_DIR:-$HOME/.cursor/projects/Users-djmango-github-great-man-theory/assets}}"
fi
mkdir -p "$SRC"

shopt -s nullglob
count=0
updated=0
for f in "$ASSETS"/*-scene.png; do
  base="$(basename "$f")"
  dest="$SRC/$base"
  if [[ -f "$dest" && "$FORCE" == false ]]; then
    echo "skip: $base"
    continue
  fi
  cp -v "$f" "$dest"
  count=$((count + 1))
  if [[ -f "$dest" ]]; then updated=$((updated + 1)); fi
done

echo "Installed $count source PNG(s) into $SRC"
