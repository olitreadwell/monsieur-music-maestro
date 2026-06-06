'use client';

import { useState, useRef, useEffect } from 'react';
import type { Quiz as QuizT } from '@/lib/quiz';
import { useAttempt } from '@/lib/quiz';

export default function Quiz({ quiz }: { quiz: QuizT }) {
  const { recordAttempt } = useAttempt(quiz.id);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [shortAnswer, setShortAnswer] = useState('');
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const feedbackRef = useRef<HTMLParagraphElement>(null);

  // Move focus to feedback when it appears
  useEffect(() => {
    if (result !== null && feedbackRef.current) {
      feedbackRef.current.focus();
    }
  }, [result]);

  function handleReset() {
    setSelectedIndex(null);
    setShortAnswer('');
    setResult(null);
  }

  function handleSubmitMultipleChoice() {
    if (selectedIndex === null) return;
    const correct = selectedIndex === quiz.correctAnswerIndex;
    setResult(correct ? 'correct' : 'incorrect');
    recordAttempt(correct);
  }

  function handleSubmitShortAnswer() {
    const trimmed = shortAnswer.trim().toLowerCase();
    if (!trimmed) return;
    let correct = false;
    if (quiz.correctAnswerPattern) {
      try {
        const re = new RegExp(quiz.correctAnswerPattern, 'i');
        correct = re.test(trimmed);
      } catch {
        correct = trimmed === quiz.correctAnswerPattern.toLowerCase();
      }
    }
    setResult(correct ? 'correct' : 'incorrect');
    recordAttempt(correct);
  }

  const isAnswered = result !== null;

  return (
    <div className="rounded-lg bg-neutral-50 p-5 mt-4 border border-neutral-200">
      {quiz.kind === 'multiple-choice' && (
        <fieldset disabled={isAnswered}>
          <legend className="text-base font-semibold mb-3">{quiz.question}</legend>
          <div className="flex flex-col gap-2">
            {(quiz.options ?? []).map((option, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`quiz-${quiz.id}`}
                  value={i}
                  checked={selectedIndex === i}
                  onChange={() => setSelectedIndex(i)}
                  className="accent-indigo-600"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {quiz.kind === 'short-answer' && (
        <div>
          <label htmlFor={`short-${quiz.id}`} className="block text-base font-semibold mb-3">
            {quiz.question}
          </label>
          <input
            id={`short-${quiz.id}`}
            type="text"
            value={shortAnswer}
            onChange={(e) => setShortAnswer(e.target.value)}
            disabled={isAnswered}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isAnswered) handleSubmitShortAnswer();
            }}
            className="w-full rounded border border-neutral-400 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2"
            placeholder="Your answer..."
          />
        </div>
      )}

      {!isAnswered && (
        <button
          type="button"
          onClick={
            quiz.kind === 'multiple-choice' ? handleSubmitMultipleChoice : handleSubmitShortAnswer
          }
          disabled={
            quiz.kind === 'multiple-choice' ? selectedIndex === null : shortAnswer.trim() === ''
          }
          className="mt-4 min-h-11 rounded bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800 disabled:bg-neutral-300 disabled:text-neutral-600 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 motion-safe:transition-colors"
        >
          Check answer
        </button>
      )}

      {isAnswered && (
        <div className="mt-4 space-y-2">
          <p
            ref={feedbackRef}
            aria-live="polite"
            tabIndex={-1}
            className={`font-semibold ${result === 'correct' ? 'text-green-700' : 'text-red-700'}`}
          >
            {result === 'correct' ? '✓ Correct' : '✗ Not quite'}
          </p>
          <p className="text-sm text-neutral-800">{quiz.explanation}</p>
          <button
            type="button"
            onClick={handleReset}
            className="min-h-11 rounded border border-neutral-400 px-3 py-1.5 text-sm hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 motion-safe:transition-colors"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
