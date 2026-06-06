import Link from 'next/link';
import { getLessonSets } from '@/lib/lesson-sets';
import type { LessonSetFormat } from '@/lib/lesson-sets';

export const metadata = { title: 'Lesson sets: monsieur music maestro' };

const FORMAT_LABELS: Record<LessonSetFormat, string> = {
  'cultural-deep-dive': 'cultural deep-dive',
  'concept-across-cultures': 'concept across cultures',
};

const FORMAT_BADGE_CLASSES: Record<LessonSetFormat, string> = {
  'cultural-deep-dive': 'bg-accent/10 text-accent',
  'concept-across-cultures': 'bg-secondary/20 text-secondary',
};

export default async function LessonsPage() {
  const sets = await getLessonSets();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted hover:text-fg motion-safe:transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          ← home
        </Link>
      </nav>

      <h1 className="font-display italic text-4xl sm:text-5xl tracking-tight">Lesson sets</h1>
      <p className="mt-3 text-lg text-muted">
        Grouped collections of toys with a final review gate.
      </p>

      {sets.length === 0 ? (
        <p className="mt-12 text-muted">No lesson sets yet.</p>
      ) : (
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
          {sets.map((s) => (
            <li key={s.slug}>
              <div className="bg-bg border border-rule rounded-lg p-6 hover:border-accent motion-safe:transition motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform flex flex-col h-full">
                <div className="mb-3">
                  <span
                    className={`inline-block text-xs px-2 py-0.5 rounded-full font-mono ${FORMAT_BADGE_CLASSES[s.format]}`}
                  >
                    {FORMAT_LABELS[s.format]}
                  </span>
                </div>
                <h2 className="font-display italic text-2xl mb-2">
                  <Link
                    href={`/lessons/${s.slug}`}
                    className="hover:text-accent motion-safe:transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    {s.title}
                  </Link>
                </h2>
                <p className="text-sm text-muted leading-relaxed line-clamp-4 flex-1">{s.intro}</p>
                <div className="mt-4">
                  <Link
                    href={`/lessons/${s.slug}`}
                    className="text-accent font-medium hover:underline focus-visible:ring-2 ring-accent rounded-sm"
                    aria-label={`Start lesson set: ${s.title}`}
                  >
                    Start →
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
