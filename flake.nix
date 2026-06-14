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
            xz
            zstd
          ];

          shellHook = ''
            echo "Great Man Theory dev shell"
            echo "  sops pi/secrets.yaml # edit encrypted secrets"
            echo "  bun run pi:build     # build Raspberry Pi kiosk image"
            echo "  bun run pi:flash     # flash latest image to SD/USB"
          '';
        };
      });
    };
}
