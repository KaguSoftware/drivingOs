"use client";

import { buttonClasses } from "./button";
import { ConfirmDialog } from "./confirm-dialog";

export function DeleteButton({
  action,
  confirmMessage = "Bu silinsin mi?",
  className,
  title,
  children = "Sil",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
  className?: string;
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <ConfirmDialog
      message={confirmMessage}
      action={action}
      trigger={(show) => (
        <button type="button" onClick={show} title={title} className={className ?? buttonClasses("danger")}>
          {children}
        </button>
      )}
    />
  );
}
