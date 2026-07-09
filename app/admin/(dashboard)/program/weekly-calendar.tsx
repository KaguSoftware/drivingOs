import Link from "next/link";
import { DeleteButton } from "@/components/ui/delete-button";
import { EditIcon, TrashIcon } from "@/components/ui/icons";
import type { Lesson } from "./lesson.model";
import type { ExamSession } from "../sinavlar/exam-session.model";
import { deleteLesson } from "./actions";
import { deleteExamSessionFromProgram } from "../sinavlar/actions";

const DAY_LABELS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const HOURS = Array.from({ length: 13 }, (_, i) => 8 + i); // 08:00-20:00

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function toLocalDateTimeValue(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

const iconButtonClass =
  "inline-flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground/80 transition-colors hover:bg-primary-foreground/20 hover:text-primary-foreground";

export function WeeklyCalendar({
  weekStart,
  lessons,
  examSessions,
}: {
  weekStart: Date;
  lessons: Lesson[];
  examSessions: ExamSession[];
}) {
  const days = DAY_LABELS.map((label, index) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + index);
    return { label, date };
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <div
        className="grid min-w-[900px]"
        style={{ gridTemplateColumns: `80px repeat(7, 1fr)` }}
      >
        <div className="border-b border-r border-border bg-background p-2" />
        {days.map((day) => (
          <div
            key={day.label}
            className="border-b border-border bg-background p-2 text-center text-sm font-medium"
          >
            {day.label} {day.date.getDate()}
          </div>
        ))}

        {HOURS.map((hour) => (
          <div key={hour} className="contents">
            <div className="border-b border-r border-border p-2 text-xs text-muted">
              {String(hour).padStart(2, "0")}:00
            </div>
            {days.map((day) => {
              const cellLessons = lessons.filter(
                (lesson) => isSameDay(lesson.startsAt(), day.date) && lesson.startsAt().getHours() === hour
              );
              const cellExamSessions = examSessions.filter(
                (session) => isSameDay(session.startsAt(), day.date) && session.startsAt().getHours() === hour
              );
              const isEmpty = cellLessons.length === 0 && cellExamSessions.length === 0;
              const slotStart = new Date(day.date);
              slotStart.setHours(hour, 0, 0, 0);
              const isPast = slotStart.getTime() < Date.now();

              return (
                <div
                  key={day.label}
                  className={`group relative flex flex-col gap-1 border-b border-l border-border p-1 ${
                    isPast && isEmpty ? "bg-background/40" : ""
                  }`}
                >
                  {isEmpty && !isPast && (
                    <Link
                      href={`/admin/program/yeni?starts_at=${encodeURIComponent(toLocalDateTimeValue(slotStart))}`}
                      className="absolute inset-0 flex items-center justify-center text-xs text-muted opacity-0 transition-opacity hover:bg-background/60 group-hover:opacity-100"
                      aria-label={`${String(hour).padStart(2, "0")}:00 için ders planla`}
                    >
                      +
                    </Link>
                  )}
                  {cellLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="group/card relative flex flex-col gap-1 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground shadow-sm"
                    >
                      <a href={lesson.whatsAppLink()} target="_blank" rel="noreferrer" className="font-bold uppercase hover:underline">
                        {lesson.studentName}
                      </a>
                      <span>{lesson.vehicleSummary}</span>
                      <span className="text-primary-foreground/80">
                        {lesson.startsAt().toLocaleDateString([], { day: "2-digit", month: "2-digit" })}{" "}
                        {lesson.startsAt().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        {" – "}
                        {lesson.endsAt().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <div className="flex h-0 items-center justify-center gap-1 overflow-hidden opacity-0 transition-[height,opacity] group-hover/card:h-6 group-hover/card:opacity-100">
                        <Link
                          href={`/admin/program/${lesson.id}/duzenle`}
                          className={iconButtonClass}
                          aria-label="Dersi düzenle"
                          title="Düzenle"
                        >
                          <EditIcon />
                        </Link>
                        <DeleteButton
                          action={deleteLesson.bind(null, lesson.id)}
                          confirmMessage="Bu ders silinsin mi?"
                          className={iconButtonClass}
                          title="Sil"
                        >
                          <span className="sr-only">Sil</span>
                          <TrashIcon />
                        </DeleteButton>
                      </div>
                    </div>
                  ))}
                  {cellExamSessions.map((session) => (
                    <div
                      key={session.id}
                      className="group/card relative flex flex-col gap-1 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground shadow-sm"
                    >
                      <Link href={`/admin/sinavlar/${session.id}`} className="hover:underline">
                        Sınav &middot; {session.examPlaceName}
                      </Link>
                      <div className="flex h-0 items-center justify-center gap-1 overflow-hidden opacity-0 transition-[height,opacity] group-hover/card:h-6 group-hover/card:opacity-100">
                        <Link
                          href={`/admin/sinavlar/${session.id}/duzenle`}
                          className={iconButtonClass}
                          aria-label="Sınavı düzenle"
                          title="Düzenle"
                        >
                          <EditIcon />
                        </Link>
                        <DeleteButton
                          action={deleteExamSessionFromProgram.bind(null, session.id)}
                          confirmMessage="Bu sınav silinsin mi?"
                          className={iconButtonClass}
                          title="Sil"
                        >
                          <span className="sr-only">Sil</span>
                          <TrashIcon />
                        </DeleteButton>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
