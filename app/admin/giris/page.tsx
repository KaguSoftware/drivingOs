import { adminLogin } from "./actions";
import { inputClass } from "@/components/ui/input-classes";
import { Button } from "@/components/ui/button";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-8 shadow-sm">
        <h1 className="mb-1 text-xl font-semibold text-primary">Driving School OS</h1>
        <p className="mb-6 text-sm text-muted">Yönetici girişi.</p>
        <form action={adminLogin} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm">
            E-posta
            <input
              name="email"
              type="email"
              placeholder="ornek@eposta.com"
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Şifre
            <input name="password" type="password" required className={inputClass} />
          </label>
          {error === "not_admin" && (
            <p className="text-sm text-danger">Bu giriş sadece yöneticiler içindir.</p>
          )}
          {error === "1" && <p className="text-sm text-danger">Geçersiz bilgiler.</p>}
          <Button type="submit">Giriş yap</Button>
        </form>
      </div>
    </main>
  );
}
