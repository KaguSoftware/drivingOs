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
