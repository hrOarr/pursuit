-- ============================================================
--  Pursuit — scheduler add-ons
--  Run ONCE in your Supabase SQL editor (pursuit project),
--  after supabase_setup.sql. Safe to re-run.
-- ============================================================

-- extra columns the daily job maintains on each program
alter table public.programs add column if not exists window_state text;    -- upcoming | open | closing_soon | closed | no_date
alter table public.programs add column if not exists last_analyzed timestamptz;
alter table public.programs add column if not exists ai_source text;
alter table public.programs add column if not exists steps jsonb default '{}'::jsonb;  -- per-application progress: gathered/uploaded/paid/submitted/interview/decision

-- audit log: every auto-applied change keeps its previous value here,
-- so any overwrite is recoverable.
create table if not exists public.analysis_log (
  id         bigint generated always as identity primary key,
  program_id text,
  run_date   date,
  fields     jsonb,
  before     jsonb,
  after      jsonb,
  source     text,
  confidence text,
  created_at bigint
);

-- RLS: the daily job writes with the SECRET key (bypasses RLS). The app only
-- needs to READ the log (optional). Keep it enabled; allow anon read only.
alter table public.analysis_log enable row level security;
drop policy if exists "anon read analysis_log" on public.analysis_log;
create policy "anon read analysis_log" on public.analysis_log for select to anon using (true);

-- The daily summary the app shows lives in the existing profile table as a row
-- with id = 'analysis' (data jsonb) — no new table needed; anon can already read it.

-- Done.
