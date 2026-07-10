# Gilgil Day Senior School — Admin CMS Setup

Everything you need to get the admin panel live on Cloudflare so you (and any admins you add) can edit the site without touching code. Changes go live on the public site **instantly** — no rebuilds, no republishing.

---

## What's editable from the admin panel

| Section on the site               | Where to edit it in the admin        |
| --------------------------------- | ------------------------------------ |
| News & announcements (+ articles) | **News & Announcements**             |
| Gallery photos                    | **Gallery Photos**                   |
| Downloads & results (PDF/Excel)   | **Downloads & Results**              |
| Principal, deputies, DoS, HODs, teachers | **Leadership & Staff**        |
| Students' Council + captain message | **Students' Council**              |
| List of KCSE achievers (Alumni page) | **List of Achievers**             |
| School logo, Alumni section text  | **Logo & Page Content**              |
| Add / remove admins, change password | **Admin Accounts**                |

**Fallback behaviour:** if a section is empty in the database, the public site falls back to the built-in defaults from the code. That way the site never looks broken while you're populating it.

---

## One-time deployment steps

You'll need the Cloudflare CLI:

```bash
npm install -g wrangler
wrangler login
```

### 1. Create the D1 database

```bash
wrangler d1 create gdss-db
```

Copy the `database_id` it prints and paste it into **`wrangler.toml`** in place of `REPLACE_WITH_YOUR_D1_DATABASE_ID`.

### 2. Apply the schema (creates tables + seeds the first admin)

```bash
wrangler d1 execute gdss-db --remote --file=schema.sql
```

This creates all the content tables and seeds one admin account so you can log in:

- **Email:** `admin@gilgilday.co.ke`
- **Password:** `ChangeMe@2026`

**Change this password from the admin panel the first time you sign in.**

### 3. Create the R2 bucket (for photo/PDF/logo uploads)

```bash
wrangler r2 bucket create gdss-media
```

### 4. Build & deploy

```bash
npm install
npm run build           # writes the static site to /out
wrangler pages deploy out
```

The `functions/` folder is picked up automatically as the API. That's it — the site is live at `https://<your-project>.pages.dev` (or your custom domain).

---

## First sign-in

1. Go to `https://<your-site>/portals/admin`
2. Sign in with `admin@gilgilday.co.ke` / `ChangeMe@2026`
3. Click **Admin Accounts** → **Change my password** — set a strong one.
4. In the same tab, add accounts for the DoS, Bursar, or anyone else who needs to publish.

---

## How each section works

**News.** Type a title (the URL slug is generated automatically), pick a category, write the excerpt and body (paragraphs separated by blank lines), optionally upload a photo, tick *Featured* to pin it at the top, tick *Published* to make it visible. Draft posts stay hidden.

**Gallery.** Upload photos with a caption and a category — they appear on `/gallery` immediately, filterable by category.

**Downloads & results.** Upload the PDF/Excel/Word file, name it, pick a category. Tick *Restricted* for parent-only files (results PDFs) — those show a "View in Parent Portal" button instead of a download link.

**Leadership & Staff.** The moment you add your **first** staff member here, the Staff page switches from its built-in placeholder list to your live database. So when you start, add the whole leadership team in one sitting: Principal, both Deputies, DoS, Bursar, pathway heads, track heads, coordinators, then teachers.

**Students' Council.** Save the School Captain's message once, then add each council member with their role.

**List of Achievers.** Each entry is a KCSE achiever — name, grade, destination/course, optional photo. Shows on `/alumni`.

**Logo & page content.** Upload a PNG school crest (transparent background works best) — it replaces the placeholder crest in the header and footer everywhere on the site. You can also edit the headline/summary on the Alumni achievers section.

**Admin Accounts.** Add or remove admin accounts, change your own password. Every admin has the same permissions. You cannot delete the last admin or your own account (safety guards).

---

## Local development

To test the API locally before deploying:

```bash
# Apply schema to a local D1 copy
wrangler d1 execute gdss-db --local --file=schema.sql

# Build the site, then serve it + the /functions API
npm run build
wrangler pages dev out
```

Then visit `http://localhost:8788`.

---

## Troubleshooting

**"Not signed in" after login.** Cookies require HTTPS in production. On `*.pages.dev` or your custom domain this works automatically. If testing locally, use `http://localhost:8788`.

**Uploads failing.** Confirm the R2 bucket exists and the binding name in `wrangler.toml` is exactly `MEDIA`.

**Content not updating.** The public site fetches `/api/content` on every page load with `Cache-Control: no-store`, so changes appear on the next refresh. If you see stale content, hard-refresh the browser.

**Forgot the admin password.** Run `wrangler d1 execute gdss-db --remote --command "DELETE FROM admins WHERE email='admin@gilgilday.co.ke'"`, then re-run `wrangler d1 execute gdss-db --remote --file=schema.sql` to re-seed. Change the password immediately after logging back in.

---

## What's stored where

- **Cloudflare D1** (SQLite): news, gallery, downloads, staff, council, achievers, admin accounts, sessions, settings.
- **Cloudflare R2** (object storage): every uploaded photo, PDF, and the logo. Served from `/api/media/<key>`.
- **Cloudflare Pages** (static hosting): the compiled site + the `/functions` API.

All three sit inside Cloudflare's generous free tier for a school-sized workload. No separate server, no monthly bill for small use.
