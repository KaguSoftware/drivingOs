import Link from "next/link";
import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { ExamPlace } from "./exam-place.model";
import { deleteExamPlace } from "./actions";

export function ExamPlaceTable({ places }: { places: ExamPlace[] }) {
  if (places.length === 0) {
    return <p className={emptyStateClass}>Henüz sınav yeri yok.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Ad</th>
            <th className="px-4 py-3 font-medium">Adres</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {places.map((place) => (
            <tr key={place.id}>
              <td className="px-4 py-3 font-medium">
                <Link href={`/admin/exam-places/${place.id}`} className="hover:underline">
                  {place.name}
                </Link>
              </td>
              <td className="px-4 py-3">{place.address}</td>
              <td className="px-4 py-3 text-right">
                <RowActionsMenu
                  editHref={`/admin/exam-places/${place.id}/edit`}
                  deleteAction={deleteExamPlace.bind(null, place.id)}
                  deleteConfirmMessage="Bu sınav yeri silinsin mi?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
