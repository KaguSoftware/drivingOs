import type { MebStatus, ProgressStatus, StudentFormValues, StudentRow } from "./types";

const PROGRESS_LABELS: Record<ProgressStatus, string> = {
  not_started: "Başlanmadı",
  in_progress: "Devam ediyor",
  completed: "Tamamlandı",
};

const MEB_LABELS: Record<MebStatus, string> = {
  missing_documents: "Belgeler eksik",
  submitted: "Gönderildi",
  approved: "Onaylandı",
  rejected: "Reddedildi",
};

export class Student {
  constructor(private readonly row: StudentRow) {}

  get id() {
    return this.row.id;
  }

  get fullName() {
    return this.row.full_name;
  }

  get phone() {
    return this.row.phone;
  }

  get nationalId() {
    return this.row.national_id;
  }

  get email() {
    return this.row.email;
  }

  get licenseClasses() {
    return this.row.license_classes;
  }

  licenseLabel(): string {
    return this.row.license_classes.join(", ");
  }

  hasLicenseClass(licenseClass: string): boolean {
    return (this.row.license_classes as string[]).includes(licenseClass);
  }

  isTheoryComplete(): boolean {
    return this.row.theory_status === "completed";
  }

  isPracticeComplete(): boolean {
    return this.row.practice_status === "completed";
  }

  isMebApproved(): boolean {
    return this.row.meb_paperwork_status === "approved";
  }

  theoryLabel(): string {
    return PROGRESS_LABELS[this.row.theory_status];
  }

  practiceLabel(): string {
    return PROGRESS_LABELS[this.row.practice_status];
  }

  mebLabel(): string {
    return MEB_LABELS[this.row.meb_paperwork_status];
  }

  enrolledAt(): Date {
    return new Date(this.row.created_at);
  }

  toFormValues(): StudentFormValues {
    return {
      id: this.row.id,
      fullName: this.row.full_name,
      phone: this.row.phone,
      nationalId: this.row.national_id,
      email: this.row.email,
      licenseClasses: this.row.license_classes,
    };
  }
}
