"use client";

// No React state: the icon/label are driven purely by the `.dark` class on <html>
// (set pre-paint by the inline script in the root layout), so there's no hydration
// gate and nothing to synchronise. Clicking flips the class and persists a cookie.
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  document.cookie = `theme=${isDark ? "dark" : "light"};path=/;max-age=31536000;samesite=lax`;
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Temayı değiştir"
      title="Temayı değiştir"
      className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm text-sidebar-muted transition-colors hover:bg-surface-strong hover:text-sidebar-foreground"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] dark:hidden">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="hidden h-[18px] w-[18px] dark:block">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </span>
      <span className="dark:hidden">Koyu tema</span>
      <span className="hidden dark:inline">Açık tema</span>
    </button>
  );
}
