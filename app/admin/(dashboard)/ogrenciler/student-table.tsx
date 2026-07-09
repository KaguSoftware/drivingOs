import Link from "next/link";
import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import { tableWrapperClass, theadClass, tbodyClass } from "@/components/ui/table-classes";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import type { Student } from "./student.model";
import { deleteStudent } from "./actions";

export function StudentTable({
  students,
  debtByStudent,
}: {
  students: Student[];
  debtByStudent?: Map<string, number>;
}) {
  if (students.length === 0) {
    return <EmptyState title="Henüz öğrenci yok" description="İlk öğrencinizi ekleyerek başlayın." />;
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
              <th className="px-4 py-3 font-medium">Sınıf</th>
              <th className="px-4 py-3 font-medium">Teori</th>
              <th className="px-4 py-3 font-medium">Direksiyon</th>
              <th className="px-4 py-3 font-medium">MEB</th>
              <th className="px-4 py-3 font-medium">MEB PDF</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className={tbodyClass}>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-4 py-3 font-medium">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/ogrenciler/${student.id}`} className="hover:underline">
                      {student.fullName}
                    </Link>
                    {(debtByStudent?.get(student.id) ?? 0) > 0 && (
                      <Badge tone="danger">Borçlu</Badge>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">{student.phone}</td>
                <td className="px-4 py-3">{student.licenseLabel()}</td>
                <td className="px-4 py-3">{student.theoryLabel()}</td>
                <td className="px-4 py-3">{student.practiceLabel()}</td>
                <td className="px-4 py-3">{student.mebLabel()}</td>
                <td className="px-4 py-3">
                  <a href={`/api/students/${student.id}/meb-pdf`} className="hover:underline">
                    PDF indir
                  </a>
                </td>
                <td className="px-4 py-3 text-right">
                  <RowActionsMenu
                    editHref={`/admin/ogrenciler/${student.id}/duzenle`}
                    deleteAction={deleteStudent.bind(null, student.id)}
                    deleteConfirmMessage="Bu öğrenci silinsin mi?"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="flex flex-col gap-3 md:hidden">
        {students.map((student) => (
          <li key={student.id} className="rounded-xl border border-border bg-surface p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/ogrenciler/${student.id}`} className="font-medium hover:underline">
                    {student.fullName}
                  </Link>
                  {(debtByStudent?.get(student.id) ?? 0) > 0 && (
                    <Badge tone="danger">Borçlu</Badge>
                  )}
                </div>
                <p className="text-xs text-muted">{student.phone}</p>
              </div>
              <RowActionsMenu
                editHref={`/admin/ogrenciler/${student.id}/duzenle`}
                deleteAction={deleteStudent.bind(null, student.id)}
                deleteConfirmMessage="Bu öğrenci silinsin mi?"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {student.licenseClasses.map((cls) => (
                <Badge key={cls} tone="info">{cls}</Badge>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted">
              <span>Teori: {student.theoryLabel()}</span>
              <span>Direksiyon: {student.practiceLabel()}</span>
              <span>MEB: {student.mebLabel()}</span>
            </div>
            <a
              href={`/api/students/${student.id}/meb-pdf`}
              className="mt-3 inline-block text-xs font-medium text-primary hover:underline"
            >
              MEB PDF indir
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
