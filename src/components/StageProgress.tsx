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
  const pct = total > 0 ? Math.round((read / total) * 100) : 0;

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs">
        [{read}/{total}]
      </span>
      <div className="h-1 w-16 rounded-full bg-rule overflow-hidden">
        <div
          className="h-full bg-accent motion-safe:transition-[width] motion-safe:duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
