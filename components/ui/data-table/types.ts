import type { ReactNode } from "react";

export type SortDir = "asc" | "desc";

export type ColumnDef<T> = {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  /** Present => the column is sortable; returns the comparable value. */
  sortValue?: (row: T) => string | number;
  align?: "start" | "end";
  className?: string;
  headerClassName?: string;
};

export type DataTableProps<T> = {
  rows: T[];
  columns: ColumnDef<T>[];
  getRowId: (row: T) => string;
  /** Present => renders a search box; matched against this string. */
  searchAccessor?: (row: T) => string;
  searchPlaceholder?: string;
  initialSort?: { columnId: string; dir: SortDir };
  /** 0 disables pagination. */
  pageSize?: number;
  renderCard: (row: T) => ReactNode;
  empty: ReactNode;
  toolbar?: ReactNode;
  rowActions?: (row: T) => ReactNode;
};
