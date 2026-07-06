"use client";

import { buttonClasses } from "./button";

export function DeleteButton({
  action,
  confirmMessage = "Delete this? This cannot be undone.",
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
        Delete
      </button>
    </form>
  );
}
