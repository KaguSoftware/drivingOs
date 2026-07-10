export const TRACKER_PERIODS = ["hafta", "ay", "tumu"] as const;
export type TrackerPeriod = (typeof TRACKER_PERIODS)[number];

export const PERIOD_LABELS: Record<TrackerPeriod, string> = {
  hafta: "Bu hafta",
  ay: "Bu ay",
  tumu: "Tüm zamanlar",
};

export interface TrackerRow {
  instructorId: string;
  fullName: string;
  vehiclePlate: string | null;
  lessonCount: number;
  totalMinutes: number;
}
