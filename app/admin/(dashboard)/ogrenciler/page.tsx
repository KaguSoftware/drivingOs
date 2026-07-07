import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StudentRepository } from "./student.repository";
import { StudentTable } from "./student-table";

export default async function StudentsPage() {
  const supabase = await createSupabaseServerClient();
  const students = await new StudentRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Öğrenciler"
        description={`${students.length} kayıtlı öğrenci`}
        actions={
          <Link href="/admin/ogrenciler/yeni" className={primaryLinkClass}>
            Yeni öğrenci
          </Link>
        }
      />
      <StudentTable students={students} />
    </section>
  );
}
