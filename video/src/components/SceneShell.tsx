import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { fontFamily } from "../font";

export const SceneShell: React.FC<{
  children: React.ReactNode;
  eyebrow: string;
  title: string;
}> = ({ children, eyebrow, title }) => {
  const frame = useCurrentFrame();
  const headerOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(frame, [0, 12], [16, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "var(--background)",
        fontFamily,
        padding: "72px 96px",
      }}
    >
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            color: "var(--primary)",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            color: "var(--foreground)",
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ flex: 1, position: "relative" }}>{children}</div>
    </AbsoluteFill>
  );
};
