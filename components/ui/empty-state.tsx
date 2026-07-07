// Friendly empty state with an icon, message and optional call to action.
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-surface/50 px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-strong text-muted">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M3 7h18M3 12h18M3 17h12" />
        </svg>
      </span>
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
