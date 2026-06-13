# Raspberry Pi Kiosk Image

This directory builds a Raspberry Pi image that boots into Chromium and opens the Great Man Theory site in kiosk/app mode.

The build uses the official `raspberrypi/rpi-image-gen` project in Docker by default. The Pi image:

- creates the `skg` kiosk user with SSH key-only access from `~/.ssh/id_ed25519.pub`
- autologins that user on `tty1`
- starts `cage` and Chromium in a restart loop
- runs a first-boot service that sets a hostname like `skg-rpi-gmt-a1b2c3`, regenerates SSH host keys, configures Wi-Fi, and disables itself
- runs a Tailscale service that installs Tailscale if needed, authenticates with the provided auth key, removes that key from the provision file, and disables itself

## Build

```bash
bun run pi:build
```

The first run prompts for:

- public site URL
- Wi-Fi SSID, password, and country
- Tailscale auth key
- target board class
- kiosk username
- SSH public key path

If neither `pi/secrets.enc.env` nor `pi/secrets.env` exists, the answers are written to ignored local state at `pi/build/secrets.env`.

To use SOPS:

```bash
bun run pi:build -- --init-sops
```

Edit `pi/.sops.yaml` with an age recipient, fill `pi/secrets.env`, then encrypt it:

```bash
sops -e pi/secrets.env > pi/secrets.enc.env
rm pi/secrets.env
```

After that, `bun run pi:build` will decrypt `pi/secrets.enc.env` automatically.

## Flash

```bash
bun run pi:flash
```

The flash helper lists external macOS disks, asks for a `diskN` target, requires typing `FLASH`, unmounts the disk, writes the latest image from `pi/deploy`, and ejects it.

You can also pass explicit values:

```bash
bun run pi:flash -- --image pi/deploy/great-man-theory-kiosk.img.xz --disk disk4
```

## Native rpi-image-gen

Docker is the default because `rpi-image-gen` expects a Debian-like build host with privileged mount support. If you already have a working local checkout, use:

```bash
RPI_IMAGE_GEN_DIR=/path/to/rpi-image-gen bun run pi:build -- --native
```

## Notes

- Docker runs with `--privileged`, which `rpi-image-gen` needs for `mmdebstrap` mount namespaces.
- `DOCKER_PLATFORM` defaults to `linux/arm64`.
- `DOCKER_IMAGE` defaults to `great-man-theory-rpi-image-gen`.
- Tailscale auth keys should be ephemeral and reusable=false when possible.
