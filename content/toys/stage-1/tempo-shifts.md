---
id: stage-1-tempo-shifts
stage: 1
title: Tempo shifts
type: mutate
difficulty: normal
branch: side-quest
parent: stage-1-pulse
estimate_min: 8
---

## What you're listening for

**Tempo** — how fast the pulse is. Tempo is measured in **BPM**: beats per minute. Double the BPM and the music feels twice as fast. Halve it and it feels twice as slow.

Different dance genres sit in different tempo ranges, and those ranges are not arbitrary — they map to how human bodies naturally want to move. This toy lets you dial the BPM and feel those ranges in your body.

## How to read the code

You already know `s(...)`, `bd*4`, and `.bank(...)` from the Pulse toy.

This toy introduces one new method: `.cpm(N)`.

- `.cpm(N)` stands for **cycles per minute**. A "cycle" in Strudel is one loop of the pattern (here, one bar). So `.cpm(120)` tells Strudel to loop the pattern 120 times per minute.
- Because the pattern is one bar of 4 beats, `cpm` equals `BPM` in this case: `.cpm(120)` = 120 beats per minute.
- N can be any positive number. Strudel defaults to 60 cpm (which sounds like 60 BPM — very slow) if you don't set it.

So `s("bd*4").bank("RolandTR909").cpm(120)` reads: "play four kicks per bar, using the TR-909 kit, at 120 loops (bars) per minute."

```strudel
// s("bd*4")          = bass drum, 4 times per bar.
// .bank("RolandTR909") = use the Roland TR-909 drum kit.
// .cpm(120)          = run the pattern at 120 cycles per minute (= 120 BPM).
s("bd*4").bank("RolandTR909").cpm(120)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code. Cmd+Enter plays, Cmd+. stops.

Now break it — each value below is a real genre's home tempo:

- `.cpm(110)` to `.cpm(120)` — this is **disco** territory (1970s). Slower and warmer. Your feet step at a leisurely pace.
- `.cpm(120)` to `.cpm(128)` — **house** (mid-1980s to now). The feel changes from a walk to a march.
- `.cpm(125)` to `.cpm(140)` — **techno** and **trance**. Harder, more insistent.
- `.cpm(170)` or above — **drum 'n' bass** and **jungle** (1990s UK). This tempo is extreme. Your ear stops interpreting the kick as a step and starts hearing something frantic.
- Try `.cpm(75)`. This is near **hip-hop** territory. The kick is very slow and heavy. Compare with `.cpm(150)` — same number of kicks, very different feeling.

## In the world

DJs use tempo as a tool. A DJ opening a club night might start at 120 BPM and gradually push to 128 over three hours, accelerating the crowd's energy without anyone noticing the shift. The transition from one tempo zone to another is audible if you jump straight from 110 to 130 — which is why DJs mix incrementally.

Streaming data from Spotify and Beatport confirms these tempo clusters as real patterns: listeners do group genres by tempo, and dancers' bodies respond differently at different rates.

## Music theory note

Tempo is notated in scores as **BPM** (beats per minute) or with Italian terms: *Largo* (very slow), *Andante* (walking pace), *Allegro* (fast), *Presto* (very fast). Classical music doesn't have fixed BPM targets for genres the way dance music does — a Beethoven symphony might mark *Allegro* and leave interpretation to the conductor.

In electronic music, fixed, machine-locked tempo is the norm. The TR-909 ran at a precise digital clock, not a human drummer's interpretation of "Allegro." That precision is part of what makes house feel different from live jazz or funk.

## History

Disco in the mid-1970s settled around 110 to 120 BPM — fast enough to dance, slow enough to feel luxurious. When Chicago producers began making house in the early 1980s, they pushed the tempo slightly higher and locked it with drum machines. Frankie Knuckles at the Warehouse and Ron Hardy at the Music Box played and sometimes programmed at 125 to 128 BPM.

Detroit techno (Derrick May, Kevin Saunderson, Juan Atkins) pushed toward 130 to 138 BPM in the late 1980s. UK jungle and drum 'n' bass in the early 1990s — artists like Goldie, LTJ Bukem, Roni Size — jumped to 160 to 180 BPM by halving the bar length relative to the bass, which created the characteristic "jump-up" feel.

## Dance and body

Stand up. Play the pattern at `.cpm(100)`. Step left-right to the kick. Now change to `.cpm(130)` while still stepping. Notice when the steps start to feel hurried. Now try `.cpm(80)`. The steps get almost too slow — you have to choose between stepping every kick or every other kick.

Your body has a **preferred tempo range** for natural stepping, roughly 110 to 135 BPM. This is one reason house music feels natural to dance to: it sits exactly in that window.

## Self-test

Without looking back: what does `.cpm(N)` control, and name two genres with their approximate BPM ranges.

## Next

- Spine: [Stage 2 — Hats and clap](/journey/2/hats-clap)
- Side-quests in Stage 1: [808 vs 909](/journey/1/808-vs-909)
