"use client";

export function DataTablePagination({
  page,
  pageCount,
  filteredTotal,
  pageSize,
  onPage,
}: {
  page: number;
  pageCount: number;
  filteredTotal: number;
  pageSize: number;
  onPage: (page: number) => void;
}) {
  if (pageCount <= 1) return null;

  const from = filteredTotal === 0 ? 0 : page * pageSize + 1;
  const to = Math.min(filteredTotal, (page + 1) * pageSize);

  return (
    <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm text-muted">
      <span className="tabular-nums">
        {from}–{to} / {filteredTotal}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPage(page - 1)}
          disabled={page === 0}
          aria-label="Önceki sayfa"
          className="rounded-md border border-border px-2.5 py-1 transition-colors hover:bg-surface-strong disabled:opacity-40 disabled:hover:bg-transparent"
        >
          ‹
        </button>
        <span className="px-2 tabular-nums">
          {page + 1} / {pageCount}
        </span>
        <button
          type="button"
          onClick={() => onPage(page + 1)}
          disabled={page >= pageCount - 1}
          aria-label="Sonraki sayfa"
          className="rounded-md border border-border px-2.5 py-1 transition-colors hover:bg-surface-strong disabled:opacity-40 disabled:hover:bg-transparent"
        >
          ›
        </button>
      </div>
    </div>
  );
}
