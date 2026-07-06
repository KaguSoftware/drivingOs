import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { primaryLinkClass } from "@/components/ui/button";
import { StudentRepository } from "./student.repository";
import { StudentTable } from "./student-table";

export default async function StudentsPage() {
  const supabase = await createSupabaseServerClient();
  const students = await new StudentRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Students</h1>
        <Link href="/admin/students/new" className={primaryLinkClass}>
          New student
        </Link>
      </div>
      <StudentTable students={students} />
    </section>
  );
}
