import { VehicleForm } from "../vehicle-form";

export default function NewVehiclePage() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Add vehicle</h1>
      <VehicleForm />
    </section>
  );
}
