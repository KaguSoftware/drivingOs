import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { fontFamily } from "../font";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });
  const taglineOpacity = interpolate(frame, [18, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [18, 32], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "var(--background)",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
      }}
    >
      <div
        style={{
          transform: `scale(${logoScale})`,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: 24,
            background: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 30px rgba(30, 58, 138, 0.35)",
          }}
        >
          <div style={{ color: "var(--primary-foreground)", fontSize: 44, fontWeight: 800 }}>D</div>
        </div>
        <div style={{ color: "var(--foreground)", fontSize: 76, fontWeight: 800, letterSpacing: -2 }}>
          DrivingOS
        </div>
      </div>
      <div
        style={{
          marginTop: 24,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          color: "var(--muted)",
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: 0.2,
        }}
      >
        Sürücü kurslarınız için tek bir işletim sistemi
      </div>
    </AbsoluteFill>
  );
};
