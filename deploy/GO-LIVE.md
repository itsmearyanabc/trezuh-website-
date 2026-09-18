# Going live — the whole sequence

Every command below runs **on the VPS as root**, and every one starts with an
absolute `cd`, because there are other deployments on this box and none of
these commands should ever be run from the wrong directory.

Set your domain once, here, and use the same value everywhere below:

```
DOMAIN = ________________   (e.g. trezuh.in — no https://, no www, no slash)
VPS IP = 200.141.4.211
```

---

## 1 — Pull the code onto the VPS

```bash
cd /var/www/trezuh && git pull origin main
```

If that errors with "not a git repository", the checkout is missing and you
want `deploy/setup.sh` instead — see `deploy/README.md`.

## 2 — Tell it the domain

```bash
nano /var/www/trezuh/deploy/deploy.env
```

Set `DOMAIN=` to your domain. Leave `APP_NAME`, `APP_PORT` (3100) and
`APP_DIR` alone — they are namespaced so they cannot collide with camel,
vakeel-web, vakeel-worker, interns-portal or telegram-tool.

If the file does not exist yet:

```bash
cp /var/www/trezuh/deploy/deploy.env.example /var/www/trezuh/deploy/deploy.env && nano /var/www/trezuh/deploy/deploy.env
```

## 3 — Build and publish it

```bash
cd /var/www/trezuh && bash deploy/setup.sh
```

Use `setup.sh`, not `update.sh`: the domain has changed, so `server_name` has
to change with it, and `update.sh` never touches nginx. It prints what it will
create and waits for a `y`. It reloads nginx rather than restarting it, and
only after `nginx -t` passes on the whole config — your other sites stay up.

The domain is compiled into the build (canonical tag, `sitemap.xml`,
`robots.txt`, structured data), which is why this step comes before DNS.

---

## 4 — Point the domain at the VPS (GoDaddy)

**An apex domain cannot be a CNAME.** DNS does not allow a CNAME at the root
of a zone alongside the NS and SOA records, so `trezuh.in` must be an **A**
record. Only `www` can be a CNAME.

GoDaddy → **My Products** → your domain → **DNS** → **Manage DNS**.

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| **A** | `@` | `200.141.4.211` | 600 |
| **CNAME** | `www` | `@` | 1 hour |

Then:

1. **Edit, do not add.** GoDaddy ships an `A` record on `@` pointing at its
   parking IP. Edit that one and change the value. If you add a second `A`
   record, half your visitors land on the parking page.
2. Delete any other `A` or `AAAA` record on `@` or `www`.
3. Check **Domain Forwarding** is off (GoDaddy → domain → *Forwarding*). A
   forward overrides your DNS and will silently hijack the domain.
4. Leave `MX` and `TXT` records alone — those are email and verification.

Save. GoDaddy usually publishes within a few minutes; allow up to an hour.

## 5 — Wait for it to resolve

```bash
dig +short yourdomain.com && dig +short www.yourdomain.com
```

The first must print `200.141.4.211`. Do not go to step 6 until it does —
Let's Encrypt rate-limits failed attempts.

## 6 — HTTPS

```bash
cd /var/www/trezuh && bash deploy/ssl.sh
```

It re-checks DNS before calling Let's Encrypt, then hands certbot **only**
your domain, so the certificates already on this box (camel971 and the rest)
are untouched. Renewal is the system timer that is already running.

## 7 — Confirm

```bash
cd /var/www/trezuh && bash deploy/status.sh
```

and from any browser: `https://yourdomain.com`, plus `https://www.yourdomain.com`
(should redirect to the apex).

---

## 8 — Get it into Google

Indexing is not automatic and it is not instant. Do all four.

### a. Search Console

<https://search.google.com/search-console> → **Add property** → **URL prefix**
→ `https://yourdomain.com`. Choose the **HTML tag** method, copy the
`content="..."` value, then:

```bash
nano /var/www/trezuh/deploy/deploy.env
```

Set `GOOGLE_SITE_VERIFICATION=` to that value, then:

```bash
cd /var/www/trezuh && bash deploy/update.sh
```

Press **Verify** in Search Console. (`update.sh` is right here — nginx is not
changing, only the build.)

### b. Submit the sitemap

Search Console → **Sitemaps** → enter `sitemap.xml` → Submit.

### c. Request indexing

Search Console → **URL Inspection** → paste `https://yourdomain.com` →
**Request indexing**. This is what gets you crawled in days rather than weeks.

### d. Google Business Profile — the one that actually matters

<https://business.google.com> → create a profile for TREZUH at Road No. 12,
Banjara Hills, Hyderabad. Category: *Real estate developer*. Use **exactly**
the same name, phone and address as the footer — Google cross-checks them
against the structured data already on the page, and consistency is what
earns the map listing.

For a local firm this outranks everything on the page. Someone searching
"TREZUH Hyderabad" finds the Business Profile before the website.

### What is already done for you

Structured data (`Organization` / `RealEstateAgent` with the address, phone,
email and Instagram), a canonical tag, generated `robots.txt` and
`sitemap.xml`, Open Graph and Twitter cards, one `<h1>`, ordered headings, alt
text on every image, and a real `<address>` in the footer.

### Expectations

- Your own name ("TREZUH", "Trezuh Developments"): a few days to a couple of
  weeks after indexing.
- Competitive terms ("luxury real estate Hyderabad"): months, and it needs
  more than a landing page — real project pages, and other sites linking to
  you.

Nothing legitimate makes this instant. Anyone who says otherwise is selling
something that will get the domain penalised.

---

## Redeploying later

Code change only, domain unchanged:

```bash
cd /var/www/trezuh && bash deploy/update.sh
```

Domain change, or nginx needs rewriting:

```bash
cd /var/www/trezuh && bash deploy/setup.sh
```

After a domain change, run `bash deploy/ssl.sh` again for the new name.
