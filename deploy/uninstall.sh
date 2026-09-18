#!/usr/bin/env bash
#
# Remove this deployment and nothing else: its pm2 app, its nginx site, its
# directory. Other apps, other sites and other certificates are untouched.
#
# Usage:  bash deploy/uninstall.sh
#
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_common.sh"

MARKER="# managed by ${APP_NAME} deploy — do not hand-edit"

printf '\n    This removes:\n      pm2 app %s\n      %s\n      %s\n      %s\n\n' \
  "$APP_NAME" "$NGINX_LINK" "$NGINX_SITE" "$APP_DIR"
printf '    Type the app name to confirm: '
read -r REPLY
[ "$REPLY" = "$APP_NAME" ] || die "Stopped. Nothing was changed."

pm2 delete "$APP_NAME" 2>/dev/null || true
pm2 save 2>/dev/null || true

if [ -e "$NGINX_SITE" ] && $SUDO grep -q "$MARKER" "$NGINX_SITE" 2>/dev/null; then
  $SUDO rm -f "$NGINX_LINK" "$NGINX_SITE"
  $SUDO nginx -t && $SUDO systemctl reload nginx
else
  note "left ${NGINX_SITE} alone — it was not written by this script"
fi

$SUDO rm -rf "$APP_DIR"
say "Removed. The certificate is still on disk; drop it with: sudo certbot delete --cert-name ${DOMAIN}"
