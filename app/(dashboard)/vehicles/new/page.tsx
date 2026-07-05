import { BackLink } from "@/components/ui/back-link";
import { VehicleForm } from "../vehicle-form";

export default function NewVehiclePage() {
  return (
    <section className="flex flex-col gap-6">
      <BackLink href="../" label="Back to vehicles" />
      <h1 className="text-2xl font-semibold">Add vehicle</h1>
      <VehicleForm />
    </section>
  );
}
