import type { CSSProperties } from "react";

export const Card: React.FC<{
  children: React.ReactNode;
  style?: CSSProperties;
}> = ({ children, style }) => {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        boxShadow: "0 4px 24px rgba(30, 41, 59, 0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
