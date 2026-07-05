import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StudentRepository } from "../../students/student.repository";
import { ExamSessionRepository } from "../exam-session.repository";
import { ExamEnrollmentRepository } from "../exam-enrollment.repository";
import { EnrollmentForm } from "../enrollment-form";
import { EnrollmentTable } from "../enrollment-table";

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
      <div>
        <h1 className="text-2xl font-semibold">{session.examPlaceName}</h1>
        <p className="text-sm text-zinc-500">
          {session.startsAt().toLocaleString()} &middot; Proctor: {session.instructorName}
        </p>
      </div>
      <EnrollmentForm examSessionId={session.id} availableStudents={availableStudents} />
      <EnrollmentTable enrollments={enrollments} />
    </section>
  );
}
