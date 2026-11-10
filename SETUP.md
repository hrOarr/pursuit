# Pursuit — one-time setup guide

Everything needed to get the app **and** the daily analysis scheduler running. Do the sections in order. Most of it is already done — the checklist at the bottom shows what's left.

---

## 0. What you need to have on hand (credentials & accounts)

| # | Item | Where it comes from | Used by | Secret? |
|---|------|---------------------|---------|---------|
| 1 | **Supabase project** (named *pursuit*) | supabase.com | app + scheduler | — |
| 2 | **Project URL** — `https://hrmdbjperwyjeaqnebdv.supabase.co` | Supabase → Project Settings → API | app (already in `index.html`) + scheduler secret | no (public) |
| 3 | **Publishable key** — `sb_publishable_…` | Supabase → Project Settings → API Keys | the website (already in `index.html`) | no (public) |
| 4 | **Secret key** — `sb_secret_…` (generate a **fresh** one) | Supabase → Project Settings → API Keys | scheduler only (GitHub Secret) | **YES — never in the site/repo** |
| 5 | **GitHub repo** — `hrOarr/pursuit` | github.com | hosting + scheduler | — |

> Items 2 and 3 are public by design and already live in the site. Item 4 is a secret and goes **only** into GitHub Actions Secrets. **No Anthropic/LLM key is needed** — data research is done on demand by Claude in chat and synced by the free daily job (see §4).

---

## 1. Database schema (Supabase SQL editor, *pursuit* project)

Run these two files once each, in order. Confirm the project switcher (top-left) shows **pursuit** first.

1. **`supabase_setup.sql`** — creates `programs`, `scholarships`, `profile`; enables access; turns on realtime.
2. **`scheduler_setup.sql`** — adds `window_state`, `last_analyzed`, `ai_source` columns and the `analysis_log` audit table.

Verify:
```sql
select table_name from information_schema.tables where table_schema = 'public';
-- expect: programs, scholarships, profile, analysis_log
```

---

## 2. The website (already configured)

`index.html` already contains the Project URL + publishable key, so there's nothing to edit. It's hosted on **GitHub Pages** at:

**https://hroarr.github.io/pursuit/**  *(all lowercase)*

If Pages isn't on yet: repo → **Settings → Pages** → Source **Deploy from a branch** → **main** / **(root)** → Save.

---

## 3. Seed your data (first run only)

Open the site → **Universities** tab → **Import recommended programs** (loads 19). Then **Scholarships** tab → **Import recommended scholarships** (loads 8). From then on everything saves to Supabase and syncs across devices.

---

## 4. The daily sync job (GitHub Actions) — free, no LLM

The job does two cost-free things each day: **maintenance** (recompute each program's window state) and **overrides sync** (apply any verified data in `data/overrides.json` to the DB), then writes the dashboard summary. No Anthropic/OpenAI key, no per-token cost.

### 4a. Add the secrets
Repo → **Settings → Secrets and variables → Actions → New repository secret**. Add just two:

| Secret name | Value |
|-------------|-------|
| `SUPABASE_URL` | `https://hrmdbjperwyjeaqnebdv.supabase.co` |
| `SUPABASE_SECRET_KEY` | a **fresh** `sb_secret_…` key (Supabase → API Keys) |

### 4b. How data gets refreshed (on demand, by Claude — free)
Deadlines change a few times a year, not daily, so research is on demand:
1. In chat, ask Claude e.g. **"refresh the Finland & Sweden deadlines."**
2. Claude searches the web, then commits the verified fields to **`data/overrides.json`** in this repo.
3. The change reaches the app one of two ways:
   - wait for the next daily run, **or**
   - apply it now: repo → **Actions → Daily sync → Run workflow**.
4. The app updates automatically (it reads Supabase live). Every change is logged to `analysis_log` with its previous value.

This uses only your existing Claude chat (your Pro plan already covers it) — no API key, no billing.

### 4c. Test / schedule
Repo → **Actions** → enable workflows if prompted → **Daily sync** → **Run workflow** to test now. It also runs automatically every day at **02:00 UTC (08:00 Dhaka)** — edit the `cron` line in `.github/workflows/daily.yml` to change the time.

---

## 5. Security must-do

- **Rotate the secret key that was shared earlier.** Supabase → Project Settings → API Keys → revoke/roll it, and use a brand-new `sb_secret_…` for the GitHub Secret in 4a.
- Rule of thumb: `sb_publishable_…` and the Project URL are public (fine in the site). `sb_secret_…` and `sk-ant-…` are private (GitHub Secrets only — never in `index.html` or a commit).
- With the current policies, anyone with the site URL can read/write your data (fine for personal use on an unlisted URL). To make it private, enable Supabase Auth — see `README.md`.

---

## Your application documents (separate from the above)

These are the real-world documents your *study applications* need — tracked per-program in the app's **Documents** tab and on each university card:

- IELTS / English test result (you have 6.5 — valid 2 years)
- Official transcripts + degree certificate (JU BSc)
- Apostille / legalisation of degree & transcripts (Bangladesh MoFA — start early)
- Statement of Purpose (tailored per program)
- Academic CV
- 2–3 recommendation letters
- Passport (6+ months validity)
- Proof of funds (for the residence-permit/visa stage)

---

## Final checklist

- [ ] `supabase_setup.sql` run in **pursuit** project
- [ ] `scheduler_setup.sql` run in **pursuit** project
- [ ] GitHub Pages on → site loads at `hroarr.github.io/pursuit/`
- [ ] Imported programs + scholarships
- [ ] 2 Actions secrets added (`SUPABASE_URL`, `SUPABASE_SECRET_KEY`)
- [ ] "Daily sync" workflow run once manually and succeeded
- [ ] Old shared `sb_secret_…` key rotated
