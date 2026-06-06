---
id: stage-1-pulse
stage: 1
title: The pulse
type: mutate
difficulty: easy
branch: spine
parent: stage-0-play
estimate_min: 5
strudel_code: |
  s("bd*4").bank("RolandTR909")
---

## What this is

Build the house heartbeat: one kick on every beat. Four-on-the-floor.

## Break it

- Change `*4` to `*8`. Twice as many kicks per bar. Too much?
- Change `*4` to `*2`. Half as many. Lazier.
- Swap `RolandTR909` for `RolandTR808`. Same beat, deeper kick.
- Try `s("bd*4, hh*8").bank("RolandTR909")`. Layered hats over the kick.

## Listen for

Any house track. Find the steady "thump... thump... thump... thump." That is `bd*4`. Disco gave it to house in the late 1970s. House gave it to everything else.

## History

The four-on-the-floor kick travelled from disco drummers (who played it on a real kick drum) to early Chicago house producers in the 1980s, who programmed it into drum machines and looped it forever. It is the genre's spine. Everything else moves around it.

## Self-test

Without looking, what does `*4` do?

## Next

- Spine: [Stage 2 — Hats + clap](/journey/2/hats-clap)
