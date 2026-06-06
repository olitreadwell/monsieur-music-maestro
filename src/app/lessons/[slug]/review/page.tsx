import Link from 'next/link';
import { getLessonSets, getLessonSet } from '@/lib/lesson-sets';
import Quiz from '@/components/Quiz';
import Challenge from '@/components/Challenge';
import { notFound } from 'next/navigation';
import OpenPrompt from './OpenPrompt';

export async function generateStaticParams() {
  const sets = await getLessonSets();
  return sets.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const set = await getLessonSet(slug);
  if (!set) return {};
  return { title: `Final review: ${set.title} — monsieur music maestro` };
}

export default async function LessonSetReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const set = await getLessonSet(slug);

  if (!set) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link
          href={`/lessons/${set.slug}`}
          className="inline-flex items-center text-sm text-muted hover:text-fg motion-safe:transition rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          ← {set.title}
        </Link>
      </nav>

      <h1 className="text-4xl font-semibold tracking-tight">
        Final review, {set.title}
      </h1>

      {set.finalReview.quizzes.length > 0 && (
        <section className="mt-12" aria-labelledby="quizzes-heading">
          <h2 id="quizzes-heading" className="text-xl font-semibold mb-6">
            Quizzes
          </h2>
          <div className="space-y-8">
            {set.finalReview.quizzes.map((quiz) => (
              <Quiz key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>
      )}

      {set.finalReview.challenges.length > 0 && (
        <section className="mt-12" aria-labelledby="challenges-heading">
          <h2 id="challenges-heading" className="text-xl font-semibold mb-6">
            Challenges
          </h2>
          <div className="space-y-8">
            {set.finalReview.challenges.map((challenge) => (
              <Challenge key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12" aria-labelledby="open-prompt-heading">
        <h2 id="open-prompt-heading" className="text-xl font-semibold mb-3">
          Reflection
        </h2>
        <p id="open-prompt-description" className="text-muted mb-4 leading-relaxed">
          {set.finalReview.openPrompt}
        </p>
        <OpenPrompt
          labelledBy="open-prompt-heading"
          describedBy="open-prompt-description"
        />
      </section>

      <div className="mt-12">
        <Link
          href={`/lessons/${set.slug}`}
          className="inline-flex items-center min-h-11 text-sm text-accent underline rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Done, back to lesson set
        </Link>
      </div>
    </div>
  );
}
