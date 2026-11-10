-- ============================================================
--  StudyTrack — Supabase schema
--  Run this ONCE in your Supabase project:
--  Dashboard  ->  SQL Editor  ->  New query  ->  paste  ->  Run
-- ============================================================

-- ---------- tables ----------
create table if not exists public.programs (
  id           text primary key,
  country      text,
  cc           text,
  name         text,
  program      text,
  degree       text,
  tuition      text,
  open_date    date,
  close_date   date,
  intake       text,
  ielts        text,
  eligibility  text,
  elig_note    text,
  requirements jsonb   default '[]'::jsonb,
  req_done     jsonb   default '{}'::jsonb,
  link         text,
  priority     text    default 'medium',
  verify       boolean default false,
  status       text    default 'not_started',
  notes        text    default '',
  docs         jsonb   default '{}'::jsonb,
  created_at   bigint,
  updated_at   timestamptz default now()
);

create table if not exists public.scholarships (
  id          text primary key,
  country     text,
  name        text,
  cover       text,
  open_date   date,
  deadline    date,
  link        text,
  verify      boolean default false,
  status      text    default 'not_started',
  notes       text    default '',
  created_at  bigint,
  updated_at  timestamptz default now()
);

create table if not exists public.profile (
  id         text primary key,
  data       jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- ---------- row level security ----------
alter table public.programs     enable row level security;
alter table public.scholarships enable row level security;
alter table public.profile      enable row level security;

-- WARNING -------------------------------------------------------------
-- These policies let ANYONE holding the public anon key (which ships in
-- the website) read and write every row. That is fine for a personal
-- tracker on an unlisted URL, but it is NOT private. To lock it down
-- later, turn on Supabase Auth and replace `to anon` with `to authenticated`
-- plus a `user_id = auth.uid()` check. See the README.
-- ---------------------------------------------------------------------
drop policy if exists "anon all programs"     on public.programs;
drop policy if exists "anon all scholarships" on public.scholarships;
drop policy if exists "anon all profile"      on public.profile;

create policy "anon all programs"     on public.programs     for all to anon using (true) with check (true);
create policy "anon all scholarships" on public.scholarships for all to anon using (true) with check (true);
create policy "anon all profile"      on public.profile      for all to anon using (true) with check (true);

-- ---------- realtime (optional, for live sync across devices) ----------
-- Safe to run even if already added; ignore "already member" notices.
do $$
begin
  begin
    alter publication supabase_realtime add table public.programs;
  exception when duplicate_object then null; end;
  begin
    alter publication supabase_realtime add table public.scholarships;
  exception when duplicate_object then null; end;
  begin
    alter publication supabase_realtime add table public.profile;
  exception when duplicate_object then null; end;
end $$;

-- Done. Open the site and click "Import recommended programs" to seed data.
