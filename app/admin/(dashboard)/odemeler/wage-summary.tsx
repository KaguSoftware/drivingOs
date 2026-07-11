import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { Instructor } from "../egitmenler/instructor.model";

export function WageSummary({ instructors }: { instructors: Instructor[] }) {
  if (instructors.length === 0) {
    return <p className={emptyStateClass}>Kayıtlı eğitmen yok.</p>;
  }

  const total = instructors.reduce((sum, instructor) => sum + instructor.monthlyWage, 0);

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Eğitmen</th>
            <th className="px-4 py-3 font-medium">Aylık ücret</th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {instructors.map((instructor) => (
            <tr key={instructor.id}>
              <td className="px-4 py-3 font-medium">{instructor.fullName}</td>
              <td className="px-4 py-3">₺{instructor.monthlyWage.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td className="px-4 py-3 font-semibold">Toplam</td>
            <td className="px-4 py-3 font-semibold">₺{total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
