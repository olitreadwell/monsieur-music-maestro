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
      <div className="mb-6">
        <Link href="/" className="text-sm text-muted hover:text-fg transition">
          ← home
        </Link>
      </div>

      <h1 className="text-4xl font-semibold tracking-tight">Lesson sets</h1>
      <p className="mt-3 text-lg text-muted">
        Grouped collections of toys with a final review gate.
      </p>

      {sets.length === 0 ? (
        <p className="mt-12 text-muted/60">No lesson sets yet.</p>
      ) : (
        <ul className="mt-12 space-y-10" role="list">
          {sets.map((s) => (
            <li key={s.slug}>
              <div className="flex items-baseline gap-3 flex-wrap">
                <Link
                  href={`/lessons/${s.slug}`}
                  className="text-xl font-semibold hover:text-accent transition"
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
                className="mt-3 inline-block text-sm text-accent underline"
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
