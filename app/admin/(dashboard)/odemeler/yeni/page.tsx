import { BackLink } from "@/components/ui/back-link";
import { FormCard } from "@/components/ui/form-card";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StudentRepository } from "../../ogrenciler/student.repository";
import { InstallmentForm } from "../installment-form";
import { toInstallmentFormStudents } from "../installment-form-data";

export default async function NewInstallmentPage() {
  const supabase = await createSupabaseServerClient();
  const students = await new StudentRepository(supabase).listAll();

  return (
    <PageContainer className="max-w-2xl">
      <section className="flex flex-col gap-6">
        <BackLink href="/admin/odemeler" label="Ödemelere dön" />
        <PageHeader title="Yeni taksit" />
        <FormCard>
          <InstallmentForm students={toInstallmentFormStudents(students)} />
        </FormCard>
      </section>
    </PageContainer>
  );
}
