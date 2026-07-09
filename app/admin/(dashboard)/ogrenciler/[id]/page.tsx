import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { BackLink } from "@/components/ui/back-link";
import { StatGrid, StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { primaryLinkClass } from "@/components/ui/button";
import { StudentRepository } from "../student.repository";
import { LessonRepository } from "../../program/lesson.repository";
import { PaymentInstallmentRepository } from "../../odemeler/payment-installment.repository";
import { ExamEnrollmentRepository } from "../../sinavlar/exam-enrollment.repository";
import { StudentLessonsCard } from "./student-lessons-card";
import { StudentExamsCard } from "./student-exams-card";

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const [student, lessons, installments, enrollments] = await Promise.all([
    new StudentRepository(supabase).findById(id),
    new LessonRepository(supabase).listForStudent(id),
    new PaymentInstallmentRepository(supabase).listForStudent(id),
    new ExamEnrollmentRepository(supabase).listForStudent(id),
  ]);

  const now = new Date();
  const upcomingLessons = lessons.filter((lesson) => !lesson.isPast(now));
  const completedLessons = lessons.filter((lesson) => lesson.isPast(now));
  const totalDebt = installments.reduce((sum, i) => sum + i.remainingDebt(), 0);

  return (
    <section className="flex flex-col gap-6">
      <BackLink href="/admin/ogrenciler" label="Öğrencilere dön" />

      <PageHeader
        title={student.fullName}
        description={`${student.phone} · ${student.licenseLabel()}`}
        actions={
          <Link href={`/admin/ogrenciler/${student.id}/duzenle`} className={primaryLinkClass}>
            Düzenle
          </Link>
        }
      />

      <StatGrid>
        <StatCard label="Teori" value={student.theoryLabel()} />
        <StatCard label="Direksiyon" value={student.practiceLabel()} />
        <StatCard label="MEB evrak" value={student.mebLabel()} />
        <StatCard label="Kalan borç" value={`${totalDebt.toFixed(2)} ₺`} hint="Taksitler sayfasında detay" />
      </StatGrid>
      <Link
        href={`/admin/odemeler/${student.id}`}
        className="-mt-4 w-fit text-sm font-medium text-primary hover:underline"
      >
        Taksitleri / ödeme geçmişini gör →
      </Link>

      <div className="flex flex-wrap gap-1.5">
        {student.licenseClasses.map((cls) => (
          <Badge key={cls} tone="info">{cls}</Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StudentLessonsCard upcoming={upcomingLessons} completed={completedLessons} />
        <StudentExamsCard enrollments={enrollments} />
      </div>
    </section>
  );
}
