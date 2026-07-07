import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { primaryLinkClass } from "@/components/ui/button";
import { PortalRepository } from "./portal.repository";

function formatDateTime(date: Date): string {
  return date.toLocaleString("tr-TR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function StudentHomePage() {
  const profile = await requireRole("student");
  const supabase = await createSupabaseServerClient();
  const repo = new PortalRepository(supabase);
  const student = await repo.getStudent(profile.student_id!);
  const lessons = await repo.listLessons(profile.student_id!);
  const nextLesson = lessons.find((l) => l.endsAt() >= new Date());

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title={`Merhaba, ${student.fullName}`} description="Eğitim durumunuz ve dersleriniz." />

      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <p className="text-sm font-semibold">Eğitim durumu</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted">Teori</p>
            <Badge tone={student.isTheoryComplete() ? "success" : "warning"}>{student.theoryLabel()}</Badge>
          </div>
          <div>
            <p className="text-xs text-muted">Direksiyon</p>
            <Badge tone={student.isPracticeComplete() ? "success" : "warning"}>{student.practiceLabel()}</Badge>
          </div>
          <div>
            <p className="text-xs text-muted">MEB evrak</p>
            <Badge tone={student.isMebApproved() ? "success" : "neutral"}>{student.mebLabel()}</Badge>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {student.licenseClasses.map((cls) => (
            <Badge key={cls} tone="info">{cls}</Badge>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <p className="text-sm font-semibold">Sonraki dersiniz</p>
        {nextLesson ? (
          <div className="mt-2">
            <p className="text-lg font-medium text-primary">{formatDateTime(nextLesson.startsAt())}</p>
            <p className="text-sm text-muted">
              {nextLesson.instructorName} · {nextLesson.vehiclePlate}
            </p>
          </div>
        ) : (
          <div className="mt-2 flex flex-col items-start gap-3">
            <p className="text-sm text-muted">Planlanmış dersiniz yok.</p>
            <Link href="/ogrenci/ders-al" className={primaryLinkClass}>
              Ders al
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
