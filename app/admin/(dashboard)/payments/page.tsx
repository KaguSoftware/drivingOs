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
          href="/admin/payments/new"
          className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-300"
        >
          New installment
        </Link>
      </div>
      <PaymentTable balances={balances} />
    </section>
  );
}
