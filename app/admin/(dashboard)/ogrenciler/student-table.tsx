"use client";

import Link from "next/link";
import { DataTable } from "@/components/ui/data-table/data-table";
import type { ColumnDef } from "@/components/ui/data-table/types";
import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { deleteStudent } from "./actions";
import type { StudentRowView } from "./student-view";

const columns: ColumnDef<StudentRowView>[] = [
  {
    id: "fullName",
    header: "Ad Soyad",
    sortValue: (s) => s.fullName.toLocaleLowerCase("tr"),
    cell: (s) => (
      <div className="flex items-center gap-2">
        <Link href={`/admin/ogrenciler/${s.id}`} className="font-medium hover:underline">
          {s.fullName}
        </Link>
        {s.isDebtor && <Badge tone="danger">Borçlu</Badge>}
      </div>
    ),
  },
  { id: "phone", header: "Telefon", sortValue: (s) => s.phone, cell: (s) => s.phone },
  { id: "license", header: "Sınıf", cell: (s) => s.licenseLabel },
  { id: "theory", header: "Teori", sortValue: (s) => s.theoryLabel, cell: (s) => s.theoryLabel },
  { id: "practice", header: "Direksiyon", sortValue: (s) => s.practiceLabel, cell: (s) => s.practiceLabel },
  { id: "meb", header: "MEB", sortValue: (s) => s.mebLabel, cell: (s) => s.mebLabel },
  {
    id: "pdf",
    header: "MEB PDF",
    cell: (s) => (
      <a href={`/api/students/${s.id}/meb-pdf`} className="text-primary hover:underline">
        PDF indir
      </a>
    ),
  },
];

function rowActions(s: StudentRowView) {
  return (
    <RowActionsMenu
      editHref={`/admin/ogrenciler/${s.id}/duzenle`}
      deleteAction={deleteStudent.bind(null, s.id)}
      deleteConfirmMessage="Bu öğrenci silinsin mi?"
    />
  );
}

function renderCard(s: StudentRowView) {
  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Link href={`/admin/ogrenciler/${s.id}`} className="font-medium hover:underline">
              {s.fullName}
            </Link>
            {s.isDebtor && <Badge tone="danger">Borçlu</Badge>}
          </div>
          <p className="text-xs text-muted">{s.phone}</p>
        </div>
        {rowActions(s)}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {s.licenseClasses.map((cls) => (
          <Badge key={cls} tone="info">
            {cls}
          </Badge>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted">
        <span>Teori: {s.theoryLabel}</span>
        <span>Direksiyon: {s.practiceLabel}</span>
        <span>MEB: {s.mebLabel}</span>
      </div>
      <a
        href={`/api/students/${s.id}/meb-pdf`}
        className="mt-3 inline-block text-xs font-medium text-primary hover:underline"
      >
        MEB PDF indir
      </a>
    </div>
  );
}

export function StudentTable({ rows }: { rows: StudentRowView[] }) {
  return (
    <DataTable
      rows={rows}
      columns={columns}
      getRowId={(s) => s.id}
      searchAccessor={(s) => `${s.fullName} ${s.phone} ${s.licenseLabel}`}
      searchPlaceholder="Öğrenci ara (ad, telefon)…"
      initialSort={{ columnId: "fullName", dir: "asc" }}
      renderCard={renderCard}
      rowActions={rowActions}
      empty={<EmptyState title="Henüz öğrenci yok" description="İlk öğrencinizi ekleyerek başlayın." />}
    />
  );
}
