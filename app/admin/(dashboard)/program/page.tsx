import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { buttonClasses, primaryLinkClass } from "@/components/ui/button";
import { LessonRepository } from "./lesson.repository";
import { ExamSessionRepository } from "../sinavlar/exam-session.repository";
import { WeeklyCalendar } from "./weekly-calendar";
import { MonthlyCalendar } from "./monthly-calendar";
import { ScheduleDatePicker } from "./schedule-date-picker";
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
    ? `/admin/program?view=month&month=${toMonthParam(addMonths(monthStart, -1))}`
    : `/admin/program?week=${toDateParam(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7))}`;
  const nextHref = isMonthView
    ? `/admin/program?view=month&month=${toMonthParam(addMonths(monthStart, 1))}`
    : `/admin/program?week=${toDateParam(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7))}`;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <ScheduleDatePicker
          label={
            isMonthView
              ? monthStart.toLocaleDateString("tr-TR", { month: "long", year: "numeric" })
              : weekLabel(weekStart)
          }
          selectedDate={isMonthView ? monthStart : weekStart}
          isMonthView={isMonthView}
        />
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-md border border-border">
            <Link
              href={`/admin/program?week=${toDateParam(weekStart)}`}
              className={`px-3 py-1.5 text-sm ${!isMonthView ? "bg-primary text-primary-foreground" : ""}`}
            >
              Hafta
            </Link>
            <Link
              href={`/admin/program?view=month&month=${toMonthParam(monthStart)}`}
              className={`px-3 py-1.5 text-sm ${isMonthView ? "bg-primary text-primary-foreground" : ""}`}
            >
              Ay
            </Link>
          </div>
          <Link href={prevHref} className={buttonClasses("secondary")}>
            Önceki
          </Link>
          <Link href={nextHref} className={buttonClasses("secondary")}>
            Sonraki
          </Link>
          <Link href="/admin/program/yeni" className={primaryLinkClass}>
            Yeni ders
          </Link>
          <Link href="/admin/sinavlar/yeni" className={primaryLinkClass}>
            Yeni sınav
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
