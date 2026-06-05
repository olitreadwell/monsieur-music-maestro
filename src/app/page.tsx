import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
        monsieur music maestro
      </h1>
      <p className="mt-4 text-lg text-muted">
        An absolute-beginner path to making{' '}
        <span className="text-accent font-medium">house music by writing code</span>{' '}
        (Strudel), plus the listening, theory, dancing, history and DJ skills underneath.
      </p>
      <p className="mt-4 text-sm text-muted">
        AuDHD + ESL friendly. Plain language. Short sessions. Sound before symbol. Build something every time. Afro and Latin music run all the way through.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link href="/journey" className="border border-fg/10 rounded-lg p-6 hover:border-accent transition">
          <div className="text-sm text-muted">centrepiece</div>
          <div className="mt-1 text-xl font-semibold">the journey</div>
          <p className="mt-2 text-sm text-muted">
            9 stages, 10 plain rules, fixed session shape, history thread, move thread, paste-ready Strudel per stage.
          </p>
        </Link>
        <Link href="/cheatsheet" className="border border-fg/10 rounded-lg p-6 hover:border-accent transition">
          <div className="text-sm text-muted">reference</div>
          <div className="mt-1 text-xl font-semibold">strudel cheatsheet</div>
          <p className="mt-2 text-sm text-muted">
            Drum names, mini-notation, paste-ready house + Afro/Latin snippets.
          </p>
        </Link>
        <Link href="/resources" className="border border-fg/10 rounded-lg p-6 hover:border-accent transition">
          <div className="text-sm text-muted">links</div>
          <div className="mt-1 text-xl font-semibold">resources</div>
          <p className="mt-2 text-sm text-muted">
            Free + open-license tutorials, flagged <code>[OPEN]</code> / <code>[FREE]</code> / <code>[PAID]</code>. Plus the research the journey is built on.
          </p>
        </Link>
        <Link href="/practice-log" className="border border-fg/10 rounded-lg p-6 hover:border-accent transition">
          <div className="text-sm text-muted">tool</div>
          <div className="mt-1 text-xl font-semibold">practice log</div>
          <p className="mt-2 text-sm text-muted">
            A spaced-practice session log template.
          </p>
        </Link>
      </div>
    </div>
  );
}
