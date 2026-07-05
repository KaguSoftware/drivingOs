-- Scheduled exam sessions (place + proctor + time window) and student enrollment.

create table exam_sessions (
  id uuid primary key default gen_random_uuid(),
  exam_place_id uuid not null references exam_places(id) on delete restrict,
  instructor_id uuid references instructors(id) on delete set null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create index exam_sessions_starts_ends_idx on exam_sessions (starts_at, ends_at);

create table exam_enrollments (
  id uuid primary key default gen_random_uuid(),
  exam_session_id uuid not null references exam_sessions(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (exam_session_id, student_id)
);

alter table exam_sessions enable row level security;
alter table exam_enrollments enable row level security;

create policy "authenticated full access" on exam_sessions for all to authenticated using (true) with check (true);
create policy "temp anon full access" on exam_sessions for all to anon using (true) with check (true);

create policy "authenticated full access" on exam_enrollments for all to authenticated using (true) with check (true);
create policy "temp anon full access" on exam_enrollments for all to anon using (true) with check (true);
