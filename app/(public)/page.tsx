import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExamLookupRepository } from "./exam-lookup.repository";
import { NationalIdLookupForm } from "./national-id-lookup-form";
import { ExamLookupResult, type LookupState } from "./exam-lookup-result";
import { StudentWelcomeScreen } from "./student-welcome-screen";
import { Logo } from "./logo";
import { MebBadge } from "./meb-badge";
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

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-8 p-8">
      <div className="flex items-center justify-between">
        <Logo />
        <MebBadge />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-muted">Hoş geldiniz</p>
        <h1 className="text-2xl font-semibold">Sınav Yerinizi Öğrenin</h1>
        <p className="text-sm text-muted">
          TC kimlik numaranızı girerek yaklaşan sınav tarihinizi ve yerinizi güvenli
          bir şekilde görüntüleyebilirsiniz.
        </p>
      </div>
      <NationalIdLookupForm defaultValue={submitted} />
      <ExamLookupResult state={state} />
    </main>
  );
}
