'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Progress {
  toysRead: Record<string, { readAt: string }>; // toyId -> { ISO timestamp }
  // future: toysCompleted, quizAttempts, leitnerQueue
}

const STORAGE_KEY = 'mmm:progress';

const DEFAULT_PROGRESS: Progress = { toysRead: {} };

export function loadProgress(): Progress {
  if (typeof window === 'undefined') return { ...DEFAULT_PROGRESS, toysRead: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS, toysRead: {} };
    const parsed = JSON.parse(raw) as Progress;
    if (!parsed || typeof parsed.toysRead !== 'object') {
      return { ...DEFAULT_PROGRESS, toysRead: {} };
    }
    return parsed;
  } catch {
    return { ...DEFAULT_PROGRESS, toysRead: {} };
  }
}

export function saveProgress(p: Progress): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // swallow errors for private-browsing edge cases
  }
}

export function markRead(toyId: string): Progress {
  const current = loadProgress();
  const updated: Progress = {
    ...current,
    toysRead: {
      ...current.toysRead,
      [toyId]: { readAt: new Date().toISOString() },
    },
  };
  saveProgress(updated);
  return updated;
}

export function unmarkRead(toyId: string): Progress {
  const current = loadProgress();
  const toysRead = { ...current.toysRead };
  delete toysRead[toyId];
  const updated: Progress = { ...current, toysRead };
  saveProgress(updated);
  return updated;
}

export function useProgress(): {
  progress: Progress;
  markRead: (id: string) => void;
  unmarkRead: (id: string) => void;
} {
  const [progress, setProgress] = useState<Progress>({ toysRead: {} });

  useEffect(() => {
    setProgress(loadProgress());

    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        setProgress(loadProgress());
      }
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const markReadCb = useCallback((id: string) => {
    const updated = markRead(id);
    setProgress(updated);
  }, []);

  const unmarkReadCb = useCallback((id: string) => {
    const updated = unmarkRead(id);
    setProgress(updated);
  }, []);

  return { progress, markRead: markReadCb, unmarkRead: unmarkReadCb };
}
