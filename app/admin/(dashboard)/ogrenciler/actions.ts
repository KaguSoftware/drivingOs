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

  return {
    full_name: fullName,
    phone: `+90${phone}`,
    national_id: nationalId,
    license_classes: licenseClasses as LicenseClass[],
  };
}

// Students log in by phone number only (see app/(public)/actions.ts) —
// Supabase Auth still needs an email internally to wire up the account, so
// we derive one from the phone number rather than asking the admin for it.
function internalEmailForPhone(phone: string): string {
  return `${phone.replace(/^\+90/, "")}@ogrenci.internal`;
}

export async function createStudent(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  let tempPassword: string;
  try {
    const input = parseStudentInput(formData);
    const email = internalEmailForPhone(input.phone);
    const supabase = await createSupabaseServerClient();
    const student = await new StudentRepository(supabase).create({ ...input, email });
    tempPassword = await createPortalAccount({ email, role: "student", linkId: student.id });
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/ogrenciler");
  // Stay on the form so the admin can copy the one-time password.
  return {
    ok: true,
    message: `Öğrenci kaydedildi ve giriş hesabı açıldı. Geçici şifre: ${tempPassword}`,
  };
}

export async function updateStudent(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  let tempPassword: string | null = null;
  try {
    const input = parseStudentInput(formData);
    const supabase = await createSupabaseServerClient();
    const repo = new StudentRepository(supabase);
    await repo.update(id, input);

    // Students created before this account-provisioning flow existed may
    // have no portal login yet — backfill one on save.
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("student_id", id)
      .maybeSingle();
    if (!existingProfile) {
      const email = internalEmailForPhone(input.phone);
      await repo.setEmail(id, email);
      tempPassword = await createPortalAccount({ email, role: "student", linkId: id });
    }
  } catch (error) {
    return actionError(error);
  }

  revalidatePath("/admin/ogrenciler");
  if (tempPassword) {
    return {
      ok: true,
      message: `Değişiklikler kaydedildi ve giriş hesabı açıldı. Geçici şifre: ${tempPassword}`,
    };
  }
  redirect(withToast("/admin/ogrenciler", "Değişiklikler kaydedildi"));
}

export async function deleteStudent(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await new StudentRepository(supabase).delete(id);

  revalidatePath("/admin/ogrenciler");
  redirect(withToast("/admin/ogrenciler", "Öğrenci silindi"));
}
