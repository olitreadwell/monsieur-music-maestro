import Link from 'next/link';
import { getTree, STAGE_TITLES } from '@/lib/toys';
import StageProgress from '@/components/StageProgress';
import StageIcon from '@/components/StageIcon';
import TreeRow from '@/components/TreeRow';
import EmFollower from '@/components/EmFollower';

export const metadata = { title: 'monsieur music maestro: the journey' };

export default async function Home() {
  const tree = await getTree();
  const totalToys = tree.allToys.length;

  // All spine toys across all stages, in order, for Em's position logic
  const allSpineToys = tree.stages.flatMap((stage) => stage.spine);
  const firstToyId = allSpineToys[0]?.id ?? '';

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="font-display italic text-5xl sm:text-6xl tracking-tight">
          monsieur music maestro
        </h1>
        <p className="mt-4 text-lg text-muted">
          From zero to musical literacy: rhythm, theory, global music traditions, dance, and DJ craft.
        </p>
        <p className="mt-2 text-sm text-muted">
          9 stages · {totalToys} {totalToys === 1 ? 'toy' : 'toys'} · house music as the anchor, the world as the destination
        </p>
        <div className="mt-6 flex items-center gap-4 flex-wrap">
          <Link
            href="/lessons"
            className="bg-accent text-bg px-4 py-2 rounded font-medium hover:bg-accent/90 motion-safe:transition-colors focus-visible:ring-2 ring-accent"
          >
            Browse lesson sets
          </Link>
          <Link
            href="/journey/narrative"
            className="text-sm text-muted hover:text-fg motion-safe:transition-colors whitespace-nowrap"
          >
            narrative version →
          </Link>
        </div>
      </div>

      {/* Stage tree */}
      <div className="font-mono text-sm leading-relaxed">
        {tree.stages.map((stage) => {
          const title = STAGE_TITLES[stage.number];
          const hasContent =
            stage.spine.length > 0 ||
            stage.sideQuests.length > 0 ||
            Object.keys(stage.branches).length > 0;
          const branchKeys = Object.keys(stage.branches);

          return (
            <div key={stage.number} className="mb-8">
              <div className="font-semibold mb-1 flex items-center gap-2 flex-wrap">
                <StageIcon stage={stage.number} size={18} className="text-muted shrink-0" />
                <Link
                  href={`/journey/${stage.number}`}
                  className="hover:text-accent motion-safe:transition-colors"
                >
                  Stage {stage.number}: {title}
                </Link>
                <StageProgress stage={stage} />
              </div>

              {!hasContent && (
                <div className="text-muted/50 pl-2">(no toys yet)</div>
              )}

              {stage.spine.map((toy) => (
                <div key={toy.id} className="flex items-center">
                  <TreeRow toy={toy} />
                  <EmFollower
                    toyId={toy.id}
                    firstToyId={firstToyId}
                    allSpineToys={allSpineToys}
                  />
                </div>
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
