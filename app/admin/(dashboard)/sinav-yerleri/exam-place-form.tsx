"use client";

import { useActionState, useState } from "react";
import { createExamPlace, updateExamPlace } from "./actions";
import { inputClass } from "@/components/ui/input-classes";
import { SubmitButton } from "@/components/ui/submit-button";
import { FormFeedback } from "@/components/ui/form-feedback";

export function ExamPlaceForm({
  id,
  name,
  address: initialAddress,
  notes,
  youtubeUrl,
}: {
  id?: string;
  name?: string;
  address?: string;
  notes?: string | null;
  youtubeUrl?: string | null;
}) {
  const [address, setAddress] = useState(initialAddress ?? "");
  const [result, formAction] = useActionState(
    id ? updateExamPlace.bind(null, id) : createExamPlace,
    null
  );

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <form action={formAction} className="flex flex-1 flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          İsim
          <input name="name" required defaultValue={name} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Adres
          <input
            name="address"
            required
            className={inputClass}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Notlar
          <input name="notes" defaultValue={notes ?? undefined} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          YouTube video URL&apos;si
          <input
            name="youtube_url"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            defaultValue={youtubeUrl ?? undefined}
            className={inputClass}
          />
        </label>
        <FormFeedback result={result} />
        <SubmitButton>{id ? "Değişiklikleri kaydet" : "Sınav yeri ekle"}</SubmitButton>
      </form>

      {address.trim() && (
        <iframe
          title="Adres önizleme"
          src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
          className="h-64 flex-1 rounded-lg border border-border"
          loading="lazy"
        />
      )}
    </div>
  );
}
