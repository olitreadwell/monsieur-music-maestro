'use client';

import { useProgress } from '@/lib/progress';
import type { Stage } from '@/lib/toys';

interface StageProgressProps {
  stage: Stage;
}

export default function StageProgress({ stage }: StageProgressProps) {
  const { progress } = useProgress();

  const branchToys = Object.values(stage.branches).flat();
  const allToys = [...stage.spine, ...stage.sideQuests, ...branchToys];
  const total = allToys.length;

  if (total === 0) return null;

  const read = allToys.filter((toy) => progress.toysRead[toy.id] !== undefined).length;

  return (
    <span className="font-mono text-xs">
      [{read}/{total}]
    </span>
  );
}
