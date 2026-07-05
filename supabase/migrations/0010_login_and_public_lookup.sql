-- Login now exists (app/login) — drop all temporary anon-full-access
-- policies added in 0002/0003/0004/0005/0006/0007/0008/0009.
-- Public access going forward is limited to the two narrow RPCs below
-- (security definer), not blanket table grants.

drop policy if exists "temp anon full access" on students;
drop policy if exists "temp anon full access" on instructors;
drop policy if exists "temp anon full access" on vehicles;
drop policy if exists "temp anon full access" on vehicle_damage_records;
drop policy if exists "temp anon full access" on vehicle_violations;
drop policy if exists "temp anon full access" on vehicle_periodic_checks;
drop policy if exists "temp anon full access" on lessons;
drop policy if exists "temp anon full access" on exam_results;
drop policy if exists "temp anon full access" on payment_installments;
drop policy if exists "temp anon full access" on exam_places;
drop policy if exists "temp anon full access" on exam_sessions;
drop policy if exists "temp anon full access" on exam_enrollments;

-- Public student exam lookup: two security-definer RPCs, callable by anon,
-- that return only the fields the lookup page needs. No broad anon SELECT
-- policy is granted on students/exam_enrollments/exam_sessions/exam_places.
-- Known limitation: no rate limiting against national_id enumeration at the
-- DB layer — a follow-up should add throttling if this becomes a concern.

create or replace function national_id_exists(p_national_id text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists(select 1 from students where national_id = p_national_id);
$$;

create or replace function lookup_upcoming_exam(p_national_id text)
returns table (
  student_full_name text,
  exam_place_name text,
  exam_place_address text,
  exam_place_notes text,
  starts_at timestamptz,
  ends_at timestamptz
)
language sql
security definer
set search_path = public
stable
as $$
  select
    s.full_name,
    ep.name,
    ep.address,
    ep.notes,
    es.starts_at,
    es.ends_at
  from students s
  join exam_enrollments ee on ee.student_id = s.id
  join exam_sessions es on es.id = ee.exam_session_id
  join exam_places ep on ep.id = es.exam_place_id
  where s.national_id = p_national_id
    and es.starts_at > now()
  order by es.starts_at asc;
$$;

revoke all on function national_id_exists(text) from public;
revoke all on function lookup_upcoming_exam(text) from public;
grant execute on function national_id_exists(text) to anon;
grant execute on function lookup_upcoming_exam(text) to anon;
