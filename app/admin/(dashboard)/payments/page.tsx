import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { PaymentInstallmentRepository } from "./payment-installment.repository";
import { PaymentTable } from "./payment-table";

export default async function PaymentsPage() {
  const supabase = await createSupabaseServerClient();
  const balances = await new PaymentInstallmentRepository(supabase).outstandingBalances();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Payment Control</h1>
        <Link href="/admin/payments/new" className={primaryLinkClass}>
          New installment
        </Link>
      </div>
      <PaymentTable balances={balances} />
    </section>
  );
}
