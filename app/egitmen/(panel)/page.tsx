import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard, StatGrid } from "@/components/ui/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { LessonRepository } from "../../admin/(dashboard)/program/lesson.repository";
import { formatHours } from "../../admin/(dashboard)/egitmenler/tracker/tracker.repository";
import { LessonList } from "./derslerim/lesson-list";

function startOfWeek(): Date {
  const now = new Date();
  const day = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - day);
  return monday;
}

export default async function TeacherHomePage() {
  const profile = await requireRole("teacher");
  const supabase = await createSupabaseServerClient();
  const weekStart = startOfWeek();
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const lessons = await new LessonRepository(supabase).listForInstructor(
    profile.instructor_id!,
    weekStart,
    weekEnd
  );
  const now = new Date();
  const upcoming = lessons.filter((l) => l.endsAt() >= now);
  const completed = lessons.length - upcoming.length;
  const totalMinutes = lessons.reduce((sum, l) => sum + l.durationMinutes(), 0);

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title="Özet" description="Bu haftaki dersleriniz." />
      <StatGrid>
        <StatCard label="Bu hafta ders" value={lessons.length} />
        <StatCard label="Kalan ders" value={upcoming.length} />
        <StatCard label="Tamamlanan ders" value={completed} />
        <StatCard label="Toplam süre" value={formatHours(totalMinutes)} />
      </StatGrid>
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Yaklaşan dersler</h2>
        {upcoming.length === 0 ? (
          <EmptyState title="Bu hafta kalan dersiniz yok" />
        ) : (
          <LessonList lessons={upcoming} />
        )}
      </div>
    </section>
  );
}
