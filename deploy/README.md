# Deploying to the VPS

Four scripts. They assume this box is already serving other things and are
written so that it keeps doing so.

```
deploy/setup.sh      first time — checkout, build, pm2 app, nginx site
deploy/ssl.sh        HTTPS, once DNS points here
deploy/update.sh     every deploy after that
deploy/status.sh     what this app is doing, and what else is running
deploy/uninstall.sh  remove this deployment and nothing else
```

## What it touches, and what it will not

Everything is namespaced, and `setup.sh` refuses to run if any of it already
exists and did not come from this script.

| Creates | |
| --- | --- |
| `/var/www/trezuh` | the checkout |
| pm2 app `trezuh` | bound to **127.0.0.1:3100** — not reachable from outside |
| `/etc/nginx/sites-available/trezuh.conf` | stamped `# managed by trezuh deploy` |
| `/etc/nginx/sites-enabled/trezuh.conf` | a symlink to it |
| `/var/log/nginx/trezuh.{access,error}.log` | its own logs |

**Never touched:** `nginx.conf`, the default site, any other server block, any
other pm2 app, any other certificate, `/var/www` itself or anything else in it.

It aborts before changing anything if:

- port 3100 is taken by something that isn't this app,
- a different pm2 app is already called `trezuh`,
- `trezuh.conf` exists without the marker comment,
- another enabled nginx site already claims your domain,
- `/var/www/trezuh` exists and isn't a git checkout.

Change `APP_NAME`, `APP_PORT` or `APP_DIR` in `deploy.env` if any of those
names are already spoken for.

nginx is **reloaded, never restarted**, and only after `nginx -t` passes on
the whole config — so a mistake here fails before it can drop a connection on
your other sites.

## One real risk: the system Node version

Next 16 needs **Node ≥ 20.9**. If your other apps are pinned to an older Node,
do **not** upgrade the system package — install a second Node for the deploy
user instead:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22
```

Then run the scripts from that shell. pm2 keeps the interpreter it was started
with, so this app stays on 22 while everything else stays where it is.

`pm2` is per-user. If your other apps run under a different user, run these
scripts as **that** user, or you will end up with two pm2 daemons and a
confusing `pm2 list`. `status.sh` prints which user it is running as.

## First deploy

```bash
git clone https://github.com/itsmearyanabc/trezuh-website-.git /tmp/trezuh-deploy
cd /tmp/trezuh-deploy
cp deploy/deploy.env.example deploy/deploy.env
nano deploy/deploy.env          # set DOMAIN
bash deploy/setup.sh
```

`setup.sh` prints what it is about to create and waits for a `y`. It clones
the repo properly to `/var/www/trezuh`; `/tmp/trezuh-deploy` is only the
bootstrap and can be deleted afterwards. Copy your `deploy.env` across:

```bash
cp deploy/deploy.env /var/www/trezuh/deploy/deploy.env
```

## DNS

In **hPanel → Domains → DNS Zone**, point the domain at the VPS. Delete any
existing `A` record for `@` and `www` first — Hostinger ships parking records.

| Type | Name | Points to | TTL |
| --- | --- | --- | --- |
| A | `@` | your VPS IPv4 | 3600 |
| A | `www` | your VPS IPv4 | 3600 |

`setup.sh` prints the IP. Check it has propagated:

```bash
dig +short trezuh.com
```

If the domain is registered elsewhere, set the same records at that registrar,
or point its nameservers at Hostinger.

## HTTPS

Once `dig` returns the VPS IP:

```bash
cd /var/www/trezuh && bash deploy/ssl.sh
```

It refuses to call Let's Encrypt until DNS actually resolves here, so you
can't burn the rate limit on a typo. `certbot --nginx` only edits the server
blocks matching the domains it is given; other certificates on this box are
untouched, and renewal is the existing system timer.

Behind Cloudflare's orange cloud the DNS check will disagree — use
`bash deploy/ssl.sh --force`, or set Cloudflare to DNS-only while issuing.

## A hostname with no certificate falls through to another site

nginx picks a server block by name *per listening port*. A block that only
`listen 80` does not exist as far as port 443 is concerned, so an `https://`
request for that name matches nothing and nginx answers with whichever block
is default on 443 — one of the other sites on this box, under its own
certificate.

Browsers upgrade typed and clicked links to `https://`, so a preview hostname
without a certificate will show someone else's site. Either issue a
certificate for it:

```bash
sudo certbot --nginx -d <hostname> --redirect
```

or go straight to the real domain and run `deploy/ssl.sh`. `http://` alone is
not something you can rely on a browser respecting.

`setup.sh` knows about this: if it finds certbot's config already in
`trezuh.conf` it takes a `.bak-<timestamp>` copy, and it will not rewrite the
file at all unless the domain has actually changed — otherwise a redeploy
would quietly drop TLS and put you back in exactly this situation. When the
domain does change it rewrites and tells you to run `ssl.sh` again.

## Redeploying

```bash
cd /var/www/trezuh && bash deploy/update.sh
```

Pull, rebuild, zero-downtime reload, then a health check on
`127.0.0.1:3100`. It never reads or reloads nginx.

## If the build runs out of memory

`next build` wants roughly 1 GB. On a 1 GB plan, add swap once:

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## Checking on it

```bash
bash deploy/status.sh        # this app, plus everything else, side by side
pm2 logs trezuh --lines 50   # app logs
sudo tail -f /var/log/nginx/trezuh.error.log
```

## Note

`NEXT_PUBLIC_SITE_URL` is baked in at **build** time — the canonical tag,
`sitemap.xml`, `robots.txt` and the structured data all read it. The scripts
write it from `DOMAIN` before every build, so changing `DOMAIN` and running
`update.sh` is enough.
