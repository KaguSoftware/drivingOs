import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { Student } from "./student.model";
import { deleteStudent } from "./actions";

export function StudentTable({ students }: { students: Student[] }) {
  if (students.length === 0) {
    return <p className={emptyStateClass}>Henüz öğrenci yok. İlkini ekleyin.</p>;
  }

  return (
    <div className={tableWrapperClass}>
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
              <td className="px-4 py-3 font-medium">{student.fullName}</td>
              <td className="px-4 py-3">{student.phone}</td>
              <td className="px-4 py-3">{student.licenseClass}</td>
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
  );
}
