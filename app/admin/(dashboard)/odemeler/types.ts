// Mirrors supabase/migrations/0007_payment_installments.sql,
// 0023_expenses.sql and 0024_payment_transactions.sql — keep in sync.

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

// Plain, serializable shapes for passing into the client-side
// InstallmentForm / EditInstallmentForm (class instances lose their
// prototype methods across the RSC boundary).
export interface InstallmentFormStudent {
  id: string;
  fullName: string;
}

export interface InstallmentFormInstallment {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string;
}

export interface ExpenseRow {
  id: string;
  name: string;
  cost: number;
  expense_date: string;
  created_at: string;
}

export interface NewExpenseInput {
  name: string;
  cost: number;
  expense_date: string;
}

export interface PaymentTransactionRow {
  id: string;
  installment_id: string;
  student_id: string;
  amount: number;
  paid_at: string;
}

export interface NewPaymentTransactionInput {
  installment_id: string;
  student_id: string;
  amount: number;
}
