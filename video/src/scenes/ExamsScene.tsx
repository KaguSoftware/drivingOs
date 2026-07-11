import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";

const EXAMS = [
  { name: "Elif Yıldız", type: "Direksiyon Sınavı", result: "geçti" as const },
  { name: "Mert Kaya", type: "Teori Sınavı", result: "geçti" as const },
  { name: "Zeynep Arslan", type: "Direksiyon Sınavı", result: "bekliyor" as const },
];

export const ExamsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const docScale = spring({ frame: frame - 20, fps, config: { damping: 15, mass: 0.6 } });
  const docOpacity = interpolate(frame, [20, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell eyebrow="Sınav & Evrak" title="MEB evrakları otomatik hazır">
      <div style={{ display: "flex", gap: 32, height: "100%" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {EXAMS.map((exam, i) => {
            const delay = i * 8;
            const opacity = interpolate(frame, [delay, delay + 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const x = interpolate(frame, [delay, delay + 14], [-30, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <Card
                key={exam.name}
                style={{
                  padding: "22px 28px",
                  opacity,
                  transform: `translateX(${x}px)`,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)" }}>
                  {exam.name}
                </div>
                <div style={{ fontSize: 16, color: "var(--muted)", marginTop: 4, fontWeight: 600 }}>
                  {exam.type}
                </div>
                <Badge
                  tone={exam.result === "geçti" ? "success" : "warning"}
                  style={{ marginTop: 12 }}
                >
                  {exam.result}
                </Badge>
              </Card>
            );
          })}
        </div>

        <div
          style={{
            width: 300,
            transform: `scale(${docScale})`,
            opacity: docOpacity,
          }}
        >
          <Card
            style={{
              height: "100%",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "var(--info-soft)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--info)",
                fontWeight: 800,
                fontSize: 22,
              }}
            >
              PDF
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)" }}>
              MEB Sınav Formu
            </div>
            {[1, 2, 3, 4].map((row) => (
              <div
                key={row}
                style={{
                  height: 12,
                  borderRadius: 6,
                  background: "var(--surface-strong)",
                  width: row === 4 ? "60%" : "100%",
                }}
              />
            ))}
          </Card>
        </div>
      </div>
    </SceneShell>
  );
};
