-- Student payment installments (taksit).

create type payment_status as enum ('pending', 'partial', 'paid', 'overdue');

create table payment_installments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  amount numeric(10, 2) not null,
  amount_paid numeric(10, 2) not null default 0,
  due_date date not null,
  status payment_status not null default 'pending',
  created_at timestamptz not null default now()
);

alter table payment_installments enable row level security;

create policy "authenticated full access" on payment_installments for all to authenticated using (true) with check (true);
create policy "temp anon full access" on payment_installments for all to anon using (true) with check (true);
