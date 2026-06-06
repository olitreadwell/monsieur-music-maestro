'use client';

import { useState, useEffect, useCallback } from 'react';

export type BoxNumber = 1 | 2 | 3 | 4 | 5;

export interface LeitnerEntry {
  box: BoxNumber;
  lastReviewedAt: string;
  nextDueAt: string;
}

export interface LeitnerState {
  items: Record<string, LeitnerEntry>;
}

const STORAGE_KEY = 'mmm:leitner:v1';

// Intervals in milliseconds: box 1=1d, 2=3d, 3=7d, 4=14d, 5=30d
const BOX_INTERVALS_MS: Record<BoxNumber, number> = {
  1: 1 * 24 * 60 * 60 * 1000,
  2: 3 * 24 * 60 * 60 * 1000,
  3: 7 * 24 * 60 * 60 * 1000,
  4: 14 * 24 * 60 * 60 * 1000,
  5: 30 * 24 * 60 * 60 * 1000,
};

const DEFAULT_STATE: LeitnerState = { items: {} };

export function loadLeitner(): LeitnerState {
  if (typeof window === 'undefined') return { ...DEFAULT_STATE, items: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE, items: {} };
    const parsed = JSON.parse(raw) as LeitnerState;
    if (!parsed || typeof parsed.items !== 'object') {
      return { ...DEFAULT_STATE, items: {} };
    }
    return parsed;
  } catch {
    return { ...DEFAULT_STATE, items: {} };
  }
}

export function saveLeitner(state: LeitnerState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // swallow errors for private-browsing edge cases
  }
}

export function updateBox(itemId: string, correct: boolean): LeitnerState {
  const state = loadLeitner();
  const existing = state.items[itemId];
  const now = Date.now();

  let newBox: BoxNumber;
  if (!existing) {
    // New item: start at box 1 if incorrect, box 2 if correct
    newBox = correct ? 2 : 1;
  } else if (correct) {
    // Promote, capped at 5
    newBox = Math.min(existing.box + 1, 5) as BoxNumber;
  } else {
    // Demote to box 1
    newBox = 1;
  }

  const nextDueAt = new Date(now + BOX_INTERVALS_MS[newBox]).toISOString();

  const updated: LeitnerState = {
    ...state,
    items: {
      ...state.items,
      [itemId]: {
        box: newBox,
        lastReviewedAt: new Date(now).toISOString(),
        nextDueAt,
      },
    },
  };

  saveLeitner(updated);
  return updated;
}

export function getDueItems(): string[] {
  const state = loadLeitner();
  const now = new Date().toISOString();
  return Object.entries(state.items)
    .filter(([, entry]) => entry.nextDueAt <= now)
    .map(([id]) => id);
}

export function useLeitner(): {
  state: LeitnerState;
  due: string[];
  updateBox: (itemId: string, correct: boolean) => void;
} {
  const [state, setState] = useState<LeitnerState>({ items: {} });

  useEffect(() => {
    setState(loadLeitner());

    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        setState(loadLeitner());
      }
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const updateBoxCb = useCallback((itemId: string, correct: boolean) => {
    const updated = updateBox(itemId, correct);
    setState(updated);
  }, []);

  const due = Object.entries(state.items)
    .filter(([, entry]) => entry.nextDueAt <= new Date().toISOString())
    .map(([id]) => id);

  return { state, due, updateBox: updateBoxCb };
}
