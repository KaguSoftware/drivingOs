export function assertNotPast(startsAtIso: string): void {
  if (new Date(startsAtIso).getTime() < Date.now()) {
    throw new Error("Geçmişte bir etkinlik planlanamaz");
  }
}
