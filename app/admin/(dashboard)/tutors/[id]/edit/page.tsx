import { createSupabaseServerClient } from "@/lib/supabase/server";
import { InstructorRepository } from "../../instructor.repository";
import { TutorForm } from "../../tutor-form";

export default async function EditTutorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const instructor = await new InstructorRepository(supabase).findById(id);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Edit tutor</h1>
      <TutorForm instructor={instructor} />
    </section>
  );
}
