# monsieur music maestro

Public deploy of an absolute-beginner journey for **making house music by writing code** (Strudel), plus the listening, theory, dancing, history and DJ skills underneath. AuDHD + ESL friendly: plain language, short sessions, sound before symbol, build something every time. Afro and Latin music run all the way through.

## live

[monsieur-music-maestro.vercel.app](https://monsieur-music-maestro.vercel.app) (Vercel auto-deploys `main`)

## what's here

| Route           | Source markdown                       | What it is                                                          |
| --------------- | ------------------------------------- | ------------------------------------------------------------------- |
| `/`             | `src/app/page.tsx`                    | Landing, links to the four docs                                     |
| `/journey`      | `content/music/learning-journey.md`   | **Centrepiece.** 9 stages, 10 rules, session shape, paste-ready Strudel per stage |
| `/cheatsheet`   | `content/music/strudel-cheatsheet.md` | Drum names, mini-notation, house + Afro/Latin snippets              |
| `/resources`    | `content/music/resources.md`          | Free + open-license tutorials, flagged `[OPEN]` / `[FREE]` / `[PAID]` |
| `/practice-log` | `content/music/practice-log-template.md` | Spaced-practice session log template                             |

## stack

Next.js 16, React 19, TypeScript, Tailwind 4, pnpm. Markdown rendered with `react-markdown` + `remark-gfm`. No client-side JS for the docs (server-rendered).

## commands

| Script           | What it does          |
| ---------------- | --------------------- |
| `pnpm dev`       | local dev server      |
| `pnpm build`     | production build      |
| `pnpm start`     | run production build  |
| `pnpm lint`      | eslint                |
| `pnpm typecheck` | tsc --noEmit          |

## content source

The five markdown files in `content/music/` are a **copy fork** of `~/oli/art/music/` in Oli's private PKM. The canonical originals live there; this repo is the public render so the journey can ship to Vercel without exposing the rest of the PKM. Updates flow PKM → here via copy, not the other way around.

The journey itself was built on top of the research base in `~/oli/learning/interactive-learning/`. See `CLAUDE.md` for the index.

## deploy

- Hosting: Vercel
- Manual: `vercel --prod`
- Preview: `vercel`
- Auto: push to `main`

## License

This project is released under the GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later). See LICENSE for the full text.

The choice of AGPL is downstream of the project's use of [Strudel](https://strudel.cc) (also AGPL-3.0), which provides the in-page music REPL. AGPL allows us to bundle Strudel directly into pages while keeping the source open.

## Attribution

- Strudel (https://strudel.cc, AGPL-3.0): the in-browser music notation and runtime that powers every playable patch on this site. Maintained at https://codeberg.org/uzu/strudel.
- The drum-machine sound names (`bd`, `sd`, `hh`, etc.) come from Roland Corporation's TR-808 and TR-909 drum machines.
