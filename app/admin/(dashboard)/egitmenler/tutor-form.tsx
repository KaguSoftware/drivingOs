"use client";

import { useActionState } from "react";
import { createInstructor, updateInstructor } from "./actions";
import { FullNameInput } from "@/components/ui/full-name-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormFeedback } from "@/components/ui/form-feedback";
import { LicenseClassPicker } from "@/components/ui/license-class-picker";
import { LICENSE_CLASSES } from "../ogrenciler/types";
import type { InstructorFormValues } from "./types";

export interface VehicleOption {
  id: string;
  label: string;
}

export function TutorForm({
  instructor,
  vehicles,
}: {
  instructor?: InstructorFormValues;
  vehicles: VehicleOption[];
}) {
  const [result, formAction] = useActionState(
    instructor ? updateInstructor.bind(null, instructor.id) : createInstructor,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Ad Soyad
          <FullNameInput defaultValue={instructor?.fullName} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Telefon
          <div className="flex items-center rounded-md border border-border bg-surface text-sm">
            <span className="px-3 py-2 text-muted">+90</span>
            <PhoneInput defaultValue={instructor?.phone.replace(/^\+90/, "")} />
          </div>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Kullandığı araç
          <select
            name="assigned_vehicle_id"
            defaultValue={instructor?.assignedVehicleId ?? ""}
            className={inputClass}
          >
            <option value="">Araç atanmadı</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm">
        E-posta <span className="text-xs text-muted">(eğitmen girişi için, opsiyonel)</span>
        <input
          name="email"
          type="email"
          defaultValue={instructor?.email ?? ""}
          className={inputClass}
          placeholder="ornek@eposta.com"
        />
      </label>
      <LicenseClassPicker
        classes={LICENSE_CLASSES}
        selected={instructor?.licenseClasses ?? []}
      />
      <FormFeedback result={result} />
      <SubmitButton>
        {instructor ? "Değişiklikleri kaydet" : "Eğitmen kaydet"}
      </SubmitButton>
    </form>
  );
}
