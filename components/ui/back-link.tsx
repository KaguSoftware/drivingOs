import Link from "next/link";

export function BackLink({ href, label = "Back" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center gap-1 text-sm text-muted hover:text-foreground"
    >
      <span aria-hidden>←</span>
      {label}
    </Link>
  );
}
