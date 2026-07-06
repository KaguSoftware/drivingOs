export function assertNotPast(startsAtIso: string): void {
  if (new Date(startsAtIso).getTime() < Date.now()) {
    throw new Error("Cannot schedule an event in the past");
  }
}
