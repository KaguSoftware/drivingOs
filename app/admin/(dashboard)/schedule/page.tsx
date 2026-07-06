import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { buttonClasses, primaryLinkClass } from "@/components/ui/button";
import { LessonRepository } from "./lesson.repository";
import { ExamSessionRepository } from "../exams/exam-session.repository";
import { WeeklyCalendar } from "./weekly-calendar";
import { MonthlyCalendar } from "./monthly-calendar";
import {
  addMonths,
  parseDateParam,
  parseMonthParam,
  startOfMonth,
  startOfWeek,
  toDateParam,
  toMonthParam,
  weekLabel,
} from "./date-utils";

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; week?: string; month?: string }>;
}) {
  const { view, week, month } = await searchParams;
  const isMonthView = view === "month";

  const supabase = await createSupabaseServerClient();
  const lessonRepository = new LessonRepository(supabase);
  const examSessionRepository = new ExamSessionRepository(supabase);

  const weekStart = startOfWeek(week ? parseDateParam(week) : new Date());
  const monthStart = startOfMonth(month ? parseMonthParam(month) : new Date());

  const rangeStart = isMonthView ? new Date(monthStart.getFullYear(), monthStart.getMonth(), 1 - 7) : weekStart;
  const rangeEnd = isMonthView
    ? new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 7)
    : new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7);

  const lessons = await lessonRepository.listForWeek(rangeStart, rangeEnd);
  const examSessions = await examSessionRepository.listForWeek(rangeStart, rangeEnd);

  const prevHref = isMonthView
    ? `/admin/schedule?view=month&month=${toMonthParam(addMonths(monthStart, -1))}`
    : `/admin/schedule?week=${toDateParam(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7))}`;
  const nextHref = isMonthView
    ? `/admin/schedule?view=month&month=${toMonthParam(addMonths(monthStart, 1))}`
    : `/admin/schedule?week=${toDateParam(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7))}`;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {isMonthView
            ? monthStart.toLocaleDateString(undefined, { month: "long", year: "numeric" })
            : weekLabel(weekStart)}
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-md border border-border">
            <Link
              href={`/admin/schedule?week=${toDateParam(weekStart)}`}
              className={`px-3 py-1.5 text-sm ${!isMonthView ? "bg-primary text-primary-foreground" : ""}`}
            >
              Week
            </Link>
            <Link
              href={`/admin/schedule?view=month&month=${toMonthParam(monthStart)}`}
              className={`px-3 py-1.5 text-sm ${isMonthView ? "bg-primary text-primary-foreground" : ""}`}
            >
              Month
            </Link>
          </div>
          <Link href={prevHref} className={buttonClasses("secondary")}>
            Previous
          </Link>
          <Link href={nextHref} className={buttonClasses("secondary")}>
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
      {isMonthView ? (
        <MonthlyCalendar monthStart={monthStart} lessons={lessons} examSessions={examSessions} />
      ) : (
        <WeeklyCalendar weekStart={weekStart} lessons={lessons} examSessions={examSessions} />
      )}
    </section>
  );
}
