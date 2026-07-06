import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { ExamPlaceRepository } from "../../../exam-places/exam-place.repository";
import { InstructorRepository } from "../../../tutors/instructor.repository";
import { ExamSessionRepository } from "../../exam-session.repository";
import { ExamSessionForm } from "../../exam-session-form";
import { deleteExamSession } from "../../actions";

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit exam</h1>
        <DeleteButton action={deleteExamSession.bind(null, id)} confirmMessage="Delete this exam?" />
      </div>
      <ExamSessionForm examPlaces={examPlaces} instructors={instructors} session={session} />
    </section>
  );
}
