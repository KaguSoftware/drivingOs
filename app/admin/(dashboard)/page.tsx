import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard, StatGrid } from "@/components/ui/stat-card";
import { DashboardRepository } from "./dashboard.repository";

const SHORTCUTS = [
  { href: "/admin/ogrenciler/yeni", label: "Yeni öğrenci" },
  { href: "/admin/program", label: "Haftalık program" },
  { href: "/admin/egitmen-takip", label: "Eğitmen takibi" },
  { href: "/admin/odemeler", label: "Ödemeler" },
];

export default async function DashboardHome() {
  const supabase = await createSupabaseServerClient();
  const stats = await new DashboardRepository(supabase).stats();

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title="Genel Bakış" description="Kursunuzun anlık durumu." />
      <StatGrid>
        <StatCard label="Öğrenci" value={stats.studentCount} />
        <StatCard label="Bu hafta ders" value={stats.lessonsThisWeek} />
        <StatCard label="Ödenmemiş taksit" value={stats.unpaidInstallments} />
        <StatCard label="Yaklaşan sınav" value={stats.upcomingExams} />
      </StatGrid>
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Hızlı erişim</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SHORTCUTS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-xl border border-border bg-surface p-4 text-sm font-medium shadow-sm transition-colors hover:border-primary"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
