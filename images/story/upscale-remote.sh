#!/usr/bin/env bash
# Upscale story sources on skg@cursor (Tailscale GPU box), then pull WebPs back.
# Usage: images/story/upscale-remote.sh [slug-prefix|--all]
#   (no arg)  all founder prefixes: gates bezos huang musk page zuckerberg altman jobs
#   --all     every PNG in source/ (historical + founders)
# Example: images/story/upscale-remote.sh bezos
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
PREFIX="${1:-}"
REMOTE_HOST="${REMOTE_HOST:-skg@cursor}"
REMOTE_DIR="${REMOTE_DIR:-great-man-theory-upscale}"
SSH_OPTS=(-o IgnoreUnknown=UseKeychain -o ConnectTimeout=20)
SSH=(ssh "${SSH_OPTS[@]}")
RSYNC=(rsync -az -e "ssh ${SSH_OPTS[*]}")

# Resolve cursor via Tailscale if plain hostname fails
if ! "${SSH[@]}" -o BatchMode=yes "$REMOTE_HOST" true 2>/dev/null; then
  TS_IP="$(tailscale status --json 2>/dev/null | python3 -c "
import json,sys
d=json.load(sys.stdin)
for p in d.get('Peer',{}).values():
  if p.get('HostName')=='cursor' or p.get('DNSName','').startswith('cursor.'):
    print(p['TailscaleIPs'][0]); break
" 2>/dev/null || true)"
  if [[ -n "$TS_IP" ]]; then
    REMOTE_HOST="skg@$TS_IP"
    echo "Using Tailscale: $REMOTE_HOST"
  else
    echo "Cannot reach $REMOTE_HOST (is Tailscale up?)" >&2
    exit 1
  fi
fi

echo "==> Sync sources + scripts to $REMOTE_HOST:$REMOTE_DIR"
"${SSH[@]}" "$REMOTE_HOST" "mkdir -p $REMOTE_DIR/source $REMOTE_DIR/tools $REMOTE_DIR/upscaled"
"${RSYNC[@]}" "$ROOT/source/" "$REMOTE_HOST:$REMOTE_DIR/source/"
"${RSYNC[@]}" "$ROOT/upscale.sh" "$ROOT/install-upscayl-tools.sh" "$REMOTE_HOST:$REMOTE_DIR/"

echo "==> Install upscayl-ncnn on remote (once)"
"${SSH[@]}" "$REMOTE_HOST" "cd $REMOTE_DIR && chmod +x install-upscayl-tools.sh upscale.sh && ./install-upscayl-tools.sh"

MODEL="high-fidelity-4x"
WIDTH="3200"

echo "==> Run upscale on remote ($MODEL @ ${WIDTH}px)"
if [[ "$PREFIX" == "--all" ]]; then
  "${SSH[@]}" "$REMOTE_HOST" "cd $REMOTE_DIR && nohup bash -c './upscale.sh $MODEL $WIDTH > upscale.log 2>&1' & echo started"
elif [[ -n "$PREFIX" ]]; then
  "${SSH[@]}" "$REMOTE_HOST" "cd $REMOTE_DIR && ./upscale.sh $MODEL $WIDTH $(printf %q "$PREFIX")"
else
  "${SSH[@]}" "$REMOTE_HOST" bash -s "$REMOTE_DIR" "$MODEL" "$WIDTH" <<'REMOTE'
set -euo pipefail
dir="$1"
model="$2"
width="$3"
cd "$dir"
log="$dir/upscale-founders.log"
: > "$log"
for p in gates bezos huang musk page zuckerberg altman jobs; do
  echo "=== $p $(date -Is) ===" | tee -a "$log"
  ./upscale.sh "$model" "$width" "$p" >> "$log" 2>&1
done
echo "ALL FOUNDERS DONE $(date -Is)" >> "$log"
REMOTE
fi

echo "==> Pull WebPs back"
"${RSYNC[@]}" "$REMOTE_HOST:$REMOTE_DIR/" "$ROOT/" --include='*.webp' --exclude='*' || true
"${RSYNC[@]}" "$REMOTE_HOST:$REMOTE_DIR/upscaled/" "$ROOT/upscaled/" || true

echo "Done."
