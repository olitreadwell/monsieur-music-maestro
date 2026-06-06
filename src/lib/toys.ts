import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Quiz, Challenge, Puzzle } from '@/lib/quiz';

export type ToyType = 'mutate' | 'challenge' | 'takeapart';
export type Difficulty = 'easy' | 'normal' | 'stretch';

export interface Toy {
  id: string;
  stage: number;
  title: string;
  type: ToyType;
  difficulty: Difficulty;
  branch: string;
  parent: string | null;
  estimate_min: number;
  strudel_code?: string;
  body: string;
  slug: string;
  routePath: string;
  quiz?: Quiz;
  challenge?: Challenge;
  puzzle?: Puzzle;
}

export interface Stage {
  number: number;
  spine: Toy[];
  sideQuests: Toy[];
  branches: Record<string, Toy[]>;
}

export interface Tree {
  stages: Stage[];
  byId: Map<string, Toy>;
  bySlug: Map<string, Toy>;
  allToys: Toy[];
}

const TOYS_ROOT = path.join(process.cwd(), 'content', 'toys');
const TOY_TYPES: ToyType[] = ['mutate', 'challenge', 'takeapart'];
const DIFFICULTIES: Difficulty[] = ['easy', 'normal', 'stretch'];

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

function assertField<T>(value: T | undefined, name: string, file: string): T {
  if (value === undefined || value === null) {
    throw new Error(`Toy ${file}: missing required field "${name}"`);
  }
  return value;
}

function parseToy(file: string, raw: string): Toy {
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;

  const id = assertField(data.id as string, 'id', file);
  const stage = assertField(data.stage as number, 'stage', file);
  const title = assertField(data.title as string, 'title', file);
  const type = assertField(data.type as ToyType, 'type', file);
  const difficulty = assertField(data.difficulty as Difficulty, 'difficulty', file);
  const branch = assertField(data.branch as string, 'branch', file);
  const estimate_min = assertField(data.estimate_min as number, 'estimate_min', file);
  const parent = (data.parent as string | null | undefined) ?? null;
  const strudel_code = data.strudel_code as string | undefined;

  if (!TOY_TYPES.includes(type)) {
    throw new Error(`Toy ${file}: invalid type "${type}", expected one of ${TOY_TYPES.join('|')}`);
  }
  if (!DIFFICULTIES.includes(difficulty)) {
    throw new Error(
      `Toy ${file}: invalid difficulty "${difficulty}", expected one of ${DIFFICULTIES.join('|')}`,
    );
  }
  if (typeof stage !== 'number' || stage < 0 || stage > 8) {
    throw new Error(`Toy ${file}: stage must be a number 0-8, got ${stage}`);
  }

  const slug = path.basename(file, '.md');
  const routePath = `/journey/${stage}/${slug}`;

  const quizRaw = data.quiz as Record<string, unknown> | undefined;
  let quiz: Quiz | undefined;
  if (quizRaw !== undefined) {
    if (typeof quizRaw.id !== 'string' || !quizRaw.id) {
      throw new Error(`Toy ${file}: quiz.id must be a non-empty string`);
    }
    const validQuizKinds = ['multiple-choice', 'short-answer'];
    if (typeof quizRaw.kind !== 'string' || !validQuizKinds.includes(quizRaw.kind)) {
      throw new Error(
        `Toy ${file}: quiz.kind must be one of ${validQuizKinds.join('|')}, got ${String(quizRaw.kind)}`,
      );
    }
    if (typeof quizRaw.question !== 'string' || !quizRaw.question) {
      throw new Error(`Toy ${file}: quiz.question must be a non-empty string`);
    }
    if (typeof quizRaw.explanation !== 'string' || !quizRaw.explanation) {
      throw new Error(`Toy ${file}: quiz.explanation must be a non-empty string`);
    }
    quiz = quizRaw as unknown as Quiz;
  }

  const challengeRaw = data.challenge as Record<string, unknown> | undefined;
  let challenge: Challenge | undefined;
  if (challengeRaw !== undefined) {
    if (typeof challengeRaw.id !== 'string' || !challengeRaw.id) {
      throw new Error(`Toy ${file}: challenge.id must be a non-empty string`);
    }
    if (typeof challengeRaw.prompt !== 'string' || !challengeRaw.prompt) {
      throw new Error(`Toy ${file}: challenge.prompt must be a non-empty string`);
    }
    const validValidators = ['literal', 'regex', 'contains'];
    if (
      typeof challengeRaw.validator !== 'string' ||
      !validValidators.includes(challengeRaw.validator)
    ) {
      throw new Error(
        `Toy ${file}: challenge.validator must be one of ${validValidators.join('|')}, got ${String(challengeRaw.validator)}`,
      );
    }
    challenge = challengeRaw as unknown as Challenge;
  }

  const puzzleRaw = data.puzzle as Record<string, unknown> | undefined;
  let puzzle: Puzzle | undefined;
  if (puzzleRaw !== undefined) {
    if (typeof puzzleRaw.id !== 'string' || !puzzleRaw.id) {
      throw new Error(`Toy ${file}: puzzle.id must be a non-empty string`);
    }
    const validPuzzleKinds = ['reorder', 'fill-blank'];
    if (
      typeof puzzleRaw.kind !== 'string' ||
      !validPuzzleKinds.includes(puzzleRaw.kind)
    ) {
      throw new Error(
        `Toy ${file}: puzzle.kind must be one of ${validPuzzleKinds.join('|')}, got ${String(puzzleRaw.kind)}`,
      );
    }
    if (typeof puzzleRaw.prompt !== 'string' || !puzzleRaw.prompt) {
      throw new Error(`Toy ${file}: puzzle.prompt must be a non-empty string`);
    }
    puzzle = puzzleRaw as unknown as Puzzle;
  }

  return {
    id,
    stage,
    title,
    type,
    difficulty,
    branch,
    parent,
    estimate_min,
    strudel_code,
    body: parsed.content.trim(),
    slug,
    routePath,
    ...(quiz !== undefined && { quiz }),
    ...(challenge !== undefined && { challenge }),
    ...(puzzle !== undefined && { puzzle }),
  };
}

let cached: Tree | null = null;

export async function getTree(): Promise<Tree> {
  if (cached) return cached;

  let files: string[] = [];
  try {
    files = await walk(TOYS_ROOT);
  } catch (err) {
    const error = err as NodeJS.ErrnoException;
    if (error.code === 'ENOENT') return emptyTree();
    throw err;
  }

  const allToys: Toy[] = [];
  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    allToys.push(parseToy(file, raw));
  }

  const byId = new Map<string, Toy>();
  const bySlug = new Map<string, Toy>();
  for (const toy of allToys) {
    if (byId.has(toy.id)) throw new Error(`Duplicate toy id: ${toy.id}`);
    byId.set(toy.id, toy);
    bySlug.set(toy.slug, toy);
  }

  const stagesMap = new Map<number, Stage>();
  for (let n = 0; n < 9; n++) {
    stagesMap.set(n, { number: n, spine: [], sideQuests: [], branches: {} });
  }

  for (const toy of allToys) {
    const stage = stagesMap.get(toy.stage);
    if (!stage) throw new Error(`Toy ${toy.id}: stage ${toy.stage} out of range 0-8`);
    if (toy.branch === 'spine') stage.spine.push(toy);
    else if (toy.branch === 'side-quest') stage.sideQuests.push(toy);
    else {
      stage.branches[toy.branch] ??= [];
      stage.branches[toy.branch].push(toy);
    }
  }

  const stages = [...stagesMap.values()].sort((a, b) => a.number - b.number);

  cached = { stages, byId, bySlug, allToys };
  return cached;
}

export async function getToy(stage: number, slug: string): Promise<Toy | null> {
  const tree = await getTree();
  const toy = tree.bySlug.get(slug);
  if (!toy || toy.stage !== stage) return null;
  return toy;
}

function emptyTree(): Tree {
  const stages: Stage[] = [];
  for (let n = 0; n < 9; n++) {
    stages.push({ number: n, spine: [], sideQuests: [], branches: {} });
  }
  return { stages, byId: new Map(), bySlug: new Map(), allToys: [] };
}

export const STAGE_TITLES: Record<number, string> = {
  0: 'Play',
  1: 'Pulse',
  2: 'Hats + clap',
  3: 'Clave',
  4: 'Counting',
  5: 'Low end',
  6: 'Colour',
  7: 'Shape',
  8: 'Play it out',
};
