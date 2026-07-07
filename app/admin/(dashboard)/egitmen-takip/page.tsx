import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard, StatGrid } from "@/components/ui/stat-card";
import { TrackerRepository, formatHours } from "./tracker.repository";
import { TrackerTable } from "./tracker-table";
import { PeriodTabs } from "./period-tabs";
import { TRACKER_PERIODS, type TrackerPeriod } from "./types";

export default async function TrackerPage({
  searchParams,
}: {
  searchParams: Promise<{ donem?: string }>;
}) {
  const { donem } = await searchParams;
  const period: TrackerPeriod = TRACKER_PERIODS.includes(donem as TrackerPeriod)
    ? (donem as TrackerPeriod)
    : "hafta";

  const supabase = await createSupabaseServerClient();
  const rows = await new TrackerRepository(supabase).summary(period);

  const totalLessons = rows.reduce((sum, r) => sum + r.lessonCount, 0);
  const totalMinutes = rows.reduce((sum, r) => sum + r.totalMinutes, 0);
  const activeInstructors = rows.filter((r) => r.lessonCount > 0).length;

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Eğitmen Takibi"
        description="Eğitmenlerin kullandığı araç ve verdikleri ders saatleri."
        actions={<PeriodTabs active={period} />}
      />
      <StatGrid>
        <StatCard label="Aktif eğitmen" value={activeInstructors} />
        <StatCard label="Toplam ders" value={totalLessons} />
        <StatCard label="Toplam süre" value={formatHours(totalMinutes)} />
        <StatCard label="Eğitmen sayısı" value={rows.length} />
      </StatGrid>
      <TrackerTable rows={rows} />
    </section>
  );
}
