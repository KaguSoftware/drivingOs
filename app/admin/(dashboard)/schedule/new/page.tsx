import { BackLink } from "@/components/ui/back-link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StudentRepository } from "../../students/student.repository";
import { InstructorRepository } from "../../tutors/instructor.repository";
import { VehicleRepository } from "../../vehicles/vehicle.repository";
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
    <section className="flex flex-col gap-6">
      <BackLink href="../" label="Back to schedule" />
      <h1 className="text-2xl font-semibold">Book lesson</h1>
      <LessonForm
        students={toFormStudents(students)}
        instructors={toFormInstructors(instructors)}
        vehicles={toFormVehicles(vehicles)}
        defaultStartsAt={starts_at}
      />
    </section>
  );
}
