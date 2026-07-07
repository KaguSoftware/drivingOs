"use client";

import { buttonClasses } from "./button";
import { ConfirmDialog } from "./confirm-dialog";

export function DeleteButton({
  action,
  confirmMessage = "Bu silinsin mi?",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  return (
    <ConfirmDialog
      message={confirmMessage}
      action={action}
      trigger={(show) => (
        <button type="button" onClick={show} className={buttonClasses("danger")}>
          Sil
        </button>
      )}
    />
  );
}
