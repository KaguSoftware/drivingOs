-- Weekly class-time preferences: a student picks up to 6 weekday slots
-- (max 1 per weekday) that get auto-matched to any available instructor.
-- When admin cancels the resulting lesson, the request falls back to
-- 'pending' so the student can be notified and re-select.
-- weekday convention: 0 = Monday … 6 = Sunday (matches 0016/0019).

create type class_time_request_status as enum ('pending', 'matched', 'canceled');

create table class_time_requests (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  status class_time_request_status not null default 'pending',
  lesson_id uuid references lessons(id) on delete set null,
  was_ever_matched boolean not null default false,
  notified_at timestamptz,
  created_at timestamptz not null default now(),
  unique (student_id, weekday)
);

create index class_time_requests_student_idx on class_time_requests (student_id);

alter table class_time_requests enable row level security;

create policy "admin full access" on class_time_requests
  for all to authenticated using (is_admin()) with check (is_admin());
create policy "student own rows" on class_time_requests
  for select to authenticated using (student_id = current_student_id());

-- Track how a lesson was created so the cancel→re-select loop only applies
-- to auto-matched lessons (manual/self-booked lessons are unaffected).
create type lesson_source as enum ('manual', 'self_booked', 'auto_matched');
alter table lessons add column source lesson_source not null default 'manual';

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
  insert into lessons (student_id, instructor_id, vehicle_id, starts_at, ends_at, source)
  values (v_student_id, p_instructor_id, v_vehicle_id, p_starts_at, p_ends_at, 'self_booked')
  returning id into v_lesson_id;
  return v_lesson_id;
end;
$$;

-- Auto-matches a student's weekly weekday/time preference to the first
-- available instructor (any instructor, not a specific one). Upserts the
-- preference into class_time_requests and, if an instructor is found for
-- the next occurrence of that weekday, creates the lesson immediately.
create or replace function book_lesson_any_instructor(
  p_weekday smallint,
  p_start_time time,
  p_end_time time
)
returns uuid
language plpgsql security definer set search_path = public as
$$
declare
  v_student_id uuid := current_student_id();
  v_request_id uuid;
  v_target_date date;
  v_current_weekday int;
  v_days_ahead int;
  v_instructor_id uuid;
  v_vehicle_id uuid;
  v_lesson_id uuid;
begin
  if v_student_id is null then
    raise exception 'not_a_student';
  end if;
  if p_weekday < 0 or p_weekday > 6 or p_end_time <= p_start_time then
    raise exception 'invalid_time';
  end if;

  insert into class_time_requests (student_id, weekday, start_time, end_time, status, lesson_id)
  values (v_student_id, p_weekday, p_start_time, p_end_time, 'pending', null)
  on conflict (student_id, weekday) do update
    set start_time = excluded.start_time,
        end_time = excluded.end_time,
        status = 'pending',
        lesson_id = null
  returning id into v_request_id;

  v_current_weekday := extract(isodow from current_date)::int - 1;
  v_days_ahead := (p_weekday - v_current_weekday + 7) % 7;
  -- If today matches but the slot has already started, push to next week.
  if v_days_ahead = 0 and p_start_time <= current_time then
    v_days_ahead := 7;
  end if;
  v_target_date := current_date + v_days_ahead;

  select i.id, i.assigned_vehicle_id into v_instructor_id, v_vehicle_id
  from instructors i
  where i.assigned_vehicle_id is not null
    and exists (
      select 1 from instructor_availability a
      where a.instructor_id = i.id
        and a.weekday = p_weekday
        and a.start_time <= p_start_time
        and a.end_time >= p_end_time
    )
    and not exists (
      select 1 from instructor_blocked_dates b
      where b.instructor_id = i.id and b.blocked_date = v_target_date
    )
    and not exists (
      select 1 from lessons l
      where l.instructor_id = i.id
        and tstzrange(l.starts_at, l.ends_at) && tstzrange(
          (v_target_date + p_start_time)::timestamptz,
          (v_target_date + p_end_time)::timestamptz
        )
    )
  order by i.id
  for update of i skip locked
  limit 1;

  if v_instructor_id is null then
    -- No instructor available right now; request stays pending.
    return null;
  end if;

  begin
    insert into lessons (student_id, instructor_id, vehicle_id, starts_at, ends_at, source)
    values (
      v_student_id,
      v_instructor_id,
      v_vehicle_id,
      (v_target_date + p_start_time)::timestamptz,
      (v_target_date + p_end_time)::timestamptz,
      'auto_matched'
    )
    returning id into v_lesson_id;
  exception when exclusion_violation then
    -- Another booking beat us to this instructor/vehicle; treat as no match.
    return null;
  end;

  update class_time_requests
  set status = 'matched', lesson_id = v_lesson_id, was_ever_matched = true
  where id = v_request_id;

  return v_lesson_id;
end;
$$;

-- If an admin (or anyone) deletes an auto-matched lesson, reopen the
-- student's request so they get notified and can re-select.
create or replace function clear_class_time_request_on_lesson_delete()
returns trigger
language plpgsql security definer set search_path = public as
$$
begin
  update class_time_requests
  set status = 'pending', lesson_id = null, notified_at = null
  where lesson_id = old.id;
  return old;
end;
$$;

create trigger clear_class_time_request_on_lesson_delete
  after delete on lessons
  for each row when (old.source = 'auto_matched')
  execute function clear_class_time_request_on_lesson_delete();

revoke all on function book_lesson_any_instructor(smallint, time, time) from public;
grant execute on function book_lesson_any_instructor(smallint, time, time) to authenticated;
