"use client";

import Link from "next/link";
import { Button, buttonClasses } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-8 text-center shadow-sm">
        <p className="mb-2 text-sm font-medium text-danger">Hata</p>
        <h1 className="mb-2 text-xl font-semibold text-primary">Bir şeyler ters gitti</h1>
        <p className="mb-6 text-sm text-muted">
          Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="secondary" onClick={() => reset()}>
            Tekrar dene
          </Button>
          <Link href="/" className={buttonClasses("primary")}>
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    </main>
  );
}
