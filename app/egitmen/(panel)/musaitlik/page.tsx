import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { PageHeader } from "@/components/ui/page-header";
import { AvailabilityRepository } from "./availability.repository";
import { WeeklyHoursForm } from "./weekly-hours-form";
import { BlockedDatesForm } from "./blocked-dates-form";

export default async function AvailabilityPage() {
  const profile = await requireRole("teacher");
  const supabase = await createSupabaseServerClient();
  const repo = new AvailabilityRepository(supabase);
  const [availability, blocked] = await Promise.all([
    repo.listAvailability(profile.instructor_id!),
    repo.listBlockedDates(profile.instructor_id!),
  ]);

  return (
    <section className="flex flex-col gap-8">
      <PageHeader
        title="Müsaitlik"
        description="Haftalık çalışma saatlerinizi ve kapalı günlerinizi yönetin."
      />
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Haftalık saatler</h2>
        <WeeklyHoursForm rows={availability} />
      </div>
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Kapalı günler</h2>
        <BlockedDatesForm rows={blocked} />
      </div>
    </section>
  );
}
