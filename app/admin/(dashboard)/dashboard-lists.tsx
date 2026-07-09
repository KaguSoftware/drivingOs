import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import type { Lesson } from "./program/lesson.model";
import type { ExamSession } from "./sinavlar/exam-session.model";
import type { StudentBalance } from "./odemeler/payment-installment.repository";

function DashboardCard({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <Link href={href} className="text-xs font-medium text-primary hover:underline">
          Tümünü gör
        </Link>
      </div>
      <div className="flex min-h-40 flex-col justify-center">{children}</div>
    </div>
  );
}

function EmptyRow({ text }: { text: string }) {
  return <p className="text-center text-xs text-muted">{text}</p>;
}

export function TodayLessonsCard({ lessons }: { lessons: Lesson[] }) {
  return (
    <DashboardCard title="Bugünkü dersler" href="/admin/program">
      {lessons.length === 0 ? (
        <EmptyRow text="Bugün planlanmış ders yok" />
      ) : (
        <ul className="flex flex-col gap-2.5">
          {lessons.map((lesson) => (
            <li key={lesson.id} className="flex items-center justify-between gap-2 text-sm">
              <span className="text-muted">
                {lesson.startsAt().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
              </span>
              <span className="flex-1 truncate text-right font-medium text-foreground">
                {lesson.studentName}
              </span>
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  );
}

export function UpcomingExamsCard({ sessions }: { sessions: ExamSession[] }) {
  return (
    <DashboardCard title="Yaklaşan sınavlar" href="/admin/sinavlar">
      {sessions.length === 0 ? (
        <EmptyRow text="Planlanmış sınav yok" />
      ) : (
        <ul className="flex flex-col gap-2.5">
          {sessions.map((session) => (
            <li key={session.id} className="flex flex-col text-sm">
              <span className="font-medium text-foreground">{session.examPlaceName}</span>
              <span className="text-xs text-muted">
                {session.startsAt().toLocaleDateString("tr-TR")} &middot; {session.instructorName}
              </span>
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  );
}

export function OutstandingBalancesCard({ balances }: { balances: StudentBalance[] }) {
  return (
    <DashboardCard title="En yüksek borçlar" href="/admin/odemeler">
      {balances.length === 0 ? (
        <EmptyRow text="Ödenmemiş borç yok" />
      ) : (
        <ul className="flex flex-col gap-2.5">
          {balances.map((balance) => (
            <li key={balance.studentId} className="flex items-center justify-between gap-2 text-sm">
              <span className="truncate font-medium text-foreground">{balance.studentName}</span>
              <span className="text-muted">{formatCurrency(balance.totalDebt)}</span>
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  );
}
