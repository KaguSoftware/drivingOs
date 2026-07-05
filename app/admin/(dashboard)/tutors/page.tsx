import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { InstructorRepository } from "./instructor.repository";
import { ExamResultRepository } from "./exam-result.repository";
import { TutorTable } from "./tutor-table";

export default async function TutorsPage() {
  const supabase = await createSupabaseServerClient();
  const instructors = await new InstructorRepository(supabase).listAll();
  const stats = await new ExamResultRepository(supabase).passRateByInstructor();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tutors</h1>
        <Link
          href="/admin/tutors/new"
          className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-300"
        >
          New tutor
        </Link>
      </div>
      <TutorTable instructors={instructors} stats={stats} />
    </section>
  );
}
