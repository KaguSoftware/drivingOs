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
  "rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-center text-sm uppercase tracking-widest dark:border-zinc-700";

export function PlateInput({ defaultValue = "" }: { defaultValue?: string }) {
  const initial = parsePlate(defaultValue);
  const [province, setProvince] = useState(initial.province);
  const [letters, setLetters] = useState(initial.letters);
  const [numbers, setNumbers] = useState(initial.numbers);

  const lettersRef = useRef<HTMLInputElement>(null);
  const numbersRef = useRef<HTMLInputElement>(null);

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
          inputMode="numeric"
          placeholder="34"
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
          placeholder="ABC"
          aria-label="Letter group"
          className={`${partClass} w-20`}
        />
        <input
          ref={numbersRef}
          value={numbers}
          onChange={(e) => setNumbers(sanitizeNumbers(e.target.value))}
          inputMode="numeric"
          placeholder="1234"
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
