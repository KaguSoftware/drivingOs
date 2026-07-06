"use client";

import { buttonClasses } from "./button";

export function DeleteButton({
  action,
  confirmMessage = "Bu silinsin mi? Bu işlem geri alınamaz.",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <button type="submit" className={buttonClasses("danger")}>
        Sil
      </button>
    </form>
  );
}
