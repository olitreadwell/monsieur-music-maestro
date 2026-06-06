'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { ReviewIndex, ReviewItemRef } from '@/lib/review';
import { getDueItems } from '@/lib/leitner';
import type { Quiz as QuizT, Challenge as ChallengeT, Puzzle as PuzzleT } from '@/lib/quiz';
import Quiz from '@/components/Quiz';
import Challenge from '@/components/Challenge';
import PatternPuzzle from '@/components/PatternPuzzle';

const LEITNER_STORAGE_KEY = 'mmm:leitner:v1';

/**
 * Dispatches a custom 'leitner-updated' event whenever localStorage writes the
 * leitner key in the same tab. The storage event only fires across tabs, so we
 * patch setItem to handle same-tab submissions from the embedded item components.
 * Idempotent: installing more than once is safe because we check for the flag.
 */
function installSameTabLeitnerListener(): () => void {
  const originalSetItem = window.localStorage.setItem.bind(window.localStorage);

  window.localStorage.setItem = function patchedSetItem(key: string, value: string) {
    originalSetItem(key, value);
    if (key === LEITNER_STORAGE_KEY) {
      window.dispatchEvent(new Event('leitner-updated'));
    }
  };

  return function uninstall() {
    window.localStorage.setItem = originalSetItem;
  };
}

interface Props {
  index: ReviewIndex;
  initialDue: ReviewItemRef[];
  onExit: () => void;
}

function kindLabel(kind: ReviewItemRef['kind']): string {
  if (kind === 'quiz') return 'quiz';
  if (kind === 'challenge') return 'challenge';
  return 'puzzle';
}

/** Resolves the current due list filtered to items present in the index. */
function resolveDue(index: ReviewIndex): ReviewItemRef[] {
  return getDueItems()
    .map((id) => index[id])
    .filter((ref): ref is ReviewItemRef => ref !== undefined);
}

export default function ReviewWalkthrough({ index, initialDue, onExit }: Props) {
  const [dueRefs, setDueRefs] = useState<ReviewItemRef[]>(initialDue);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemAnswered, setItemAnswered] = useState(false);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const regionRef = useRef<HTMLElement>(null);

  const currentRef = dueRefs[currentIndex];

  // Install same-tab localStorage patch once on mount; clean up on unmount.
  useEffect(() => {
    const uninstall = installSameTabLeitnerListener();
    return uninstall;
  }, []);

  // Detect when the leitner key is written while this item is displayed.
  // Covers both same-tab (via custom 'leitner-updated') and cross-tab (storage).
  useEffect(() => {
    if (!currentRef) return;
    setItemAnswered(false);

    function markAnswered() {
      setItemAnswered(true);
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === LEITNER_STORAGE_KEY) markAnswered();
    }

    window.addEventListener('leitner-updated', markAnswered);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('leitner-updated', markAnswered);
      window.removeEventListener('storage', handleStorage);
    };
  }, [currentRef]);

  // Move focus to the Next button once it becomes available.
  useEffect(() => {
    if (itemAnswered && nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
  }, [itemAnswered]);

  // Keyboard: Esc exits walk-through, Enter on Next advances.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onExit();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit]);

  const handleNext = useCallback(() => {
    const refreshed = resolveDue(index);
    setDueRefs(refreshed);
    setCurrentIndex(0);
    setItemAnswered(false);
    // Move focus to the region heading so screen readers announce the new item.
    if (regionRef.current) {
      regionRef.current.focus();
    }
  }, [index]);

  const totalCount = dueRefs.length;

  // All caught up state.
  if (totalCount === 0 || !currentRef) {
    return (
      <section
        role="region"
        aria-label="Walk-through complete"
        className="space-y-4"
      >
        <p className="text-lg font-semibold">All caught up. Nothing due now.</p>
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center min-h-11 rounded border border-fg/20 px-4 py-2 text-sm hover:bg-fg/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Back to list
        </button>
      </section>
    );
  }

  const positionLabel = `Review item ${currentIndex + 1} of ${totalCount}`;

  return (
    <section
      ref={regionRef}
      role="region"
      aria-label={positionLabel}
      tabIndex={-1}
      className="focus:outline-none space-y-6"
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-muted" aria-live="polite" aria-atomic="true">
          {positionLabel} &mdash; {kindLabel(currentRef.kind)} &mdash;{' '}
          <span className="font-medium text-fg">{currentRef.source.title}</span>
        </p>
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center min-h-11 rounded border border-fg/20 px-3 py-1.5 text-sm hover:bg-fg/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Exit walk-through
        </button>
      </div>

      {/* Embedded item — keyed by itemId so React fully remounts on advance */}
      <div key={currentRef.itemId}>
        {currentRef.kind === 'quiz' && (
          <Quiz quiz={currentRef.item as QuizT} />
        )}
        {currentRef.kind === 'challenge' && (
          <Challenge challenge={currentRef.item as ChallengeT} />
        )}
        {currentRef.kind === 'puzzle' && (
          <PatternPuzzle puzzle={currentRef.item as PuzzleT} />
        )}
      </div>

      {/* Next button: visible once the item has been answered */}
      {itemAnswered && (
        <button
          ref={nextButtonRef}
          type="button"
          onClick={handleNext}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleNext();
          }}
          className="inline-flex items-center min-h-11 rounded bg-accent px-5 py-2 text-sm font-medium text-bg hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Next &rarr;
        </button>
      )}
    </section>
  );
}
