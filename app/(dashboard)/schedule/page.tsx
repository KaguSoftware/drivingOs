import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
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
            href={`/schedule?week=${prevWeek.toISOString().slice(0, 10)}`}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700"
          >
            Previous
          </Link>
          <Link
            href={`/schedule?week=${nextWeek.toISOString().slice(0, 10)}`}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700"
          >
            Next
          </Link>
          <Link
            href="/schedule/new"
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            New lesson
          </Link>
          <Link
            href="/exams/new"
            className="rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white"
          >
            New exam
          </Link>
        </div>
      </div>
      <WeeklyCalendar weekStart={weekStart} lessons={lessons} examSessions={examSessions} />
    </section>
  );
}
