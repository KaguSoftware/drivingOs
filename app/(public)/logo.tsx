export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 48 48"
        className="h-9 w-9 fill-primary"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="22" className="fill-primary" />
        <circle cx="24" cy="24" r="15" className="fill-surface" />
        <circle cx="24" cy="24" r="4" className="fill-primary" />
        <rect x="22" y="9" width="4" height="9" rx="2" className="fill-primary" />
        <rect x="22" y="30" width="4" height="9" rx="2" className="fill-primary" />
        <rect x="9" y="22" width="9" height="4" rx="2" className="fill-primary" />
        <rect x="30" y="22" width="9" height="4" rx="2" className="fill-primary" />
      </svg>
      <span className="text-lg font-semibold tracking-tight">Driving School OS</span>
    </div>
  );
}
