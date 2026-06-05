# monsieur-music-maestro — agent context

## What this repo is

Public Vercel deploy of one learning journey. Five markdown docs in `content/music/`, rendered as Next.js routes. **Not** a private PKM. Anything committed here goes to the public web.

## Source of truth

The `content/music/*.md` files are a **copy fork** from `~/oli/art/music/` (Oli's private PKM at `github.com/olitreadwell/oli`). The canonical originals live there. This repo is the render layer.

**Update flow:** PKM → here via copy. Not the other way around. If a doc gets edited in this repo directly, port the change back to `~/oli/art/music/` so the PKM stays canonical.

## Privacy gate

Before committing any new content here, ask: does this belong on the public web? If unsure, keep it in the PKM until Oli decides.

Do **not** copy across:
- frontmatter with `privacy: private` or `privacy: encrypted`
- anything from `~/oli/relocation/`, `~/oli/health/`, `~/oli/finance/`, `~/oli/journaling/`
- dated journal entries
- session notes, voice-memo transcripts

The five files currently shipping are all `privacy: soft` and were authored for public consumption.

## How the journey was built

The journey leans on a separate research base in the PKM:
`~/oli/learning/interactive-learning/` — Oli's catalogue of how humans learn, what good interactive learning looks like, and reusable lesson patterns. Two verbs: **CONTRIBUTE** (add research) and **GENERATE** (build a journey).

If you are asked to extend, rewrite, or branch the journey, **read that base first**. The pedagogy notes drive the journey's session shape; the patterns drive the step structure.

### interactive-learning inventory (mirror of `~/oli/learning/interactive-learning/CLAUDE.md`)

Track this here so the next agent doesn't have to crawl the PKM. Keep it in sync when the PKM changes.

```
~/oli/learning/interactive-learning/
├── README.md            human entry — what the base is for
├── CLAUDE.md            two-verb agent protocol (CONTRIBUTE / GENERATE)
├── pedagogy/            the learning science (4 notes)
│   ├── spaced-repetition-and-retrieval.md
│   ├── cognitive-load-and-scaffolding.md
│   ├── mastery-and-feedback.md
│   └── motivation-flow-and-deliberate-practice.md
├── platforms/           teardowns of what good looks like (5 notes)
│   ├── anki.md
│   ├── khan-academy.md
│   ├── neetcode.md
│   ├── bootcamps-and-apprenticeships.md
│   └── interactive-coding-platforms.md
├── patterns/            reusable interactive-lesson designs (3 notes)
│   ├── learning-journey-tree.md
│   ├── interactive-toy-apps.md
│   └── recall-checks-and-decks.md
└── journeys/            generated journeys land here
    └── TEMPLATE.md      scaffold for a new journey
```

When that inventory changes (new pedagogy note, new platform teardown, new pattern, new journey landed), update this section to match. The PKM's `~/oli/learning/interactive-learning/CLAUDE.md` is the source of truth — copy from it, don't invent.

## Adding a route for a new doc

1. Drop the markdown file in `content/music/` (or a new `content/<topic>/` dir).
2. Add the slug to the `DocSlug` union in `src/lib/doc.tsx`.
3. Create `src/app/<slug>/page.tsx` that calls `loadDoc('<slug>')`.
4. Add a nav link in `src/app/layout.tsx`.
5. Add a row to the table in `README.md`.

## Style

- No em dashes.
- Banned: delve, intricate, tapestry, pivotal, underscore, landscape (metaphor), foster, testament, enhance, crucial, multifaceted, synergy, juxtapose, epitomise, encapsulate, burgeoning.
- Conventional Commits, under 72 chars, present tense, no period.
- Never include `Co-Authored-By` in commit messages.
