# Shared settings, checks and helpers. Sourced by setup.sh and update.sh.
# Nothing in here writes anything; it only reads, checks and defines.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# deploy.env holds the domain and is never committed.
if [ -f "$HERE/deploy.env" ]; then
  # shellcheck disable=SC1091
  . "$HERE/deploy.env"
fi

DOMAIN="${DOMAIN:-}"
WITH_WWW="${WITH_WWW:-1}"
APP_NAME="${APP_NAME:-trezuh}"
APP_PORT="${APP_PORT:-3100}"
APP_DIR="${APP_DIR:-/var/www/trezuh}"
REPO="${REPO:-https://github.com/itsmearyanabc/trezuh-website-.git}"
BRANCH="${BRANCH:-main}"

NGINX_SITE="/etc/nginx/sites-available/${APP_NAME}.conf"
NGINX_LINK="/etc/nginx/sites-enabled/${APP_NAME}.conf"

if [ "$(id -u)" -eq 0 ]; then SUDO=""; else SUDO="sudo"; fi

say()  { printf '\n\033[1m==> %s\033[0m\n' "$*"; }
note() { printf '    %s\n' "$*"; }
die()  { printf '\n\033[1;31m!!  %s\033[0m\n\n' "$*" >&2; exit 1; }

require_domain() {
  [ -n "$DOMAIN" ] || die "DOMAIN is not set. Copy deploy/deploy.env.example to deploy/deploy.env and fill it in."
  case "$DOMAIN" in
    http*|*/*) die "DOMAIN must be a bare hostname, e.g. trezuh.com — not a URL." ;;
  esac
}

require_node() {
  command -v node >/dev/null 2>&1 || die "node is not installed. Next 16 needs Node 20.9 or newer."
  local major minor
  major="$(node -p 'process.versions.node.split(".")[0]')"
  minor="$(node -p 'process.versions.node.split(".")[1]')"
  if [ "$major" -lt 20 ] || { [ "$major" -eq 20 ] && [ "$minor" -lt 9 ]; }; then
    die "Node $(node -v) is too old. Next 16 needs >= 20.9.0 (22 LTS recommended)."
  fi
  command -v npm >/dev/null 2>&1 || die "npm is not installed."
  command -v pm2 >/dev/null 2>&1 || die "pm2 is not installed. Install it with: npm i -g pm2"
}

# The site URL is baked in at build time, so every build has to see it.
site_url() { printf 'https://%s' "$DOMAIN"; }

# Build, then assemble the standalone output into something runnable.
# Next emits .next/standalone without the static assets; they have to be
# placed beside it or every stylesheet and image 404s.
build_app() {
  say "Installing dependencies"
  note "devDependencies are required: the build needs TypeScript and Tailwind."
  ( cd "$APP_DIR" && npm ci --no-audit --no-fund )

  say "Building for $(site_url)"
  ( cd "$APP_DIR" && printf 'NEXT_PUBLIC_SITE_URL=%s\n' "$(site_url)" > .env.production )
  ( cd "$APP_DIR" && npm run build )

  say "Assembling the standalone server"
  rm -rf "$APP_DIR/.next/standalone/.next/static" "$APP_DIR/.next/standalone/public"
  cp -r "$APP_DIR/.next/static" "$APP_DIR/.next/standalone/.next/static"
  cp -r "$APP_DIR/public" "$APP_DIR/.next/standalone/public"
}
