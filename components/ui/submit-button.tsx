"use client";

import { useFormStatus } from "react-dom";
import { buttonClasses } from "./button";

export function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`animate-spin ${className}`}>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M18 10a8 8 0 0 0-8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Submit button that disables itself and shows a spinner while the parent
// form's server action is pending. Must live inside a <form>.
export function SubmitButton({
  children,
  variant = "primary",
  pendingText,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  pendingText?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={buttonClasses(variant, `gap-2 ${className}`)}
    >
      {pending && <Spinner />}
      {pending ? pendingText ?? "Kaydediliyor…" : children}
    </button>
  );
}
