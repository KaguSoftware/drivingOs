import type { LessonRow } from "./types";

export class Lesson {
  constructor(private readonly row: LessonRow) {}

  get id() {
    return this.row.id;
  }

  get studentName() {
    return this.row.students?.full_name ?? "-";
  }

  get instructorName() {
    return this.row.instructors?.full_name ?? "-";
  }

  get vehiclePlate() {
    return this.row.vehicles?.plate ?? "-";
  }

  startsAt(): Date {
    return new Date(this.row.starts_at);
  }

  endsAt(): Date {
    return new Date(this.row.ends_at);
  }

  whatsAppLink(): string {
    const phone = this.row.students?.phone ?? "";
    const digits = phone.replace(/\D/g, "");
    const date = this.startsAt().toLocaleDateString();
    const time = this.startsAt().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const message = `Hi ${this.studentName}, reminder for your driving lesson on ${date} at ${time}.`;
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  }
}
