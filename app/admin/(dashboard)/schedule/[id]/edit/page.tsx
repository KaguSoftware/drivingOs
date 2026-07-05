import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StudentRepository } from "../../../students/student.repository";
import { InstructorRepository } from "../../../tutors/instructor.repository";
import { VehicleRepository } from "../../../vehicles/vehicle.repository";
import { LessonRepository } from "../../lesson.repository";
import { LessonForm } from "../../lesson-form";

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const lesson = await new LessonRepository(supabase).findById(id);
  const students = await new StudentRepository(supabase).listAll();
  const instructors = await new InstructorRepository(supabase).listAll();
  const vehicles = await new VehicleRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Edit lesson</h1>
      <LessonForm students={students} instructors={instructors} vehicles={vehicles} lesson={lesson} />
    </section>
  );
}
