"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StudentRepository } from "./student.repository";
import { LICENSE_CLASSES, type LicenseClass } from "./types";

export async function createStudent(formData: FormData): Promise<void> {
  const licenseClass = formData.get("license_class") as string;
  if (!LICENSE_CLASSES.includes(licenseClass as LicenseClass)) {
    throw new Error(`Invalid license class: ${licenseClass}`);
  }

  const supabase = await createSupabaseServerClient();
  const repository = new StudentRepository(supabase);

  await repository.create({
    full_name: String(formData.get("full_name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    national_id: String(formData.get("national_id") ?? "").trim(),
    license_class: licenseClass as LicenseClass,
  });

  revalidatePath("/students");
  redirect("/students");
}
