-- Dated log of each payment received against an installment, so income can
-- be bucketed by month (payment_installments only stores a running total).

create table payment_transactions (
  id uuid primary key default gen_random_uuid(),
  installment_id uuid not null references payment_installments(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  amount numeric(10, 2) not null,
  paid_at timestamptz not null default now()
);

create index payment_transactions_paid_at_idx on payment_transactions (paid_at);

alter table payment_transactions enable row level security;

create policy "authenticated full access" on payment_transactions for all to authenticated using (true) with check (true);
create policy "temp anon full access" on payment_transactions for all to anon using (true) with check (true);
