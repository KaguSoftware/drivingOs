import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { VehiclePeriodicCheckRepository } from "./vehicle-periodic-check.repository";
import { VehiclePeriodicCheckTable } from "./vehicle-periodic-check-table";

export default async function VehicleChecksPage() {
  const supabase = await createSupabaseServerClient();
  const checks = await new VehiclePeriodicCheckRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Araç Periyodik Bakımları</h1>
        <Link href="/admin/arac-periyodik-bakimlari/yeni" className={primaryLinkClass}>
          Yeni kontrol
        </Link>
      </div>
      <VehiclePeriodicCheckTable checks={checks} />
    </section>
  );
}
