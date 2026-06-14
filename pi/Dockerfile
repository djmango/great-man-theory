FROM debian:trixie

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /opt/rpi-image-gen

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    file \
    git \
    gnupg \
    python3 \
    qemu-user-static \
    sudo \
    xz-utils \
  && git clone --depth 1 https://github.com/raspberrypi/rpi-image-gen.git /opt/rpi-image-gen \
  && apt-get update \
  && ./install_deps.sh \
  && rm -rf /var/lib/apt/lists/*
