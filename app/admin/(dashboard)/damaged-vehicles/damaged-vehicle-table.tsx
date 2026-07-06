import Link from "next/link";
import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { Vehicle } from "../vehicles/vehicle.model";
import type { VehicleDamageRecord } from "../vehicles/vehicle-damage-record.model";

export function DamagedVehicleTable({
  vehicles,
  damageRecords,
}: {
  vehicles: Vehicle[];
  damageRecords: VehicleDamageRecord[];
}) {
  if (vehicles.length === 0) {
    return <p className={emptyStateClass}>No damaged vehicles right now.</p>;
  }

  const recordsByVehicle = new Map<string, VehicleDamageRecord[]>();
  for (const record of damageRecords) {
    const existing = recordsByVehicle.get(record.vehicleId) ?? [];
    existing.push(record);
    recordsByVehicle.set(record.vehicleId, existing);
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Plate</th>
            <th className="px-4 py-3 font-medium">Brand / model</th>
            <th className="px-4 py-3 font-medium">License class</th>
            <th className="px-4 py-3 font-medium">Damaged parts</th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td className="px-4 py-3 font-medium">
                <Link href={`/admin/vehicles/${vehicle.id}`} className="hover:underline">
                  {vehicle.plate}
                </Link>
              </td>
              <td className="px-4 py-3">{vehicle.makeModel}</td>
              <td className="px-4 py-3">{vehicle.licenseClass}</td>
              <td className="px-4 py-3">
                {(recordsByVehicle.get(vehicle.id) ?? [])
                  .map((record) => `${record.partName} (${record.statusLabel()})`)
                  .join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
