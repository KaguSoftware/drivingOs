"use client";

import { CarIllustration } from "./car-illustration";

export function DrivingCarOverlay({ driving }: { driving: boolean }) {
  if (!driving) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-10 hidden overflow-hidden lg:left-1/2 lg:block">
      <CarIllustration className="drive-across absolute bottom-[20%] mb-0.75 w-56" />
    </div>
  );
}
