'use client';

import { useState } from 'react';
import { useProgress } from '@/lib/progress';

interface ReadButtonProps {
  toyId: string;
}

const sparkKeyframes = `
@keyframes mmm-spark-1 {
  0%   { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(-8px, -18px) scale(0.4); opacity: 0; }
}
@keyframes mmm-spark-2 {
  0%   { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(0px, -22px) scale(0.4); opacity: 0; }
}
@keyframes mmm-spark-3 {
  0%   { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(8px, -18px) scale(0.4); opacity: 0; }
}
`;

export default function ReadButton({ toyId }: ReadButtonProps) {
  const { progress, markRead, unmarkRead } = useProgress();
  const [sparking, setSparking] = useState(false);
  const readEntry = progress.toysRead[toyId];
  const isRead = Boolean(readEntry);

  const formattedDate = isRead
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
        new Date(readEntry.readAt),
      )
    : null;

  function handleMarkRead() {
    markRead(toyId);
    setSparking(true);
    setTimeout(() => setSparking(false), 500);
  }

  if (isRead) {
    return (
      <div className="flex items-center gap-4">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-fg/10 text-fg text-sm font-medium">
          <span aria-hidden="true">✓</span>
          Read on {formattedDate}
        </span>
        <button
          type="button"
          onClick={() => unmarkRead(toyId)}
          aria-label="Mark as unread"
          className="min-h-11 inline-flex items-center text-sm text-muted hover:text-accent motion-safe:transition-colors underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
        >
          undo
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{sparkKeyframes}</style>
      <div className="relative inline-block">
        <button
          type="button"
          aria-pressed={false}
          onClick={handleMarkRead}
          className="min-h-[44px] px-6 py-3 rounded-md bg-accent text-bg font-medium text-sm hover:opacity-90 motion-safe:transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          I read this article
        </button>
        {sparking && (
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className="absolute w-2 h-2 rounded-full bg-accent motion-safe:[animation:mmm-spark-1_400ms_ease-out_forwards]"
              style={{ left: 'calc(50% - 16px)', bottom: '50%' }}
            />
            <span
              className="absolute w-2 h-2 rounded-full bg-accent motion-safe:[animation:mmm-spark-2_400ms_ease-out_forwards]"
              style={{ left: 'calc(50% - 4px)', bottom: '50%' }}
            />
            <span
              className="absolute w-2 h-2 rounded-full bg-accent motion-safe:[animation:mmm-spark-3_400ms_ease-out_forwards]"
              style={{ left: 'calc(50% + 8px)', bottom: '50%' }}
            />
          </span>
        )}
      </div>
    </>
  );
}
