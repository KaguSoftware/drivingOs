import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehicleRepository } from "../../vehicles/vehicle.repository";
import { VehiclePeriodicCheckForm } from "../vehicle-periodic-check-form";

export default async function NewVehiclePeriodicCheckPage() {
  const supabase = await createSupabaseServerClient();
  const vehicles = await new VehicleRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">New periodic check</h1>
      <VehiclePeriodicCheckForm vehicles={vehicles} />
    </section>
  );
}
