import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { LessonRepository } from "../../../admin/(dashboard)/program/lesson.repository";
import { LessonList } from "./lesson-list";

export default async function TeacherLessonsPage() {
  const profile = await requireRole("teacher");
  const supabase = await createSupabaseServerClient();
  const lessons = await new LessonRepository(supabase).listForInstructor(
    profile.instructor_id!
  );

  const now = new Date();
  const upcoming = lessons.filter((l) => l.endsAt() >= now);
  const past = lessons.filter((l) => l.endsAt() < now).reverse();

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title="Derslerim" description="Tüm geçmiş ve gelecek dersleriniz." />
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Yaklaşan</h2>
        {upcoming.length === 0 ? (
          <EmptyState title="Yaklaşan dersiniz yok" />
        ) : (
          <LessonList lessons={upcoming} />
        )}
      </div>
      {past.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-muted">Geçmiş</h2>
          <LessonList lessons={past} />
        </div>
      )}
    </section>
  );
}
