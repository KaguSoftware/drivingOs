import type { SupabaseClient } from "@supabase/supabase-js";
import type { AvailabilityRow, BlockedDateRow } from "./types";

// Data access for a teacher's own weekly hours and blocked dates.
export class AvailabilityRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listAvailability(instructorId: string): Promise<AvailabilityRow[]> {
    const { data, error } = await this.supabase
      .from("instructor_availability")
      .select("*")
      .eq("instructor_id", instructorId)
      .order("weekday")
      .order("start_time");
    if (error) throw new Error(`Müsaitlik yüklenemedi: ${error.message}`);
    return data as AvailabilityRow[];
  }

  async addAvailability(
    instructorId: string,
    weekday: number,
    startTime: string,
    endTime: string
  ): Promise<void> {
    const { error } = await this.supabase.from("instructor_availability").insert({
      instructor_id: instructorId,
      weekday,
      start_time: startTime,
      end_time: endTime,
    });
    if (error) throw new Error(`Saat eklenemedi: ${error.message}`);
  }

  async removeAvailability(instructorId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from("instructor_availability")
      .delete()
      .eq("id", id)
      .eq("instructor_id", instructorId);
    if (error) throw new Error(`Saat silinemedi: ${error.message}`);
  }

  async listBlockedDates(instructorId: string): Promise<BlockedDateRow[]> {
    const { data, error } = await this.supabase
      .from("instructor_blocked_dates")
      .select("*")
      .eq("instructor_id", instructorId)
      .order("blocked_date");
    if (error) throw new Error(`Kapalı günler yüklenemedi: ${error.message}`);
    return data as BlockedDateRow[];
  }

  async addBlockedDate(
    instructorId: string,
    date: string,
    reason: string | null
  ): Promise<void> {
    const { error } = await this.supabase.from("instructor_blocked_dates").insert({
      instructor_id: instructorId,
      blocked_date: date,
      reason,
    });
    if (error) throw new Error(`Gün kapatılamadı: ${error.message}`);
  }

  async removeBlockedDate(instructorId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from("instructor_blocked_dates")
      .delete()
      .eq("id", id)
      .eq("instructor_id", instructorId);
    if (error) throw new Error(`Gün açılamadı: ${error.message}`);
  }
}
