-- DrivingOS combined setup: migrations 0014-0019 in one script.
-- Run ONCE in the Supabase SQL editor. Everything runs in one transaction:
-- if any step fails, nothing is applied.
--
-- PREFLIGHT: check for overlapping lessons first (they would violate the
-- new exclusion constraints) using the query in the 0017 section below,
-- and fix any rows it returns before running this script.
begin;

-- ============================================================
-- 0014_profiles_and_roles.sql
-- ============================================================
-- Roles: profiles table links auth.users to a role and (for teachers/
-- students) their domain record. Helper functions are used by RLS policies.

create type user_role as enum ('admin', 'teacher', 'student');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'admin',
  instructor_id uuid unique references instructors(id) on delete cascade,
  student_id uuid unique references students(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint role_link check (
    (role = 'teacher' and instructor_id is not null and student_id is null) or
    (role = 'student' and student_id is not null and instructor_id is null) or
    (role = 'admin' and instructor_id is null and student_id is null)
  )
);

alter table profiles enable row level security;

create policy "read own profile" on profiles
  for select to authenticated using (id = auth.uid());

-- Stable security-definer helpers so RLS policies can check the caller's
-- role without recursing into profiles' own policies.
create or replace function current_user_role()
returns user_role
language sql stable security definer set search_path = public as
$$ select role from profiles where id = auth.uid() $$;

create or replace function current_instructor_id()
returns uuid
language sql stable security definer set search_path = public as
$$ select instructor_id from profiles where id = auth.uid() $$;

create or replace function current_student_id()
returns uuid
language sql stable security definer set search_path = public as
$$ select student_id from profiles where id = auth.uid() $$;

create or replace function is_admin()
returns boolean
language sql stable security definer set search_path = public as
$$ select coalesce((select role from profiles where id = auth.uid()) = 'admin', false) $$;

-- Admins manage profiles (needed to create teacher/student accounts).
create policy "admin full access" on profiles
  for all to authenticated using (is_admin()) with check (is_admin());

-- Every existing auth user predates roles and is an admin.
insert into profiles (id, role)
select id, 'admin' from auth.users
on conflict (id) do nothing;

-- ============================================================
-- 0015_students_multi_license_and_email.sql
-- ============================================================
-- Students can pursue multiple license classes (like instructors already do).
-- Also add email to students and instructors for portal account creation.

alter table students add column license_classes license_class[] not null default '{}';
update students set license_classes = array[license_class];
alter table students drop column license_class;

alter table students add column email text unique;
alter table instructors add column email text unique;

-- lookup_student_by_national_id only returns full_name (no license column),
-- but recreate it here defensively so the public lookup keeps working and
-- future readers see its current definition alongside the schema change.
create or replace function lookup_student_by_national_id(p_national_id text)
returns table (full_name text)
language sql security definer set search_path = public stable as
$$
  select s.full_name from students s where s.national_id = p_national_id;
$$;

-- ============================================================
-- 0016_instructor_availability.sql
-- ============================================================
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

-- ============================================================
-- 0017_instructor_vehicle_and_overlap.sql
-- ============================================================
-- Each instructor teaches with one primary vehicle. DB-level no-overlap
-- constraints replace the racy app-side concurrency check in
-- LessonRepository (see 0005 comment).

alter table instructors
  add column assigned_vehicle_id uuid references vehicles(id) on delete set null;

create extension if not exists btree_gist;

-- Preflight before applying: find overlapping lessons that would violate
-- these constraints and clean them up first:
--   select a.id, b.id from lessons a join lessons b
--     on a.id < b.id
--    and (a.instructor_id = b.instructor_id or a.vehicle_id = b.vehicle_id)
--    and tstzrange(a.starts_at, a.ends_at) && tstzrange(b.starts_at, b.ends_at);

alter table lessons add constraint lessons_no_instructor_overlap
  exclude using gist (instructor_id with =, tstzrange(starts_at, ends_at) with &&);

alter table lessons add constraint lessons_no_vehicle_overlap
  exclude using gist (vehicle_id with =, tstzrange(starts_at, ends_at) with &&);

-- ============================================================
-- 0018_role_rls_and_booking.sql
-- ============================================================
-- Replace the blanket "authenticated full access" policies with role-aware
-- ones, and add security-definer RPCs for student self-service booking.

-- Admin-only tables: swap blanket policy for is_admin().
do $$
declare t text;
begin
  foreach t in array array[
    'students', 'instructors', 'vehicles',
    'vehicle_damage_records', 'vehicle_violations', 'vehicle_periodic_checks',
    'lessons', 'exam_results', 'payment_installments',
    'exam_places', 'exam_sessions', 'exam_enrollments'
  ] loop
    execute format('drop policy if exists "authenticated full access" on %I', t);
    execute format(
      'create policy "admin full access" on %I for all to authenticated using (is_admin()) with check (is_admin())', t
    );
  end loop;
end $$;

-- Teachers: read their own lessons.
create policy "teacher own lessons" on lessons
  for select to authenticated using (instructor_id = current_instructor_id());

-- Students: read their own data.
create policy "student own row" on students
  for select to authenticated using (id = current_student_id());
create policy "student own lessons" on lessons
  for select to authenticated using (student_id = current_student_id());
create policy "student own installments" on payment_installments
  for select to authenticated using (student_id = current_student_id());
create policy "student own enrollments" on exam_enrollments
  for select to authenticated using (student_id = current_student_id());

-- Everyone signed in may read instructors/vehicles/exam places & sessions
-- (needed to render bookings, calendars and exam details; non-sensitive).
create policy "authenticated read" on instructors
  for select to authenticated using (true);
create policy "authenticated read" on vehicles
  for select to authenticated using (true);
create policy "authenticated read" on exam_places
  for select to authenticated using (true);
create policy "authenticated read" on exam_sessions
  for select to authenticated using (true);

-- ============================================================
-- 0019_booking_rpcs.sql
-- ============================================================
-- Student self-service booking RPCs. All validation lives here so clients
-- can never insert lessons that ignore availability or the 24h cancel rule.
-- weekday convention: 0 = Monday … 6 = Sunday (isodow - 1).

create or replace function list_open_slots(
  p_instructor_id uuid,
  p_from date,
  p_to date,
  p_slot_minutes int default 60
)
returns table (starts_at timestamptz, ends_at timestamptz)
language sql stable security definer set search_path = public as
$$
  with slots as (
    select
      (d.day + a.start_time + make_interval(mins => n.n * p_slot_minutes)) as s,
      (d.day + a.start_time + make_interval(mins => (n.n + 1) * p_slot_minutes)) as e
    from generate_series(p_from, p_to, interval '1 day') as d(day)
    join instructor_availability a
      on a.instructor_id = p_instructor_id
     and a.weekday = extract(isodow from d.day)::int - 1
    cross join lateral generate_series(
      0,
      (extract(epoch from (a.end_time - a.start_time)) / 60 / p_slot_minutes)::int - 1
    ) as n(n)
  )
  select s, e from slots
  where s > now()
    and not exists (
      select 1 from instructor_blocked_dates b
      where b.instructor_id = p_instructor_id and b.blocked_date = s::date
    )
    and not exists (
      select 1 from lessons l
      where l.instructor_id = p_instructor_id
        and tstzrange(l.starts_at, l.ends_at) && tstzrange(s, e)
    )
  order by s;
$$;

create or replace function book_lesson(
  p_instructor_id uuid,
  p_starts_at timestamptz,
  p_ends_at timestamptz
)
returns uuid
language plpgsql security definer set search_path = public as
$$
declare
  v_student_id uuid := current_student_id();
  v_vehicle_id uuid;
  v_lesson_id uuid;
begin
  if v_student_id is null then
    raise exception 'not_a_student';
  end if;
  if p_starts_at <= now() or p_ends_at <= p_starts_at then
    raise exception 'invalid_time';
  end if;
  if not exists (
    select 1 from instructor_availability a
    where a.instructor_id = p_instructor_id
      and a.weekday = extract(isodow from p_starts_at)::int - 1
      and a.start_time <= p_starts_at::time
      and a.end_time >= p_ends_at::time
      and p_starts_at::date = p_ends_at::date
  ) then
    raise exception 'outside_availability';
  end if;
  if exists (
    select 1 from instructor_blocked_dates b
    where b.instructor_id = p_instructor_id
      and b.blocked_date = p_starts_at::date
  ) then
    raise exception 'date_blocked';
  end if;
  select assigned_vehicle_id into v_vehicle_id
  from instructors where id = p_instructor_id;
  if v_vehicle_id is null then
    raise exception 'no_vehicle_assigned';
  end if;
  -- Overlap races are caught by the exclusion constraints (23P01).
  insert into lessons (student_id, instructor_id, vehicle_id, starts_at, ends_at)
  values (v_student_id, p_instructor_id, v_vehicle_id, p_starts_at, p_ends_at)
  returning id into v_lesson_id;
  return v_lesson_id;
end;
$$;

create or replace function cancel_lesson(p_lesson_id uuid)
returns void
language plpgsql security definer set search_path = public as
$$
declare
  v_student_id uuid := current_student_id();
begin
  if v_student_id is null then
    raise exception 'not_a_student';
  end if;
  if not exists (
    select 1 from lessons
    where id = p_lesson_id
      and student_id = v_student_id
      and starts_at > now() + interval '24 hours'
  ) then
    raise exception 'cannot_cancel';
  end if;
  delete from lessons where id = p_lesson_id and student_id = v_student_id;
end;
$$;

revoke all on function list_open_slots(uuid, date, date, int) from public;
revoke all on function book_lesson(uuid, timestamptz, timestamptz) from public;
revoke all on function cancel_lesson(uuid) from public;
grant execute on function list_open_slots(uuid, date, date, int) to authenticated;
grant execute on function book_lesson(uuid, timestamptz, timestamptz) to authenticated;
grant execute on function cancel_lesson(uuid) to authenticated;

commit;
