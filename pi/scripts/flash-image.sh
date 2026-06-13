#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: pi/scripts/flash-image.sh [--image path] [--disk diskN]

Flash the latest image from pi/deploy to an SD card or USB drive on macOS.

Examples:
  pi/scripts/flash-image.sh
  pi/scripts/flash-image.sh --disk disk4
  pi/scripts/flash-image.sh --image pi/deploy/great-man-theory-kiosk.img.xz --disk disk4
EOF
}

image=""
disk=""

while [ "$#" -gt 0 ]; do
  case "$1" in
    --image)
      image="${2:-}"
      shift
      ;;
    --disk)
      disk="${2:-}"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage
      exit 2
      ;;
  esac
  shift
done

script_path="$(realpath "${BASH_SOURCE[0]}")"
script_dir="$(dirname -- "$script_path")"
pi_dir="$(dirname "$script_dir")"
deploy_dir="$pi_dir/deploy"

if [ -z "$image" ]; then
  image="$(ls -t "$deploy_dir"/*.img "$deploy_dir"/*.img.xz "$deploy_dir"/*.img.zst 2>/dev/null | sed -n '1p')"
fi

if [ -z "$image" ] || [ ! -f "$image" ]; then
  echo "No image found. Build one first with pi/scripts/build-image.sh." >&2
  exit 1
fi

if [ "$(uname -s)" != "Darwin" ]; then
  echo "This flash helper currently supports macOS diskutil/dd only." >&2
  exit 1
fi

if [ -z "$disk" ]; then
  diskutil list external physical
  read -r -p "Target disk identifier, for example disk4: " disk
fi

if ! [[ "$disk" =~ ^disk[0-9]+$ ]]; then
  echo "Refusing to flash invalid disk identifier: $disk" >&2
  exit 1
fi

device="/dev/$disk"
raw_device="/dev/r$disk"

if ! diskutil info "$device" >/dev/null 2>&1; then
  echo "Disk does not exist: $device" >&2
  exit 1
fi

echo "Image: $image"
diskutil info "$device" | sed -n 's/^   Device \/ Media Name: */Disk: /p; s/^   Disk Size: */Size: /p; s/^   Removable Media: */Removable: /p'
echo
read -r -p "Type FLASH to erase and write $device: " confirmation
if [ "$confirmation" != "FLASH" ]; then
  echo "Aborted."
  exit 1
fi

diskutil unmountDisk "$device"

case "$image" in
  *.img)
    sudo dd if="$image" of="$raw_device" bs=16m status=progress conv=sync
    ;;
  *.img.xz)
    command -v xzcat >/dev/null 2>&1 || { echo "xzcat is required for .xz images." >&2; exit 1; }
    xzcat "$image" | sudo dd of="$raw_device" bs=16m status=progress conv=sync
    ;;
  *.img.zst)
    command -v zstdcat >/dev/null 2>&1 || { echo "zstdcat is required for .zst images." >&2; exit 1; }
    zstdcat "$image" | sudo dd of="$raw_device" bs=16m status=progress conv=sync
    ;;
  *)
    echo "Unsupported image extension: $image" >&2
    exit 1
    ;;
esac

sync
diskutil eject "$device"
echo "Flashed and ejected $device."
