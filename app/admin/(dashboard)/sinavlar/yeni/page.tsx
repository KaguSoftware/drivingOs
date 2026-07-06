import { BackLink } from "@/components/ui/back-link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExamPlaceRepository } from "../../sinav-yerleri/exam-place.repository";
import { InstructorRepository } from "../../egitmenler/instructor.repository";
import { StudentRepository } from "../../ogrenciler/student.repository";
import { ExamSessionForm } from "../exam-session-form";

export default async function NewExamSessionPage() {
  const supabase = await createSupabaseServerClient();
  const examPlaces = await new ExamPlaceRepository(supabase).listAll();
  const instructors = await new InstructorRepository(supabase).listAll();
  const students = await new StudentRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <BackLink href="../" label="Sınavlara dön" />
      <h1 className="text-2xl font-semibold">Sınav planla</h1>
      <ExamSessionForm examPlaces={examPlaces} instructors={instructors} students={students} />
    </section>
  );
}
