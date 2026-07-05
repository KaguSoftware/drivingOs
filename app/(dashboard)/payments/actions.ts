"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PaymentInstallmentRepository } from "./payment-installment.repository";

export async function createInstallment(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new PaymentInstallmentRepository(supabase);

  await repository.create({
    student_id: String(formData.get("student_id") ?? ""),
    amount: Number(formData.get("amount") ?? 0),
    due_date: String(formData.get("due_date") ?? ""),
  });

  revalidatePath("/payments");
  redirect("/payments");
}

export async function recordPayment(formData: FormData): Promise<void> {
  const id = String(formData.get("installment_id") ?? "");
  const amountPaid = Number(formData.get("amount_paid") ?? 0);

  const supabase = await createSupabaseServerClient();
  const repository = new PaymentInstallmentRepository(supabase);

  await repository.recordPayment(id, amountPaid);

  revalidatePath("/payments");
}
