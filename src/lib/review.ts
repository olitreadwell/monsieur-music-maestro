import type { Quiz, Challenge, Puzzle } from '@/lib/quiz';
import { getTree } from '@/lib/toys';
import { getLessonSets } from '@/lib/lesson-sets';

export interface ReviewItemSource {
  kind: 'toy' | 'lesson-set';
  toyId?: string;
  lessonSetSlug?: string;
  title: string;
  route: string;
}

export interface ReviewItemRef {
  itemId: string;
  kind: 'quiz' | 'challenge' | 'puzzle';
  item: Quiz | Challenge | Puzzle;
  source: ReviewItemSource;
}

export interface ReviewIndex {
  [itemId: string]: ReviewItemRef;
}

export async function buildReviewIndex(): Promise<ReviewIndex> {
  const index: ReviewIndex = {};

  const tree = await getTree();
  for (const toy of tree.allToys) {
    const source: ReviewItemSource = {
      kind: 'toy',
      toyId: toy.id,
      title: toy.title,
      route: toy.routePath,
    };

    if (toy.quiz) {
      index[toy.quiz.id] = {
        itemId: toy.quiz.id,
        kind: 'quiz',
        item: toy.quiz,
        source,
      };
    }

    if (toy.challenge) {
      index[toy.challenge.id] = {
        itemId: toy.challenge.id,
        kind: 'challenge',
        item: toy.challenge,
        source,
      };
    }

    if (toy.puzzle) {
      index[toy.puzzle.id] = {
        itemId: toy.puzzle.id,
        kind: 'puzzle',
        item: toy.puzzle,
        source,
      };
    }
  }

  const lessonSets = await getLessonSets();
  for (const ls of lessonSets) {
    const source: ReviewItemSource = {
      kind: 'lesson-set',
      lessonSetSlug: ls.slug,
      title: ls.title,
      route: `/lessons/${ls.slug}`,
    };

    for (const quiz of ls.finalReview.quizzes) {
      index[quiz.id] = {
        itemId: quiz.id,
        kind: 'quiz',
        item: quiz,
        source,
      };
    }

    for (const challenge of ls.finalReview.challenges) {
      index[challenge.id] = {
        itemId: challenge.id,
        kind: 'challenge',
        item: challenge,
        source,
      };
    }
  }

  return index;
}
