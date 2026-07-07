"use client";

import { useEffect } from "react";
import type { ActionResult } from "@/lib/action-result";
import { useToast } from "./toast/toast-context";

// Renders an inline banner for a server action's result and mirrors it as a
// toast. Success messages stay visible (they can carry one-time passwords).
export function FormFeedback({ result }: { result: ActionResult | null }) {
  const { addToast } = useToast();

  useEffect(() => {
    if (!result) return;
    if (result.ok && result.message) addToast("success", result.message);
    if (!result.ok) addToast("error", result.error);
  }, [result, addToast]);

  if (!result) return null;

  if (!result.ok) {
    return (
      <p role="alert" className="rounded-lg border border-danger/30 bg-danger-soft px-3 py-2 text-sm text-danger">
        {result.error}
      </p>
    );
  }
  if (result.message) {
    return (
      <p className="select-all rounded-lg border border-success/30 bg-success-soft px-3 py-2 text-sm text-success">
        {result.message}
      </p>
    );
  }
  return null;
}
