import Link from 'next/link';
import { getLessonSets } from '@/lib/lesson-sets';
import type { LessonSetFormat } from '@/lib/lesson-sets';

export const metadata = { title: 'Lesson sets — monsieur music maestro' };

const FORMAT_LABELS: Record<LessonSetFormat, string> = {
  'cultural-deep-dive': 'cultural deep-dive',
  'concept-across-cultures': 'concept across cultures',
};

export default async function LessonsPage() {
  const sets = await getLessonSets();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted hover:text-fg motion-safe:transition rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          ← home
        </Link>
      </nav>

      <h1 className="text-4xl font-semibold tracking-tight">Lesson sets</h1>
      <p className="mt-3 text-lg text-muted">
        Grouped collections of toys with a final review gate.
      </p>

      {sets.length === 0 ? (
        <p className="mt-12 text-muted">No lesson sets yet.</p>
      ) : (
        <ul className="mt-12 space-y-10">
          {sets.map((s) => (
            <li key={s.slug}>
              <div className="flex items-baseline gap-3 flex-wrap">
                <Link
                  href={`/lessons/${s.slug}`}
                  className="text-xl font-semibold hover:text-accent motion-safe:transition rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  {s.title}
                </Link>
                <span className="text-xs px-2 py-0.5 rounded-full border border-fg/20 text-muted font-mono">
                  {FORMAT_LABELS[s.format]}
                </span>
              </div>
              <p className="mt-2 text-muted leading-relaxed">{s.intro}</p>
              <Link
                href={`/lessons/${s.slug}`}
                className="mt-3 inline-flex items-center min-h-11 text-sm text-accent underline rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                aria-label={`Start lesson set: ${s.title}`}
              >
                Start set →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
