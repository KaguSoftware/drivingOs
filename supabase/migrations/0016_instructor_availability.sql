-- Teacher availability: recurring weekly open hours + one-off blocked dates.
-- weekday: 0 = Monday … 6 = Sunday (matches the app's week rendering).

create table instructor_availability (
  id uuid primary key default gen_random_uuid(),
  instructor_id uuid not null references instructors(id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  created_at timestamptz not null default now(),
  check (end_time > start_time)
);

create index instructor_availability_instructor_idx
  on instructor_availability (instructor_id, weekday);

create table instructor_blocked_dates (
  id uuid primary key default gen_random_uuid(),
  instructor_id uuid not null references instructors(id) on delete cascade,
  blocked_date date not null,
  reason text,
  created_at timestamptz not null default now(),
  unique (instructor_id, blocked_date)
);

alter table instructor_availability enable row level security;
alter table instructor_blocked_dates enable row level security;

-- Admin: full. Teacher: full on own rows. Everyone authenticated may read
-- (students need availability to render bookable slots).
create policy "admin full access" on instructor_availability
  for all to authenticated using (is_admin()) with check (is_admin());
create policy "teacher own rows" on instructor_availability
  for all to authenticated
  using (instructor_id = current_instructor_id())
  with check (instructor_id = current_instructor_id());
create policy "authenticated read" on instructor_availability
  for select to authenticated using (true);

create policy "admin full access" on instructor_blocked_dates
  for all to authenticated using (is_admin()) with check (is_admin());
create policy "teacher own rows" on instructor_blocked_dates
  for all to authenticated
  using (instructor_id = current_instructor_id())
  with check (instructor_id = current_instructor_id());
create policy "authenticated read" on instructor_blocked_dates
  for select to authenticated using (true);
