"use client";

import { useEffect, useRef, useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { ExpenseForm } from "./expense-form";

export function ExpenseDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={buttonClasses("primary")}>
        Gider ekle
      </button>
      {open && (
        <dialog
          ref={dialogRef}
          onClose={() => setOpen(false)}
          className="m-auto w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-xl backdrop:bg-foreground/40"
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">Gider ekle</h2>
          <ExpenseForm />
        </dialog>
      )}
    </>
  );
}
