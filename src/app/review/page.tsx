import type { Metadata } from 'next';
import { buildReviewIndex } from '@/lib/review';
import ReviewQueue from '@/components/ReviewQueue';

export const metadata: Metadata = {
  title: 'Review — monsieur music maestro',
};

export default async function ReviewPage() {
  const index = await buildReviewIndex();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight mb-4">Review</h1>
      <p className="text-muted mb-10 max-w-prose">
        These are quizzes, challenges, and puzzles you&rsquo;ve done before. They come back at
        growing intervals to make sure the ideas stick. The Leitner box behind this surfaces an item
        1, 3, 7, 14, then 30 days after each correct answer. Get one wrong and it resets to box 1.
      </p>

      <ReviewQueue index={index} />
    </div>
  );
}
