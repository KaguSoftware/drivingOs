import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard, StatGrid } from "@/components/ui/stat-card";
import { VehicleRepository } from "./vehicle.repository";
import { VehicleDamageRecordRepository } from "./vehicle-damage-record.repository";
import { VehiclePeriodicCheckRepository } from "../arac-periyodik-bakimlari/vehicle-periodic-check.repository";
import { VehicleTable } from "./vehicle-table";

export default async function VehiclesPage() {
  const supabase = await createSupabaseServerClient();
  const [vehicles, openDamage, checks] = await Promise.all([
    new VehicleRepository(supabase).listAll(),
    new VehicleDamageRecordRepository(supabase).listOpen(),
    new VehiclePeriodicCheckRepository(supabase).listAll(),
  ]);

  const damagedVehicleIds = new Set(openDamage.map((d) => d.vehicleId));
  const overdueVehicleIds = new Set(
    checks.filter((c) => c.status() === "overdue").map((c) => c.vehicleId)
  );
  const dueSoonCount = checks.filter((c) => c.status() === "due_soon").length;

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Araçlar"
        description={`${vehicles.length} kayıtlı araç`}
        actions={
          <Link href="/admin/araclar/yeni" className={primaryLinkClass}>
            Yeni araç
          </Link>
        }
      />
      <StatGrid>
        <StatCard label="Toplam araç" value={vehicles.length} />
        <StatCard label="Açık hasar kaydı" value={damagedVehicleIds.size} />
        <StatCard label="Muayene/bakım gecikmiş" value={overdueVehicleIds.size} />
        <StatCard label="Yaklaşan kontrol" value={dueSoonCount} />
      </StatGrid>
      <VehicleTable
        vehicles={vehicles}
        damagedVehicleIds={damagedVehicleIds}
        overdueVehicleIds={overdueVehicleIds}
      />
    </section>
  );
}
