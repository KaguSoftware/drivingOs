import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { VehicleRepository } from "../araclar/vehicle.repository";
import { VehicleDamageRecordRepository } from "../araclar/vehicle-damage-record.repository";
import { DamagedVehicleTable } from "./damaged-vehicle-table";

export default async function DamagedVehiclesPage() {
  const supabase = await createSupabaseServerClient();
  const damageRecords = await new VehicleDamageRecordRepository(supabase).listOpen();
  const vehicleIds = [...new Set(damageRecords.map((record) => record.vehicleId))];
  const vehicles = await new VehicleRepository(supabase).listByIds(vehicleIds);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Hasarlı Araçlar</h1>
        <Link href="/admin/hasarli-araclar/yeni" className={primaryLinkClass}>
          Hasar kaydı ekle
        </Link>
      </div>
      <DamagedVehicleTable vehicles={vehicles} damageRecords={damageRecords} />
    </section>
  );
}
