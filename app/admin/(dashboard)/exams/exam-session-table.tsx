import Link from "next/link";
import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { ExamSession } from "./exam-session.model";
import { deleteExamSession } from "./actions";

export function ExamSessionTable({ sessions }: { sessions: ExamSession[] }) {
  if (sessions.length === 0) {
    return <p className={emptyStateClass}>Yaklaşan planlı sınav yok.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Zaman</th>
            <th className="px-4 py-3 font-medium">Sınav yeri</th>
            <th className="px-4 py-3 font-medium">Gözetmen</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {sessions.map((session) => (
            <tr key={session.id}>
              <td className="px-4 py-3 font-medium">
                <Link href={`/admin/exams/${session.id}`} className="hover:underline">
                  {session.startsAt().toLocaleString("tr-TR")}
                </Link>
              </td>
              <td className="px-4 py-3">{session.examPlaceName}</td>
              <td className="px-4 py-3">{session.instructorName}</td>
              <td className="px-4 py-3 text-right">
                <RowActionsMenu
                  editHref={`/admin/exams/${session.id}/edit`}
                  deleteAction={deleteExamSession.bind(null, session.id)}
                  deleteConfirmMessage="Bu sınav silinsin mi?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
