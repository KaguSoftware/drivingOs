"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createPortalAccount } from "@/lib/accounts";
import { actionError, withToast, type ActionResult } from "@/lib/action-result";
import { StudentRepository } from "./student.repository";
import { LICENSE_CLASSES, type LicenseClass, type NewStudentInput } from "./types";

function parseStudentInput(formData: FormData): NewStudentInput {
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

  const nationalId = String(formData.get("national_id") ?? "").trim();
  if (!/^\d{11}$/.test(nationalId)) {
    throw new Error("T.C. Kimlik No tam olarak 11 haneli olmalı");
  }

  const email = String(formData.get("email") ?? "").trim();

  return {
    full_name: fullName,
    phone: `+90${phone}`,
    national_id: nationalId,
    email: email || null,
    license_classes: licenseClasses as LicenseClass[],
  };
}

export async function createStudent(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  let tempPassword: string | null = null;
  try {
    const input = parseStudentInput(formData);
    const supabase = await createSupabaseServerClient();
    const student = await new StudentRepository(supabase).create(input);

    if (input.email) {
      tempPassword = await createPortalAccount({
        email: input.email,
        role: "student",
        linkId: student.id,
      });
    }
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/ogrenciler");
  if (tempPassword) {
    // Stay on the form so the admin can copy the one-time password.
    return {
      ok: true,
      message: `Öğrenci kaydedildi ve giriş hesabı açıldı. Geçici şifre: ${tempPassword}`,
    };
  }
  redirect(withToast("/admin/ogrenciler", "Öğrenci kaydedildi"));
}

export async function updateStudent(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const supabase = await createSupabaseServerClient();
    await new StudentRepository(supabase).update(id, parseStudentInput(formData));
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/ogrenciler");
  redirect(withToast("/admin/ogrenciler", "Değişiklikler kaydedildi"));
}

export async function deleteStudent(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await new StudentRepository(supabase).delete(id);

  revalidatePath("/admin/ogrenciler");
  redirect(withToast("/admin/ogrenciler", "Öğrenci silindi"));
}
