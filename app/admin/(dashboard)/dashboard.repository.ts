import type { SupabaseClient } from "@supabase/supabase-js";

export interface DashboardStats {
  studentCount: number;
  lessonsThisWeek: number;
  unpaidInstallments: number;
  upcomingExams: number;
}

function weekBounds(): { start: string; end: string } {
  const now = new Date();
  const day = (now.getDay() + 6) % 7;
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - day);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return { start: start.toISOString(), end: end.toISOString() };
}

// Headline counts for the admin landing page.
export class DashboardRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async stats(): Promise<DashboardStats> {
    const { start, end } = weekBounds();
    const nowIso = new Date().toISOString();

    const [students, lessons, unpaid, exams] = await Promise.all([
      this.supabase.from("students").select("id", { count: "exact", head: true }),
      this.supabase
        .from("lessons")
        .select("id", { count: "exact", head: true })
        .gte("starts_at", start)
        .lt("starts_at", end),
      this.supabase
        .from("payment_installments")
        .select("id", { count: "exact", head: true })
        .neq("status", "paid"),
      this.supabase
        .from("exam_sessions")
        .select("id", { count: "exact", head: true })
        .gt("starts_at", nowIso),
    ]);

    return {
      studentCount: students.count ?? 0,
      lessonsThisWeek: lessons.count ?? 0,
      unpaidInstallments: unpaid.count ?? 0,
      upcomingExams: exams.count ?? 0,
    };
  }
}
