import { BackLink } from "@/components/ui/back-link";
import { FormCard } from "@/components/ui/form-card";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StudentRepository } from "../../ogrenciler/student.repository";
import { InstructorRepository } from "../../egitmenler/instructor.repository";
import { VehicleRepository } from "../../araclar/vehicle.repository";
import { LessonForm } from "../lesson-form";
import { toFormInstructors, toFormStudents, toFormVehicles } from "../form-data";

export default async function NewLessonPage({
  searchParams,
}: {
  searchParams: Promise<{ starts_at?: string }>;
}) {
  const { starts_at } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const students = await new StudentRepository(supabase).listAll();
  const instructors = await new InstructorRepository(supabase).listAll();
  const vehicles = await new VehicleRepository(supabase).listAll();

  return (
    <PageContainer className="max-w-2xl">
      <section className="flex flex-col gap-6">
        <BackLink href="../" label="Programa dön" />
        <PageHeader title="Ders planla" />
        <FormCard>
          <LessonForm
            students={toFormStudents(students)}
            instructors={toFormInstructors(instructors)}
            vehicles={toFormVehicles(vehicles)}
            defaultStartsAt={starts_at}
          />
        </FormCard>
      </section>
    </PageContainer>
  );
}
