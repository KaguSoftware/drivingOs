"use client";

import { useMemo, useState } from "react";
import type { ColumnDef, SortDir } from "./types";

type SortState = { columnId: string; dir: SortDir } | null;

export function useDataTable<T>(
  rows: T[],
  columns: ColumnDef<T>[],
  options: {
    searchAccessor?: (row: T) => string;
    initialSort?: { columnId: string; dir: SortDir };
    pageSize: number;
  },
) {
  const [query, setQueryState] = useState("");
  const [sort, setSort] = useState<SortState>(options.initialSort ?? null);
  const [page, setPage] = useState(0);

  const setQuery = (value: string) => {
    setQueryState(value);
    setPage(0);
  };

  const toggleSort = (columnId: string) => {
    setPage(0);
    setSort((prev) => {
      if (!prev || prev.columnId !== columnId) return { columnId, dir: "asc" };
      if (prev.dir === "asc") return { columnId, dir: "desc" };
      return null;
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    const accessor = options.searchAccessor;
    if (!q || !accessor) return rows;
    return rows.filter((row) => accessor(row).toLocaleLowerCase("tr").includes(q));
  }, [rows, query, options.searchAccessor]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const column = columns.find((c) => c.id === sort.columnId);
    if (!column?.sortValue) return filtered;
    const factor = sort.dir === "asc" ? 1 : -1;
    const value = column.sortValue;
    return [...filtered].sort((a, b) => {
      const av = value(a);
      const bv = value(b);
      if (av < bv) return -factor;
      if (av > bv) return factor;
      return 0;
    });
  }, [filtered, sort, columns]);

  const { pageSize } = options;
  const pageCount = pageSize > 0 ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const currentPage = Math.min(page, pageCount - 1);
  const pageRows =
    pageSize > 0
      ? sorted.slice(currentPage * pageSize, currentPage * pageSize + pageSize)
      : sorted;

  return {
    query,
    setQuery,
    sort,
    toggleSort,
    page: currentPage,
    setPage,
    pageCount,
    pageRows,
    filteredTotal: sorted.length,
  };
}
