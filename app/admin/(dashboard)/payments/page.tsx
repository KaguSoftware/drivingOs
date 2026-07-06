import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { PaymentInstallmentRepository } from "./payment-installment.repository";
import { PaymentTable } from "./payment-table";
import type { PaymentInstallment } from "./payment-installment.model";

function groupByStudent(installments: PaymentInstallment[]): Map<string, PaymentInstallment[]> {
  const grouped = new Map<string, PaymentInstallment[]>();

  for (const installment of installments) {
    const existing = grouped.get(installment.studentId) ?? [];
    existing.push(installment);
    grouped.set(installment.studentId, existing);
  }

  return grouped;
}

export default async function PaymentsPage() {
  const supabase = await createSupabaseServerClient();
  const repository = new PaymentInstallmentRepository(supabase);
  const [balances, installments] = await Promise.all([
    repository.outstandingBalances(),
    repository.listAll(),
  ]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Ödeme Takibi</h1>
        <Link href="/admin/payments/new" className={primaryLinkClass}>
          Yeni taksit
        </Link>
      </div>
      <PaymentTable balances={balances} installmentsByStudent={groupByStudent(installments)} />
    </section>
  );
}
