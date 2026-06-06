// SHIM — slice L provides real implementation
'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Progress {
  toysRead: Record<string, { readAt: string }>;
}

const STORAGE_KEY = 'mmm:progress';

function empty(): Progress {
  return { toysRead: {} };
}

export function loadProgress(): Progress {
  if (typeof window === 'undefined') return empty();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    return JSON.parse(raw) as Progress;
  } catch {
    return empty();
  }
}

export function saveProgress(p: Progress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function markRead(p: Progress, toyId: string): Progress {
  return {
    ...p,
    toysRead: {
      ...p.toysRead,
      [toyId]: { readAt: new Date().toISOString() },
    },
  };
}

export function unmarkRead(p: Progress, toyId: string): Progress {
  const next = { ...p, toysRead: { ...p.toysRead } };
  delete next.toysRead[toyId];
  return next;
}

export function useProgress(): {
  progress: Progress;
  markRead: (toyId: string) => void;
  unmarkRead: (toyId: string) => void;
} {
  const [progress, setProgress] = useState<Progress>(empty);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const doMarkRead = useCallback((toyId: string) => {
    setProgress((prev) => {
      const next = markRead(prev, toyId);
      saveProgress(next);
      return next;
    });
  }, []);

  const doUnmarkRead = useCallback((toyId: string) => {
    setProgress((prev) => {
      const next = unmarkRead(prev, toyId);
      saveProgress(next);
      return next;
    });
  }, []);

  return { progress, markRead: doMarkRead, unmarkRead: doUnmarkRead };
}
