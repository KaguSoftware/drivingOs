import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
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
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit violation</h1>
        <DeleteButton action={deleteViolation.bind(null, violationId, id)} confirmMessage="Delete this violation?" />
      </div>
      <ViolationForm vehicleId={id} violation={violation} />
    </section>
  );
}
