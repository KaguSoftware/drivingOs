import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StudentRepository } from "./student.repository";
import { StudentTable } from "./student-table";

export default async function StudentsPage() {
  const supabase = await createSupabaseServerClient();
  const students = await new StudentRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Students</h1>
        <Link
          href="/admin/students/new"
          className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-300"
        >
          New student
        </Link>
      </div>
      <StudentTable students={students} />
    </section>
  );
}
