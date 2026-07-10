import { BackLink } from "@/components/ui/back-link";
import { FormCard } from "@/components/ui/form-card";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { TutorForm } from "../tutor-form";
import { loadVehicleOptions } from "../vehicle-options";

export default async function NewTutorPage() {
  const supabase = await createSupabaseServerClient();
  const vehicles = await loadVehicleOptions(supabase);

  return (
    <PageContainer className="max-w-2xl">
      <section className="flex flex-col gap-6">
        <BackLink href="/admin/egitmenler" label="Eğitmenlere dön" />
        <PageHeader title="Eğitmen kaydet" />
        <FormCard>
          <TutorForm vehicles={vehicles} />
        </FormCard>
      </section>
    </PageContainer>
  );
}
