import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { TrashIcon } from "@/components/ui/icons";
import { StudentRepository } from "../../student.repository";
import { StudentForm } from "../../student-form";
import { deleteStudent } from "../../actions";

export default async function EditStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const student = await new StudentRepository(supabase).findById(id);

  return (
    <section className="flex max-w-xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Öğrenciyi düzenle</h1>
        <DeleteButton
          action={deleteStudent.bind(null, id)}
          confirmMessage="Bu öğrenci silinsin mi?"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-danger transition-colors hover:bg-surface"
          title="Sil"
        >
          <span className="sr-only">Sil</span>
          <TrashIcon />
        </DeleteButton>
      </div>
      <StudentForm student={student} />
    </section>
  );
}
