'use client';

import Link from 'next/link';
import { useProgress } from '@/lib/progress';
import type { Toy } from '@/lib/toys';

interface TreeRowProps {
  toy: Toy;
  prefix?: string;
  indent?: boolean;
  branchLabel?: string;
}

export default function TreeRow({ toy, prefix, indent = false, branchLabel }: TreeRowProps) {
  const { progress } = useProgress();
  const isRead = progress.toysRead[toy.id] !== undefined;
  const readMark = isRead ? '✓' : '·';

  const baseClass = [
    'group block hover:text-accent transition',
    'motion-safe:hover:bg-fg/5 motion-safe:transition-colors motion-safe:duration-150',
    indent ? 'pl-2' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const markClass = isRead ? 'text-accent' : 'text-muted';

  return (
    <div>
      <Link href={toy.routePath} className={baseClass}>
        <span className={markClass}>{readMark}</span>{' '}
        {prefix && (
          <span className="inline-block motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:translate-x-0.5">
            {prefix}{' '}
          </span>
        )}
        {branchLabel && <span>{branchLabel} · </span>}
        <span className="inline-block min-w-[20ch]">{toy.title}</span>
        <span className="text-muted">
          ({toy.type} · {toy.difficulty} · {toy.estimate_min}min)
        </span>
      </Link>
    </div>
  );
}
