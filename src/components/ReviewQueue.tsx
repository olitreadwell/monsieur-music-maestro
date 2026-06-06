'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLeitner } from '@/lib/leitner';
import type { ReviewIndex, ReviewItemRef } from '@/lib/review';

interface Props {
  index: ReviewIndex;
}

function kindLabel(kind: ReviewItemRef['kind']): string {
  if (kind === 'quiz') return 'quiz';
  if (kind === 'challenge') return 'challenge';
  return 'puzzle';
}

function nextDueLabel(items: Record<string, { nextDueAt: string }>): string {
  const future = Object.values(items)
    .map((e) => e.nextDueAt)
    .filter((d) => d > new Date().toISOString())
    .sort();

  if (future.length === 0) return '';

  const diffMs = new Date(future[0]).getTime() - Date.now();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 1) return 'less than 1 day';
  return `${diffDays} days`;
}

export default function ReviewQueue({ index }: Props) {
  const { state, due } = useLeitner();
  const [showAll, setShowAll] = useState(false);

  const dueRefs = due
    .map((id) => index[id])
    .filter((ref): ref is ReviewItemRef => ref !== undefined);

  const allKnownIds = Object.keys(state.items).filter((id) => id in index);

  const nonDueByBox: Record<number, ReviewItemRef[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  for (const id of allKnownIds) {
    if (!due.includes(id)) {
      const entry = state.items[id];
      if (entry && index[id]) {
        const box = entry.box as 1 | 2 | 3 | 4 | 5;
        nonDueByBox[box].push(index[id]);
      }
    }
  }

  const nextLabel = nextDueLabel(state.items);

  return (
    <div>
      <div aria-live="polite" className="mb-6">
        {dueRefs.length > 0 ? (
          <p className="text-lg font-semibold">
            {dueRefs.length} {dueRefs.length === 1 ? 'item' : 'items'} due now
          </p>
        ) : (
          <p className="text-lg font-semibold text-muted">
            Nothing due.{nextLabel ? ` Next item: ${nextLabel}.` : ' No upcoming items.'}
          </p>
        )}
      </div>

      {dueRefs.length > 0 && (
        <ul className="space-y-3 mb-8">
          {dueRefs.map((ref) => (
            <li
              key={ref.itemId}
              className="rounded-lg border border-fg/10 bg-neutral-50 px-4 py-3 flex items-start justify-between gap-4"
            >
              <div>
                <p className="font-medium text-sm">{ref.source.title}</p>
                <p className="text-xs text-muted mt-0.5 capitalize">{kindLabel(ref.kind)}</p>
              </div>
              <Link
                href={`${ref.source.route}#${ref.itemId}`}
                className="shrink-0 text-sm text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
              >
                Open this
              </Link>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => setShowAll((v) => !v)}
        className="text-sm text-muted hover:text-fg transition mb-6"
      >
        {showAll ? 'Hide done' : 'Show all items by box'}
      </button>

      {showAll && (
        <div className="space-y-6">
          {([1, 2, 3, 4, 5] as const).map((box) => {
            const refs = nonDueByBox[box];
            if (refs.length === 0) return null;
            return (
              <div key={box}>
                <h3 className="text-sm font-semibold mb-2">Box {box}</h3>
                <ul className="space-y-2">
                  {refs.map((ref) => (
                    <li
                      key={ref.itemId}
                      className="rounded border border-fg/10 px-3 py-2 flex items-start justify-between gap-4 text-sm"
                    >
                      <div>
                        <span className="font-medium">{ref.source.title}</span>
                        <span className="text-muted ml-2 capitalize">{kindLabel(ref.kind)}</span>
                      </div>
                      <Link
                        href={`${ref.source.route}#${ref.itemId}`}
                        className="shrink-0 text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
                      >
                        Open
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {allKnownIds.length === 0 && dueRefs.length === 0 && (
        <p className="text-sm text-muted mt-4">
          Complete a quiz, challenge, or puzzle to start building your review queue.
        </p>
      )}
    </div>
  );
}
