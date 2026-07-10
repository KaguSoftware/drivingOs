import { BackLink } from "@/components/ui/back-link";
import { FormCard } from "@/components/ui/form-card";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { ExamPlaceForm } from "../exam-place-form";

export default function NewExamPlacePage() {
  return (
    <PageContainer className="max-w-3xl">
      <section className="flex flex-col gap-6">
        <BackLink href="/admin/sinavlar?tab=places" label="Sınav yerlerine dön" />
        <PageHeader title="Yeni sınav yeri" />
        <FormCard>
          <ExamPlaceForm />
        </FormCard>
      </section>
    </PageContainer>
  );
}
