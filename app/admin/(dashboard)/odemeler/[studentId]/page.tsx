import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PaymentInstallmentRepository } from "../payment-installment.repository";
import { InstallmentTable } from "./installment-table";

export default async function StudentInstallmentsPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;
  const supabase = await createSupabaseServerClient();
  const installments = await new PaymentInstallmentRepository(supabase).listForStudent(studentId);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">
        {installments[0]?.studentName ?? "Öğrenci"} &middot; Taksitler
      </h1>
      <InstallmentTable installments={installments} />
    </section>
  );
}
