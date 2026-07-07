import { BackLink } from "@/components/ui/back-link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { tableWrapperClass, theadClass, tbodyClass } from "@/components/ui/table-classes";
import { EmptyState } from "@/components/ui/empty-state";
import { InstructorRepository } from "../../egitmenler/instructor.repository";
import { LessonRepository } from "../../program/lesson.repository";
import { formatHours } from "../tracker.repository";

function formatDateTime(date: Date): string {
  return date.toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function TrackerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const instructor = await new InstructorRepository(supabase).findById(id);
  const lessons = await new LessonRepository(supabase).listForInstructor(id);
  const totalMinutes = lessons.reduce((sum, l) => sum + l.durationMinutes(), 0);

  return (
    <section className="flex flex-col gap-6">
      <BackLink href="/admin/egitmen-takip" label="Eğitmen takibine dön" />
      <div>
        <h1 className="text-2xl font-semibold">{instructor.fullName}</h1>
        <p className="mt-1 text-sm text-muted">
          {instructor.assignedVehiclePlate() ?? "Araç atanmadı"} · {lessons.length} ders ·{" "}
          {formatHours(totalMinutes)}
        </p>
      </div>

      {lessons.length === 0 ? (
        <EmptyState title="Bu eğitmenin dersi yok" />
      ) : (
        <div className={tableWrapperClass}>
          <table className="w-full text-left text-sm">
            <thead className={theadClass}>
              <tr>
                <th className="px-4 py-3 font-medium">Tarih & saat</th>
                <th className="px-4 py-3 font-medium">Öğrenci</th>
                <th className="px-4 py-3 font-medium">Araç</th>
                <th className="px-4 py-3 font-medium">Süre</th>
              </tr>
            </thead>
            <tbody className={tbodyClass}>
              {lessons.map((lesson) => (
                <tr key={lesson.id}>
                  <td className="px-4 py-3">{formatDateTime(lesson.startsAt())}</td>
                  <td className="px-4 py-3">{lesson.studentName}</td>
                  <td className="px-4 py-3">{lesson.vehiclePlate}</td>
                  <td className="px-4 py-3">{formatHours(lesson.durationMinutes())}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
