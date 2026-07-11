import { useCurrentFrame, interpolate } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { Card } from "../components/Card";

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum"];

type Lesson = {
  day: number;
  row: number;
  span: number;
  label: string;
  instructor: string;
  tone: "primary" | "success" | "warning";
};

const LESSONS: Lesson[] = [
  { day: 0, row: 1, span: 2, label: "Direksiyon", instructor: "Ahmet Usta", tone: "primary" },
  { day: 1, row: 0, span: 1, label: "Teori", instructor: "Sınıf A", tone: "success" },
  { day: 2, row: 2, span: 2, label: "Direksiyon", instructor: "Hakan Usta", tone: "warning" },
  { day: 3, row: 1, span: 1, label: "Sınav Provası", instructor: "Ahmet Usta", tone: "primary" },
  { day: 4, row: 3, span: 2, label: "Direksiyon", instructor: "Hakan Usta", tone: "success" },
];

const TONE_BG: Record<Lesson["tone"], string> = {
  primary: "var(--info-soft)",
  success: "var(--success-soft)",
  warning: "var(--warning-soft)",
};
const TONE_FG: Record<Lesson["tone"], string> = {
  primary: "var(--info)",
  success: "var(--success)",
  warning: "var(--warning)",
};

const ROW_H = 74;

export const SchedulingScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneShell eyebrow="Eğitmen & Araç Takvimi" title="Çakışmasız haftalık planlama">
      <Card style={{ padding: 32, height: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, height: "100%" }}>
          {DAYS.map((day, di) => (
            <div key={day} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--muted)",
                  textAlign: "center",
                  paddingBottom: 10,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {day}
              </div>
              <div style={{ position: "relative", flex: 1 }}>
                {LESSONS.filter((l) => l.day === di).map((l, i) => {
                  const delay = 10 + (l.day + i) * 6;
                  const opacity = interpolate(frame, [delay, delay + 14], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });
                  const scale = interpolate(frame, [delay, delay + 14], [0.85, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });
                  return (
                    <div
                      key={`${l.day}-${l.row}`}
                      style={{
                        position: "absolute",
                        top: l.row * ROW_H,
                        left: 0,
                        right: 0,
                        height: l.span * ROW_H - 10,
                        opacity,
                        transform: `scale(${scale})`,
                        transformOrigin: "top center",
                        background: TONE_BG[l.tone],
                        borderRadius: 12,
                        padding: "10px 12px",
                        borderLeft: `4px solid ${TONE_FG[l.tone]}`,
                      }}
                    >
                      <div style={{ fontSize: 16, fontWeight: 700, color: TONE_FG[l.tone] }}>
                        {l.label}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>
                        {l.instructor}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </SceneShell>
  );
};
