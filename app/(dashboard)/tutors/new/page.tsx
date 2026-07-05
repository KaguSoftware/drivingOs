import { BackLink } from "@/components/ui/back-link";
import { TutorForm } from "../tutor-form";

export default function NewTutorPage() {
  return (
    <section className="flex flex-col gap-6">
      <BackLink href="../" label="Back to tutors" />
      <h1 className="text-2xl font-semibold">Register tutor</h1>
      <TutorForm />
    </section>
  );
}
