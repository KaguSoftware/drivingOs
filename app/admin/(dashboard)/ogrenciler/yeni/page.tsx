import { BackLink } from "@/components/ui/back-link";
import { FormCard } from "@/components/ui/form-card";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { StudentForm } from "../student-form";

export default function NewStudentPage() {
  return (
    <PageContainer className="max-w-2xl">
      <section className="flex flex-col gap-6">
        <BackLink href="../" label="Öğrencilere dön" />
        <PageHeader title="Öğrenci kaydet" />
        <FormCard>
          <StudentForm />
        </FormCard>
      </section>
    </PageContainer>
  );
}
