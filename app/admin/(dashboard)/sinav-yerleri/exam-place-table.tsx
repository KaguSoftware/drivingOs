import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { ExamPlace } from "./exam-place.model";
import { deleteExamPlace } from "./actions";
import { ExamPlaceNotesHover } from "./exam-place-notes-hover";

export function ExamPlaceTable({ places }: { places: ExamPlace[] }) {
  if (places.length === 0) {
    return <p className={emptyStateClass}>Henüz sınav yeri yok.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">İsim</th>
            <th className="px-4 py-3 font-medium">Adres</th>
            <th className="px-4 py-3 font-medium">Video URL&apos;si</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {places.map((place) => (
            <tr key={place.id}>
              <td className="px-4 py-3 font-medium">
                <ExamPlaceNotesHover
                  href={`/admin/sinav-yerleri/${place.id}`}
                  name={place.name}
                  notes={place.notes}
                />
              </td>
              <td className="px-4 py-3">{place.address}</td>
              <td className="max-w-xs truncate px-4 py-3 text-muted">
                {place.youtubeUrl ? (
                  <a
                    href={place.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {place.youtubeUrl}
                  </a>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <RowActionsMenu
                  editHref={`/admin/sinav-yerleri/${place.id}/duzenle`}
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
