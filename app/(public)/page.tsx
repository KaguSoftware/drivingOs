import { Logo } from "./logo";
import { MebBadge } from "./meb-badge";
import { LookupShowcase } from "./lookup-showcase";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { PhoneEntryResult } from "./phone-entry-result";
import { signInWithPhone } from "./actions";

export default async function StudentEntryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center gap-8 bg-background p-4 sm:p-8 lg:w-1/2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-8">
          <div className="flex items-center justify-between">
            <Logo />
            <MebBadge />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted">Hoş geldiniz</p>
            <h1 className="text-2xl font-semibold">Öğrenci Girişi</h1>
            <p className="text-sm text-muted">
              Telefon numaranızı girerek panelinize ulaşın. Şifre gerekmez.
            </p>
          </div>
          <form action={signInWithPhone} className="flex max-w-md flex-col gap-3">
            <label className="flex flex-col gap-1 text-sm">
              Telefon numarası
              <div className="flex items-center rounded-lg border border-border bg-background pl-3">
                <span className="text-sm text-muted">+90</span>
                <PhoneInput />
              </div>
            </label>
            <Button type="submit">Giriş yap</Button>
          </form>
          <PhoneEntryResult error={error} />
        </div>
      </div>
      <LookupShowcase />
    </main>
  );
}
