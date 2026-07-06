import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehicleRepository } from "../vehicles/vehicle.repository";
import { VehicleDamageRecordRepository } from "../vehicles/vehicle-damage-record.repository";
import { DamagedVehicleTable } from "./damaged-vehicle-table";

export default async function DamagedVehiclesPage() {
  const supabase = await createSupabaseServerClient();
  const damageRecords = await new VehicleDamageRecordRepository(supabase).listOpen();
  const vehicleIds = [...new Set(damageRecords.map((record) => record.vehicleId))];
  const vehicles = await new VehicleRepository(supabase).listByIds(vehicleIds);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Damaged Vehicles</h1>
      <DamagedVehicleTable vehicles={vehicles} damageRecords={damageRecords} />
    </section>
  );
}
