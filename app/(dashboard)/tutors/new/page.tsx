import { TutorForm } from "../tutor-form";

export default function NewTutorPage() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Register tutor</h1>
      <TutorForm />
    </section>
  );
}
