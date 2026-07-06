"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export function ExamPlaceNotesHover({
  href,
  name,
  notes,
}: {
  href: string;
  name: string;
  notes: string | null;
}) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  function showTooltip() {
    const rect = anchorRef.current?.getBoundingClientRect();
    if (rect) setPosition({ top: rect.bottom + 4, left: rect.left });
  }

  return (
    <>
      <Link
        ref={anchorRef}
        href={href}
        className="hover:underline"
        onMouseEnter={notes ? showTooltip : undefined}
        onMouseLeave={notes ? () => setPosition(null) : undefined}
      >
        {name}
      </Link>

      {notes && position && (
        <div
          className="pointer-events-none fixed z-50 max-w-xs rounded-md border border-border bg-surface px-3 py-2 text-xs font-normal text-foreground shadow-md"
          style={{ top: position.top, left: position.left }}
        >
          {notes}
        </div>
      )}
    </>
  );
}
