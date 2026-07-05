import type { SupabaseClient } from "@supabase/supabase-js";
import { PaymentInstallment } from "./payment-installment.model";
import type { NewPaymentInstallmentInput, PaymentInstallmentRow } from "./types";

const INSTALLMENT_SELECT = "*, students(full_name)";

export interface StudentBalance {
  studentId: string;
  studentName: string;
  totalDebt: number;
}

export class PaymentInstallmentRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listAll(): Promise<PaymentInstallment[]> {
    const { data, error } = await this.supabase
      .from("payment_installments")
      .select(INSTALLMENT_SELECT)
      .order("due_date", { ascending: true });

    if (error) throw new Error(`Failed to list installments: ${error.message}`);
    return (data as PaymentInstallmentRow[]).map((row) => new PaymentInstallment(row));
  }

  async listForStudent(studentId: string): Promise<PaymentInstallment[]> {
    const { data, error } = await this.supabase
      .from("payment_installments")
      .select(INSTALLMENT_SELECT)
      .eq("student_id", studentId)
      .order("due_date", { ascending: true });

    if (error) throw new Error(`Failed to list installments: ${error.message}`);
    return (data as PaymentInstallmentRow[]).map((row) => new PaymentInstallment(row));
  }

  async outstandingBalances(): Promise<StudentBalance[]> {
    const installments = await this.listAll();
    const balances = new Map<string, StudentBalance>();

    for (const installment of installments) {
      const current = balances.get(installment.studentId) ?? {
        studentId: installment.studentId,
        studentName: installment.studentName,
        totalDebt: 0,
      };
      current.totalDebt += installment.remainingDebt();
      balances.set(installment.studentId, current);
    }

    return Array.from(balances.values());
  }

  async create(input: NewPaymentInstallmentInput): Promise<PaymentInstallment> {
    const { data, error } = await this.supabase
      .from("payment_installments")
      .insert(input)
      .select(INSTALLMENT_SELECT)
      .single();

    if (error) throw new Error(`Failed to create installment: ${error.message}`);
    return new PaymentInstallment(data as PaymentInstallmentRow);
  }

  async recordPayment(id: string, amountPaid: number): Promise<PaymentInstallment> {
    const { data: existing, error: findError } = await this.supabase
      .from("payment_installments")
      .select("amount, amount_paid")
      .eq("id", id)
      .single();

    if (findError) throw new Error(`Failed to find installment: ${findError.message}`);

    const newAmountPaid = existing.amount_paid + amountPaid;
    const status = newAmountPaid >= existing.amount ? "paid" : newAmountPaid > 0 ? "partial" : "pending";

    const { data, error } = await this.supabase
      .from("payment_installments")
      .update({ amount_paid: newAmountPaid, status })
      .eq("id", id)
      .select(INSTALLMENT_SELECT)
      .single();

    if (error) throw new Error(`Failed to record payment: ${error.message}`);
    return new PaymentInstallment(data as PaymentInstallmentRow);
  }
}
