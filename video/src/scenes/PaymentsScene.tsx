import { useCurrentFrame, interpolate } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";

const INSTALLMENTS = [
  { label: "1. Taksit", amount: "₺4.500", status: "ödendi" as const },
  { label: "2. Taksit", amount: "₺4.500", status: "ödendi" as const },
  { label: "3. Taksit", amount: "₺4.500", status: "bekliyor" as const },
  { label: "4. Taksit", amount: "₺4.500", status: "bekliyor" as const },
];

export const PaymentsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const totalOpacity = interpolate(frame, [4, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell eyebrow="Ödeme & Taksit Takibi" title="Kim ne ödedi, tek bakışta belli">
      <div style={{ display: "flex", gap: 32, height: "100%" }}>
        <Card
          style={{
            width: 320,
            padding: 32,
            opacity: totalOpacity,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "var(--primary)",
            border: "none",
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 600, color: "var(--primary-foreground)", opacity: 0.7 }}>
            Toplam Paket
          </div>
          <div style={{ fontSize: 52, fontWeight: 800, color: "var(--primary-foreground)", marginTop: 8 }}>
            ₺18.000
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--primary-foreground)", opacity: 0.85, marginTop: 16 }}>
            ₺9.000 tahsil edildi
          </div>
          <div
            style={{
              marginTop: 10,
              height: 10,
              borderRadius: 9999,
              background: "rgba(250, 246, 236, 0.25)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${interpolate(frame, [10, 40], [0, 50], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}%`,
                background: "var(--primary-foreground)",
                borderRadius: 9999,
              }}
            />
          </div>
        </Card>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {INSTALLMENTS.map((inst, i) => {
            const delay = 14 + i * 8;
            const opacity = interpolate(frame, [delay, delay + 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const x = interpolate(frame, [delay, delay + 14], [30, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <Card
                key={inst.label}
                style={{
                  padding: "22px 28px",
                  opacity,
                  transform: `translateX(${x}px)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)" }}>
                  {inst.label}
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "var(--muted)" }}>
                  {inst.amount}
                </div>
                <Badge tone={inst.status === "ödendi" ? "success" : "warning"}>{inst.status}</Badge>
              </Card>
            );
          })}
        </div>
      </div>
    </SceneShell>
  );
};
