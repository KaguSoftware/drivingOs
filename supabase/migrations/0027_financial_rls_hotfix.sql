-- ============================================================================
-- SECURITY HOTFIX — lock down financial tables' RLS
--
-- expenses (0023) and payment_transactions (0024) shipped with BOTH a
-- "temp anon full access" policy (role anon, using(true)) and an
-- "authenticated full access" policy (any signed-in user, using(true)).
-- That means the anonymous key could read/write the whole financial ledger,
-- and any student/teacher login could too.
--
-- Audit confirmed these tables are touched ONLY by the admin payments feature
-- (expense.repository.ts, payment-transaction.repository.ts) — never the
-- student/teacher portals or the anon client — so restricting to admins is safe.
--
-- This is a stopgap that matches the role model in 0018. The full per-tenant
-- RLS rewrite happens in the multi-tenancy phase (see the plan / HANDOFF.md).
-- Idempotent: safe to re-run.
-- ============================================================================

begin;

-- expenses -------------------------------------------------------------------
drop policy if exists "temp anon full access" on public.expenses;
drop policy if exists "authenticated full access" on public.expenses;
drop policy if exists "admin full access" on public.expenses;
create policy "admin full access" on public.expenses
  for all to authenticated
  using (is_admin())
  with check (is_admin());

-- payment_transactions -------------------------------------------------------
drop policy if exists "temp anon full access" on public.payment_transactions;
drop policy if exists "authenticated full access" on public.payment_transactions;
drop policy if exists "admin full access" on public.payment_transactions;
create policy "admin full access" on public.payment_transactions
  for all to authenticated
  using (is_admin())
  with check (is_admin());

commit;
