import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PaymentInstallmentRepository } from "./payment-installment.repository";
import { PaymentTable } from "./payment-table";

export default async function PaymentsPage() {
  const supabase = await createSupabaseServerClient();
  const balances = await new PaymentInstallmentRepository(supabase).outstandingBalances();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Payment Control</h1>
        <Link
          href="/payments/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          New installment
        </Link>
      </div>
      <PaymentTable balances={balances} />
    </section>
  );
}
