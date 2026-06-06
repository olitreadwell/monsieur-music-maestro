'use client';

import { useProgress } from '@/lib/progress';

interface ReadButtonProps {
  toyId: string;
}

export default function ReadButton({ toyId }: ReadButtonProps) {
  const { progress, markRead, unmarkRead } = useProgress();
  const readEntry = progress.toysRead[toyId];
  const isRead = Boolean(readEntry);

  const formattedDate = isRead
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
        new Date(readEntry.readAt),
      )
    : null;

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
          className="text-sm text-muted hover:text-accent transition underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
        >
          undo
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={false}
      onClick={() => markRead(toyId)}
      className="min-h-[44px] px-6 py-3 rounded-md bg-accent text-bg font-medium text-sm hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      I read this article
    </button>
  );
}
