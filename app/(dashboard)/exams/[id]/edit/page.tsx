import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExamPlaceRepository } from "../../../exam-places/exam-place.repository";
import { InstructorRepository } from "../../../tutors/instructor.repository";
import { ExamSessionRepository } from "../../exam-session.repository";
import { ExamSessionForm } from "../../exam-session-form";

export default async function EditExamSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const session = await new ExamSessionRepository(supabase).findById(id);
  const examPlaces = await new ExamPlaceRepository(supabase).listAll();
  const instructors = await new InstructorRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Edit exam</h1>
      <ExamSessionForm examPlaces={examPlaces} instructors={instructors} session={session} />
    </section>
  );
}
