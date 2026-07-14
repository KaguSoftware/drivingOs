export function BrandMark({ name = "Driving School OS" }: { name?: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-[20px] w-[20px]">
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="2.4" />
          <path d="M12 9.6V4.2M9.9 13.2 5.1 16M14.1 13.2 18.9 16" />
        </svg>
      </span>
      <span className="truncate text-base font-semibold tracking-tight text-sidebar-foreground">
        {name}
      </span>
    </span>
  );
}
