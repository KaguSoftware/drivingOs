"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { InstructorRepository } from "./instructor.repository";
import { LICENSE_CLASSES, type LicenseClass } from "../ogrenciler/types";
import type { NewInstructorInput } from "./types";

function parseInstructorInput(formData: FormData): NewInstructorInput {
  const licenseClasses = formData.getAll("license_classes") as string[];
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

  return {
    full_name: fullName,
    phone: `+90${phone}`,
    license_classes: licenseClasses as LicenseClass[],
  };
}

export async function createInstructor(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new InstructorRepository(supabase);

  await repository.create(parseInstructorInput(formData));

  revalidatePath("/admin/egitmenler");
  redirect("/admin/egitmenler");
}

export async function updateInstructor(id: string, formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new InstructorRepository(supabase);

  await repository.update(id, parseInstructorInput(formData));

  revalidatePath("/admin/egitmenler");
  redirect("/admin/egitmenler");
}

export async function deleteInstructor(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new InstructorRepository(supabase);

  await repository.delete(id);

  revalidatePath("/admin/egitmenler");
  redirect("/admin/egitmenler");
}
