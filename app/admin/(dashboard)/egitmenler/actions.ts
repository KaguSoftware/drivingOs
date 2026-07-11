"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createPortalAccount } from "@/lib/accounts";
import { actionError, withToast, type ActionResult } from "@/lib/action-result";
import { InstructorRepository } from "./instructor.repository";
import { LICENSE_CLASSES, type LicenseClass } from "../ogrenciler/types";
import type { NewInstructorInput } from "./types";

function parseInstructorInput(formData: FormData): NewInstructorInput {
  const licenseClasses = formData.getAll("license_classes").map(String);
  if (licenseClasses.length === 0) {
    throw new Error("En az bir ehliyet sınıfı seçin");
  }
  for (const licenseClass of licenseClasses) {
    if (!LICENSE_CLASSES.includes(licenseClass as LicenseClass)) {
      throw new Error(`Geçersiz ehliyet sınıfı: ${licenseClass}`);
    }
  }

  const fullName = String(formData.get("full_name") ?? "").trim();
  if (/[0-9]/.test(fullName)) {
    throw new Error("Ad Soyad rakam içeremez");
  }

  const phone = String(formData.get("phone") ?? "").trim();
  if (!/^\d{10}$/.test(phone)) {
    throw new Error("Telefon tam olarak 10 haneli olmalı");
  }

  const email = String(formData.get("email") ?? "").trim();
  const vehicleId = String(formData.get("assigned_vehicle_id") ?? "").trim();

  const monthlyWage = Number(formData.get("monthly_wage") ?? 0);
  if (monthlyWage < 0) {
    throw new Error("Aylık ücret negatif olamaz");
  }

  return {
    full_name: fullName,
    phone: `+90${phone}`,
    email: email || null,
    license_classes: licenseClasses as LicenseClass[],
    assigned_vehicle_id: vehicleId || null,
    monthly_wage: monthlyWage,
  };
}

export async function createInstructor(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  let tempPassword: string | null = null;
  try {
    const input = parseInstructorInput(formData);
    const supabase = await createSupabaseServerClient();
    const instructor = await new InstructorRepository(supabase).create(input);

    if (input.email) {
      tempPassword = await createPortalAccount({
        email: input.email,
        role: "teacher",
        linkId: instructor.id,
      });
    }
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/egitmenler");
  if (tempPassword) {
    return {
      ok: true,
      message: `Eğitmen kaydedildi ve giriş hesabı açıldı. Geçici şifre: ${tempPassword}`,
    };
  }
  redirect(withToast("/admin/egitmenler", "Eğitmen kaydedildi"));
}

export async function updateInstructor(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const supabase = await createSupabaseServerClient();
    await new InstructorRepository(supabase).update(id, parseInstructorInput(formData));
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/egitmenler");
  redirect(withToast("/admin/egitmenler", "Değişiklikler kaydedildi"));
}

export async function deleteInstructor(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await new InstructorRepository(supabase).delete(id);

  revalidatePath("/admin/egitmenler");
  redirect(withToast("/admin/egitmenler", "Eğitmen silindi"));
}
