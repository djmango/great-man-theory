#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: pi/scripts/build-image.sh [options]

Build the Great Man Theory Raspberry Pi kiosk image with rpi-image-gen.

Options:
  --native       Run an existing local rpi-image-gen checkout instead of Docker.
  --no-prompt    Require values from env/secrets files and skip interactive prompts.
  --init-sops    Create editable SOPS placeholder files, then exit.
  -h, --help     Show this help.

Inputs, in precedence order:
  1. Environment variables
  2. pi/secrets.enc.env decrypted with sops
  3. pi/secrets.env
  4. pi/build/secrets.env
  5. Interactive prompts
EOF
}

native=0
no_prompt=0
init_sops=0

while [ "$#" -gt 0 ]; do
  case "$1" in
    --native) native=1 ;;
    --no-prompt) no_prompt=1 ;;
    --init-sops) init_sops=1 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 2 ;;
  esac
  shift
done

script_path="$(realpath "${BASH_SOURCE[0]}")"
script_dir="$(dirname -- "$script_path")"
pi_dir="$(dirname "$script_dir")"
repo_root="$(dirname "$pi_dir")"
template_dir="$pi_dir/image"
build_dir="$pi_dir/build"
source_dir="$build_dir/source"
work_dir="$build_dir/work"
deploy_dir="$pi_dir/deploy"
plain_secrets="$pi_dir/secrets.env"
sops_secrets="$pi_dir/secrets.enc.env"
local_secrets="$build_dir/secrets.env"

mkdir -p "$build_dir" "$deploy_dir" "$work_dir"

if [ "$init_sops" -eq 1 ]; then
  [ -f "$plain_secrets" ] || cp "$pi_dir/secrets.example.env" "$plain_secrets"
  [ -f "$pi_dir/.sops.yaml" ] || cp "$pi_dir/.sops.yaml.example" "$pi_dir/.sops.yaml"
  cat <<EOF
Created SOPS placeholders:
  $plain_secrets
  $pi_dir/.sops.yaml

Edit $pi_dir/.sops.yaml with an age recipient, fill $plain_secrets, then run:
  sops -e "$plain_secrets" > "$sops_secrets"
  rm "$plain_secrets"
EOF
  exit 0
fi

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

load_env_file() {
  if [ -f "$sops_secrets" ]; then
    require_command sops
    set -a
    # shellcheck disable=SC1090
    . <(sops -d "$sops_secrets")
    set +a
  elif [ -f "$plain_secrets" ]; then
    set -a
    # shellcheck disable=SC1090
    . "$plain_secrets"
    set +a
  elif [ -f "$local_secrets" ]; then
    set -a
    # shellcheck disable=SC1090
    . "$local_secrets"
    set +a
  fi
}

assign_var() {
  local name="$1"
  local value="$2"
  printf -v "$name" '%s' "$value"
  export "$name"
}

prompt_var() {
  local name="$1"
  local label="$2"
  local default_value="$3"
  local current_value="${!name:-}"
  local answer

  if [ -n "$current_value" ]; then
    return
  fi

  if [ "$no_prompt" -eq 1 ]; then
    assign_var "$name" "$default_value"
    return
  fi

  read -r -p "$label [$default_value]: " answer
  assign_var "$name" "${answer:-$default_value}"
}

prompt_secret() {
  local name="$1"
  local label="$2"
  local required="${3:-0}"
  local current_value="${!name:-}"
  local answer

  if [ -n "$current_value" ]; then
    return
  fi

  if [ "$no_prompt" -eq 1 ]; then
    if [ "$required" -eq 1 ]; then
      echo "$name is required when --no-prompt is used." >&2
      exit 1
    fi
    assign_var "$name" ""
    return
  fi

  read -r -s -p "$label: " answer
  printf '\n'
  if [ "$required" -eq 1 ] && [ -z "$answer" ]; then
    echo "$name is required." >&2
    exit 1
  fi
  assign_var "$name" "$answer"
}

write_env_kv() {
  local file="$1"
  local key="$2"
  local value="$3"
  printf '%s=%q\n' "$key" "$value" >> "$file"
}

load_env_file

prompt_var GMT_SITE_URL "Public site URL" "https://great-man-theory.djmango.workers.dev"
prompt_var WIFI_COUNTRY "Wi-Fi country code" "US"
prompt_var WIFI_SSID "Wi-Fi SSID" "${WIFI_SSID:-}"
prompt_secret WIFI_PASSWORD "Wi-Fi password" 1
prompt_secret TAILSCALE_AUTH_KEY "Tailscale auth key (leave blank to skip)" 0
prompt_var RPI_DEVICE_CLASS "RPi device class (pi5, pi4, cm5, cm4, zero2w)" "pi5"
prompt_var RPI_USER "Kiosk username" "skg"
prompt_var RPI_IMAGE_NAME "Image name" "great-man-theory-kiosk"
prompt_var SSH_PUBKEY_PATH "SSH public key path" "$HOME/.ssh/id_ed25519.pub"

if [ -z "${WIFI_SSID:-}" ]; then
  echo "WIFI_SSID is required." >&2
  exit 1
fi

if [ ! -f "$SSH_PUBKEY_PATH" ]; then
  echo "SSH public key not found: $SSH_PUBKEY_PATH" >&2
  exit 1
fi
SSH_PUBKEY="$(< "$SSH_PUBKEY_PATH")"
export SSH_PUBKEY

require_command rsync

if [ ! -f "$sops_secrets" ] && [ ! -f "$plain_secrets" ] && [ ! -f "$local_secrets" ]; then
  : > "$local_secrets"
  chmod 0600 "$local_secrets"
  write_env_kv "$local_secrets" GMT_SITE_URL "$GMT_SITE_URL"
  write_env_kv "$local_secrets" WIFI_COUNTRY "$WIFI_COUNTRY"
  write_env_kv "$local_secrets" WIFI_SSID "$WIFI_SSID"
  write_env_kv "$local_secrets" WIFI_PASSWORD "$WIFI_PASSWORD"
  write_env_kv "$local_secrets" TAILSCALE_AUTH_KEY "$TAILSCALE_AUTH_KEY"
  write_env_kv "$local_secrets" RPI_DEVICE_CLASS "$RPI_DEVICE_CLASS"
  write_env_kv "$local_secrets" RPI_USER "$RPI_USER"
  write_env_kv "$local_secrets" RPI_IMAGE_NAME "$RPI_IMAGE_NAME"
  write_env_kv "$local_secrets" SSH_PUBKEY_PATH "$SSH_PUBKEY_PATH"
  echo "Wrote local secrets to $local_secrets"
fi

rm -rf "$source_dir"
mkdir -p "$source_dir"
rsync -a --delete "$template_dir"/ "$source_dir"/
install -d -m 0755 "$source_dir/rootfs-overlay/etc"
provision_env="$source_dir/rootfs-overlay/etc/gmt-provision.env"
: > "$provision_env"
chmod 0600 "$provision_env"
write_env_kv "$provision_env" GMT_SITE_URL "$GMT_SITE_URL"
write_env_kv "$provision_env" WIFI_COUNTRY "$WIFI_COUNTRY"
write_env_kv "$provision_env" WIFI_SSID "$WIFI_SSID"
write_env_kv "$provision_env" WIFI_PASSWORD "$WIFI_PASSWORD"
write_env_kv "$provision_env" TAILSCALE_AUTH_KEY "$TAILSCALE_AUTH_KEY"

ssh_dir="$source_dir/rootfs-overlay/home/$RPI_USER/.ssh"
install -d -m 0700 "$ssh_dir"
printf '%s\n' "$SSH_PUBKEY" > "$ssh_dir/authorized_keys"
chmod 0600 "$ssh_dir/authorized_keys"

run_build_cmd='
set -euo pipefail
args=(
  IGconf_sys_workroot=/work
  "IGconf_device_class=$RPI_DEVICE_CLASS"
  "IGconf_device_user1=$RPI_USER"
  "IGconf_image_name=$RPI_IMAGE_NAME"
  "IGconf_kiosk_url=$GMT_SITE_URL"
  "IGconf_ssh_pubkey_user1=$SSH_PUBKEY"
  IGconf_ssh_pubkey_only=y
)
/opt/rpi-image-gen/rpi-image-gen build -S /src -c gmt-kiosk.yaml -- "${args[@]}"
find /work -type f \( -name "*.img" -o -name "*.img.xz" -o -name "*.img.zst" -o -name "image.json" -o -name "manifest" -o -name "config.yaml" \) -exec cp -av {} /deploy/ \;
'

if [ "$native" -eq 1 ]; then
  rpi_image_gen="${RPI_IMAGE_GEN_DIR:-$build_dir/rpi-image-gen}"
  if [ ! -x "$rpi_image_gen/rpi-image-gen" ]; then
    echo "Native mode requires RPI_IMAGE_GEN_DIR to point at an installed rpi-image-gen checkout." >&2
    echo "Docker mode is the default and will build the checkout into a container." >&2
    exit 1
  fi

  native_args=(
    "IGconf_sys_workroot=$work_dir"
    "IGconf_device_class=$RPI_DEVICE_CLASS"
    "IGconf_device_user1=$RPI_USER"
    "IGconf_image_name=$RPI_IMAGE_NAME"
    "IGconf_kiosk_url=$GMT_SITE_URL"
    "IGconf_ssh_pubkey_user1=$SSH_PUBKEY"
    IGconf_ssh_pubkey_only=y
  )
  "$rpi_image_gen/rpi-image-gen" build -S "$source_dir" -c gmt-kiosk.yaml -- "${native_args[@]}"
  find "$work_dir" -type f \( -name "*.img" -o -name "*.img.xz" -o -name "*.img.zst" -o -name "image.json" -o -name "manifest" -o -name "config.yaml" \) -exec cp -av {} "$deploy_dir"/ \;
else
  require_command docker

  docker_image="${DOCKER_IMAGE:-great-man-theory-rpi-image-gen}"
  docker_platform="${DOCKER_PLATFORM:-linux/arm64}"

  docker build --platform "$docker_platform" -t "$docker_image" "$pi_dir"
  docker run --rm --privileged --platform "$docker_platform" \
    -e RPI_DEVICE_CLASS \
    -e RPI_USER \
    -e RPI_IMAGE_NAME \
    -e GMT_SITE_URL \
    -e SSH_PUBKEY \
    -v "$source_dir:/src:ro" \
    -v "$work_dir:/work" \
    -v "$deploy_dir:/deploy" \
    "$docker_image" \
    bash -lc "$run_build_cmd"
fi

echo "Build artefacts copied to $deploy_dir"
