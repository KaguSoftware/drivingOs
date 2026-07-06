import { BackLink } from "@/components/ui/back-link";
import { TutorForm } from "../tutor-form";

export default function NewTutorPage() {
  return (
    <section className="flex flex-col gap-6">
      <BackLink href="../" label="Eğitmenlere dön" />
      <h1 className="text-2xl font-semibold">Eğitmen kaydet</h1>
      <TutorForm />
    </section>
  );
}
