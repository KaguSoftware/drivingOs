import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { InstructorRepository } from "./instructor.repository";
import { ExamResultRepository } from "./exam-result.repository";
import { TutorTable } from "./tutor-table";

export default async function TutorsPage() {
  const supabase = await createSupabaseServerClient();
  const instructors = await new InstructorRepository(supabase).listAll();
  const stats = await new ExamResultRepository(supabase).passRateByInstructor();

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Eğitmenler"
        description={`${instructors.length} eğitmen`}
        actions={
          <Link href="/admin/egitmenler/yeni" className={primaryLinkClass}>
            Yeni eğitmen
          </Link>
        }
      />
      <TutorTable instructors={instructors} stats={stats} />
    </section>
  );
}
