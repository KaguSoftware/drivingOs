import type { SupabaseClient } from "@supabase/supabase-js";
import { Expense } from "./expense.model";
import type { ExpenseRow, NewExpenseInput } from "./types";

export class ExpenseRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listAll(): Promise<Expense[]> {
    const { data, error } = await this.supabase
      .from("expenses")
      .select("*")
      .order("expense_date", { ascending: false });

    if (error) throw new Error(`Failed to list expenses: ${error.message}`);
    return (data as ExpenseRow[]).map((row) => new Expense(row));
  }

  async create(input: NewExpenseInput): Promise<Expense> {
    const { data, error } = await this.supabase.from("expenses").insert(input).select().single();

    if (error) throw new Error(`Failed to create expense: ${error.message}`);
    return new Expense(data as ExpenseRow);
  }
}
