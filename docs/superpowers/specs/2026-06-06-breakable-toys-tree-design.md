---
date: 2026-06-06
topic: breakable-toys-tree
status: approved
owner: olitreadwell
---

# Breakable Toys Tree — Design

## What this is

A learning journey tree for the monsieur-music-maestro site. Each node is a "breakable toy": a small, runnable Strudel patch with prompts to mutate, take apart, or solve as a constraint task. The tree maps the existing 9-stage house-by-strudel journey into ~50 small toys with optional side-quests, difficulty variants, and late-stage genre branches.

## Goals

1. Make every stage of the journey concrete, runnable, and breakable in under 15 minutes per toy.
2. Show the whole map at a glance (the tree), so the learner can pick where to dive in.
3. Scale to 50+ toys without code changes; new toys are MD files dropped into a stage dir.
4. Stay readable in plain MD if the Next app is ever removed.

## Non-goals

- Embedded Strudel REPL in v1 (phase 2).
- User progress tracking, accounts, login (out of scope).
- Pedagogical theory docs (already in `learning-journey.md`).

## Architecture

### File layout

```
content/toys/
  stage-0/
    play.md
    explore-sounds.md
  stage-1/
    pulse.md
    tempo-shifts.md
  ...
  stage-3/
    clave.md
    branches/
      afro-house/
        afrobeat-clave.md
      deep/
        909-clave.md
      garage/
        2-step-clave.md
  ...

src/
  app/
    journey/
      page.tsx           tree view (replaces current /journey)
      [stage]/
        page.tsx         stage overview (lists toys in stage)
        [slug]/
          page.tsx       single toy
    layout.tsx           unchanged
  lib/
    toys.ts              walks content/toys/, returns typed tree
    doc.tsx              existing, kept for narrative pages
  components/
    StrudelBlock.tsx     code + copy + open-in-strudel
    TreeNav.tsx          sidebar nav on toy pages
    ToyCard.tsx          row in tree view
```

### Build flow

`lib/toys.ts` walks `content/toys/` at build time. Each MD file is parsed (frontmatter + body) into a `Toy` record. A `getTree()` function returns the full tree as a structured object. All routes are static-prerendered via `generateStaticParams`.

### Routes

| Route | Renders |
|---|---|
| `/` | Full tree view (was `/journey`, promoted to home per user request 2026-06-06) |
| `/journey/[stage]` | Stage overview page (list of toys in stage) |
| `/journey/[stage]/[slug]` | Single toy page |
| `/journey/narrative` | Existing `learning-journey.md` long-read, relocated |

The previous `/` (link-card hub) and `/journey` (narrative loader) are gone. Their navigation role is taken over by a global `DropdownNav` in the layout that links to cheatsheet, resources, practice-log, and narrative.

## Toy schema

Frontmatter fields:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Globally unique slug, e.g. `stage-1-pulse` |
| `stage` | number 0-8 | yes | Numeric stage |
| `title` | string | yes | Display title |
| `type` | `mutate` \| `challenge` \| `takeapart` | yes | Toy semantics |
| `difficulty` | `easy` \| `normal` \| `stretch` | yes | |
| `branch` | `spine` \| `side-quest` \| genre slug | yes | Tree position |
| `parent` | id or null | yes | Prereq, null for `stage-0-play` |
| `estimate_min` | number | yes | Time estimate |
| `strudel_code` | string (YAML literal block) | optional | Patch body, surfaced via StrudelBlock |

Body structure (MD):

```
## What this is
One-line setup.

## Break it
- Prompt 1
- Prompt 2
- Prompt 3

## Listen for
What to hear in real tracks once you've done this.

## History
One paragraph, plain language, culturally accurate.

## Self-test
One question. No answer below it.

## Next
- Spine: [link]
- Side-quests: [links]
```

## Tree page (`/journey`)

Plain monospace ASCII tree. No graphviz, no JS framework.

```
Stage 0 — Play
● play                                  (mutate · easy · 3min)
  ↳ explore-sounds                      (side-quest · easy · 5min)

Stage 1 — Pulse
● pulse                                 (mutate · easy · 5min)
  ↳ tempo-shifts                        (side-quest · normal · 8min)

Stage 3 — Clave
● clave                                 (mutate · normal · 10min)
  ↳ branches
    ├─ afro-house · afrobeat-clave      (takeapart · stretch · 15min)
    ├─ deep · 909-clave                 (mutate · normal · 10min)
    └─ garage · 2-step-clave            (challenge · stretch · 12min)
```

Rules:

- Spine toys prefixed `●`.
- Side-quests prefixed `↳` indented under their parent stage.
- Genre branches grouped under `↳ branches`, sub-grouped by branch slug.
- Each row is a link to its toy page.
- One-line meta inline: `(type · difficulty · estimate)`.
- Renders as a pure server component, zero client JS.

## Toy page (`/journey/[stage]/[slug]`)

Layout:

- Sidebar (left, desktop): `TreeNav` — compact tree, current toy highlighted, collapsible.
- Main (right): title, meta line, body (MD render).
- Prev/Next nav at bottom, derived from spine order.
- Mobile: `TreeNav` collapses to a top dropdown.

MD body renders through the existing `Doc` component. The frontmatter `strudel_code` field, if present, is hoisted out and rendered above the body via the `StrudelBlock` component.

## StrudelBlock component (phase 1)

```tsx
<StrudelBlock code={...}>
  <pre><code className="font-mono">{code}</code></pre>
  <button onClick={copy}>Copy</button>
  <a href={`https://strudel.cc/?code=${encoded}`} target="_blank">Open in strudel.cc</a>
</StrudelBlock>
```

- Client component (needs `useState` for copy feedback).
- Encodes the patch to the strudel.cc URL param format.
- Copy uses the Clipboard API.
- Phase 2 (future spec): swap to in-page iframe REPL component.

## Authoring workflow

- Add a toy: create `content/toys/stage-N/<slug>.md` with the schema above.
- Restructure: move files; frontmatter `parent` updates ripple to tree.
- `lib/toys.ts` validates frontmatter shape at build time and errors on missing/invalid fields.
- A `Toy` TS type is exported from `lib/toys.ts` for use in components.

## Phase 1 deliverable

- `lib/toys.ts` with walk + types.
- All three route files.
- All three components.
- Two seed toys: `stage-0/play.md`, `stage-1/pulse.md`.
- Current `/journey` becomes `/journey/narrative`.
- Tree view at `/journey` works with the two seed toys.
- Build clean, deploys to `monsieur-music-maestro-dev.vercel.app`.

## Phase 2+ (out of this spec)

- Fill remaining 48ish toys.
- Build the reusable Strudel REPL iframe component.
- Add a search box to the tree page.
- Add a "what's next" suggester based on recently-completed toys (requires progress tracking, separate spec).

## Open risks

1. **Strudel patch accuracy.** Some patches may not sound as described. Iterating live in browser per the agreed "full send, fix bugs" workflow.
2. **History claims.** Cultural origins (clave, afrobeat, garage) need to be accurate. Flag anything that feels paraphrased rather than known.
3. **Genre branch scope.** Late-game subtrees could balloon. Cap each genre branch at 3 toys initially.
