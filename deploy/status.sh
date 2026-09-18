#!/usr/bin/env bash
#
# What this deployment is doing, and proof it is not standing on anything.
#
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_common.sh"

say "This app"
pm2 describe "$APP_NAME" 2>/dev/null | grep -E 'status|script path|exec cwd|restarts' || note "not running"
printf '\n'
note "local check: $(curl -s -o /dev/null -w '%{http_code}' --max-time 5 "http://127.0.0.1:${APP_PORT}/" || echo unreachable) from 127.0.0.1:${APP_PORT}"
[ -n "$DOMAIN" ] && note "public check: $(curl -s -o /dev/null -w '%{http_code}' --max-time 8 "https://${DOMAIN}/" || echo unreachable) from https://${DOMAIN}"

say "Everything else on this box (left alone)"
pm2 list 2>/dev/null || true
printf '\n'
note "enabled nginx sites:"
ls -1 /etc/nginx/sites-enabled/ 2>/dev/null | sed 's/^/      /'
printf '\n'
note "listening ports:"
ss -ltnp 2>/dev/null | awk 'NR==1 || /LISTEN/' | head -20 | sed 's/^/      /'
