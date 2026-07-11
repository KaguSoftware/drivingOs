import { useCurrentFrame, interpolate } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";

type Row = {
  name: string;
  license: string;
  theory: number;
  practice: number;
  status: "aktif" | "tamamlandı";
};

const ROWS: Row[] = [
  { name: "Elif Yıldız", license: "B", theory: 100, practice: 82, status: "aktif" },
  { name: "Mert Kaya", license: "A2", theory: 100, practice: 100, status: "tamamlandı" },
  { name: "Zeynep Arslan", license: "B", theory: 65, practice: 20, status: "aktif" },
];

const ProgressBar: React.FC<{ label: string; value: number; delay: number }> = ({
  label,
  value,
  delay,
}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [delay, delay + 20], [0, value], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 16, color: "var(--muted)", fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 16, color: "var(--foreground)", fontWeight: 700 }}>
          {Math.round(w)}%
        </span>
      </div>
      <div
        style={{
          height: 10,
          borderRadius: 9999,
          background: "var(--surface-strong)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${w}%`,
            borderRadius: 9999,
            background: "var(--primary)",
          }}
        />
      </div>
    </div>
  );
};

export const StudentsScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneShell eyebrow="Öğrenci Yönetimi" title="Tüm sınıflar, tek ekranda">
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {ROWS.map((row, i) => {
          const delay = i * 10;
          const opacity = interpolate(frame, [delay, delay + 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x = interpolate(frame, [delay, delay + 14], [40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <Card
              key={row.name}
              style={{
                padding: "28px 32px",
                opacity,
                transform: `translateX(${x}px)`,
                display: "flex",
                alignItems: "center",
                gap: 32,
              }}
            >
              <div style={{ width: 220 }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: "var(--foreground)" }}>
                  {row.name}
                </div>
                <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                  <Badge tone="info" style={{ fontSize: 15, padding: "3px 12px" }}>
                    {row.license} Sınıfı
                  </Badge>
                  <Badge
                    tone={row.status === "tamamlandı" ? "success" : "warning"}
                    style={{ fontSize: 15, padding: "3px 12px" }}
                  >
                    {row.status}
                  </Badge>
                </div>
              </div>
              <ProgressBar label="Teori" value={row.theory} delay={delay + 6} />
              <ProgressBar label="Direksiyon" value={row.practice} delay={delay + 12} />
            </Card>
          );
        })}
      </div>
    </SceneShell>
  );
};
