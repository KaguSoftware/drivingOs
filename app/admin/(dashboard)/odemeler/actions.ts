"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { actionError, withToast, type ActionResult } from "@/lib/action-result";
import { PaymentInstallmentRepository } from "./payment-installment.repository";
import type { NewPaymentInstallmentInput } from "./types";

function splitIntoMonths(
  studentId: string,
  amountPerInstallment: number,
  months: number,
  firstDueDate: string
): NewPaymentInstallmentInput[] {
  const rows: NewPaymentInstallmentInput[] = [];

  for (let i = 0; i < months; i++) {
    const dueDate = new Date(firstDueDate);
    dueDate.setMonth(dueDate.getMonth() + i);

    rows.push({
      student_id: studentId,
      amount: amountPerInstallment,
      due_date: dueDate.toISOString().slice(0, 10),
    });
  }

  return rows;
}

function splitIntoCustomDates(
  studentId: string,
  amountPerInstallment: number,
  months: number,
  formData: FormData
): NewPaymentInstallmentInput[] {
  const rows: NewPaymentInstallmentInput[] = [];

  for (let i = 0; i < months; i++) {
    rows.push({
      student_id: studentId,
      amount: amountPerInstallment,
      due_date: String(formData.get(`due_date_${i}`) ?? ""),
    });
  }

  return rows;
}

export async function createInstallment(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const studentId = String(formData.get("student_id") ?? "");
  const amount = Number(formData.get("amount") ?? 0);
  const dueDate = String(formData.get("due_date") ?? "");
  const months = Math.max(1, Number(formData.get("months") ?? 1));
  const useCustomDates = formData.get("custom_dates") === "true";

  try {
    const supabase = await createSupabaseServerClient();
    const repository = new PaymentInstallmentRepository(supabase);

    if (useCustomDates) {
      await repository.createMany(splitIntoCustomDates(studentId, amount, months, formData));
    } else if (months <= 1) {
      await repository.create({ student_id: studentId, amount, due_date: dueDate });
    } else {
      await repository.createMany(splitIntoMonths(studentId, amount, months, dueDate));
    }
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/odemeler");
  redirect(withToast("/admin/odemeler", "Taksit eklendi"));
}

export async function updateInstallment(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const studentId = String(formData.get("student_id") ?? "");
  const amount = Number(formData.get("amount") ?? 0);
  const dueDate = String(formData.get("due_date") ?? "");

  try {
    const supabase = await createSupabaseServerClient();
    await new PaymentInstallmentRepository(supabase).update(id, {
      student_id: studentId,
      amount,
      due_date: dueDate,
    });
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/odemeler");
  revalidatePath(`/admin/odemeler/${studentId}`);
  redirect(withToast(`/admin/odemeler/${studentId}`, "Değişiklikler kaydedildi"));
}

export async function deleteInstallment(id: string, studentId: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new PaymentInstallmentRepository(supabase);

  await repository.delete(id);

  revalidatePath("/admin/odemeler");
  revalidatePath(`/admin/odemeler/${studentId}`);
  redirect(`/admin/odemeler/${studentId}`);
}

export async function recordPayment(formData: FormData): Promise<void> {
  const id = String(formData.get("installment_id") ?? "");
  const amountPaid = Number(formData.get("amount_paid") ?? 0);

  const supabase = await createSupabaseServerClient();
  const repository = new PaymentInstallmentRepository(supabase);

  await repository.recordPayment(id, amountPaid);

  revalidatePath("/admin/odemeler");
}
