-- Exam locations (with a Google Maps embed in the app).

create table exam_places (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  notes text,
  created_at timestamptz not null default now()
);

alter table exam_places enable row level security;

create policy "authenticated full access" on exam_places for all to authenticated using (true) with check (true);
create policy "temp anon full access" on exam_places for all to anon using (true) with check (true);
