-- Core registry tables. Feature tables (scheduling, payments, exams) are
-- added by later migrations — never edit this file.

create type license_class as enum ('A1', 'A2', 'A', 'B1', 'B', 'C1', 'C', 'D1', 'D', 'BE', 'F', 'M');
create type progress_status as enum ('not_started', 'in_progress', 'completed');
create type meb_status as enum ('missing_documents', 'submitted', 'approved', 'rejected');

create table students (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  national_id text not null unique,
  license_class license_class not null,
  theory_status progress_status not null default 'not_started',
  practice_status progress_status not null default 'not_started',
  meb_paperwork_status meb_status not null default 'missing_documents',
  created_at timestamptz not null default now()
);

create table instructors (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  license_classes license_class[] not null default '{}',
  created_at timestamptz not null default now()
);

create table vehicles (
  id uuid primary key default gen_random_uuid(),
  plate text not null unique,
  make_model text not null,
  transmission text not null check (transmission in ('manual', 'automatic')),
  license_class license_class not null,
  created_at timestamptz not null default now()
);

-- Placeholder RLS: any authenticated user has full access.
-- TODO(team): replace with per-school/per-role policies before production.
alter table students enable row level security;
alter table instructors enable row level security;
alter table vehicles enable row level security;

create policy "authenticated full access" on students for all to authenticated using (true) with check (true);
create policy "authenticated full access" on instructors for all to authenticated using (true) with check (true);
create policy "authenticated full access" on vehicles for all to authenticated using (true) with check (true);
