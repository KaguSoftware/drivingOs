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
          href="/exams/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Schedule exam
        </Link>
      </div>
      <ExamSessionTable sessions={sessions} />
    </section>
  );
}
