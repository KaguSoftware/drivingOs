export function MebBadge() {
  return (
    <div className="flex items-center gap-2" title="T.C. Milli Eğitim Bakanlığı">
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <path
          d="M24 2 44 10v12c0 14-8.5 21.7-20 24C12.5 43.7 4 36 4 22V10Z"
          className="fill-surface stroke-primary"
          strokeWidth="2"
        />
        <path
          d="M24 12 16 24l8 12 8-12Z"
          className="fill-primary"
        />
      </svg>
      <span className="text-xs leading-tight text-muted">
        T.C.
        <br />
        Milli Eğitim Bakanlığı
      </span>
    </div>
  );
}
