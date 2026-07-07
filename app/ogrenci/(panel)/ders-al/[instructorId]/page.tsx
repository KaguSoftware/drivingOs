import { notFound } from "next/navigation";
import { BackLink } from "@/components/ui/back-link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { PageHeader } from "@/components/ui/page-header";
import { BookingRepository } from "../booking.repository";
import { SlotGrid } from "../slot-grid";

export default async function InstructorSlotsPage({
  params,
}: {
  params: Promise<{ instructorId: string }>;
}) {
  const { instructorId } = await params;
  await requireRole("student");
  const supabase = await createSupabaseServerClient();
  const repo = new BookingRepository(supabase);

  const instructor = await repo.findInstructor(instructorId);
  if (!instructor || !instructor.hasVehicle) notFound();

  const from = new Date();
  const to = new Date();
  to.setDate(to.getDate() + 14);
  const slots = await repo.listOpenSlots(instructorId, from, to);

  return (
    <section className="flex flex-col gap-6">
      <BackLink href="/ogrenci/ders-al" label="Eğitmenlere dön" />
      <PageHeader
        title={instructor.fullName}
        description={`${instructor.vehiclePlate} · Uygun saatlerden birini seçin.`}
      />
      <SlotGrid instructorId={instructorId} slots={slots} />
    </section>
  );
}
