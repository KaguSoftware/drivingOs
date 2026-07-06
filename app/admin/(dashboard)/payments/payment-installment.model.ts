import type { PaymentInstallmentRow, PaymentStatus } from "./types";

const STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: "Bekliyor",
  partial: "Kısmen ödendi",
  paid: "Ödendi",
  overdue: "Gecikmiş",
};

export class PaymentInstallment {
  constructor(private readonly row: PaymentInstallmentRow) {}

  get id() {
    return this.row.id;
  }

  get studentId() {
    return this.row.student_id;
  }

  get studentName() {
    return this.row.students?.full_name ?? "-";
  }

  get amount() {
    return this.row.amount;
  }

  get amountPaid() {
    return this.row.amount_paid;
  }

  get status() {
    return this.row.status;
  }

  dueDate(): Date {
    return new Date(this.row.due_date);
  }

  remainingDebt(): number {
    return this.row.amount - this.row.amount_paid;
  }

  isOverdue(): boolean {
    return this.row.status !== "paid" && this.dueDate() < new Date();
  }

  statusLabel(): string {
    return STATUS_LABELS[this.row.status];
  }
}
