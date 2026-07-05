import { DeleteButton } from "@/components/ui/delete-button";
import type { ExamEnrollment } from "./exam-enrollment.model";
import { deleteEnrollment } from "./actions";

export function EnrollmentTable({
  enrollments,
  examSessionId,
}: {
  enrollments: ExamEnrollment[];
  examSessionId: string;
}) {
  if (enrollments.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
        No students enrolled yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">Student</th>
            <th className="px-4 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td className="px-4 py-3">{enrollment.studentName}</td>
              <td className="px-4 py-3">
                <DeleteButton
                  action={deleteEnrollment.bind(null, enrollment.id, examSessionId)}
                  confirmMessage="Remove this enrollment?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
