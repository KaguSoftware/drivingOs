import { BackLink } from "@/components/ui/back-link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { TutorForm } from "../tutor-form";
import { loadVehicleOptions } from "../vehicle-options";

export default async function NewTutorPage() {
  const supabase = await createSupabaseServerClient();
  const vehicles = await loadVehicleOptions(supabase);

  return (
    <section className="flex flex-col gap-6">
      <BackLink href="../" label="Eğitmenlere dön" />
      <h1 className="text-2xl font-semibold">Eğitmen kaydet</h1>
      <TutorForm vehicles={vehicles} />
    </section>
  );
}
