import type { SupabaseClient } from "@supabase/supabase-js";
import { PaymentInstallment } from "./payment-installment.model";
import { PaymentTransactionRepository } from "./payment-transaction.repository";
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

  async createMany(inputs: NewPaymentInstallmentInput[]): Promise<PaymentInstallment[]> {
    const { data, error } = await this.supabase
      .from("payment_installments")
      .insert(inputs)
      .select(INSTALLMENT_SELECT);

    if (error) throw new Error(`Failed to create installments: ${error.message}`);
    return (data as PaymentInstallmentRow[]).map((row) => new PaymentInstallment(row));
  }

  async findById(id: string): Promise<PaymentInstallment> {
    const { data, error } = await this.supabase
      .from("payment_installments")
      .select(INSTALLMENT_SELECT)
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to find installment: ${error.message}`);
    return new PaymentInstallment(data as PaymentInstallmentRow);
  }

  async update(id: string, input: NewPaymentInstallmentInput): Promise<PaymentInstallment> {
    const { data, error } = await this.supabase
      .from("payment_installments")
      .update(input)
      .eq("id", id)
      .select(INSTALLMENT_SELECT)
      .single();

    if (error) throw new Error(`Failed to update installment: ${error.message}`);
    return new PaymentInstallment(data as PaymentInstallmentRow);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("payment_installments").delete().eq("id", id);
    if (error) throw new Error(`Failed to delete installment: ${error.message}`);
  }

  async recordPayment(id: string, amountPaid: number): Promise<PaymentInstallment> {
    const { data: existing, error: findError } = await this.supabase
      .from("payment_installments")
      .select("amount, amount_paid, student_id")
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

    await new PaymentTransactionRepository(this.supabase).create({
      installment_id: id,
      student_id: existing.student_id,
      amount: amountPaid,
    });

    return new PaymentInstallment(data as PaymentInstallmentRow);
  }
}
