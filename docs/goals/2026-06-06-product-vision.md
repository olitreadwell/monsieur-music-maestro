---
date: 2026-06-06
status: active
owner: olitreadwell
---

# Product vision

Monsieur Music Maestro is a single-user music-learning website that starts at preschool-level music intuition and walks toward mastery. The destination is broad: music theory, music history, dance, and DJ craft. The vehicles are Strudel (live-coded music), global Afro and Latin music as the cultural through-line, and house music as the engaging anchor (the genre the learner already loves).

## Constraints

- **Audience**: one user (Oli). No accounts, no auth, no multi-user state.
- **Starting point**: preschool-level. Assume no prior music vocabulary.
- **Accessibility**: WCAG 2.2 AA+ minimum. Real a11y, not lip service.
- **Devices**: mobile-first. The site has to feel right on a phone before it feels right on a laptop.
- **Connectivity**: offline-first. The user should be able to read articles and run patches without a connection.
- **Storage**: progress lives in `localStorage`. No server.

## Progress mechanisms

The learner should be able to:

1. Click **"I read this article"** at the bottom of every page — marks the toy as read.
2. Complete **quizzes** — multiple-choice or short-answer, validated client-side.
3. Complete **challenges** — modify a Strudel patch to achieve a stated effect, validated by tests.
4. Solve **puzzles** — drag-drop, reordering, pattern-matching games.
5. See **progress** — a checkmark next to completed toys on the tree; per-stage completion bar; overall completion percentage.

Tests run client-side. The user submits, the page evaluates, gives feedback, records the attempt.

## Spaced repetition

Challenges and quizzes should resurface on a spaced-repetition cadence (Leitner-box style) so the learner re-meets concepts at increasing intervals. Stored in `localStorage`.

## Critique-level design

The page design itself should hold up to a critique. Typography, spacing, motion, hierarchy, semantic markup, focus states. Frontend-design and web-design-guidelines skills should be applied per route.

## Phase plan

The work breaks down into ordered phases. Each phase should be ship-able on its own.

| Phase | Title | Why |
|---|---|---|
| A | Progress tracking foundation | Lowest-risk, immediate user value. "I read this" + ✓ on tree + per-stage progress. |
| B | a11y AA+ pass + mobile-first review | Foundation for everything else. Audit + fixes before more features. |
| C | First quiz prototype on one toy | Prove the validator pattern + spaced-repetition data shape on a single toy before scaling. |
| D | Offline + PWA | Service worker, manifest, cached assets. |
| E | Preschool layer | Even-earlier intro toys (or restructure stage 0). Adjust assumptions in existing toys. |
| F | Critique-level design pass | Per-route design polish using frontend-design + web-design-guidelines. |
| G | More challenges + puzzles + spaced-repetition queue | Scale C to many toys, surface re-meets, build the cadence. |

Each phase produces a working artifact and gets merged + deployed before the next starts.
