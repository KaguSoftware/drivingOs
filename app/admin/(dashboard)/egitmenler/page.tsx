import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard, StatGrid } from "@/components/ui/stat-card";
import { InstructorRepository } from "./instructor.repository";
import { ExamResultRepository } from "./exam-result.repository";
import { TutorTable } from "./tutor-table";
import { TeacherSectionTabs } from "./tabs";
import { TrackerRepository, formatHours } from "./tracker/tracker.repository";
import { TrackerTable } from "./tracker/tracker-table";
import { PeriodTabs } from "./tracker/period-tabs";
import { TRACKER_PERIODS, type TrackerPeriod } from "./tracker/types";

export default async function TutorsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; donem?: string }>;
}) {
  const { tab, donem } = await searchParams;
  const supabase = await createSupabaseServerClient();

  if (tab === "takip") {
    const period: TrackerPeriod = TRACKER_PERIODS.includes(donem as TrackerPeriod)
      ? (donem as TrackerPeriod)
      : "hafta";
    const rows = await new TrackerRepository(supabase).summary(period);

    const totalLessons = rows.reduce((sum, r) => sum + r.lessonCount, 0);
    const totalMinutes = rows.reduce((sum, r) => sum + r.totalMinutes, 0);
    const activeInstructors = rows.filter((r) => r.lessonCount > 0).length;

    return (
      <section className="flex flex-col gap-6">
        <PageHeader
          title="Eğitmen Takibi"
          description="Eğitmenlerin kullandığı araç ve verdikleri ders saatleri."
          actions={
            <div className="flex flex-col items-end gap-4">
              <TeacherSectionTabs active="takip" />
              <PeriodTabs active={period} />
            </div>
          }
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

  const instructors = await new InstructorRepository(supabase).listAll();
  const stats = await new ExamResultRepository(supabase).passRateByInstructor();

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Eğitmenler"
        description={`${instructors.length} eğitmen`}
        actions={
          <div className="flex flex-col items-end gap-4">
            <TeacherSectionTabs active="list" />
            <Link href="/admin/egitmenler/yeni" className={primaryLinkClass}>
              Yeni eğitmen
            </Link>
          </div>
        }
      />
      <TutorTable instructors={instructors} stats={stats} />
    </section>
  );
}
