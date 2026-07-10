import Link from "next/link";
import { DeleteButton } from "@/components/ui/delete-button";
import { EditIcon, TrashIcon } from "@/components/ui/icons";
import type { Lesson } from "./lesson.model";
import type { ExamSession } from "../sinavlar/exam-session.model";
import { deleteLesson } from "./actions";
import { deleteExamSessionFromProgram } from "../sinavlar/actions";

// Lesson/exam-session cards rendered inside a WeeklyCalendar grid cell.
// Split out of weekly-calendar.tsx to keep that file under the 150-line cap.

const iconButtonClass =
  "inline-flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground/80 transition-colors hover:bg-primary-foreground/20 hover:text-primary-foreground";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <div className="group/card relative flex flex-col gap-1 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground shadow-sm">
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
        <Link href={`/admin/program/${lesson.id}/duzenle`} className={iconButtonClass} aria-label="Dersi düzenle" title="Düzenle">
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
  );
}

export function ExamSessionCard({ session }: { session: ExamSession }) {
  return (
    <div className="group/card relative flex flex-col gap-1 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground shadow-sm">
      <Link href={`/admin/sinavlar/${session.id}`} className="hover:underline">
        Sınav &middot; {session.examPlaceName}
      </Link>
      <div className="flex h-0 items-center justify-center gap-1 overflow-hidden opacity-0 transition-[height,opacity] group-hover/card:h-6 group-hover/card:opacity-100">
        <Link href={`/admin/sinavlar/${session.id}/duzenle`} className={iconButtonClass} aria-label="Sınavı düzenle" title="Düzenle">
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
  );
}
