'use client';

import { useState, useEffect, useCallback } from 'react';
import { updateBox } from '@/lib/leitner';

export type QuizKind = 'multiple-choice' | 'short-answer';

export interface Quiz {
  id: string;
  kind: QuizKind;
  question: string;
  options?: string[];
  correctAnswerIndex?: number;
  correctAnswerPattern?: string;
  explanation: string;
}

export type ChallengeValidator = 'literal' | 'regex' | 'contains';

export interface Challenge {
  id: string;
  prompt: string;
  starterCode: string;
  targetDescription: string;
  validator: ChallengeValidator;
  target: string;
}

export type PuzzleKind = 'reorder' | 'fill-blank';

export interface Puzzle {
  id: string;
  kind: PuzzleKind;
  prompt: string;
  tokens: string[];
  correctSequence: string[];
  explanation?: string;
}

export interface AttemptRecord {
  itemId: string;
  attemptedAt: string;
  correct: boolean;
}

const ATTEMPTS_KEY = 'mmm:attempts:v1';

function loadAllAttempts(): Record<string, AttemptRecord[]> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(ATTEMPTS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, AttemptRecord[]>;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed;
  } catch {
    return {};
  }
}

function saveAllAttempts(all: Record<string, AttemptRecord[]>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(all));
  } catch {
    // swallow errors for private-browsing edge cases
  }
}

export function recordAttempt(itemId: string, correct: boolean): void {
  const all = loadAllAttempts();
  const existing = all[itemId] ?? [];
  const record: AttemptRecord = {
    itemId,
    attemptedAt: new Date().toISOString(),
    correct,
  };
  saveAllAttempts({ ...all, [itemId]: [...existing, record] });
  updateBox(itemId, correct);
}

export function useAttempt(itemId: string): {
  history: AttemptRecord[];
  recordAttempt: (correct: boolean) => void;
} {
  const [history, setHistory] = useState<AttemptRecord[]>([]);

  useEffect(() => {
    const all = loadAllAttempts();
    setHistory(all[itemId] ?? []);

    function handleStorage(event: StorageEvent) {
      if (event.key === ATTEMPTS_KEY) {
        const updated = loadAllAttempts();
        setHistory(updated[itemId] ?? []);
      }
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [itemId]);

  const recordAttemptCb = useCallback(
    (correct: boolean) => {
      recordAttempt(itemId, correct);
      const all = loadAllAttempts();
      setHistory(all[itemId] ?? []);
    },
    [itemId],
  );

  return { history, recordAttempt: recordAttemptCb };
}

function normalizeWhitespace(s: string): string {
  return s.trim().replace(/\s+/g, ' ');
}

export function validateChallenge(submitted: string, challenge: Challenge): boolean {
  const trimmed = submitted.trim();

  switch (challenge.validator) {
    case 'literal': {
      return normalizeWhitespace(trimmed) === normalizeWhitespace(challenge.target);
    }
    case 'regex': {
      try {
        const re = new RegExp(challenge.target);
        return re.test(trimmed);
      } catch {
        return false;
      }
    }
    case 'contains': {
      return trimmed.toLowerCase().includes(challenge.target.toLowerCase());
    }
    default: {
      return false;
    }
  }
}

export function validatePuzzle(submitted: string[], puzzle: Puzzle): boolean {
  if (submitted.length !== puzzle.correctSequence.length) return false;

  switch (puzzle.kind) {
    case 'reorder': {
      return submitted.every((token, i) => token === puzzle.correctSequence[i]);
    }
    case 'fill-blank': {
      return submitted.every((token, i) => token === puzzle.correctSequence[i]);
    }
    default: {
      return false;
    }
  }
}
