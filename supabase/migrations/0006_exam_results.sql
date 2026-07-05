-- Exam outcomes, used for tutor pass/fail statistics.

create table exam_results (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  instructor_id uuid references instructors(id) on delete set null,
  passed boolean not null,
  exam_date date not null,
  created_at timestamptz not null default now()
);

alter table exam_results enable row level security;

create policy "authenticated full access" on exam_results for all to authenticated using (true) with check (true);
create policy "temp anon full access" on exam_results for all to anon using (true) with check (true);
