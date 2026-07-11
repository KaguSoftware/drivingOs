"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { actionError, withToast, type ActionResult } from "@/lib/action-result";
import { ExpenseRepository } from "./expense.repository";

export async function createExpense(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const name = String(formData.get("name") ?? "").trim();
  const cost = Number(formData.get("cost") ?? 0);
  const expenseDate = String(formData.get("expense_date") ?? "");

  if (!name) return actionError(new Error("Gider adı gerekli"));
  if (!(cost > 0)) return actionError(new Error("Tutar 0'dan büyük olmalı"));
  if (!expenseDate) return actionError(new Error("Tarih gerekli"));

  try {
    const supabase = await createSupabaseServerClient();
    await new ExpenseRepository(supabase).create({ name, cost, expense_date: expenseDate });
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/odemeler");
  redirect(withToast("/admin/odemeler", "Gider eklendi"));
}
