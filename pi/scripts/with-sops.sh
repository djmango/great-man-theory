#!/usr/bin/env bash
set -euo pipefail

script_path="$(realpath "${BASH_SOURCE[0]}")"
script_dir="$(dirname -- "$script_path")"
pi_dir="$(dirname "$script_dir")"

ssh_key="${SOPS_SSH_KEY_PATH:-$HOME/.ssh/id_ed25519}"
sops_config="${SOPS_CONFIG_PATH:-$pi_dir/.sops.yaml}"
age_key_file=""

cleanup() {
  if [ -n "$age_key_file" ]; then
    rm -f "$age_key_file"
    age_key_file=""
  fi
}

trap cleanup EXIT INT TERM

if [ "$#" -eq 0 ]; then
  echo "Usage: pi/scripts/with-sops.sh <command> [args...]" >&2
  echo "Example: pi/scripts/with-sops.sh sops pi/secrets.yaml" >&2
  exit 2
fi

if [ ! -f "$ssh_key" ]; then
  echo "SSH private key not found: $ssh_key" >&2
  exit 1
fi

if ! command -v ssh-to-age >/dev/null 2>&1; then
  if command -v nix >/dev/null 2>&1; then
    exec nix shell nixpkgs#ssh-to-age --command "$script_path" "$@"
  fi
  echo "ssh-to-age is required. Try: nix shell nixpkgs#ssh-to-age -c pi/scripts/with-sops.sh sops pi/secrets.yaml" >&2
  exit 1
fi

age_key_file="$(mktemp)"
ssh-to-age -private-key -i "$ssh_key" -o "$age_key_file"

export SOPS_AGE_KEY_FILE="$age_key_file"
export SOPS_CONFIG_PATH="$sops_config"

exec "$@"
