import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehiclePeriodicCheckRepository } from "./vehicle-periodic-check.repository";
import { VehiclePeriodicCheckTable } from "./vehicle-periodic-check-table";

export default async function VehicleChecksPage() {
  const supabase = await createSupabaseServerClient();
  const checks = await new VehiclePeriodicCheckRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Vehicle Periodics</h1>
        <Link
          href="/admin/vehicle-checks/new"
          className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-300"
        >
          New check
        </Link>
      </div>
      <VehiclePeriodicCheckTable checks={checks} />
    </section>
  );
}
