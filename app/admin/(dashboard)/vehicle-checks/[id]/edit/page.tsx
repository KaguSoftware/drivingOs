import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { VehicleRepository } from "../../../vehicles/vehicle.repository";
import { VehiclePeriodicCheckRepository } from "../../vehicle-periodic-check.repository";
import { VehiclePeriodicCheckForm } from "../../vehicle-periodic-check-form";
import { deletePeriodicCheck } from "../../actions";

export default async function EditPeriodicCheckPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const check = await new VehiclePeriodicCheckRepository(supabase).findById(id);
  const vehicles = await new VehicleRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit periodic check</h1>
        <DeleteButton action={deletePeriodicCheck.bind(null, id)} confirmMessage="Delete this check?" />
      </div>
      <VehiclePeriodicCheckForm vehicles={vehicles} check={check} />
    </section>
  );
}
