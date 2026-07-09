import Link from "next/link";
import { DeleteButton } from "@/components/ui/delete-button";
import { EditIcon, TrashIcon } from "@/components/ui/icons";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StudentRepository } from "../../ogrenciler/student.repository";
import { ExamSessionRepository } from "../exam-session.repository";
import { ExamEnrollmentRepository } from "../exam-enrollment.repository";
import { EnrollmentForm } from "../enrollment-form";
import { EnrollmentTable } from "../enrollment-table";
import { deleteExamSession } from "../actions";

export default async function ExamSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const session = await new ExamSessionRepository(supabase).findById(id);
  const enrollments = await new ExamEnrollmentRepository(supabase).listForSession(id);
  const students = await new StudentRepository(supabase).listAll();

  const enrolledStudentIds = new Set(enrollments.map((enrollment) => enrollment.studentId));
  const availableStudents = students.filter((student) => !enrolledStudentIds.has(student.id));

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{session.examPlaceName}</h1>
          <p className="text-sm text-muted">
            {session.startsAt().toLocaleString("tr-TR")} &middot; Gözetmen: {session.instructorName}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={`/admin/sinavlar/${session.id}/duzenle`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-foreground"
            aria-label="Düzenle"
            title="Düzenle"
          >
            <EditIcon />
          </Link>
          <DeleteButton
            action={deleteExamSession.bind(null, session.id)}
            confirmMessage="Bu sınav silinsin mi?"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-danger transition-colors hover:bg-surface"
            title="Sil"
          >
            <span className="sr-only">Sil</span>
            <TrashIcon />
          </DeleteButton>
        </div>
      </div>
      <EnrollmentForm examSessionId={session.id} availableStudents={availableStudents} />
      <EnrollmentTable enrollments={enrollments} examSessionId={session.id} />
    </section>
  );
}
