#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

bun run build
rm -rf .wrangler/state

bun build src/app.ts --outfile app.js --target browser --watch &
BUILD_PID=$!

wrangler dev --persist-to ../.gmt-wrangler-state &
WRANGLER_PID=$!

cleanup() {
  kill "$BUILD_PID" "$WRANGLER_PID" 2>/dev/null || true
  wait 2>/dev/null || true
}
trap cleanup EXIT INT TERM

wait
