import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { InstructorRepository } from "../../instructor.repository";
import { TutorForm } from "../../tutor-form";
import { deleteInstructor } from "../../actions";

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit tutor</h1>
        <DeleteButton action={deleteInstructor.bind(null, id)} confirmMessage="Delete this tutor?" />
      </div>
      <TutorForm instructor={instructor} />
    </section>
  );
}
