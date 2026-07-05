import Link from "next/link";
import { DeleteButton } from "@/components/ui/delete-button";
import type { ExamSession } from "./exam-session.model";
import { deleteExamSession } from "./actions";

export function ExamSessionTable({ sessions }: { sessions: ExamSession[] }) {
  if (sessions.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
        No upcoming exams scheduled.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">When</th>
            <th className="px-4 py-3 font-medium">Exam place</th>
            <th className="px-4 py-3 font-medium">Proctor</th>
            <th className="px-4 py-3 font-medium">Edit</th>
            <th className="px-4 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {sessions.map((session) => (
            <tr key={session.id}>
              <td className="px-4 py-3 font-medium">
                <Link href={`/exams/${session.id}`} className="hover:underline">
                  {session.startsAt().toLocaleString()}
                </Link>
              </td>
              <td className="px-4 py-3">{session.examPlaceName}</td>
              <td className="px-4 py-3">{session.instructorName}</td>
              <td className="px-4 py-3">
                <Link href={`/exams/${session.id}/edit`} className="hover:underline">
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
