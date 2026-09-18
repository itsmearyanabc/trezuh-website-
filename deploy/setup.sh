#!/usr/bin/env bash
#
# First-time deploy of the TREZUH site onto a VPS that is already running
# other things.
#
# It refuses to start if anything it would create already exists and was not
# created by this script: the port, the pm2 process, the nginx site file, the
# server_name, the target directory. Nothing shared is ever edited — no
# default site, no nginx.conf, no other server block, no other pm2 app — and
# nginx is reloaded, never restarted, so the sites already on this box do not
# drop a single connection.
#
# Usage:  bash deploy/setup.sh [--yes]
#
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_common.sh"

ASSUME_YES=0
case "${1:-}" in --yes|-y) ASSUME_YES=1 ;; esac

MARKER="# managed by ${APP_NAME} deploy — do not hand-edit"

require_domain
require_node

# ---------------------------------------------------------------- preflight
say "Checking this will not collide with anything already running"

# 1. The port. On a re-run our own app legitimately holds it.
OURS_ALREADY=0
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then OURS_ALREADY=1; fi

if command -v ss >/dev/null 2>&1; then
  if ss -ltn 2>/dev/null | awk '{print $4}' | grep -qE "[:.]${APP_PORT}$"; then
    [ "$OURS_ALREADY" -eq 1 ] || die "Port ${APP_PORT} is already in use by something else. Set APP_PORT to a free port in deploy/deploy.env."
    note "port ${APP_PORT} — held by the existing ${APP_NAME} app, fine"
  else
    note "port ${APP_PORT} — free"
  fi
fi

# 2. The pm2 process name, if it exists, must be this app and not a namesake.
if [ "$OURS_ALREADY" -eq 1 ]; then
  EXISTING_SCRIPT="$(pm2 jlist | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const a=JSON.parse(s).find(p=>p.name===process.argv[1]);process.stdout.write(a?(a.pm2_env.pm_exec_path||""):"")})' "$APP_NAME")"
  case "$EXISTING_SCRIPT" in
    "$APP_DIR"/*) note "pm2 app '${APP_NAME}' — already ours, will be reloaded" ;;
    *) die "A different pm2 app is already called '${APP_NAME}' (${EXISTING_SCRIPT}). Set APP_NAME in deploy/deploy.env." ;;
  esac
else
  note "pm2 app '${APP_NAME}' — not present, will be created"
fi
note "pm2 is running as user '$(whoami)' — run redeploys as this same user"

# 3. Our nginx file must be absent, or ours.
if [ -e "$NGINX_SITE" ] && ! $SUDO grep -q "$MARKER" "$NGINX_SITE" 2>/dev/null; then
  die "${NGINX_SITE} already exists and was not written by this script. Set APP_NAME in deploy/deploy.env."
fi

# 4. No other enabled site may already claim this hostname.
if [ -d /etc/nginx/sites-enabled ]; then
  CLASH="$($SUDO grep -rlE "^[[:space:]]*server_name[^;]*[[:space:]]${DOMAIN}[;[:space:]]" /etc/nginx/sites-enabled/ 2>/dev/null | grep -v "${APP_NAME}.conf" || true)"
  [ -z "$CLASH" ] || die "${DOMAIN} is already served by: ${CLASH}. Resolve that first — this script will not edit another site's config."
  note "server_name ${DOMAIN} — unclaimed"
fi

# 5. The target directory must be free, or already this repo.
if [ -e "$APP_DIR" ] && [ ! -d "$APP_DIR/.git" ]; then
  die "${APP_DIR} exists and is not a git checkout. Set APP_DIR in deploy/deploy.env."
fi
note "directory ${APP_DIR} — ok"

# ------------------------------------------------------------------ confirm
cat <<SUMMARY

    It will create, and nothing else:

      ${APP_DIR}                     the checkout
      pm2 app  ${APP_NAME}           listening on 127.0.0.1:${APP_PORT}
      ${NGINX_SITE}
      ${NGINX_LINK}

    It will reload nginx (not restart it) once, after nginx -t passes.

SUMMARY

if [ "$ASSUME_YES" -ne 1 ]; then
  printf '    Continue? [y/N] '
  read -r REPLY
  case "$REPLY" in [yY]*) ;; *) die "Stopped. Nothing was changed." ;; esac
fi

# -------------------------------------------------------------------- code
say "Fetching the code"
if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" fetch --depth 1 origin "$BRANCH"
  git -C "$APP_DIR" reset --hard "origin/${BRANCH}"
else
  # Create and claim only our own directory. Never chown the parent:
  # /var/www may well be holding your other sites.
  $SUDO mkdir -p "$APP_DIR"
  $SUDO chown "$(id -u):$(id -g)" "$APP_DIR"
  git clone --depth 1 --branch "$BRANCH" "$REPO" "$APP_DIR"
fi

build_app

# --------------------------------------------------------------------- pm2
say "Starting the app on 127.0.0.1:${APP_PORT}"
note "bound to loopback only — nginx is the only way in"
cd "$APP_DIR"
# The port lives in the ecosystem file, not in this shell, so a later
# reload cannot lose it. --only pins this to our app: no other pm2
# process is signalled.
pm2 startOrReload "$APP_DIR/deploy/ecosystem.config.cjs" --only "$APP_NAME" --update-env
pm2 save    # additive: snapshots every app you are running, not just this one

# ------------------------------------------------------------------- nginx
say "Writing ${NGINX_SITE}"
REDIRECT_BLOCK=""
if [ "$WITH_WWW" = "1" ]; then
  REDIRECT_BLOCK="server {
    listen 80;
    listen [::]:80;
    server_name www.${DOMAIN};
    return 301 http://${DOMAIN}\$request_uri;
}
"
fi

$SUDO tee "$NGINX_SITE" >/dev/null <<NGINX
${MARKER}
${REDIRECT_BLOCK}
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    # Certbot writes its challenge here and nowhere else.
    location /.well-known/acme-challenge/ { root /var/www/html; }

    location / {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 60s;
    }

    # Build assets are content-hashed: they can be cached forever.
    location /_next/static/ {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_set_header Host \$host;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Optimised images: a day in the browser, long in the CDN.
    location /_next/image {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_set_header Host \$host;
        add_header Cache-Control "public, max-age=86400, stale-while-revalidate=604800";
    }

    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/javascript application/json
               image/svg+xml application/xml;

    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    access_log /var/log/nginx/${APP_NAME}.access.log;
    error_log  /var/log/nginx/${APP_NAME}.error.log;
}
NGINX

$SUDO ln -sfn "$NGINX_SITE" "$NGINX_LINK"

say "Testing the whole nginx config before touching the running server"
$SUDO nginx -t || die "nginx -t failed. Nothing was reloaded; your other sites are untouched. Fix the error above and re-run."
$SUDO systemctl reload nginx
note "reloaded — existing connections on your other sites were not dropped"

cat <<DONE

    Serving http://${DOMAIN} once DNS points here.

    Next:
      1. In Hostinger DNS, set A records to this server's IP:
             @     A   $(curl -4 -s --max-time 5 ifconfig.me || echo '<this VPS IP>')
             www   A   $(curl -4 -s --max-time 5 ifconfig.me || echo '<this VPS IP>')
      2. Wait for it: dig +short ${DOMAIN}
      3. Then turn on HTTPS:  bash deploy/ssl.sh

DONE
