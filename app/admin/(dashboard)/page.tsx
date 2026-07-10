import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard, StatGrid } from "@/components/ui/stat-card";
import { DashboardRepository } from "./dashboard.repository";
import { LessonRepository } from "./program/lesson.repository";
import { ExamSessionRepository } from "./sinavlar/exam-session.repository";
import { PaymentInstallmentRepository } from "./odemeler/payment-installment.repository";
import { TodayLessonsCard, UpcomingExamsCard, OutstandingBalancesCard } from "./dashboard-lists";

const SHORTCUTS = [
  { href: "/admin/ogrenciler/yeni", label: "Yeni öğrenci" },
  { href: "/admin/program", label: "Haftalık program" },
  { href: "/admin/egitmenler?tab=takip", label: "Eğitmen takibi" },
  { href: "/admin/odemeler", label: "Ödemeler" },
];

function startOfDay(): Date {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return start;
}

export default async function DashboardHome() {
  const supabase = await createSupabaseServerClient();
  const todayStart = startOfDay();
  const todayEnd = new Date(todayStart);
  todayEnd.setDate(todayEnd.getDate() + 1);

  const [stats, todayLessons, upcomingExams, balances] = await Promise.all([
    new DashboardRepository(supabase).stats(),
    new LessonRepository(supabase).listForWeek(todayStart, todayEnd),
    new ExamSessionRepository(supabase).listUpcoming(),
    new PaymentInstallmentRepository(supabase).outstandingBalances(),
  ]);

  const topBalances = balances
    .filter((b) => b.totalDebt > 0)
    .sort((a, b) => b.totalDebt - a.totalDebt)
    .slice(0, 5);

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title="Genel Bakış" description="Kursunuzun anlık durumu." />
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
      <StatGrid>
        <StatCard label="Öğrenci" value={stats.studentCount} />
        <StatCard label="Bu hafta ders" value={stats.lessonsThisWeek} />
        <StatCard label="Ödenmemiş taksit" value={stats.unpaidInstallments} />
        <StatCard label="Yaklaşan sınav" value={stats.upcomingExams} />
      </StatGrid>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TodayLessonsCard lessons={todayLessons.slice(0, 6)} />
        <UpcomingExamsCard sessions={upcomingExams.slice(0, 6)} />
        <OutstandingBalancesCard balances={topBalances} />
      </div>
    </section>
  );
}
