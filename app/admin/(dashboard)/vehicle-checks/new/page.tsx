import { BackLink } from "@/components/ui/back-link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehicleRepository } from "../../vehicles/vehicle.repository";
import { VehiclePeriodicCheckForm } from "../vehicle-periodic-check-form";

export default async function NewVehiclePeriodicCheckPage() {
  const supabase = await createSupabaseServerClient();
  const vehicles = await new VehicleRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <BackLink href="../" label="Araç kontrollerine dön" />
      <h1 className="text-2xl font-semibold">Yeni periyodik kontrol</h1>
      <VehiclePeriodicCheckForm vehicles={vehicles} />
    </section>
  );
}
