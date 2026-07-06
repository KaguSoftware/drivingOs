"use client";

import { useState } from "react";
import { createExamPlace, updateExamPlace } from "./actions";
import { inputClass } from "@/components/ui/input-classes";
import { Button } from "@/components/ui/button";
import type { ExamPlace } from "./exam-place.model";

export function ExamPlaceForm({ examPlace }: { examPlace?: ExamPlace }) {
  const [address, setAddress] = useState(examPlace?.address ?? "");
  const action = examPlace ? updateExamPlace.bind(null, examPlace.id) : createExamPlace;

  return (
    <div className="flex max-w-2xl flex-col gap-4 md:flex-row">
      <form action={action} className="flex flex-1 flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Name
          <input name="name" required defaultValue={examPlace?.name} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Address
          <input
            name="address"
            required
            className={inputClass}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Notes
          <input name="notes" defaultValue={examPlace?.notes ?? undefined} className={inputClass} />
        </label>
        <Button type="submit">{examPlace ? "Save changes" : "Add exam place"}</Button>
      </form>

      {address.trim() && (
        <iframe
          title="Address preview"
          src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
          className="h-64 flex-1 rounded-lg border border-border"
          loading="lazy"
        />
      )}
    </div>
  );
}
