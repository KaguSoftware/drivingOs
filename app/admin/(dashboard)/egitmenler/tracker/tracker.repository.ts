import type { SupabaseClient } from "@supabase/supabase-js";
import { InstructorRepository } from "../instructor.repository";
import { LessonRepository } from "../../program/lesson.repository";
import type { TrackerPeriod, TrackerRow } from "./types";

function periodStart(period: TrackerPeriod): Date | undefined {
  if (period === "tumu") return undefined;
  const now = new Date();
  if (period === "ay") return new Date(now.getFullYear(), now.getMonth(), 1);
  // Week starts Monday.
  const day = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - day);
  return monday;
}

// Aggregates lessons taught per instructor for the given period, alongside
// each instructor's assigned vehicle.
export class TrackerRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async summary(period: TrackerPeriod): Promise<TrackerRow[]> {
    const instructors = await new InstructorRepository(this.supabase).listAll();
    const lessonRepo = new LessonRepository(this.supabase);
    const from = periodStart(period);

    const rows = await Promise.all(
      instructors.map(async (instructor) => {
        const lessons = await lessonRepo.listForInstructor(instructor.id, from);
        const totalMinutes = lessons.reduce((sum, l) => sum + l.durationMinutes(), 0);
        return {
          instructorId: instructor.id,
          fullName: instructor.fullName,
          vehiclePlate: instructor.assignedVehiclePlate(),
          lessonCount: lessons.length,
          totalMinutes,
        } satisfies TrackerRow;
      })
    );

    return rows.sort((a, b) => b.totalMinutes - a.totalMinutes);
  }
}

export function formatHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} dk`;
  if (mins === 0) return `${hours} sa`;
  return `${hours} sa ${mins} dk`;
}
