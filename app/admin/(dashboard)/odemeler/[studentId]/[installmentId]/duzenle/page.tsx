import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { TrashIcon } from "@/components/ui/icons";
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
    <section className="flex max-w-md flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Taksiti düzenle</h1>
        <DeleteButton
          action={deleteInstallment.bind(null, installmentId, studentId)}
          confirmMessage="Bu taksit silinsin mi?"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-danger transition-colors hover:bg-surface"
          title="Sil"
        >
          <span className="sr-only">Sil</span>
          <TrashIcon />
        </DeleteButton>
      </div>
      <EditInstallmentForm installment={installment} />
    </section>
  );
}
