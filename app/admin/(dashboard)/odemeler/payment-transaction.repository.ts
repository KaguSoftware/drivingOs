import type { SupabaseClient } from "@supabase/supabase-js";
import type { NewPaymentTransactionInput, PaymentTransactionRow } from "./types";

export class PaymentTransactionRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listAll(): Promise<PaymentTransactionRow[]> {
    const { data, error } = await this.supabase
      .from("payment_transactions")
      .select("*")
      .order("paid_at", { ascending: true });

    if (error) throw new Error(`Failed to list payment transactions: ${error.message}`);
    return data as PaymentTransactionRow[];
  }

  async create(input: NewPaymentTransactionInput): Promise<void> {
    const { error } = await this.supabase.from("payment_transactions").insert(input);
    if (error) throw new Error(`Failed to log payment transaction: ${error.message}`);
  }
}
