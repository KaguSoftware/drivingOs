import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { TrashIcon } from "@/components/ui/icons";
import { VehicleViolationRepository } from "../../../../vehicle-violation.repository";
import { ViolationForm } from "../../../violation-form";
import { deleteViolation } from "../../../../violation-actions";

export default async function EditViolationPage({
  params,
}: {
  params: Promise<{ id: string; violationId: string }>;
}) {
  const { id, violationId } = await params;
  const supabase = await createSupabaseServerClient();
  const violation = await new VehicleViolationRepository(supabase).findById(violationId);

  return (
    <section className="flex max-w-md flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Cezayı düzenle</h1>
        <DeleteButton
          action={deleteViolation.bind(null, violationId, id)}
          confirmMessage="Bu ceza silinsin mi?"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-danger transition-colors hover:bg-surface"
          title="Sil"
        >
          <span className="sr-only">Sil</span>
          <TrashIcon />
        </DeleteButton>
      </div>
      <ViolationForm vehicleId={id} violation={violation} />
    </section>
  );
}
