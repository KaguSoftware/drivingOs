// Mirrors supabase/migrations/0007_payment_installments.sql — keep in sync.

export const PAYMENT_STATUSES = ["pending", "partial", "paid", "overdue"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export interface PaymentInstallmentRow {
  id: string;
  student_id: string;
  amount: number;
  amount_paid: number;
  due_date: string;
  status: PaymentStatus;
  created_at: string;
  students: { full_name: string } | null;
}

export interface NewPaymentInstallmentInput {
  student_id: string;
  amount: number;
  due_date: string;
}
