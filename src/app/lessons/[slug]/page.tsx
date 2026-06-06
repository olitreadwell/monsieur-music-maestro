import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getLessonSets, getLessonSet } from '@/lib/lesson-sets';
import { getTree } from '@/lib/toys';
import type { LessonSetFormat } from '@/lib/lesson-sets';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const sets = await getLessonSets();
  return sets.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const set = await getLessonSet(slug);
  if (!set) return {};
  return { title: `${set.title} — monsieur music maestro` };
}

const FORMAT_LABELS: Record<LessonSetFormat, string> = {
  'cultural-deep-dive': 'cultural deep-dive',
  'concept-across-cultures': 'concept across cultures',
};

export default async function LessonSetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [set, tree] = await Promise.all([getLessonSet(slug), getTree()]);

  if (!set) notFound();

  const toys = set.toyIds.map((id) => tree.byId.get(id)).filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-6">
        <Link href="/lessons" className="text-sm text-muted hover:text-fg transition">
          ← lesson sets
        </Link>
      </div>

      <div className="flex items-baseline gap-3 flex-wrap">
        <h1 className="text-4xl font-semibold tracking-tight">{set.title}</h1>
        <span className="text-xs px-2 py-0.5 rounded-full border border-fg/20 text-muted font-mono">
          {FORMAT_LABELS[set.format]}
        </span>
      </div>

      <p className="mt-4 text-lg text-muted leading-relaxed">{set.intro}</p>

      <ol className="mt-10 space-y-3 list-decimal list-inside">
        {toys.map((toy) => (
          <li key={toy!.id} className="text-base">
            <Link
              href={toy!.routePath}
              className="hover:text-accent transition underline underline-offset-2"
            >
              {toy!.title}
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <Link
          href={`/lessons/${set.slug}/review`}
          className="inline-block px-5 py-2.5 rounded-lg bg-accent text-white font-medium hover:opacity-90 transition"
        >
          Take the final review →
        </Link>
      </div>

      {set.body && (
        <article className="mt-16 prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent prose-code:font-mono prose-pre:bg-fg/5 prose-pre:text-fg">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{set.body}</ReactMarkdown>
        </article>
      )}
    </div>
  );
}
