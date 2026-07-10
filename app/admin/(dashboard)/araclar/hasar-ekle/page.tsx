import { BackLink } from "@/components/ui/back-link";
import { FormCard } from "@/components/ui/form-card";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VehicleRepository } from "../vehicle.repository";
import { DamagedVehicleForm } from "../damaged-vehicle-form";

export default async function NewDamagedVehiclePage() {
  const supabase = await createSupabaseServerClient();
  const vehicles = await new VehicleRepository(supabase).listAll();

  return (
    <PageContainer className="max-w-2xl">
      <section className="flex flex-col gap-6">
        <BackLink href="/admin/araclar?tab=hasarli" label="Hasarlı araçlara dön" />
        <PageHeader title="Hasar kaydı ekle" />
        <FormCard>
          <DamagedVehicleForm vehicles={vehicles} />
        </FormCard>
      </section>
    </PageContainer>
  );
}
