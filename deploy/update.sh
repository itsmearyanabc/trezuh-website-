#!/usr/bin/env bash
#
# Redeploy after a push. Touches the checkout and this one pm2 app.
# It never reads, writes or reloads nginx.
#
# Usage:  bash deploy/update.sh
#
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_common.sh"

require_domain
require_node

[ -d "$APP_DIR/.git" ] || die "${APP_DIR} is not a checkout. Run deploy/setup.sh first."
pm2 describe "$APP_NAME" >/dev/null 2>&1 || die "pm2 app '${APP_NAME}' is not running. Run deploy/setup.sh first."

say "Pulling ${BRANCH}"
git -C "$APP_DIR" fetch --depth 1 origin "$BRANCH"
BEFORE="$(git -C "$APP_DIR" rev-parse HEAD)"
git -C "$APP_DIR" reset --hard "origin/${BRANCH}"
AFTER="$(git -C "$APP_DIR" rev-parse HEAD)"
note "${BEFORE:0:7} -> ${AFTER:0:7}"

build_app

say "Reloading ${APP_NAME}"
note "zero-downtime, and --only pins it to this app"
pm2 startOrReload "$APP_DIR/deploy/ecosystem.config.cjs" --only "$APP_NAME" --update-env

sleep 2
CODE="$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "http://127.0.0.1:${APP_PORT}/" || echo 000)"
[ "$CODE" = "200" ] || die "The app answered ${CODE} on 127.0.0.1:${APP_PORT}. Check: pm2 logs ${APP_NAME} --lines 50"

printf '\n    %s is live on https://%s\n\n' "${AFTER:0:7}" "$DOMAIN"
