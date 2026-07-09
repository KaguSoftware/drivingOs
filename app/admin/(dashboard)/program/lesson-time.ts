import { DEFAULT_DURATION_MINUTES } from "./duration";

export function toLocalDateTimeValue(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

export function addMinutes(value: string, minutes: number): string {
  if (!value) return "";
  const date = new Date(value);
  date.setMinutes(date.getMinutes() + minutes);
  return toLocalDateTimeValue(date);
}

export function minutesBetween(start: string, end: string): number {
  if (!start || !end) return DEFAULT_DURATION_MINUTES;
  return Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);
}
