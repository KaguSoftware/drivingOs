export function FormCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
