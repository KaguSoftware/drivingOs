"use client";

import { useState } from "react";
import { createExamPlace, updateExamPlace } from "./actions";
import { inputClass } from "@/components/ui/input-classes";
import { Button } from "@/components/ui/button";

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
  const action = id ? updateExamPlace.bind(null, id) : createExamPlace;

  return (
    <div className="flex max-w-2xl flex-col gap-4 md:flex-row">
      <form action={action} className="flex flex-1 flex-col gap-4">
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
        <Button type="submit">{id ? "Değişiklikleri kaydet" : "Sınav yeri ekle"}</Button>
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
