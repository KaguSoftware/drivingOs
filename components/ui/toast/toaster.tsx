"use client";

import { useToast, type ToastKind } from "./toast-context";

const KIND_CLASSES: Record<ToastKind, string> = {
  success: "border-success/30 bg-success-soft text-success",
  error: "border-danger/30 bg-danger-soft text-danger",
  info: "border-info/30 bg-info-soft text-info",
};

const KIND_ICONS: Record<ToastKind, string> = {
  success: "M5 10.5l3.5 3.5L15 7",
  error: "M6 6l8 8M14 6l-8 8",
  info: "M10 6.5h.01M10 9.5V14",
};

export function Toaster() {
  const { toasts, dismissToast } = useToast();
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur ${KIND_CLASSES[toast.kind]}`}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="mt-0.5 h-4 w-4 shrink-0">
            <path d={KIND_ICONS[toast.kind]} />
          </svg>
          <p className="flex-1 break-words">{toast.message}</p>
          <button
            type="button"
            aria-label="Kapat"
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 rounded p-0.5 opacity-60 hover:opacity-100"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5">
              <path d="M6 6l8 8M14 6l-8 8" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
