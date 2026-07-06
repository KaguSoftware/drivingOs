import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { Instructor } from "./instructor.model";
import type { InstructorStats } from "./exam-result.repository";
import { deleteInstructor } from "./actions";

export function TutorTable({
  instructors,
  stats,
}: {
  instructors: Instructor[];
  stats: Map<string, InstructorStats>;
}) {
  if (instructors.length === 0) {
    return <p className={emptyStateClass}>Henüz eğitmen yok. İlkini ekleyin.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Ad Soyad</th>
            <th className="px-4 py-3 font-medium">Telefon</th>
            <th className="px-4 py-3 font-medium">Ehliyet sınıfları</th>
            <th className="px-4 py-3 font-medium">Başarı oranı</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {instructors.map((instructor) => {
            const instructorStats = stats.get(instructor.id);
            const passRate =
              !instructorStats || instructorStats.total === 0
                ? "Henüz sınav yok"
                : `${Math.round((instructorStats.passed / instructorStats.total) * 100)}% (${instructorStats.passed}/${instructorStats.total})`;

            return (
              <tr key={instructor.id}>
                <td className="px-4 py-3 font-medium">{instructor.fullName}</td>
                <td className="px-4 py-3">{instructor.phone}</td>
                <td className="px-4 py-3">{instructor.licenseClasses.join(", ")}</td>
                <td className="px-4 py-3">{passRate}</td>
                <td className="px-4 py-3 text-right">
                  <RowActionsMenu
                    editHref={`/admin/tutors/${instructor.id}/edit`}
                    deleteAction={deleteInstructor.bind(null, instructor.id)}
                    deleteConfirmMessage="Bu eğitmen silinsin mi?"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
