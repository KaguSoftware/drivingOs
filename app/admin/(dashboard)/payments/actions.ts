"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PaymentInstallmentRepository } from "./payment-installment.repository";
import type { NewPaymentInstallmentInput } from "./types";

function splitIntoMonths(
  studentId: string,
  totalAmount: number,
  months: number,
  firstDueDate: string
): NewPaymentInstallmentInput[] {
  const perInstallment = Math.round((totalAmount / months) * 100) / 100;
  const rows: NewPaymentInstallmentInput[] = [];

  for (let i = 0; i < months; i++) {
    const dueDate = new Date(firstDueDate);
    dueDate.setMonth(dueDate.getMonth() + i);

    const isLast = i === months - 1;
    const amountSoFar = perInstallment * (months - 1);
    const amount = isLast ? Math.round((totalAmount - amountSoFar) * 100) / 100 : perInstallment;

    rows.push({
      student_id: studentId,
      amount,
      due_date: dueDate.toISOString().slice(0, 10),
    });
  }

  return rows;
}

export async function createInstallment(formData: FormData): Promise<void> {
  const studentId = String(formData.get("student_id") ?? "");
  const amount = Number(formData.get("amount") ?? 0);
  const dueDate = String(formData.get("due_date") ?? "");
  const months = Math.max(1, Number(formData.get("months") ?? 1));

  const supabase = await createSupabaseServerClient();
  const repository = new PaymentInstallmentRepository(supabase);

  if (months <= 1) {
    await repository.create({ student_id: studentId, amount, due_date: dueDate });
  } else {
    await repository.createMany(splitIntoMonths(studentId, amount, months, dueDate));
  }

  revalidatePath("/admin/payments");
  redirect("/admin/payments");
}

export async function updateInstallment(id: string, formData: FormData): Promise<void> {
  const studentId = String(formData.get("student_id") ?? "");
  const amount = Number(formData.get("amount") ?? 0);
  const dueDate = String(formData.get("due_date") ?? "");

  const supabase = await createSupabaseServerClient();
  const repository = new PaymentInstallmentRepository(supabase);

  await repository.update(id, { student_id: studentId, amount, due_date: dueDate });

  revalidatePath("/admin/payments");
  revalidatePath(`/admin/payments/${studentId}`);
  redirect(`/admin/payments/${studentId}`);
}

export async function deleteInstallment(id: string, studentId: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new PaymentInstallmentRepository(supabase);

  await repository.delete(id);

  revalidatePath("/admin/payments");
  revalidatePath(`/admin/payments/${studentId}`);
}

export async function recordPayment(formData: FormData): Promise<void> {
  const id = String(formData.get("installment_id") ?? "");
  const amountPaid = Number(formData.get("amount_paid") ?? 0);

  const supabase = await createSupabaseServerClient();
  const repository = new PaymentInstallmentRepository(supabase);

  await repository.recordPayment(id, amountPaid);

  revalidatePath("/admin/payments");
}
