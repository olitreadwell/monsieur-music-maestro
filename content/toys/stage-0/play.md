---
id: stage-0-play
stage: 0
title: Play
type: mutate
difficulty: easy
branch: spine
parent: null
estimate_min: 5
quiz:
  id: stage-0-play-quiz
  kind: multiple-choice
  question: "In `s('bd hh sd hh')`, what does each space-separated token represent?"
  options:
    - "A separate bar of music."
    - "A single beat (one slot) in the pattern."
    - "A tempo marker."
    - "A volume change."
  correctAnswerIndex: 1
  explanation: "Each token is one slot in the pattern. Four tokens spread across one bar of 4/4 time, so each token sits on one beat."
---

## What you're listening for

A **pattern**. Music is sound arranged in time. Here, four hits, evenly spaced, four beats per bar. This is the skeleton of nearly every pop, rock, and dance song you've heard.

## How to read the code

We're going to use **Strudel**, a free in-browser tool for making sound patterns. Strudel uses a small notation:

- `s(...)` is a function that means **sound**. Whatever pattern you write in the quotes becomes a sequence of sounds.
- Inside the quotes, each space-separated token is one **slot** in the pattern. Four slots = one bar of 4 beats.
- Each token is the **name of a drum hit**. The names come from the Roland TR-808 drum machine (1980):
  - `bd` = **bass drum** (the low kick)
  - `hh` = **hi-hat** (the metallic tick)
  - `sd` = **snare drum** (the sharp crack)
  - `cp` = **clap**
  - `oh` = **open hi-hat** (the sustained, ringing tick)

So `s("bd hh sd hh")` reads: "play kick, hat, snare, hat: one per beat, looped forever."

```strudel
// s    = play these sounds in order, looped.
// bd   = bass drum (kick).
// hh   = hi-hat (closed).
// sd   = snare drum.
// Four slots = one bar of 4/4 time.
s("bd hh sd hh")
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code above. Cmd+Enter (or Ctrl+Enter) plays, Cmd+. stops.

Now break it:

- Swap `bd` for `cp`. Same shape, different feel.
- Add a fifth slot: `s("bd hh sd hh cp")`. Strudel stretches the four-beat grid to fit five.
- Replace `sd` with `oh`. The "answer" sound climbs higher.

## In the world

Listen to the start of nearly any pop or rock track. Tap one finger on each kick. That tap is the **beat**. Four taps per loop is one **bar**.

In a club, dancers' feet step on the kick. At a rock show, the crowd's clap usually lands on the snare.

## Music theory note

What you've made is one **bar** of **4/4 time**: four beats per bar, with the quarter note as the unit. 4/4 is the most common time signature in popular music.

The `bd hh sd hh` shape is the bones of a **backbeat**: kick on beats 1 and 3, snare on beats 2 and 4. The accent on 2 and 4 (rather than 1 and 3) is what gives the pattern its rocking feel.

## History

The names `bd`, `sd`, `hh` come from the Roland TR-808 (released 1980) and TR-909 (released 1983), Japanese drum machines that ended up shaping hip-hop, house, techno, R&B, and pop. The labels Roland printed on the pads became the labels everyone uses.

The backbeat itself is older. Drummers in 1940s and 1950s rhythm and blues, Earl Palmer prominent among them, accented beats 2 and 4 in a way that travelled into rock and roll, soul, funk, disco, and house.

## Dance and body

Stand up. On `bd`, drop your weight a little. On `sd`, bounce. Without thinking, you'll find "1". That's the **pulse**: the felt-not-counted base under everything else.

## Self-test

Without looking back: what's the difference between a beat and a bar?

## Next

- Spine: [Stage 1: Pulse](/journey/1/pulse)
