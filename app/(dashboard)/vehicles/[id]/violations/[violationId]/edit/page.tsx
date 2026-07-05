import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehicleViolationRepository } from "../../../../vehicle-violation.repository";
import { ViolationForm } from "../../../violation-form";

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
      <h1 className="text-2xl font-semibold">Edit violation</h1>
      <ViolationForm vehicleId={id} violation={violation} />
    </section>
  );
}
