import Link from "next/link";
import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import { Badge } from "@/components/ui/badge";
import type { Vehicle } from "./vehicle.model";
import { deleteVehicle } from "./actions";

export function VehicleTable({
  vehicles,
  damagedVehicleIds,
  overdueVehicleIds,
}: {
  vehicles: Vehicle[];
  damagedVehicleIds?: Set<string>;
  overdueVehicleIds?: Set<string>;
}) {
  if (vehicles.length === 0) {
    return <p className={emptyStateClass}>Henüz araç yok.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Plaka</th>
            <th className="px-4 py-3 font-medium">Marka / model</th>
            <th className="px-4 py-3 font-medium">Vites</th>
            <th className="px-4 py-3 font-medium">Ehliyet sınıfı</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td className="px-4 py-3 font-medium">
                <div className="flex items-center gap-2">
                  <Link href={`/admin/araclar/${vehicle.id}`} className="hover:underline">
                    {vehicle.plate}
                  </Link>
                  {damagedVehicleIds?.has(vehicle.id) && <Badge tone="danger">Hasarlı</Badge>}
                  {overdueVehicleIds?.has(vehicle.id) && <Badge tone="warning">Gecikmiş kontrol</Badge>}
                </div>
              </td>
              <td className="px-4 py-3">{vehicle.makeModel}</td>
              <td className="px-4 py-3">{vehicle.transmissionLabel()}</td>
              <td className="px-4 py-3">{vehicle.licenseClass}</td>
              <td className="px-4 py-3 text-right">
                <RowActionsMenu
                  editHref={`/admin/araclar/${vehicle.id}/duzenle`}
                  deleteAction={deleteVehicle.bind(null, vehicle.id)}
                  deleteConfirmMessage="Bu araç silinsin mi?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
