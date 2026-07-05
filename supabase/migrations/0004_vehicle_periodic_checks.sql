-- Periodic vehicle compliance checks: kasko, muayene, sigorta, periyodik bakim.

create type periodic_check_type as enum ('kasko', 'muayene', 'sigorta', 'periyodik_bakim');

create table vehicle_periodic_checks (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  check_type periodic_check_type not null,
  due_date date not null,
  cost numeric(10, 2),
  provider text,
  created_at timestamptz not null default now()
);

create index vehicle_periodic_checks_vehicle_type_due_idx
  on vehicle_periodic_checks (vehicle_id, check_type, due_date desc);

alter table vehicle_periodic_checks enable row level security;

create policy "authenticated full access" on vehicle_periodic_checks for all to authenticated using (true) with check (true);
create policy "temp anon full access" on vehicle_periodic_checks for all to anon using (true) with check (true);
