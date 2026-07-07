import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { primaryLinkClass } from "@/components/ui/button";
import { PortalRepository } from "../portal.repository";
import { LessonCard, type StudentLessonView } from "./lesson-card";

function formatWhen(date: Date): string {
  return date.toLocaleString("tr-TR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function StudentLessonsPage() {
  const profile = await requireRole("student");
  const supabase = await createSupabaseServerClient();
  const lessons = await new PortalRepository(supabase).listLessons(profile.student_id!);

  const views: StudentLessonView[] = lessons.map((l) => ({
    id: l.id,
    when: formatWhen(l.startsAt()),
    instructorName: l.instructorName,
    vehiclePlate: l.vehiclePlate,
    isPast: l.isPast(),
    cancellable: l.isCancellable(),
  }));
  const upcoming = views.filter((v) => !v.isPast);
  const past = views.filter((v) => v.isPast).reverse();

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Derslerim"
        description="Yaklaşan ve geçmiş dersleriniz."
        actions={
          <Link href="/ogrenci/ders-al" className={primaryLinkClass}>
            Ders al
          </Link>
        }
      />
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Yaklaşan</h2>
        {upcoming.length === 0 ? (
          <EmptyState title="Yaklaşan dersiniz yok" description="Uygun saatlerden ders alabilirsiniz." />
        ) : (
          <ul className="flex flex-col gap-2">
            {upcoming.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </ul>
        )}
      </div>
      {past.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-muted">Geçmiş</h2>
          <ul className="flex flex-col gap-2">
            {past.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
