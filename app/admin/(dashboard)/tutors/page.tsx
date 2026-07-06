import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
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
        <Link href="/admin/tutors/new" className={primaryLinkClass}>
          New tutor
        </Link>
      </div>
      <TutorTable instructors={instructors} stats={stats} />
    </section>
  );
}
