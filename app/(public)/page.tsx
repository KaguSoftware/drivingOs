import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExamLookupRepository } from "./exam-lookup.repository";
import { NationalIdLookupForm } from "./national-id-lookup-form";
import { ExamLookupResult, type LookupState } from "./exam-lookup-result";
import { isValidNationalId } from "./validation";
import type { UpcomingExam } from "./exam-lookup.model";

export default async function PublicLookupPage({
  searchParams,
}: {
  searchParams: Promise<{ national_id?: string }>;
}) {
  const { national_id } = await searchParams;
  const submitted = national_id?.trim();

  let state: LookupState = "idle";
  let exams: UpcomingExam[] = [];

  if (submitted !== undefined && submitted !== "") {
    if (!isValidNationalId(submitted)) {
      state = "invalid";
    } else {
      const supabase = await createSupabaseServerClient();
      const repository = new ExamLookupRepository(supabase);

      const [exists, upcomingExams] = await Promise.all([
        repository.nationalIdExists(submitted),
        repository.findUpcomingExam(submitted),
      ]);

      exams = upcomingExams;
      if (!exists) {
        state = "not_found";
      } else if (exams.length === 0) {
        state = "no_upcoming";
      } else {
        state = "found";
      }
    }
  }

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6 p-8">
      <h1 className="text-2xl font-semibold">Sınav Sonucu Sorgula</h1>
      <NationalIdLookupForm defaultValue={submitted} />
      <ExamLookupResult state={state} exams={exams} />
    </main>
  );
}
