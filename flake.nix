{
  description = "Great Man Theory development and Raspberry Pi kiosk tooling";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { nixpkgs, ... }:
    let
      systems = [
        "aarch64-darwin"
        "x86_64-darwin"
        "aarch64-linux"
        "x86_64-linux"
      ];
      forAllSystems = f:
        nixpkgs.lib.genAttrs systems (system:
          f (import nixpkgs { inherit system; }));
    in
    {
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell {
          packages = with pkgs; [
            age
            bun
            docker
            git
            sops
            ssh-to-age
            xz
            zstd
          ];

          shellHook = ''
            export SOPS_SSH_KEY_PATH="$HOME/.ssh/id_ed25519"
            echo "Great Man Theory dev shell"
            echo "  bun run pi:secrets # edit encrypted pi/secrets.yaml"
            echo "  bun run pi:build   # build Raspberry Pi kiosk image"
            echo "  bun run pi:flash   # flash latest image to SD/USB"
          '';
        };
      });
    };
}
