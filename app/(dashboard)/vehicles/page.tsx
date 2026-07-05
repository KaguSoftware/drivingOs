import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehicleRepository } from "./vehicle.repository";
import { VehicleTable } from "./vehicle-table";

export default async function VehiclesPage() {
  const supabase = await createSupabaseServerClient();
  const vehicles = await new VehicleRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Vehicles</h1>
        <Link
          href="/vehicles/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          New vehicle
        </Link>
      </div>
      <VehicleTable vehicles={vehicles} />
    </section>
  );
}
