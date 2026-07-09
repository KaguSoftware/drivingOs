import { BackLink } from "@/components/ui/back-link";
import { FormCard } from "@/components/ui/form-card";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { VehicleForm } from "../vehicle-form";

export default function NewVehiclePage() {
  return (
    <PageContainer className="max-w-2xl">
      <section className="flex flex-col gap-6">
        <BackLink href="../" label="Araçlara dön" />
        <PageHeader title="Araç ekle" />
        <FormCard>
          <VehicleForm />
        </FormCard>
      </section>
    </PageContainer>
  );
}
