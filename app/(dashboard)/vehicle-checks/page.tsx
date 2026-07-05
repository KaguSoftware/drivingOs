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
          href="/vehicle-checks/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          New check
        </Link>
      </div>
      <VehiclePeriodicCheckTable checks={checks} />
    </section>
  );
}
