#!/usr/bin/env bash
# Install upscayl-ncnn binary + models under images/story/tools/ (Linux x64).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TOOLS="$ROOT/tools"
ARCH="${UPSCAYL_NCNN_ARCH:-linux}"

mkdir -p "$TOOLS"
if [[ -x "$TOOLS/upscayl-bin" && -d "$TOOLS/models" ]]; then
  echo "Already installed: $TOOLS/upscayl-bin"
  exit 0
fi

TAG="$(curl -fsSL https://api.github.com/repos/upscayl/upscayl-ncnn/releases/latest | python3 -c "import json,sys; print(json.load(sys.stdin)['tag_name'])")"
ZIP="upscayl-bin-${TAG}-${ARCH}.zip"
URL="https://github.com/upscayl/upscayl-ncnn/releases/download/${TAG}/${ZIP}"

echo "Downloading $URL ..."
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT
curl -fsSL "$URL" -o "$tmpdir/$ZIP"
unzip -o "$tmpdir/$ZIP" -d "$tmpdir/extract"

bin="$(find "$tmpdir/extract" -name upscayl-bin -type f | head -1)"
models="$(find "$tmpdir/extract" -type d -name models | head -1)"
if [[ -z "$bin" ]]; then
  echo "upscayl-bin not found in release zip" >&2
  exit 1
fi

cp "$bin" "$TOOLS/upscayl-bin"
chmod +x "$TOOLS/upscayl-bin"
if [[ -n "$models" ]]; then
  rm -rf "$TOOLS/models"
  cp -a "$models" "$TOOLS/"
fi

echo "Installed $TOOLS/upscayl-bin (release $TAG)"
ls "$TOOLS/models" 2>/dev/null | head -5 || echo "warning: no models dir"
