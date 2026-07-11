import type { CSSProperties } from "react";

type Tone = "success" | "warning" | "info" | "danger" | "neutral";

const TONE_STYLES: Record<Tone, { bg: string; fg: string }> = {
  success: { bg: "var(--success-soft)", fg: "var(--success)" },
  warning: { bg: "var(--warning-soft)", fg: "var(--warning)" },
  info: { bg: "var(--info-soft)", fg: "var(--info)" },
  danger: { bg: "var(--danger-soft)", fg: "var(--danger)" },
  neutral: { bg: "var(--surface-strong)", fg: "var(--muted)" },
};

export const Badge: React.FC<{
  children: React.ReactNode;
  tone?: Tone;
  style?: CSSProperties;
}> = ({ children, tone = "neutral", style }) => {
  const t = TONE_STYLES[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 9999,
        padding: "6px 16px",
        fontSize: 20,
        fontWeight: 600,
        background: t.bg,
        color: t.fg,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
