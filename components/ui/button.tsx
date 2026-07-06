import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger";

const filledBase =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses: Record<Variant, string> = {
  primary: `${filledBase} bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover`,
  secondary: `${filledBase} border border-border bg-transparent text-foreground hover:bg-surface`,
  danger: "text-sm font-medium text-danger transition-colors hover:text-danger-hover hover:underline disabled:cursor-not-allowed disabled:opacity-50",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${variantClasses[variant]} ${className}`.trim();
}

export const primaryLinkClass = buttonClasses("primary");

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={buttonClasses(variant, className)} {...props} />;
}
