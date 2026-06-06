'use client';

import { useProgress } from '@/lib/progress';
import Em from '@/components/Em';
import type { Toy } from '@/lib/toys';

interface EmFollowerProps {
  toyId: string;
  firstToyId: string;
  allSpineToys: Toy[];
}

export default function EmFollower({ toyId, firstToyId, allSpineToys }: EmFollowerProps) {
  const { progress } = useProgress();

  // Find the next unread spine toy
  const nextUnread = allSpineToys.find(
    (toy) => progress.toysRead[toy.id] === undefined,
  );

  const targetId = nextUnread ? nextUnread.id : firstToyId;

  if (targetId !== toyId) return null;

  return (
    <span className="inline-flex items-center ml-1 text-accent" aria-hidden="true">
      <Em state="mid-step" size="sm" />
    </span>
  );
}
