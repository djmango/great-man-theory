#!/usr/bin/env bash
# Read-only SD card inspection via debugfs (no writes).
set -euo pipefail

disk="${1:-}"
if [ -z "$disk" ]; then
  echo "Usage: $0 diskN   (e.g. disk18 — uses /dev/diskN s2 root partition)" >&2
  diskutil list external physical 2>/dev/null || diskutil list external 2>/dev/null || true
  exit 1
fi

part="/dev/${disk}s2"
if [ ! -e "$part" ]; then
  part="/dev/$disk"
fi

if ! command -v debugfs >/dev/null 2>&1; then
  exec nix shell nixpkgs#e2fsprogs -c "$0" "$@"
fi

run() {
  sudo debugfs -R "$1" "$part" 2>/dev/null || true
}

echo "=== $part ==="
echo

echo "=== /etc/os-release ==="
run 'cat /etc/os-release'
echo

echo "=== /etc/hostname ==="
run 'cat /etc/hostname'
echo

echo "=== /etc/rpi-issue ==="
run 'cat /etc/rpi-issue'
echo

for dir in \
  /home \
  /home/pi \
  /home/pi/Documents \
  /home/pi/Desktop \
  /home/pi/Downloads \
  /home/pi/python_games \
  /home/pi/.config \
  /home/pi/.vnc \
  /opt \
  /srv \
  /var/www \
  /root \
  /etc/systemd/system; do
  echo "=== ls -l $dir ==="
  run "ls -l $dir"
  echo
done

echo "=== files larger than ~100KB under /home/pi (namei) ==="
run 'ncheck 131689' | head -5
# Walk pi home for big regular files via find-like ls recursion on known dirs
for sub in Documents Desktop Downloads python_games .config .vnc; do
  run "ls -l /home/pi/$sub" | awk '$1 ~ /^-/ && $4+0 > 100000 {print}' || true
done
echo

echo "=== enabled systemd units (symlinks) ==="
run 'ls -l /etc/systemd/system' | grep -E '\->' || true
echo

echo "=== cron ==="
run 'cat /etc/crontab'
run 'ls -l /etc/cron.d'
run 'ls -l /var/spool/cron/crontabs' 2>/dev/null || true
echo

echo "=== ssh authorized_keys (pi + root) ==="
run 'cat /home/pi/.ssh/authorized_keys' 2>/dev/null || echo '(no pi authorized_keys)'
run 'cat /root/.ssh/authorized_keys' 2>/dev/null || echo '(no root authorized_keys)'
echo

echo "=== network hints ==="
run 'cat /etc/wpa_supplicant/wpa_supplicant.conf' 2>/dev/null || echo '(no wpa_supplicant.conf)'
run 'cat /etc/dhcpcd.conf' 2>/dev/null | head -30
echo

echo "Done. Read-only — nothing was modified."
