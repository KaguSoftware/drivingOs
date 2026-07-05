import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PaymentInstallmentRepository } from "../../../payment-installment.repository";
import { EditInstallmentForm } from "../../edit-installment-form";

export default async function EditInstallmentPage({
  params,
}: {
  params: Promise<{ studentId: string; installmentId: string }>;
}) {
  const { installmentId } = await params;
  const supabase = await createSupabaseServerClient();
  const installment = await new PaymentInstallmentRepository(supabase).findById(installmentId);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Edit installment</h1>
      <EditInstallmentForm installment={installment} />
    </section>
  );
}
