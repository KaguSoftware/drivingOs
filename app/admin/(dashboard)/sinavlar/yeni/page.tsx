import { BackLink } from "@/components/ui/back-link";
import { FormCard } from "@/components/ui/form-card";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExamPlaceRepository } from "../../sinav-yerleri/exam-place.repository";
import { InstructorRepository } from "../../egitmenler/instructor.repository";
import { StudentRepository } from "../../ogrenciler/student.repository";
import { ExamSessionForm } from "../exam-session-form";
import { toExamSessionFormInstructors, toExamSessionFormPlaces, toExamSessionFormStudents } from "../exam-session-form-data";

export default async function NewExamSessionPage() {
  const supabase = await createSupabaseServerClient();
  const examPlaces = await new ExamPlaceRepository(supabase).listAll();
  const instructors = await new InstructorRepository(supabase).listAll();
  const students = await new StudentRepository(supabase).listAll();

  return (
    <PageContainer className="max-w-2xl">
      <section className="flex flex-col gap-6">
        <BackLink href="../" label="Sınavlara dön" />
        <PageHeader title="Sınav planla" />
        <FormCard>
          <ExamSessionForm
            examPlaces={toExamSessionFormPlaces(examPlaces)}
            instructors={toExamSessionFormInstructors(instructors)}
            students={toExamSessionFormStudents(students)}
          />
        </FormCard>
      </section>
    </PageContainer>
  );
}
