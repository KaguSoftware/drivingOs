"use client";

import { useRef, useState } from "react";
import {
  formatPlate,
  parsePlate,
  sanitizeLetters,
  sanitizeNumbers,
  sanitizeProvince,
} from "./plate";

const partClass =
  "rounded-md border border-border bg-surface px-3 py-2 text-center text-sm uppercase tracking-widest";

export function PlateInput({ defaultValue = "" }: { defaultValue?: string }) {
  const initial = parsePlate(defaultValue);
  const [province, setProvince] = useState(initial.province);
  const [letters, setLetters] = useState(initial.letters);
  const [numbers, setNumbers] = useState(initial.numbers);

  const lettersRef = useRef<HTMLInputElement>(null);
  const numbersRef = useRef<HTMLInputElement>(null);

  const [focused, setFocused] = useState<string | null>(null);
  const placeholder = (field: string, text: string) =>
    focused === field ? "" : text;

  return (
    <div className="flex flex-col gap-1 text-sm">
      <span>Plate</span>
      <div className="flex items-center gap-2">
        <input
          value={province}
          onChange={(e) => {
            const next = sanitizeProvince(e.target.value);
            setProvince(next);
            if (next.length === 2) lettersRef.current?.focus();
          }}
          onFocus={() => setFocused("province")}
          onBlur={() => setFocused(null)}
          inputMode="numeric"
          placeholder={placeholder("province", "34")}
          aria-label="Province code"
          className={`${partClass} w-14`}
        />
        <input
          ref={lettersRef}
          value={letters}
          onChange={(e) => {
            const next = sanitizeLetters(e.target.value);
            setLetters(next);
            if (next.length === 3) numbersRef.current?.focus();
          }}
          onFocus={() => setFocused("letters")}
          onBlur={() => setFocused(null)}
          placeholder={placeholder("letters", "ABC")}
          aria-label="Letter group"
          className={`${partClass} w-20`}
        />
        <input
          ref={numbersRef}
          value={numbers}
          onChange={(e) => setNumbers(sanitizeNumbers(e.target.value))}
          onFocus={() => setFocused("numbers")}
          onBlur={() => setFocused(null)}
          inputMode="numeric"
          placeholder={placeholder("numbers", "1234")}
          aria-label="Number group"
          className={`${partClass} w-24`}
        />
      </div>
      <input
        type="hidden"
        name="plate"
        value={formatPlate({ province, letters, numbers })}
      />
    </div>
  );
}
