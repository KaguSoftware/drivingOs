import { DeleteButton } from "@/components/ui/delete-button";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
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
    return <p className={emptyStateClass}>No students enrolled yet.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Student</th>
            <th className="px-4 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
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
