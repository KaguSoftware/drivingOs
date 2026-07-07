const pulse = "animate-pulse rounded-md bg-surface-strong";

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={`${pulse} h-7 w-40`} />
        <div className={`${pulse} h-9 w-32`} />
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        <div className={`${pulse} h-10 w-full rounded-none`} />
        <div className="divide-y divide-border">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3">
              <div className={`${pulse} h-4 w-1/4`} />
              <div className={`${pulse} h-4 w-1/6`} />
              <div className={`${pulse} h-4 w-1/6`} />
              <div className={`${pulse} h-4 w-1/5`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className={`${pulse} h-7 w-48`} />
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className={`${pulse} h-3.5 w-24`} />
          <div className={`${pulse} h-10 w-full`} />
        </div>
      ))}
      <div className={`${pulse} h-10 w-full`} />
    </div>
  );
}

export function CardsSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: cards }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-surface p-5">
          <div className={`${pulse} h-3.5 w-24`} />
          <div className={`${pulse} mt-3 h-8 w-16`} />
        </div>
      ))}
    </div>
  );
}
