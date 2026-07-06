import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { ExamSessionRepository } from "./exam-session.repository";
import { ExamSessionTable } from "./exam-session-table";

export default async function ExamsPage() {
  const supabase = await createSupabaseServerClient();
  const sessions = await new ExamSessionRepository(supabase).listUpcoming();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Exams</h1>
        <Link href="/admin/exams/new" className={primaryLinkClass}>
          Schedule exam
        </Link>
      </div>
      <ExamSessionTable sessions={sessions} />
    </section>
  );
}
