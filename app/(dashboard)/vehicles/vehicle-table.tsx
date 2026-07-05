import Link from "next/link";
import type { Vehicle } from "./vehicle.model";

export function VehicleTable({ vehicles }: { vehicles: Vehicle[] }) {
  if (vehicles.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
        No vehicles yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">Plate</th>
            <th className="px-4 py-3 font-medium">Brand / model</th>
            <th className="px-4 py-3 font-medium">Transmission</th>
            <th className="px-4 py-3 font-medium">License class</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td className="px-4 py-3 font-medium">
                <Link href={`/vehicles/${vehicle.id}`} className="hover:underline">
                  {vehicle.plate}
                </Link>
              </td>
              <td className="px-4 py-3">{vehicle.makeModel}</td>
              <td className="px-4 py-3">{vehicle.transmission}</td>
              <td className="px-4 py-3">{vehicle.licenseClass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
