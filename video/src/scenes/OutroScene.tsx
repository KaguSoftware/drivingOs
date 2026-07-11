import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { fontFamily } from "../font";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });
  const subOpacity = interpolate(frame, [16, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "var(--primary)",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
      }}
    >
      <div style={{ transform: `scale(${scale})`, textAlign: "center" }}>
        <div
          style={{
            color: "var(--primary-foreground)",
            fontSize: 68,
            fontWeight: 800,
            letterSpacing: -2,
          }}
        >
          DrivingOS
        </div>
        <div
          style={{
            marginTop: 18,
            color: "var(--primary-foreground)",
            fontSize: 28,
            fontWeight: 600,
            opacity: subOpacity * 0.85,
          }}
        >
          Öğrenci · Takvim · Ödeme · Sınav — hepsi bir arada
        </div>
      </div>
    </AbsoluteFill>
  );
};
