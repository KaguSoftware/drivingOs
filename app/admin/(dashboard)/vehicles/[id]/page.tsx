import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehicleRepository } from "../vehicle.repository";
import { VehicleDamageRecordRepository } from "../vehicle-damage-record.repository";
import { VehicleViolationRepository } from "../vehicle-violation.repository";
import { DamageRecordTable } from "./damage-record-table";
import { DamageRecordForm } from "./damage-record-form";
import { ViolationTable } from "./violation-table";
import { ViolationForm } from "./violation-form";

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const vehicle = await new VehicleRepository(supabase).findById(id);
  const damageRecords = await new VehicleDamageRecordRepository(supabase).listForVehicle(id);
  const violations = await new VehicleViolationRepository(supabase).listForVehicle(id);

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">{vehicle.plate}</h1>
        <p className="text-sm text-muted">
          {vehicle.makeModel} &middot; {vehicle.transmissionLabel()} &middot; {vehicle.licenseClass}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Damaged parts</h2>
        <DamageRecordTable records={damageRecords} />
        <DamageRecordForm vehicleId={vehicle.id} />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Traffic violations</h2>
        <ViolationTable violations={violations} />
        <ViolationForm vehicleId={vehicle.id} />
      </div>
    </section>
  );
}
