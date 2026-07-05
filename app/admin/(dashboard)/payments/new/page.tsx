import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StudentRepository } from "../../students/student.repository";
import { InstallmentForm } from "../installment-form";

export default async function NewInstallmentPage() {
  const supabase = await createSupabaseServerClient();
  const students = await new StudentRepository(supabase).listAll();

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">New installment</h1>
      <InstallmentForm students={students} />
    </section>
  );
}
