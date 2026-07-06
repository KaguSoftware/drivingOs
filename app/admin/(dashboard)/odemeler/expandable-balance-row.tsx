"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export function ExpandableBalanceRow({
  trigger,
  children,
}: {
  trigger: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="cursor-pointer hover:bg-surface/60"
      >
        {trigger}
        <td className="px-4 py-3 text-right text-muted">{open ? "▲" : "▼"}</td>
      </tr>
      {open && (
        <tr>
          <td colSpan={3} className="bg-surface/40 p-3">
            {children}
          </td>
        </tr>
      )}
    </>
  );
}
