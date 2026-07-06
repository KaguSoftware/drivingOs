import Link from "next/link";
import { primaryLinkClass } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-8 text-center shadow-sm">
        <p className="mb-2 text-sm font-medium text-muted">404</p>
        <h1 className="mb-2 text-xl font-semibold text-primary">Sayfa bulunamadı</h1>
        <p className="mb-6 text-sm text-muted">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
        </p>
        <Link href="/" className={primaryLinkClass}>
          Ana sayfaya dön
        </Link>
      </div>
    </main>
  );
}
