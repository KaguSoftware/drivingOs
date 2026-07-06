import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { buttonClasses, primaryLinkClass } from "@/components/ui/button";
import { LessonRepository } from "./lesson.repository";
import { ExamSessionRepository } from "../exams/exam-session.repository";
import { WeeklyCalendar } from "./weekly-calendar";

function startOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = (day === 0 ? -6 : 1) - day; // Monday as first day
  const monday = new Date(date);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() + diff);
  return monday;
}

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) {
  const { week } = await searchParams;
  const weekStart = startOfWeek(week ? new Date(week) : new Date());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const prevWeek = new Date(weekStart);
  prevWeek.setDate(prevWeek.getDate() - 7);
  const nextWeek = new Date(weekStart);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const supabase = await createSupabaseServerClient();
  const lessons = await new LessonRepository(supabase).listForWeek(weekStart, weekEnd);
  const examSessions = await new ExamSessionRepository(supabase).listForWeek(weekStart, weekEnd);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Weekly Schedule</h1>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/schedule?week=${prevWeek.toISOString().slice(0, 10)}`}
            className={buttonClasses("secondary")}
          >
            Previous
          </Link>
          <Link
            href={`/admin/schedule?week=${nextWeek.toISOString().slice(0, 10)}`}
            className={buttonClasses("secondary")}
          >
            Next
          </Link>
          <Link href="/admin/schedule/new" className={primaryLinkClass}>
            New lesson
          </Link>
          <Link href="/admin/exams/new" className={primaryLinkClass}>
            New exam
          </Link>
        </div>
      </div>
      <WeeklyCalendar weekStart={weekStart} lessons={lessons} examSessions={examSessions} />
    </section>
  );
}
