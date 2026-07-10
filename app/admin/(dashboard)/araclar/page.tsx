import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard, StatGrid } from "@/components/ui/stat-card";
import { VehicleRepository } from "./vehicle.repository";
import { VehicleDamageRecordRepository } from "./vehicle-damage-record.repository";
import { VehiclePeriodicCheckRepository } from "./bakim/vehicle-periodic-check.repository";
import { VehicleTable } from "./vehicle-table";
import { DamagedVehicleTable } from "./damaged-vehicle-table";
import { VehiclePeriodicCheckTable } from "./bakim/vehicle-periodic-check-table";
import { VehicleSectionTabs } from "./tabs";

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: rawTab } = await searchParams;
  const tab = rawTab === "hasarli" || rawTab === "bakim" ? rawTab : "vehicles";
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

  const damagedVehicles =
    tab === "hasarli"
      ? await new VehicleRepository(supabase).listByIds([...damagedVehicleIds])
      : [];

  const addHref =
    tab === "hasarli"
      ? "/admin/araclar/hasar-ekle"
      : tab === "bakim"
        ? "/admin/araclar/bakim/yeni"
        : "/admin/araclar/yeni";
  const addLabel =
    tab === "hasarli" ? "Hasar kaydı ekle" : tab === "bakim" ? "Yeni bakım kaydı" : "Yeni araç";

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Araçlar"
        description={`${vehicles.length} kayıtlı araç`}
        actions={
          <Link href={addHref} className={primaryLinkClass}>
            {addLabel}
          </Link>
        }
      />
      <StatGrid>
        <StatCard label="Toplam araç" value={vehicles.length} />
        <StatCard label="Açık hasar kaydı" value={damagedVehicleIds.size} />
        <StatCard label="Muayene/bakım gecikmiş" value={overdueVehicleIds.size} />
        <StatCard label="Yaklaşan kontrol" value={dueSoonCount} />
      </StatGrid>
      <VehicleSectionTabs active={tab} />
      {tab === "hasarli" ? (
        <DamagedVehicleTable vehicles={damagedVehicles} damageRecords={openDamage} />
      ) : tab === "bakim" ? (
        <VehiclePeriodicCheckTable checks={checks} />
      ) : (
        <VehicleTable
          vehicles={vehicles}
          damagedVehicleIds={damagedVehicleIds}
          overdueVehicleIds={overdueVehicleIds}
        />
      )}
    </section>
  );
}
