"use client";

import { useState } from "react";
import { Logo } from "./logo";
import { MebBadge } from "./meb-badge";
import { LookupShowcase } from "./lookup-showcase";
import { LookupFormWithAnimation } from "./lookup-form-with-animation";
import { DrivingCarOverlay } from "./driving-car-overlay";
import { ExamLookupResult, type LookupState } from "./exam-lookup-result";

export function LookupPageClient({
  defaultValue,
  state,
}: {
  defaultValue?: string;
  state: LookupState;
}) {
  const [driving, setDriving] = useState(false);

  return (
    <main className="flex min-h-screen">
      <div className="relative z-20 flex w-full flex-col justify-center gap-8 bg-background p-8 lg:w-1/2">
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
          <LookupFormWithAnimation defaultValue={defaultValue} onDrivingChange={setDriving} />
          <ExamLookupResult state={state} />
        </div>
      </div>
      <LookupShowcase carHidden={driving} />
      <DrivingCarOverlay driving={driving} />
    </main>
  );
}
