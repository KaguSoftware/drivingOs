import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StudentRepository } from "../../student.repository";
import { StudentForm } from "../../student-form";

export default async function EditStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const student = await new StudentRepository(supabase).findById(id);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Edit student</h1>
      <StudentForm student={student} />
    </section>
  );
}
