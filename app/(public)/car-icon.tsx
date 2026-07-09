export function CarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 56" className={className} aria-hidden="true">
      <path d="M28 27 Q34 11 49 11 H72 Q87 11 93 27 Z" className="fill-primary-foreground/95" />
      <path d="M48 15 Q40 15.5 35.5 24 H56 V15 Z" className="fill-primary" />
      <path d="M61 15 H71 Q80 15 85.5 24 H61 Z" className="fill-primary" />
      <rect x="4" y="25" width="112" height="19" rx="9" className="fill-primary-foreground/95" />
      <rect x="7" y="28.5" width="8" height="4.5" rx="2.25" className="fill-primary/60" />
      <rect x="105" y="28.5" width="8" height="4.5" rx="2.25" className="fill-primary/35" />
      <rect x="52" y="29" width="9" height="2.5" rx="1.25" className="fill-primary/30" />
      <circle cx="32" cy="44" r="11" className="fill-primary" />
      <circle cx="88" cy="44" r="11" className="fill-primary" />
      <circle cx="32" cy="44" r="7.5" className="fill-primary-foreground/95" />
      <circle cx="88" cy="44" r="7.5" className="fill-primary-foreground/95" />
      <circle cx="32" cy="44" r="3" className="fill-primary" />
      <circle cx="88" cy="44" r="3" className="fill-primary" />
    </svg>
  );
}
