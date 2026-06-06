export type BoxNumber = 1 | 2 | 3 | 4 | 5;

export interface LeitnerEntry {
  box: BoxNumber;
  lastReviewedAt: string;
  nextDueAt: string;
}

export interface LeitnerState {
  items: Record<string, LeitnerEntry>;
}

export function loadLeitner(): LeitnerState {
  return { items: {} };
}

export function saveLeitner(_state: LeitnerState): void {}

export function updateBox(_itemId: string, _correct: boolean): LeitnerState {
  return { items: {} };
}

export function getDueItems(): string[] {
  return [];
}
