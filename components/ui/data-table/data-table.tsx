"use client";

import { useDataTable } from "./use-data-table";
import { DataTablePagination } from "./data-table-pagination";
import type { DataTableProps, SortDir } from "./types";

function SortGlyph({ active, dir }: { active: boolean; dir?: SortDir }) {
  return (
    <span aria-hidden className={`text-xs ${active ? "text-foreground" : "text-faint"}`}>
      {active ? (dir === "asc" ? "↑" : "↓") : "↕"}
    </span>
  );
}

function NoMatch() {
  return <p className="px-4 py-10 text-center text-sm text-muted">Eşleşen kayıt bulunamadı.</p>;
}

export function DataTable<T>({
  rows,
  columns,
  getRowId,
  searchAccessor,
  searchPlaceholder = "Ara…",
  initialSort,
  pageSize = 25,
  renderCard,
  empty,
  toolbar,
  rowActions,
}: DataTableProps<T>) {
  const table = useDataTable(rows, columns, { searchAccessor, initialSort, pageSize });

  if (rows.length === 0) return <>{empty}</>;

  return (
    <div className="flex flex-col gap-4">
      {(searchAccessor || toolbar) && (
        <div className="flex flex-wrap items-center gap-3">
          {searchAccessor && (
            <input
              type="search"
              value={table.query}
              onChange={(event) => table.setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="w-full max-w-xs rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-faint focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
          )}
          {toolbar}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-xs">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-surface-strong text-muted">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.id}
                    aria-sort={
                      table.sort?.columnId === col.id
                        ? table.sort.dir === "asc"
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                    className={`px-4 py-3 font-medium ${col.align === "end" ? "text-right" : ""} ${col.headerClassName ?? ""}`}
                  >
                    {col.sortValue ? (
                      <button
                        type="button"
                        onClick={() => table.toggleSort(col.id)}
                        className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                      >
                        {col.header}
                        <SortGlyph active={table.sort?.columnId === col.id} dir={table.sort?.dir} />
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                ))}
                {rowActions && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {table.pageRows.map((row) => (
                <tr key={getRowId(row)} className="transition-colors hover:bg-surface-strong/60">
                  {columns.map((col) => (
                    <td
                      key={col.id}
                      className={`px-4 py-3 ${col.align === "end" ? "text-right tabular-nums" : ""} ${col.className ?? ""}`}
                    >
                      {col.cell(row)}
                    </td>
                  ))}
                  {rowActions && <td className="px-4 py-3 text-right">{rowActions(row)}</td>}
                </tr>
              ))}
            </tbody>
          </table>
          {table.filteredTotal === 0 && <NoMatch />}
        </div>

        <ul className="flex flex-col divide-y divide-border md:hidden">
          {table.pageRows.map((row) => (
            <li key={getRowId(row)} className="p-4">
              {renderCard(row)}
            </li>
          ))}
          {table.filteredTotal === 0 && (
            <li>
              <NoMatch />
            </li>
          )}
        </ul>

        <DataTablePagination
          page={table.page}
          pageCount={table.pageCount}
          filteredTotal={table.filteredTotal}
          pageSize={pageSize}
          onPage={table.setPage}
        />
      </div>
    </div>
  );
}
