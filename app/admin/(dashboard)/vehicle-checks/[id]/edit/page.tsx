import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehicleRepository } from "../../../vehicles/vehicle.repository";
import { VehiclePeriodicCheckRepository } from "../../vehicle-periodic-check.repository";
import { VehiclePeriodicCheckForm } from "../../vehicle-periodic-check-form";

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
      <h1 className="text-2xl font-semibold">Edit periodic check</h1>
      <VehiclePeriodicCheckForm vehicles={vehicles} check={check} />
    </section>
  );
}
