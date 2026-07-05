"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StudentRepository } from "./student.repository";
import { LICENSE_CLASSES, type LicenseClass, type NewStudentInput } from "./types";

function parseStudentInput(formData: FormData): NewStudentInput {
  const licenseClass = formData.get("license_class") as string;
  if (!LICENSE_CLASSES.includes(licenseClass as LicenseClass)) {
    throw new Error(`Invalid license class: ${licenseClass}`);
  }

  const fullName = String(formData.get("full_name") ?? "").trim();
  if (/[0-9]/.test(fullName)) {
    throw new Error("Full name cannot contain numbers");
  }

  const phone = String(formData.get("phone") ?? "").trim();
  if (!/^\d{10}$/.test(phone)) {
    throw new Error("Phone must be exactly 10 digits");
  }

  const nationalId = String(formData.get("national_id") ?? "").trim();
  if (!/^\d{11}$/.test(nationalId)) {
    throw new Error("National ID must be exactly 11 digits");
  }

  return {
    full_name: fullName,
    phone: `+90${phone}`,
    national_id: nationalId,
    license_class: licenseClass as LicenseClass,
  };
}

export async function createStudent(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new StudentRepository(supabase);

  await repository.create(parseStudentInput(formData));

  revalidatePath("/admin/students");
  redirect("/admin/students");
}

export async function updateStudent(id: string, formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new StudentRepository(supabase);

  await repository.update(id, parseStudentInput(formData));

  revalidatePath("/admin/students");
  redirect("/admin/students");
}

export async function deleteStudent(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const repository = new StudentRepository(supabase);

  await repository.delete(id);

  revalidatePath("/admin/students");
}
