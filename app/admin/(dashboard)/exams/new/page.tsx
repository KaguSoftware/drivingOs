import { BackLink } from "@/components/ui/back-link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExamPlaceRepository } from "../../exam-places/exam-place.repository";
import { InstructorRepository } from "../../tutors/instructor.repository";
import { StudentRepository } from "../../students/student.repository";
import { ExamSessionForm } from "../exam-session-form";

export default async function NewExamSessionPage() {
  const supabase = await createSupabaseServerClient();
  const examPlaces = await new ExamPlaceRepository(supabase).listAll();
  const instructors = await new InstructorRepository(supabase).listAll();
  const students = await new StudentRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <BackLink href="../" label="Back to exams" />
      <h1 className="text-2xl font-semibold">Schedule exam</h1>
      <ExamSessionForm examPlaces={examPlaces} instructors={instructors} students={students} />
    </section>
  );
}
