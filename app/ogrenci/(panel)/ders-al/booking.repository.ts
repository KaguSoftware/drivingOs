import type { SupabaseClient } from "@supabase/supabase-js";

export interface BookableInstructor {
  id: string;
  fullName: string;
  licenseClasses: string[];
  vehiclePlate: string | null;
  hasVehicle: boolean;
}

export interface OpenSlot {
  startsAt: string;
  endsAt: string;
}

interface InstructorRow {
  id: string;
  full_name: string;
  license_classes: string[];
  assigned_vehicle_id: string | null;
  vehicles: { plate: string } | null;
}

// Booking data for students: instructors who can teach (have a vehicle) and
// their open slots (computed by the list_open_slots RPC).
export class BookingRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listInstructors(): Promise<BookableInstructor[]> {
    const { data, error } = await this.supabase
      .from("instructors")
      .select("id, full_name, license_classes, assigned_vehicle_id, vehicles(plate)")
      .order("full_name");
    if (error) throw new Error(`Eğitmenler yüklenemedi: ${error.message}`);
    return (data as unknown as InstructorRow[]).map((row) => ({
      id: row.id,
      fullName: row.full_name,
      licenseClasses: row.license_classes,
      vehiclePlate: row.vehicles?.plate ?? null,
      hasVehicle: row.assigned_vehicle_id !== null,
    }));
  }

  async findInstructor(id: string): Promise<BookableInstructor | null> {
    const all = await this.listInstructors();
    return all.find((i) => i.id === id) ?? null;
  }

  async listOpenSlots(instructorId: string, from: Date, to: Date): Promise<OpenSlot[]> {
    const { data, error } = await this.supabase.rpc("list_open_slots", {
      p_instructor_id: instructorId,
      p_from: from.toISOString().slice(0, 10),
      p_to: to.toISOString().slice(0, 10),
    });
    if (error) throw new Error(`Uygun saatler yüklenemedi: ${error.message}`);
    return (data as { starts_at: string; ends_at: string }[]).map((row) => ({
      startsAt: row.starts_at,
      endsAt: row.ends_at,
    }));
  }
}
