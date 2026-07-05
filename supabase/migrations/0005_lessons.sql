-- Weekly schedule: lessons booking a student, instructor and vehicle.
-- App-level rule (enforced in LessonRepository.create, not here): at most 3
-- concurrent lessons may overlap the same time window, one per vehicle.

create table lessons (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  instructor_id uuid not null references instructors(id) on delete restrict,
  vehicle_id uuid not null references vehicles(id) on delete restrict,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create index lessons_starts_ends_idx on lessons (starts_at, ends_at);

alter table lessons enable row level security;

create policy "authenticated full access" on lessons for all to authenticated using (true) with check (true);
create policy "temp anon full access" on lessons for all to anon using (true) with check (true);
