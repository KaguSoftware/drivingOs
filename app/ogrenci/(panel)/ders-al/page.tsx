import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { BookingRepository } from "./booking.repository";

export default async function ChooseInstructorPage() {
  await requireRole("student");
  const supabase = await createSupabaseServerClient();
  const instructors = (await new BookingRepository(supabase).listInstructors()).filter(
    (i) => i.hasVehicle
  );

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title="Ders al" description="Bir eğitmen seçerek uygun saatlerden ders alın." />
      {instructors.length === 0 ? (
        <EmptyState title="Şu an ders alınabilecek eğitmen yok" description="Eğitmenlere araç atanınca burada görünür." />
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {instructors.map((instructor) => (
            <li key={instructor.id}>
              <Link
                href={`/ogrenci/ders-al/${instructor.id}`}
                className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 shadow-sm transition-colors hover:border-primary"
              >
                <div>
                  <p className="font-medium">{instructor.fullName}</p>
                  <p className="text-xs text-muted">{instructor.vehiclePlate}</p>
                </div>
                <div className="flex flex-wrap justify-end gap-1">
                  {instructor.licenseClasses.map((cls) => (
                    <Badge key={cls} tone="info">{cls}</Badge>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
