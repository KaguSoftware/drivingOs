"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { buttonClasses } from "./button";
import { Spinner } from "./submit-button";

// Replacement for window.confirm: opens a native <dialog>, runs the action
// with a pending spinner on confirm.
export function ConfirmDialog({
  message,
  confirmLabel = "Sil",
  action,
  trigger,
}: {
  message: string;
  confirmLabel?: string;
  action: () => Promise<void>;
  trigger: (open: () => void) => React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function confirm() {
    startTransition(async () => {
      await action();
      setOpen(false);
    });
  }

  return (
    <>
      {trigger(() => setOpen(true))}
      {open && (
        <dialog
          ref={dialogRef}
          onClose={() => setOpen(false)}
          className="m-auto w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-xl backdrop:bg-foreground/40"
        >
          <p className="text-sm text-foreground">{message}</p>
          <p className="mt-1 text-xs text-muted">Bu işlem geri alınamaz.</p>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className={buttonClasses("secondary")}
            >
              Vazgeç
            </button>
            <button
              type="button"
              onClick={confirm}
              disabled={isPending}
              className={buttonClasses("primary", "gap-2 !bg-danger hover:!bg-danger-hover")}
            >
              {isPending && <Spinner />}
              {confirmLabel}
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
