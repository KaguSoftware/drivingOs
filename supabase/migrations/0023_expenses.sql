-- Generic ad-hoc expenses (e.g. one-off costs added via "Gider ekle").

create table expenses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  cost numeric(10, 2) not null,
  expense_date date not null,
  created_at timestamptz not null default now()
);

alter table expenses enable row level security;

create policy "authenticated full access" on expenses for all to authenticated using (true) with check (true);
create policy "temp anon full access" on expenses for all to anon using (true) with check (true);
