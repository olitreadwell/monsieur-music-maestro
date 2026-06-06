'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { Puzzle } from '@/lib/quiz';
import { useAttempt, validatePuzzle } from '@/lib/quiz';

const feedbackKeyframes = `
@keyframes mmm-nod {
  0%   { transform: translateY(0); }
  40%  { transform: translateY(2px); }
  100% { transform: translateY(0); }
}
@keyframes mmm-shake {
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-3px); }
  40%  { transform: translateX(3px); }
  60%  { transform: translateX(-3px); }
  80%  { transform: translateX(3px); }
  100% { transform: translateX(0); }
}
`;

// ---------------------------------------------------------------------------
// Reorder puzzle
// ---------------------------------------------------------------------------

function ReorderPuzzle({
  puzzle,
  onResult,
}: {
  puzzle: Puzzle;
  onResult: (correct: boolean) => void;
}) {
  const [order, setOrder] = useState<string[]>([...puzzle.tokens]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  // tap-to-pick state for touch/click fallback
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);

  function handleDragStart(i: number) {
    setDragIndex(i);
  }

  function handleDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === i) return;
    const next = [...order];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(i, 0, moved);
    setOrder(next);
    setDragIndex(i);
  }

  function handleDragEnd() {
    setDragIndex(null);
  }

  // Tap-to-pick: first tap selects, second tap on a different chip swaps
  function handleChipClick(i: number) {
    if (checked) return;
    if (pickedIndex === null) {
      setPickedIndex(i);
      return;
    }
    if (pickedIndex === i) {
      setPickedIndex(null);
      return;
    }
    // Swap
    const next = [...order];
    [next[pickedIndex], next[i]] = [next[i], next[pickedIndex]];
    setOrder(next);
    setPickedIndex(null);
  }

  // Keyboard: arrow keys move the focused chip left/right; Space picks/drops
  function handleKeyDown(e: React.KeyboardEvent, i: number) {
    if (checked) return;
    if (e.key === 'ArrowLeft' && i > 0) {
      e.preventDefault();
      const next = [...order];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      setOrder(next);
    } else if (e.key === 'ArrowRight' && i < order.length - 1) {
      e.preventDefault();
      const next = [...order];
      [next[i + 1], next[i]] = [next[i], next[i + 1]];
      setOrder(next);
    } else if (e.key === ' ') {
      e.preventDefault();
      handleChipClick(i);
    }
  }

  function handleCheck() {
    const isCorrect = validatePuzzle(order, puzzle);
    setCorrect(isCorrect);
    setChecked(true);
    onResult(isCorrect);
  }

  return (
    <div>
      <p className="text-sm text-neutral-600 mb-3">Drag the chips into the correct order.</p>
      <div
        className="flex flex-wrap gap-2 min-h-10"
        role="list"
        aria-label="Tokens to reorder"
      >
        {order.map((token, i) => (
          <button
            key={`${token}-${i}`}
            role="listitem"
            draggable={!checked}
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => handleDragOver(e, i)}
            onDragEnd={handleDragEnd}
            onClick={() => handleChipClick(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            aria-pressed={pickedIndex === i}
            aria-label={`Token: ${token}${pickedIndex === i ? ', selected' : ''}`}
            className={[
              'min-h-11 rounded border px-3 py-1.5 text-sm font-mono cursor-grab select-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2',
              pickedIndex === i
                ? 'border-indigo-700 bg-indigo-50'
                : 'border-neutral-400 bg-white hover:bg-neutral-50',
              dragIndex === i ? 'opacity-50' : '',
              checked ? 'cursor-default' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {token}
          </button>
        ))}
      </div>
      {!checked && (
        <button
          type="button"
          onClick={handleCheck}
          className="mt-4 min-h-11 rounded bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 motion-safe:transition-colors"
        >
          Check
        </button>
      )}
      {checked && correct !== null && (
        <FeedbackMessage correct={correct} explanation={puzzle.explanation} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Fill-blank puzzle
// ---------------------------------------------------------------------------

function FillBlankPuzzle({
  puzzle,
  onResult,
}: {
  puzzle: Puzzle;
  onResult: (correct: boolean) => void;
}) {
  // Parse prompt into segments: plain text and blank slots
  const parts = puzzle.prompt.split('___');
  const blankCount = parts.length - 1;

  const [slotValues, setSlotValues] = useState<(string | null)[]>(
    Array(blankCount).fill(null),
  );
  const [available, setAvailable] = useState<(string | null)[]>([...puzzle.tokens]);
  // drag state
  const [draggingChipIndex, setDraggingChipIndex] = useState<number | null>(null);
  // tap-to-pick state
  const [pickedChipIndex, setPickedChipIndex] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);

  function placeChip(chipIndex: number, slotIndex: number) {
    // If slot already occupied, return the current chip to available
    const evicted = slotValues[slotIndex];
    const newSlots = [...slotValues];
    const newAvailable = [...available];
    newSlots[slotIndex] = available[chipIndex]!;
    newAvailable[chipIndex] = null;
    if (evicted !== null) {
      // Find the first null spot in available and put evicted there
      const freeIdx = newAvailable.findIndex((v) => v === null);
      if (freeIdx !== -1) {
        newAvailable[freeIdx] = evicted;
      } else {
        newAvailable.push(evicted);
      }
    }
    setSlotValues(newSlots);
    setAvailable(newAvailable);
  }

  function handleChipDragStart(i: number) {
    setDraggingChipIndex(i);
  }

  function handleSlotDrop(e: React.DragEvent, slotIndex: number) {
    e.preventDefault();
    if (draggingChipIndex === null) return;
    placeChip(draggingChipIndex, slotIndex);
    setDraggingChipIndex(null);
  }

  function handleSlotDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  // Tap-to-pick: tap chip to pick, tap slot to place
  function handleChipClick(i: number) {
    if (checked || available[i] === null) return;
    setPickedChipIndex(pickedChipIndex === i ? null : i);
  }

  function handleSlotClick(slotIndex: number) {
    if (checked) return;
    if (pickedChipIndex !== null) {
      placeChip(pickedChipIndex, slotIndex);
      setPickedChipIndex(null);
    } else if (slotValues[slotIndex] !== null) {
      // Click on filled slot to return chip to available tray
      const val = slotValues[slotIndex]!;
      const newSlots = [...slotValues];
      newSlots[slotIndex] = null;
      const newAvailable = [...available];
      const freeIdx = newAvailable.findIndex((v) => v === null);
      if (freeIdx !== -1) {
        newAvailable[freeIdx] = val;
      } else {
        newAvailable.push(val);
      }
      setSlotValues(newSlots);
      setAvailable(newAvailable);
    }
  }

  function handleCheck() {
    const filled = slotValues.map((v) => v ?? '');
    const isCorrect = validatePuzzle(filled, puzzle);
    setCorrect(isCorrect);
    setChecked(true);
    onResult(isCorrect);
  }

  const allFilled = slotValues.every((v) => v !== null);

  return (
    <div>
      <p className="text-sm text-neutral-600 mb-3">
        Drag the chips into the blanks, or tap a chip then tap a blank.
      </p>

      {/* Prompt with inline blank slots */}
      <div className="flex flex-wrap items-center gap-1 text-sm mb-4" aria-label="Fill-in-the-blank prompt">
        {parts.map((part, i) => (
          <span key={i} className="inline-flex items-center gap-1 flex-wrap">
            {part && <span>{part}</span>}
            {i < blankCount && (
              <button
                onDrop={(e) => handleSlotDrop(e, i)}
                onDragOver={handleSlotDragOver}
                onClick={() => handleSlotClick(i)}
                aria-label={
                  slotValues[i]
                    ? `Blank ${i + 1}: ${slotValues[i]}. Click to remove.`
                    : `Blank ${i + 1}: empty. ${pickedChipIndex !== null ? 'Click to place selected chip.' : ''}`
                }
                className={[
                  'inline-flex min-w-16 h-11 items-center justify-center rounded border-2 border-dashed px-2 text-sm font-mono',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2',
                  slotValues[i]
                    ? 'border-indigo-700 bg-indigo-50'
                    : pickedChipIndex !== null
                      ? 'border-indigo-500 bg-indigo-50/50'
                      : 'border-neutral-500',
                  checked ? 'cursor-default' : 'cursor-pointer',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {slotValues[i] ?? ''}
              </button>
            )}
          </span>
        ))}
      </div>

      {/* Chip tray */}
      <div className="flex flex-wrap gap-2 mb-4" aria-label="Available tokens">
        {available.map((token, i) =>
          token === null ? null : (
            <button
              key={i}
              draggable={!checked}
              onDragStart={() => handleChipDragStart(i)}
              onDragEnd={() => setDraggingChipIndex(null)}
              onClick={() => handleChipClick(i)}
              aria-pressed={pickedChipIndex === i}
              aria-label={`Token: ${token}${pickedChipIndex === i ? ', selected' : ''}`}
              className={[
                'min-h-11 rounded border px-3 py-1.5 text-sm font-mono cursor-grab select-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2',
                pickedChipIndex === i
                  ? 'border-indigo-700 bg-indigo-50'
                  : 'border-neutral-400 bg-white hover:bg-neutral-50',
                draggingChipIndex === i ? 'opacity-50' : '',
                checked ? 'cursor-default' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {token}
            </button>
          ),
        )}
      </div>

      {!checked && (
        <button
          type="button"
          onClick={handleCheck}
          disabled={!allFilled}
          className="min-h-11 rounded bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 motion-safe:transition-colors"
        >
          Check
        </button>
      )}
      {checked && correct !== null && (
        <FeedbackMessage correct={correct} explanation={puzzle.explanation} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared feedback
// ---------------------------------------------------------------------------

function FeedbackMessage({
  correct,
  explanation,
}: {
  correct: boolean;
  explanation?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      ref={ref}
      aria-live="polite"
      tabIndex={-1}
      className="mt-4 space-y-1 focus:outline-none"
    >
      <style>{feedbackKeyframes}</style>
      <p className={`font-semibold ${correct ? 'text-green-700' : 'text-red-700'} ${correct ? 'motion-safe:[animation:mmm-nod_250ms_ease-out]' : 'motion-safe:[animation:mmm-shake_280ms_ease-out]'}`}>
        {correct ? '✓ Correct' : '✗ Not quite'}
      </p>
      {explanation && <p className="text-sm text-neutral-800">{explanation}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

export default function PatternPuzzle({ puzzle }: { puzzle: Puzzle }) {
  const { recordAttempt } = useAttempt(puzzle.id);

  const handleResult = useCallback(
    (correct: boolean) => {
      recordAttempt(correct);
    },
    [recordAttempt],
  );

  return (
    <div className="rounded-lg bg-neutral-50 p-5 mt-4 border border-neutral-200">
      <p className="text-base font-semibold mb-3">{puzzle.prompt}</p>
      {puzzle.kind === 'reorder' && (
        <ReorderPuzzle puzzle={puzzle} onResult={handleResult} />
      )}
      {puzzle.kind === 'fill-blank' && (
        <FillBlankPuzzle puzzle={puzzle} onResult={handleResult} />
      )}
    </div>
  );
}
