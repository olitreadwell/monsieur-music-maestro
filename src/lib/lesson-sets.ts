import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Quiz, Challenge } from '@/lib/quiz';
import { getTree } from '@/lib/toys';

export type LessonSetFormat = 'cultural-deep-dive' | 'concept-across-cultures';

export interface LessonSet {
  slug: string;
  title: string;
  format: LessonSetFormat;
  intro: string;
  toyIds: string[];
  finalReview: {
    quizzes: Quiz[];
    challenges: Challenge[];
    openPrompt: string;
  };
  body: string;
}

const LESSON_SETS_ROOT = path.join(process.cwd(), 'content', 'lesson-sets');

const VALID_FORMATS: LessonSetFormat[] = ['cultural-deep-dive', 'concept-across-cultures'];

function assertField<T>(value: T | undefined | null, name: string, file: string): T {
  if (value === undefined || value === null) {
    throw new Error(`LessonSet ${file}: missing required field "${name}"`);
  }
  return value;
}

function parseLessonSet(file: string, raw: string): LessonSet {
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;

  const slug = assertField(data.slug as string, 'slug', file);
  const title = assertField(data.title as string, 'title', file);
  const format = assertField(data.format as LessonSetFormat, 'format', file);
  const intro = assertField(data.intro as string, 'intro', file);
  const toyIds = assertField(data.toyIds as string[], 'toyIds', file);

  if (!VALID_FORMATS.includes(format)) {
    throw new Error(
      `LessonSet ${file}: invalid format "${format}", expected one of ${VALID_FORMATS.join('|')}`,
    );
  }

  if (!Array.isArray(toyIds)) {
    throw new Error(`LessonSet ${file}: toyIds must be an array`);
  }

  const rawReview = data.finalReview as Record<string, unknown> | undefined;
  if (!rawReview) {
    throw new Error(`LessonSet ${file}: missing required field "finalReview"`);
  }

  const quizzes = (rawReview.quizzes as Quiz[]) ?? [];
  const challenges = (rawReview.challenges as Challenge[]) ?? [];
  const openPrompt = assertField(rawReview.openPrompt as string, 'finalReview.openPrompt', file);

  return {
    slug,
    title,
    format,
    intro: intro.trim(),
    toyIds,
    finalReview: { quizzes, challenges, openPrompt: openPrompt.trim() },
    body: parsed.content.trim(),
  };
}

let cachedSets: LessonSet[] | null = null;

export async function getLessonSets(): Promise<LessonSet[]> {
  if (cachedSets) return cachedSets;

  let files: string[];
  try {
    const entries = await fs.readdir(LESSON_SETS_ROOT, { withFileTypes: true });
    files = entries
      .filter((e) => e.isFile() && e.name.endsWith('.md'))
      .map((e) => path.join(LESSON_SETS_ROOT, e.name));
  } catch (err) {
    const error = err as NodeJS.ErrnoException;
    if (error.code === 'ENOENT') return [];
    throw err;
  }

  const tree = await getTree();
  const sets: LessonSet[] = [];

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const lessonSet = parseLessonSet(file, raw);

    for (const toyId of lessonSet.toyIds) {
      if (!tree.byId.has(toyId)) {
        throw new Error(
          `LessonSet ${file}: toyId "${toyId}" does not exist in the toy tree`,
        );
      }
    }

    sets.push(lessonSet);
  }

  cachedSets = sets;
  return sets;
}

export async function getLessonSet(slug: string): Promise<LessonSet | null> {
  const sets = await getLessonSets();
  return sets.find((s) => s.slug === slug) ?? null;
}
