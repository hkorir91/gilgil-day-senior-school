# Gilgil Day Senior School — Digital School Platform

**Motto:** Knowledge is Power
**Type:** Public Mixed Day Senior School · Gilgil Town, Nakuru County, Kenya
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS

Phase 1: full public website, demo Staff / Parent / Student / Admin portals, mock data layer, database-ready architecture.

---

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Demo portal credentials

| Portal  | URL                | Email                    | Password    |
|---------|--------------------|--------------------------|-------------|
| Staff   | /portals/staff     | teacher@gilgilday.demo   | staff2026   |
| Student | /portals/student   | learner@gilgilday.demo   | learner2026 |
| Parent  | /portals/parent    | parent@gilgilday.demo    | parent2026  |
| Admin   | /portals/admin     | admin@gilgilday.demo     | admin2026   |

Demo sessions are stored in `localStorage` (`gdss-session`). Real authentication
(e.g. Supabase Auth) replaces `components/portal/LoginForm.tsx` later without
touching the dashboards.

## Where to edit content

Everything lives in **`lib/data.ts`** — school details, administration, pathways,
departments, clubs, news, downloads, gallery, support needs, M-Pesa placeholders
and dashboard modules. Replace placeholder names/photos there as real content
arrives. Media placeholders are rendered by `components/Placeholder.tsx`; swap
them for `next/image` + real photos when ready.

## Push to GitHub (from phone or computer)

1. Create a new GitHub repository, e.g. `gilgil-day-senior-school` (empty, no README).
2. **From a computer:**
   ```bash
   git init
   git add .
   git commit -m "Phase 1: Gilgil Day Senior School digital platform"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/gilgil-day-senior-school.git
   git push -u origin main
   ```
3. **From a phone:** on github.com in the browser, open the empty repo → *Add file → Upload files* and upload the project folders (`app/`, `components/`, `lib/`, plus the root config files). Do **not** upload `node_modules` or `.next`.

## Deploy on Vercel

1. Go to vercel.com → **Add New → Project**.
2. Import the GitHub repository. Vercel auto-detects Next.js — no settings needed.
3. Click **Deploy**. Every push to `main` redeploys automatically.
4. Later: add the school's custom domain under *Project → Settings → Domains*.

## Phase roadmap

- **Phase 1 (this repo):** public site + demo portals + mock data.
- **Phase 2:** Supabase/PostgreSQL — real auth, results file uploads (PDF/Excel, parent view-only), announcements, meeting requests.
- **Phase 3:** LMS activation (assignments, quizzes, submissions, feedback), attendance summaries, fee statements.
- **Phase 4:** M-Pesa Daraja integration for the Support page, live chatbot, real media (aerial video, gallery).

Because every page reads from `lib/data.ts`, Phase 2 is mostly swapping those
exports for database queries with the same shapes.
