import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTree, STAGE_TITLES } from '@/lib/toys';
import StageProgressBar from '@/components/StageProgressBar';
import StageToyList from '@/components/StageToyList';

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
  return { title: `Stage ${stageNumber}: ${title} - monsieur music maestro` };
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

      <header className="mb-4">
        <p className="text-sm text-muted mb-1">Stage {stageNumber}</p>
        <h1 className="text-3xl font-semibold">{stageTitle}</h1>
      </header>

      <StageProgressBar stage={stageData} />

      <StageToyList stage={stageData} />

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
