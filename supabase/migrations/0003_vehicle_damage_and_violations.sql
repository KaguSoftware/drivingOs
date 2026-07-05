-- Damage tracking and traffic violations for vehicles.

create type damage_status as enum ('reported', 'waiting_parts', 'in_repair', 'resolved');

create table vehicle_damage_records (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  part_name text not null,
  status damage_status not null default 'reported',
  notes text,
  created_at timestamptz not null default now()
);

create table vehicle_violations (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  violation_type text not null,
  description text,
  violation_date date not null,
  fine_amount numeric(10, 2),
  created_at timestamptz not null default now()
);

-- Placeholder RLS, matching 0001/0002 until the auth flow exists.
alter table vehicle_damage_records enable row level security;
alter table vehicle_violations enable row level security;

create policy "authenticated full access" on vehicle_damage_records for all to authenticated using (true) with check (true);
create policy "authenticated full access" on vehicle_violations for all to authenticated using (true) with check (true);

create policy "temp anon full access" on vehicle_damage_records for all to anon using (true) with check (true);
create policy "temp anon full access" on vehicle_violations for all to anon using (true) with check (true);
