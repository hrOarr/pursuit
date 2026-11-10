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

## Daily analysis (automated scheduler)

A GitHub Actions job (`.github/workflows/daily.yml`) runs **once a day** and:

1. **Maintenance** — recomputes each program's `window_state` (upcoming / open / closing_soon / closed).
2. **AI research** — uses Claude + web search to verify each program's open/close dates, tuition, IELTS and requirements against official sources, and applies updates. Every change is recorded in the `analysis_log` table **with its previous value**, so any auto-overwrite is recoverable. Curated values are only overwritten on high confidence.
3. Writes a daily **summary** the app shows as a strip on the dashboard.

Because the app reads live from Supabase, DB updates appear in the app automatically.

### One-time setup
1. Run **`scheduler_setup.sql`** in the pursuit project's SQL editor (adds columns + the `analysis_log` table).
2. In GitHub → repo **Settings → Secrets and variables → Actions → New repository secret**, add three secrets:
   - `SUPABASE_URL` = `https://hrmdbjperwyjeaqnebdv.supabase.co`
   - `SUPABASE_SECRET_KEY` = a **fresh** Supabase secret key (`sb_secret_…`, from Project Settings → API Keys). This stays in GitHub Secrets only — never in the site.
   - `ANTHROPIC_API_KEY` = your Anthropic API key (from console.anthropic.com). Omit this one to run **maintenance only**, no AI.
3. GitHub → **Actions** tab → enable workflows if prompted → open **Daily analysis** → **Run workflow** to test it immediately (don't wait for the cron).

### Notes
- Schedule is `0 2 * * *` (02:00 UTC ≈ 08:00 Dhaka). Edit the cron line to change it.
- Cost: ~one Claude request per country per day with web search enabled. Keep an eye on your Anthropic usage.
- The secret key is used **only** by the Action (server-side) and bypasses RLS; the website keeps using the public `sb_publishable_…` key.
