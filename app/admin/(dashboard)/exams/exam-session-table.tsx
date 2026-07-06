import Link from "next/link";
import { DeleteButton } from "@/components/ui/delete-button";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { ExamSession } from "./exam-session.model";
import { deleteExamSession } from "./actions";

export function ExamSessionTable({ sessions }: { sessions: ExamSession[] }) {
  if (sessions.length === 0) {
    return <p className={emptyStateClass}>No upcoming exams scheduled.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">When</th>
            <th className="px-4 py-3 font-medium">Exam place</th>
            <th className="px-4 py-3 font-medium">Proctor</th>
            <th className="px-4 py-3 font-medium">Edit</th>
            <th className="px-4 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {sessions.map((session) => (
            <tr key={session.id}>
              <td className="px-4 py-3 font-medium">
                <Link href={`/admin/exams/${session.id}`} className="hover:underline">
                  {session.startsAt().toLocaleString()}
                </Link>
              </td>
              <td className="px-4 py-3">{session.examPlaceName}</td>
              <td className="px-4 py-3">{session.instructorName}</td>
              <td className="px-4 py-3">
                <Link href={`/admin/exams/${session.id}/edit`} className="hover:underline">
                  Edit
                </Link>
              </td>
              <td className="px-4 py-3">
                <DeleteButton action={deleteExamSession.bind(null, session.id)} confirmMessage="Delete this exam?" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
