import { BackLink } from "@/components/ui/back-link";
import { FormCard } from "@/components/ui/form-card";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehicleRepository } from "../../vehicle.repository";
import { VehiclePeriodicCheckForm } from "../vehicle-periodic-check-form";

export default async function NewVehiclePeriodicCheckPage() {
  const supabase = await createSupabaseServerClient();
  const vehicles = await new VehicleRepository(supabase).listAll();

  return (
    <PageContainer className="max-w-2xl">
      <section className="flex flex-col gap-6">
        <BackLink href="/admin/araclar?tab=bakim" label="Araç kontrollerine dön" />
        <PageHeader title="Yeni periyodik kontrol" />
        <FormCard>
          <VehiclePeriodicCheckForm vehicles={vehicles.map((vehicle) => vehicle.toOption())} />
        </FormCard>
      </section>
    </PageContainer>
  );
}
