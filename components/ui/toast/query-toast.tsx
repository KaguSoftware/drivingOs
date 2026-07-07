"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "./toast-context";

// Turns one-shot ?basari= / ?hata= params (set by server-action redirects)
// into toasts, then strips them from the URL.
export function QueryToast() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { addToast } = useToast();

  const success = searchParams.get("basari");
  const error = searchParams.get("hata");

  useEffect(() => {
    if (!success && !error) return;
    if (success) addToast("success", success, 8000);
    if (error) addToast("error", error, 8000);

    const params = new URLSearchParams(searchParams);
    params.delete("basari");
    params.delete("hata");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [success, error, addToast, pathname, router, searchParams]);

  return null;
}
