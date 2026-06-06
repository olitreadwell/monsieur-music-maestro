export type QuizKind = 'multiple-choice' | 'short-answer';

export interface Quiz {
  id: string;
  kind: QuizKind;
  question: string;
  options?: string[];
  correctAnswerIndex?: number;
  correctAnswerPattern?: string;
  explanation: string;
}

export type ChallengeValidator = 'literal' | 'regex' | 'contains';

export interface Challenge {
  id: string;
  prompt: string;
  starterCode: string;
  targetDescription: string;
  validator: ChallengeValidator;
  target: string;
}

export type PuzzleKind = 'reorder' | 'fill-blank';

export interface Puzzle {
  id: string;
  kind: PuzzleKind;
  prompt: string;
  tokens: string[];
  correctSequence: string[];
}

export interface AttemptRecord {
  itemId: string;
  attemptedAt: string;
  correct: boolean;
}

export function useAttempt(_itemId: string): {
  history: AttemptRecord[];
  recordAttempt: (_correct: boolean) => void;
} {
  return { history: [], recordAttempt: () => {} };
}
