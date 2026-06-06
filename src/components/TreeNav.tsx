'use client';

import Link from 'next/link';
import type { Tree } from '@/lib/toys';
import { useProgress } from '@/lib/progress';

// Inlined to avoid importing from toys.ts which uses node:fs (server-only)
const STAGE_TITLES: Record<number, string> = {
  0: 'Play',
  1: 'Pulse',
  2: 'Hats + clap',
  3: 'Clave',
  4: 'Counting',
  5: 'Low end',
  6: 'Colour',
  7: 'Shape',
  8: 'Play it out',
};

interface TreeNavProps {
  tree: Tree;
  currentId: string;
}

export default function TreeNav({ tree, currentId }: TreeNavProps) {
  const { progress } = useProgress();

  return (
    <nav aria-label="Journey tree" className="font-mono text-sm">
      {tree.stages.map((stage) => {
        const hasContent =
          stage.spine.length > 0 ||
          stage.sideQuests.length > 0 ||
          Object.keys(stage.branches).length > 0;
        if (!hasContent) return null;

        return (
          <div key={stage.number} className="mb-4">
            <div className="text-xs uppercase tracking-wide opacity-60 mb-1">
              Stage {stage.number} — {STAGE_TITLES[stage.number]}
            </div>

            {stage.spine.map((toy) => {
              const isCurrent = toy.id === currentId;
              const isRead = progress.toysRead[toy.id] !== undefined;
              const bullet = isCurrent ? '→' : isRead ? '✓' : '●';
              return (
                <div key={toy.id}>
                  <Link
                    href={toy.routePath}
                    className={
                      isCurrent
                        ? 'flex items-baseline gap-1 text-accent font-semibold'
                        : 'flex items-baseline gap-1 hover:text-accent'
                    }
                  >
                    <span className={isRead && !isCurrent ? 'opacity-60' : ''}>{bullet}</span>
                    <span className={isRead && !isCurrent ? 'opacity-60' : ''}>{toy.title}</span>
                  </Link>
                </div>
              );
            })}

            {stage.sideQuests.map((toy) => {
              const isCurrent = toy.id === currentId;
              const isRead = progress.toysRead[toy.id] !== undefined;
              const bullet = isCurrent ? '→' : isRead ? '✓' : '↳';
              return (
                <div key={toy.id} className="pl-4">
                  <Link
                    href={toy.routePath}
                    className={
                      isCurrent
                        ? 'flex items-baseline gap-1 text-accent font-semibold'
                        : 'flex items-baseline gap-1 hover:text-accent'
                    }
                  >
                    <span className={isRead && !isCurrent ? 'opacity-60' : ''}>{bullet}</span>
                    <span className={isRead && !isCurrent ? 'opacity-60' : ''}>{toy.title}</span>
                  </Link>
                </div>
              );
            })}

            {Object.entries(stage.branches).length > 0 && (
              <div className="pl-4">
                <span className="opacity-60">↳ branches</span>
                {Object.entries(stage.branches).map(([branchSlug, branchToys], branchIdx, branchArr) => (
                  <div key={branchSlug} className="pl-4">
                    {branchToys.map((toy, toyIdx) => {
                      const isCurrent = toy.id === currentId;
                      const isRead = progress.toysRead[toy.id] !== undefined;
                      const isLast =
                        toyIdx === branchToys.length - 1 &&
                        branchIdx === branchArr.length - 1;
                      const prefix = isCurrent ? '→' : isRead ? '✓' : isLast ? '└─' : '├─';
                      return (
                        <div key={toy.id}>
                          <Link
                            href={toy.routePath}
                            className={
                              isCurrent
                                ? 'flex items-baseline gap-1 text-accent font-semibold'
                                : 'flex items-baseline gap-1 hover:text-accent'
                            }
                          >
                            <span className={isRead && !isCurrent ? 'opacity-60' : ''}>{prefix}</span>
                            <span className={isRead && !isCurrent ? 'opacity-60' : ''}>
                              {branchSlug} · {toy.title}
                            </span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
