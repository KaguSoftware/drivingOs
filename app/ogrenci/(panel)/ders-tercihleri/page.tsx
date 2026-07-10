import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { PageHeader } from "@/components/ui/page-header";
import { ClassTimeRequestRepository } from "./class-time-request.repository";
import { ClassTimeGrid } from "./class-time-grid";

export default async function ClassTimePreferencesPage() {
  const profile = await requireRole("student");
  const supabase = await createSupabaseServerClient();
  const rows = await new ClassTimeRequestRepository(supabase).listForStudent(profile.student_id!);

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Ders tercihleri"
        description="Pazartesi–Cumartesi arası, günde bir saat aralığı olacak şekilde en fazla 6 gün seçin; uygun bir eğitmen otomatik atanır."
      />
      <ClassTimeGrid rows={rows} />
    </section>
  );
}
