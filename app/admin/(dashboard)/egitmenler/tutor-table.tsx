import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import { tableWrapperClass, theadClass, tbodyClass } from "@/components/ui/table-classes";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import type { Instructor } from "./instructor.model";
import type { InstructorStats } from "./exam-result.repository";
import { deleteInstructor } from "./actions";

function passRateText(stats?: InstructorStats): string {
  if (!stats || stats.total === 0) return "Henüz sınav yok";
  return `${Math.round((stats.passed / stats.total) * 100)}% (${stats.passed}/${stats.total})`;
}

export function TutorTable({
  instructors,
  stats,
}: {
  instructors: Instructor[];
  stats: Map<string, InstructorStats>;
}) {
  if (instructors.length === 0) {
    return <EmptyState title="Henüz eğitmen yok" description="İlk eğitmeninizi ekleyin." />;
  }

  return (
    <>
      {/* Desktop table */}
      <div className={`${tableWrapperClass} hidden md:block`}>
        <table className="w-full text-left text-sm">
          <thead className={theadClass}>
            <tr>
              <th className="px-4 py-3 font-medium">Ad Soyad</th>
              <th className="px-4 py-3 font-medium">Telefon</th>
              <th className="px-4 py-3 font-medium">Ehliyet sınıfları</th>
              <th className="px-4 py-3 font-medium">Araç</th>
              <th className="px-4 py-3 font-medium">Başarı oranı</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className={tbodyClass}>
            {instructors.map((instructor) => (
              <tr key={instructor.id}>
                <td className="px-4 py-3 font-medium">{instructor.fullName}</td>
                <td className="px-4 py-3">{instructor.phone}</td>
                <td className="px-4 py-3">{instructor.licenseClasses.join(", ")}</td>
                <td className="px-4 py-3">{instructor.assignedVehiclePlate() ?? "—"}</td>
                <td className="px-4 py-3">{passRateText(stats.get(instructor.id))}</td>
                <td className="px-4 py-3 text-right">
                  <RowActionsMenu
                    editHref={`/admin/egitmenler/${instructor.id}/duzenle`}
                    deleteAction={deleteInstructor.bind(null, instructor.id)}
                    deleteConfirmMessage="Bu eğitmen silinsin mi?"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="flex flex-col gap-3 md:hidden">
        {instructors.map((instructor) => (
          <li key={instructor.id} className="rounded-xl border border-border bg-surface p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium">{instructor.fullName}</p>
                <p className="text-xs text-muted">{instructor.phone}</p>
              </div>
              <RowActionsMenu
                editHref={`/admin/egitmenler/${instructor.id}/duzenle`}
                deleteAction={deleteInstructor.bind(null, instructor.id)}
                deleteConfirmMessage="Bu eğitmen silinsin mi?"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {instructor.licenseClasses.map((cls) => (
                <Badge key={cls} tone="info">{cls}</Badge>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted">
              <span>Araç: {instructor.assignedVehiclePlate() ?? "—"}</span>
              <span>{passRateText(stats.get(instructor.id))}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
