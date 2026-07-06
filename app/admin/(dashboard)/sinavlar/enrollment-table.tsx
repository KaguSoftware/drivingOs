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
    return <p className={emptyStateClass}>Henüz kayıtlı öğrenci yok.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Öğrenci</th>
            <th className="w-px px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td className="px-4 py-3">{enrollment.studentName}</td>
              <td className="w-px px-4 py-3 text-right whitespace-nowrap">
                <DeleteButton
                  action={deleteEnrollment.bind(null, enrollment.id, examSessionId)}
                  confirmMessage="Bu kayıt kaldırılsın mı?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
