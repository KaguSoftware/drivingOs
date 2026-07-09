"use client";

import { useActionState } from "react";
import { createStudent, updateStudent } from "./actions";
import { FullNameInput } from "@/components/ui/full-name-input";
import { NationalIdInput } from "@/components/ui/national-id-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormFeedback } from "@/components/ui/form-feedback";
import { LicenseClassPicker } from "@/components/ui/license-class-picker";
import { LICENSE_CLASSES } from "./types";
import type { StudentFormValues } from "./types";

export function StudentForm({ student }: { student?: StudentFormValues }) {
  const [result, formAction] = useActionState(
    student ? updateStudent.bind(null, student.id) : createStudent,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Ad Soyad
          <FullNameInput defaultValue={student?.fullName} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Telefon
          <div className="flex items-center rounded-md border border-border bg-surface text-sm">
            <span className="px-3 py-2 text-muted">+90</span>
            <PhoneInput defaultValue={student?.phone.replace(/^\+90/, "")} />
          </div>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          T.C. Kimlik No
          <NationalIdInput defaultValue={student?.nationalId} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span>
            E-posta <span className="text-xs font-normal text-muted">(öğrenci girişi için, opsiyonel)</span>
          </span>
          <input
            name="email"
            type="email"
            defaultValue={student?.email ?? ""}
            className={inputClass}
            placeholder="ornek@eposta.com"
          />
        </label>
      </div>
      <LicenseClassPicker
        classes={LICENSE_CLASSES}
        selected={student?.licenseClasses ?? []}
      />
      <FormFeedback result={result} />
      <SubmitButton className="w-fit self-start px-3 py-1.5">
        {student ? "Değişiklikleri kaydet" : "Öğrenci kaydet"}
      </SubmitButton>
    </form>
  );
}
