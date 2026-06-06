import Link from 'next/link';
import { getTree, STAGE_TITLES } from '@/lib/toys';
import StageProgress from '@/components/StageProgress';
import TreeRow from '@/components/TreeRow';

export const metadata = { title: 'monsieur music maestro — the journey' };

export default async function Home() {
  const tree = await getTree();
  const totalToys = tree.allToys.length;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            monsieur music maestro
          </h1>
          <p className="mt-3 text-lg text-muted">
            An absolute-beginner path to making house music by writing code.
          </p>
          <p className="mt-2 text-sm text-muted">
            9 stages · {totalToys} {totalToys === 1 ? 'toy' : 'toys'}
          </p>
        </div>
        <Link
          href="/journey/narrative"
          className="shrink-0 text-sm text-muted hover:text-fg transition whitespace-nowrap"
        >
          narrative version →
        </Link>
      </div>

      <div className="mt-12 font-mono text-sm leading-relaxed">
        {tree.stages.map((stage) => {
          const title = STAGE_TITLES[stage.number];
          const hasContent =
            stage.spine.length > 0 ||
            stage.sideQuests.length > 0 ||
            Object.keys(stage.branches).length > 0;
          const branchKeys = Object.keys(stage.branches);

          return (
            <div key={stage.number} className="mb-8">
              <div className="font-semibold mb-1 flex items-baseline gap-2">
                <Link
                  href={`/journey/${stage.number}`}
                  className="hover:text-accent transition"
                >
                  Stage {stage.number} — {title}
                </Link>
                <StageProgress stage={stage} />
              </div>

              {!hasContent && (
                <div className="text-muted/50 pl-2">(no toys yet)</div>
              )}

              {stage.spine.map((toy) => (
                <TreeRow key={toy.id} toy={toy} />
              ))}

              {stage.sideQuests.map((toy) => (
                <TreeRow key={toy.id} toy={toy} prefix="↳" indent />
              ))}

              {branchKeys.length > 0 && (
                <div className="pl-2">
                  <div>↳ branches</div>
                  {branchKeys.map((branchSlug, bi) => {
                    const toys = stage.branches[branchSlug];
                    const isLast = bi === branchKeys.length - 1;
                    return toys.map((toy, ti) => {
                      const isLastToy = ti === toys.length - 1 && isLast;
                      const treePrefix = isLastToy ? '    └─' : '    ├─';
                      return (
                        <TreeRow
                          key={toy.id}
                          toy={toy}
                          prefix={treePrefix}
                          branchLabel={branchSlug}
                        />
                      );
                    });
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
