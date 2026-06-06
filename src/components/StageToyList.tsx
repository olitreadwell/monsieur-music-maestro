'use client';

import { useProgress } from '@/lib/progress';
import type { Stage } from '@/lib/toys';
import ToyCard from '@/components/ToyCard';

interface StageToyListProps {
  stage: Stage;
}

export default function StageToyList({ stage }: StageToyListProps) {
  const { progress } = useProgress();

  return (
    <>
      {stage.spine.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            Spine
          </h2>
          <ul className="space-y-2">
            {stage.spine.map((toy) => (
              <li key={toy.id}>
                <ToyCard toy={toy} read={progress.toysRead[toy.id] !== undefined} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {stage.sideQuests.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            Side-quests
          </h2>
          <ul className="space-y-2">
            {stage.sideQuests.map((toy) => (
              <li key={toy.id}>
                <ToyCard toy={toy} read={progress.toysRead[toy.id] !== undefined} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {Object.keys(stage.branches).length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            Branches
          </h2>
          {Object.entries(stage.branches).map(([branchSlug, toys]) => (
            <div key={branchSlug} className="mb-4">
              <h3 className="text-sm font-medium text-muted mb-2">{branchSlug}</h3>
              <ul className="space-y-2">
                {toys.map((toy) => (
                  <li key={toy.id}>
                    <ToyCard toy={toy} read={progress.toysRead[toy.id] !== undefined} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {stage.spine.length === 0 &&
        stage.sideQuests.length === 0 &&
        Object.keys(stage.branches).length === 0 && (
          <p className="text-muted text-sm">No toys yet for this stage.</p>
        )}
    </>
  );
}
