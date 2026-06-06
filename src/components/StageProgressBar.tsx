'use client';

import { useProgress } from '@/lib/progress';
import type { Stage } from '@/lib/toys';

interface StageProgressBarProps {
  stage: Stage;
}

export default function StageProgressBar({ stage }: StageProgressBarProps) {
  const { progress } = useProgress();

  const branchToys = Object.values(stage.branches).flat();
  const allToys = [...stage.spine, ...stage.sideQuests, ...branchToys];
  const total = allToys.length;

  if (total === 0) return null;

  const read = allToys.filter((toy) => progress.toysRead[toy.id] !== undefined).length;
  const pct = total > 0 ? Math.round((read / total) * 100) : 0;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-xs text-muted">[{read}/{total}]</span>
        <span className="text-xs text-muted">{pct}% read</span>
      </div>
      <div className="w-full h-1 bg-muted/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
