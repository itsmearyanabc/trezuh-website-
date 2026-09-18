#!/usr/bin/env bash
#
# Issue and install a Let's Encrypt certificate for this site only.
#
# certbot --nginx edits the server blocks that match the -d names it is given
# and leaves every other block alone, so certificates already installed for
# your other domains are not touched or renewed here.
#
# Usage:  bash deploy/ssl.sh [--force]
#
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_common.sh"

FORCE=0
[ "${1:-}" = "--force" ] && FORCE=1

require_domain

NAMES=(-d "$DOMAIN")
[ "$WITH_WWW" = "1" ] && NAMES+=(-d "www.${DOMAIN}")

say "Checking DNS before asking Let's Encrypt for anything"
MY_IP="$(curl -4 -s --max-time 8 ifconfig.me || true)"
DNS_IP="$(dig +short "$DOMAIN" A | tail -n1 || true)"
note "this server : ${MY_IP:-unknown}"
note "${DOMAIN} : ${DNS_IP:-not resolving yet}"

if [ "$FORCE" -ne 1 ] && [ -n "$MY_IP" ] && [ "$DNS_IP" != "$MY_IP" ]; then
  die "DNS does not point here yet (or is proxied through Cloudflare).
    Wait for propagation and re-run, or re-run with --force if the
    difference is expected. Issuing now would just burn a rate limit."
fi

if ! command -v certbot >/dev/null 2>&1; then
  say "Installing certbot"
  $SUDO apt-get update -qq
  $SUDO apt-get install -y -qq certbot python3-certbot-nginx
fi

say "Requesting the certificate"
note "only ${DOMAIN} is passed to certbot; your other certificates are untouched"
$SUDO certbot --nginx "${NAMES[@]}" --redirect --agree-tos --no-eff-email -m "Thetrezuh@gmail.com"

say "Re-testing nginx"
$SUDO nginx -t || die "nginx -t failed after certbot. Nothing reloaded."
$SUDO systemctl reload nginx

say "Renewal"
note "certbot's systemd timer renews everything on this box, including this."
$SUDO systemctl list-timers 'certbot*' --no-pager 2>/dev/null | head -3 || true

printf '\n    Live: https://%s\n\n' "$DOMAIN"
