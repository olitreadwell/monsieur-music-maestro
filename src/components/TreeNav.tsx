import Link from 'next/link';
import type { Tree } from '@/lib/toys';
import { STAGE_TITLES } from '@/lib/toys';

interface TreeNavProps {
  tree: Tree;
  currentId: string;
}

export default function TreeNav({ tree, currentId }: TreeNavProps) {
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
                    <span>{isCurrent ? '→' : '●'}</span>
                    <span>{toy.title}</span>
                  </Link>
                </div>
              );
            })}

            {stage.sideQuests.map((toy) => {
              const isCurrent = toy.id === currentId;
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
                    <span>{isCurrent ? '→' : '↳'}</span>
                    <span>{toy.title}</span>
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
                      const isLast =
                        toyIdx === branchToys.length - 1 &&
                        branchIdx === branchArr.length - 1;
                      const prefix = isLast ? '└─' : '├─';
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
                            <span>{isCurrent ? '→' : prefix}</span>
                            <span>
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
