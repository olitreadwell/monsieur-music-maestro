'use client';

import { useState, useRef, useEffect } from 'react';
import type { Challenge as ChallengeT } from '@/lib/quiz';
import { useAttempt, validateChallenge } from '@/lib/quiz';

export default function Challenge({ challenge }: { challenge: ChallengeT }) {
  const { recordAttempt } = useAttempt(challenge.id);
  const [code, setCode] = useState(challenge.starterCode);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const feedbackRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (result !== null && feedbackRef.current) {
      feedbackRef.current.focus();
    }
  }, [result]);

  function handleTest() {
    const correct = validateChallenge(code, challenge);
    setResult(correct ? 'correct' : 'incorrect');
    recordAttempt(correct);
  }

  function handleReset() {
    setCode(challenge.starterCode);
    setResult(null);
  }

  function buildStrudelUrl(): string {
    const encoded = encodeURIComponent(code);
    return `https://strudel.cc/?code=${encoded}`;
  }

  return (
    <div className="rounded-lg bg-neutral-50 p-5 mt-4 border border-neutral-200">
      <p className="text-base font-semibold mb-1">{challenge.prompt}</p>
      <p className="text-sm text-neutral-600 mb-3">{challenge.targetDescription}</p>

      <label htmlFor={`challenge-${challenge.id}`} className="sr-only">
        Strudel code editor
      </label>
      <textarea
        id={`challenge-${challenge.id}`}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={8}
        spellCheck={false}
        className="w-full rounded border border-neutral-400 bg-neutral-900 px-3 py-2 font-mono text-sm text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleTest}
          className="min-h-11 rounded bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 motion-safe:transition-colors"
        >
          Test
        </button>
        <a
          href={buildStrudelUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-11 inline-flex items-center rounded border border-neutral-400 px-4 py-2 text-sm hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 motion-safe:transition-colors"
        >
          Open in player (opens in new tab)
        </a>
        {result !== null && (
          <button
            type="button"
            onClick={handleReset}
            className="min-h-11 rounded border border-neutral-400 px-3 py-2 text-sm hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 motion-safe:transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {result !== null && (
        <p
          ref={feedbackRef}
          aria-live="polite"
          tabIndex={-1}
          className={`mt-3 font-semibold ${result === 'correct' ? 'text-green-700' : 'text-red-700'}`}
        >
          {result === 'correct'
            ? '✓ Looks good — attempt recorded.'
            : '✗ Not quite — check your code and try again.'}
        </p>
      )}
    </div>
  );
}
