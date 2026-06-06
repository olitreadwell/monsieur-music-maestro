import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTree, STAGE_TITLES } from '@/lib/toys';
import ToyCard from '@/components/ToyCard';

export function generateStaticParams() {
  return Array.from({ length: 9 }, (_, i) => ({ stage: String(i) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stage: string }>;
}): Promise<Metadata> {
  const { stage } = await params;
  const stageNumber = Number(stage);
  if (!Number.isInteger(stageNumber) || stageNumber < 0 || stageNumber > 8) {
    return { title: 'Not found' };
  }
  const title = STAGE_TITLES[stageNumber];
  return { title: `Stage ${stageNumber} — ${title} — monsieur music maestro` };
}

export default async function StagePage({
  params,
}: {
  params: Promise<{ stage: string }>;
}) {
  const { stage } = await params;
  const stageNumber = Number(stage);

  if (!Number.isInteger(stageNumber) || stageNumber < 0 || stageNumber > 8) {
    notFound();
  }

  const tree = await getTree();
  const stageData = tree.stages[stageNumber];
  const stageTitle = STAGE_TITLES[stageNumber];

  const prevStage = stageNumber > 0 ? stageNumber - 1 : null;
  const nextStage = stageNumber < 8 ? stageNumber + 1 : null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <nav className="mb-8">
        <Link href="/" className="text-sm text-muted hover:text-accent transition">
          ← back to tree
        </Link>
      </nav>

      <header className="mb-8">
        <p className="text-sm text-muted mb-1">Stage {stageNumber}</p>
        <h1 className="text-3xl font-semibold">{stageTitle}</h1>
      </header>

      {stageData.spine.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            Spine
          </h2>
          <ul className="space-y-2">
            {stageData.spine.map((toy) => (
              <li key={toy.id}>
                <ToyCard toy={toy} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {stageData.sideQuests.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            Side-quests
          </h2>
          <ul className="space-y-2">
            {stageData.sideQuests.map((toy) => (
              <li key={toy.id}>
                <ToyCard toy={toy} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {Object.keys(stageData.branches).length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            Branches
          </h2>
          {Object.entries(stageData.branches).map(([branchSlug, toys]) => (
            <div key={branchSlug} className="mb-4">
              <h3 className="text-sm font-medium text-muted mb-2">{branchSlug}</h3>
              <ul className="space-y-2">
                {toys.map((toy) => (
                  <li key={toy.id}>
                    <ToyCard toy={toy} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {stageData.spine.length === 0 &&
        stageData.sideQuests.length === 0 &&
        Object.keys(stageData.branches).length === 0 && (
          <p className="text-muted text-sm">No toys yet for this stage.</p>
        )}

      <nav className="mt-12 flex justify-between text-sm">
        {prevStage !== null ? (
          <Link
            href={`/journey/${prevStage}`}
            className="text-muted hover:text-accent transition"
          >
            ← Stage {prevStage}: {STAGE_TITLES[prevStage]}
          </Link>
        ) : (
          <span />
        )}
        {nextStage !== null ? (
          <Link
            href={`/journey/${nextStage}`}
            className="text-muted hover:text-accent transition"
          >
            Stage {nextStage}: {STAGE_TITLES[nextStage]} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
