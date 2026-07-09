import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExamLookupRepository } from "./exam-lookup.repository";
import type { LookupState } from "./exam-lookup-result";
import { StudentWelcomeScreen } from "./student-welcome-screen";
import { LookupSplitScreen } from "./lookup-split-screen";
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
  let studentFullName: string | null = null;
  let exams: UpcomingExam[] = [];

  if (submitted !== undefined && submitted !== "") {
    if (!isValidNationalId(submitted)) {
      state = "invalid";
    } else {
      const supabase = await createSupabaseServerClient();
      const repository = new ExamLookupRepository(supabase);

      const [fullName, upcomingExams] = await Promise.all([
        repository.findStudentFullName(submitted),
        repository.findUpcomingExam(submitted),
      ]);

      studentFullName = fullName;
      exams = upcomingExams;
      state = fullName === null ? "not_found" : "found";
    }
  }

  if (state === "found" && studentFullName !== null) {
    return <StudentWelcomeScreen studentFullName={studentFullName} exams={exams} />;
  }

  return <LookupSplitScreen defaultValue={submitted} state={state} />;
}
