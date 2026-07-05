"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { InstructorRepository } from "./instructor.repository";
import { LICENSE_CLASSES, type LicenseClass } from "../students/types";

export async function createInstructor(formData: FormData): Promise<void> {
  const licenseClasses = formData.getAll("license_classes") as string[];
  for (const licenseClass of licenseClasses) {
    if (!LICENSE_CLASSES.includes(licenseClass as LicenseClass)) {
      throw new Error(`Invalid license class: ${licenseClass}`);
    }
  }

  const supabase = await createSupabaseServerClient();
  const repository = new InstructorRepository(supabase);

  await repository.create({
    full_name: String(formData.get("full_name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    license_classes: licenseClasses as LicenseClass[],
  });

  revalidatePath("/tutors");
  redirect("/tutors");
}
