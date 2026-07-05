import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExamSessionRepository } from "./exam-session.repository";
import { ExamSessionTable } from "./exam-session-table";

export default async function ExamsPage() {
  const supabase = await createSupabaseServerClient();
  const sessions = await new ExamSessionRepository(supabase).listUpcoming();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Exams</h1>
        <Link
          href="/admin/exams/new"
          className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-300"
        >
          Schedule exam
        </Link>
      </div>
      <ExamSessionTable sessions={sessions} />
    </section>
  );
}
