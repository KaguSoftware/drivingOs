export function CarIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 78"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g transform="matrix(-1 0 0 1 200 0)">
        <path
          d="M14 64 L14 54 C14 48 18 43 25 43 L46 43 L59 23 C61 20 64 19 67 19 L112 19 C115 19 118 20 120 23 L133 43 L175 43 C182 43 186 48 186 54 L186 64 L160 64 A14 14 0 0 0 132 64 L74 64 A14 14 0 0 0 46 64 Z"
          fill="var(--primary-foreground)"
        />
        <path d="M66 41 L76 25 L110 25 L120 41 Z" fill="var(--primary)" />
        <circle cx="60" cy="66" r="12" fill="var(--primary-foreground)" />
        <circle cx="60" cy="66" r="5" fill="var(--primary)" />
        <circle cx="146" cy="66" r="12" fill="var(--primary-foreground)" />
        <circle cx="146" cy="66" r="5" fill="var(--primary)" />
      </g>
    </svg>
  );
}
