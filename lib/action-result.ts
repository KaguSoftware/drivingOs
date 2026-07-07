// Shared return shape for server actions used with useActionState.
// Success usually redirects (with ?basari=… picked up by QueryToast);
// actions only return a value for inline errors or copyable messages.

export type ActionResult =
  | { ok: true; message?: string }
  | { ok: false; error: string };

export function actionError(error: unknown): ActionResult {
  return {
    ok: false,
    error: error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu",
  };
}

// Appends a one-shot success message that QueryToast turns into a toast.
export function withToast(path: string, message: string): string {
  return `${path}?basari=${encodeURIComponent(message)}`;
}
