import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { VehicleRepository } from "./vehicle.repository";
import { VehicleTable } from "./vehicle-table";

export default async function VehiclesPage() {
  const supabase = await createSupabaseServerClient();
  const vehicles = await new VehicleRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Araçlar</h1>
        <Link href="/admin/vehicles/new" className={primaryLinkClass}>
          Yeni araç
        </Link>
      </div>
      <VehicleTable vehicles={vehicles} />
    </section>
  );
}
