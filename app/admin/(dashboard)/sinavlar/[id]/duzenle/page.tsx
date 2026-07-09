import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/ui/delete-button";
import { TrashIcon } from "@/components/ui/icons";
import { ExamPlaceRepository } from "../../../sinav-yerleri/exam-place.repository";
import { InstructorRepository } from "../../../egitmenler/instructor.repository";
import { ExamSessionRepository } from "../../exam-session.repository";
import { ExamSessionForm } from "../../exam-session-form";
import {
  toExamSessionFormInstructors,
  toExamSessionFormPlaces,
  toExamSessionFormSession,
} from "../../exam-session-form-data";
import { deleteExamSession } from "../../actions";

export default async function EditExamSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const session = await new ExamSessionRepository(supabase).findById(id);
  const examPlaces = await new ExamPlaceRepository(supabase).listAll();
  const instructors = await new InstructorRepository(supabase).listAll();

  return (
    <section className="flex max-w-md flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Sınavı düzenle</h1>
        <DeleteButton
          action={deleteExamSession.bind(null, id)}
          confirmMessage="Bu sınav silinsin mi?"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-danger transition-colors hover:bg-surface"
          title="Sil"
        >
          <span className="sr-only">Sil</span>
          <TrashIcon />
        </DeleteButton>
      </div>
      <ExamSessionForm
        examPlaces={toExamSessionFormPlaces(examPlaces)}
        instructors={toExamSessionFormInstructors(instructors)}
        session={toExamSessionFormSession(session)}
      />
    </section>
  );
}
