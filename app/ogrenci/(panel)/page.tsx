import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/roles";
import { PortalRepository } from "./portal.repository";
import { ClassTimeRequestRepository } from "./ders-tercihleri/class-time-request.repository";
import { DashboardWelcome } from "./dashboard-welcome";
import { DashboardVideo } from "./dashboard-video";
import { DashboardClassPanel } from "./dashboard-class-panel";
import { DashboardExamLocation } from "./dashboard-exam-location";

export default async function StudentHomePage() {
  const profile = await requireRole("student");
  const supabase = await createSupabaseServerClient();
  const portal = new PortalRepository(supabase);

  const [student, exams, classTimeRows] = await Promise.all([
    portal.getStudent(profile.student_id!),
    portal.listUpcomingExams(profile.student_id!),
    new ClassTimeRequestRepository(supabase).listForStudent(profile.student_id!),
  ]);
  const primaryExam = exams[0] ?? null;

  return (
    <div className="grid min-h-[calc(100vh-8rem)] grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-border bg-surface shadow-sm">
        <DashboardWelcome studentFullName={student.fullName} exam={primaryExam} />
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <DashboardClassPanel rows={classTimeRows} />
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <DashboardVideo exam={primaryExam} />
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <DashboardExamLocation exam={primaryExam} />
      </div>
    </div>
  );
}
