"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import { MebBadge } from "./meb-badge";
import { NationalIdLookupForm } from "./national-id-lookup-form";
import { ExamLookupResult, type LookupState } from "./exam-lookup-result";
import { LookupShowcase } from "./lookup-showcase";
import { isValidNationalId } from "./validation";

const DRIVE_DURATION_MS = 700;

export function LookupSplitScreen({
  defaultValue,
  state,
}: {
  defaultValue?: string;
  state: LookupState;
}) {
  const router = useRouter();
  const [driving, setDriving] = useState(false);

  function handleSubmit(value: string) {
    if (!isValidNationalId(value) || driving) {
      router.push(`/?national_id=${value}`);
      return;
    }
    setDriving(true);
    setTimeout(() => {
      router.push(`/?national_id=${value}`);
    }, DRIVE_DURATION_MS);
  }

  return (
    <main className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center gap-8 bg-background p-4 sm:p-8 lg:w-1/2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-8">
          <div className="flex items-center justify-between">
            <Logo />
            <MebBadge />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted">Hoş geldiniz</p>
            <h1 className="text-2xl font-semibold">Sınav Yerinizi Öğrenin</h1>
            <p className="text-sm text-muted">
              TC kimlik numaranızı girerek yaklaşan sınav tarihinizi ve yerinizi güvenli
              bir şekilde görüntüleyebilirsiniz.
            </p>
          </div>
          <NationalIdLookupForm defaultValue={defaultValue} onSubmitValue={handleSubmit} />
          <ExamLookupResult state={state} />
        </div>
      </div>
      <LookupShowcase driving={driving} />
    </main>
  );
}
