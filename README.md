# Pursuit

*The pursuit of what's next — study, scholarships, career.* A personal command center for your Master's & PhD applications across countries, with room to add a jobs section later. A personal command center for tracking Master's & PhD applications and scholarships across countries — statuses, application **open/close** windows, intakes, per-program **requirements** and documents. Data lives in **your own Supabase** project; the site is a single static file you host on **GitHub Pages**.

---

## 1. Set up the database (one time, ~2 min)

1. Go to your Supabase project → **SQL Editor** → **New query**.
2. Open `supabase_setup.sql`, copy everything, paste it in, and click **Run**.
   This creates three tables (`programs`, `scholarships`, `profile`), turns on access, and enables live sync.

That's it — the keys are already baked into `index.html`.

---

## 2. Put it on GitHub Pages

### Option A — no terminal (easiest)
1. Create a new **public** repo on GitHub, e.g. `studytrack`.
2. **Add file → Upload files** → drag in `index.html` (and optionally the `.sql` and this README). Commit.
3. Repo **Settings → Pages**. Under *Build and deployment*, set **Source: Deploy from a branch**, **Branch: `main` / `(root)`**. Save.
4. Wait ~1 minute. Your site is live at:
   `https://<your-username>.github.io/studytrack/`

### Option B — git CLI
```bash
cd studytrack
git init
git add index.html supabase_setup.sql README.md
git commit -m "StudyTrack"
git branch -M main
git remote add origin https://github.com/<your-username>/studytrack.git
git push -u origin main
```
Then do step 3 above (Settings → Pages).

---

## 3. First run

Open the site. If the tables are empty it shows an **Import recommended programs** button — click it to load the 19 pre-filled programs and, on the Scholarships tab, the 8 scholarships. Everything is then editable and saved straight to Supabase, synced across any device you open the site on.

---

## Features
- **Dashboard**: programs, applied, admitted, eligible, scholarships applied, next closing deadline.
- **Universities**: opening + closing dates with live countdowns, intake, tuition, IELTS, eligibility flag, a **requirements checklist you can tick off**, a per-program document checklist, notes, and the application link.
- **Filters**: degree (Masters/PhD), country, **intake**, status; sort by closing date, opening date, priority, country, status or name.
- **Scholarships**, **Documents** rollup, and a **Profile** built from your CV.

---

## A note on privacy (please read)
The site uses Supabase's **anon public key** — that's normal and safe to ship in frontend code. But the setup SQL grants that key full read/write, so **anyone who has your site URL can read and change your data**. For a personal tracker on an unlisted URL that's usually fine.

To make it truly private later, turn on **Supabase Auth** (e.g. magic-link email), add a `user_id uuid` column to each table, and change the policies from:
```sql
for all to anon using (true) with check (true)
```
to:
```sql
for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())
```
Ask and I can wire the login screen in for you.

## Changing the recommended data
The starter catalog lives in `index.html` in the `CATALOG` and `SCH_CATALOG` arrays — edit there, then use the import button (it upserts by id, so it won't duplicate).

> Non-Austria dates and fees are **estimates** (flagged with a *verify* chip). Confirm each on the university's own admissions page before you rely on them.

---

## Daily sync + on-demand refresh (free, no LLM key)

A GitHub Actions job (`.github/workflows/daily.yml`) runs **once a day** and costs nothing:

1. **Maintenance** — recomputes each program's `window_state` (upcoming / open / closing_soon / closed).
2. **Overrides sync** — applies any verified fields in **`data/overrides.json`** to the DB. Every change is recorded in `analysis_log` **with its previous value**. User-only fields (status, notes, docs) are never touched.
3. Writes a **summary** the app shows as a strip on the dashboard.

Because the app reads live from Supabase, DB updates appear in the app automatically.

### How research/refresh works (on demand, by Claude — free)
Deadlines change a few times a year, so there's no paid daily LLM. Instead:
- Ask Claude in chat, e.g. **"refresh the Finland & Sweden deadlines."**
- Claude searches the web and commits the verified fields to `data/overrides.json`.
- Apply it now (repo → **Actions → Daily sync → Run workflow**) or wait for the next daily run.

This uses only your existing Claude chat — no API key, no billing.

### One-time setup
1. Run **`scheduler_setup.sql`** in the pursuit project's SQL editor (adds columns + the `analysis_log` table).
2. Repo → **Settings → Secrets and variables → Actions**, add **two** secrets:
   - `SUPABASE_URL` = `https://hrmdbjperwyjeaqnebdv.supabase.co`
   - `SUPABASE_SECRET_KEY` = a **fresh** `sb_secret_…` key (Project Settings → API Keys). GitHub Secrets only — never in the site.
3. GitHub → **Actions** → enable workflows if prompted → **Daily sync** → **Run workflow** to test.

### Notes
- Schedule is `0 2 * * *` (02:00 UTC ≈ 08:00 Dhaka). Edit the cron line to change it.
- The secret key is used **only** by the Action (server-side) and bypasses RLS; the website keeps using the public `sb_publishable_…` key.
