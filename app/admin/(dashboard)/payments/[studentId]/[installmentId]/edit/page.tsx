import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { PaymentInstallmentRepository } from "../../../payment-installment.repository";
import { EditInstallmentForm } from "../../edit-installment-form";
import { deleteInstallment } from "../../../actions";

export default async function EditInstallmentPage({
  params,
}: {
  params: Promise<{ studentId: string; installmentId: string }>;
}) {
  const { studentId, installmentId } = await params;
  const supabase = await createSupabaseServerClient();
  const installment = await new PaymentInstallmentRepository(supabase).findById(installmentId);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit installment</h1>
        <DeleteButton
          action={deleteInstallment.bind(null, installmentId, studentId)}
          confirmMessage="Delete this installment?"
        />
      </div>
      <EditInstallmentForm installment={installment} />
    </section>
  );
}
