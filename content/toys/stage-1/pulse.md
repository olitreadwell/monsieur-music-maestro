---
id: stage-1-pulse
stage: 1
title: The pulse
type: mutate
difficulty: easy
branch: spine
parent: stage-0-play
estimate_min: 5
challenge:
  id: stage-1-pulse-challenge
  prompt: "Modify the patch to play eight kicks per bar instead of four. Keep the TR-909 kit."
  starterCode: |
    s("bd*4").bank("RolandTR909")
  targetDescription: "Twice as many kicks per bar, even spacing, same kit."
  validator: contains
  target: 'bd*8'
---

## What you're listening for

The **pulse**: one steady, repeated impact you can feel without counting. Four kicks, one per beat, evenly spaced. This is the heartbeat of house music and the spine of most dance music since disco.

## How to read the code

This toy uses two new pieces of Strudel notation. Before the code, here is what each means:

- `bd*4` is **mini-notation** shorthand. The `*4` after a token means "play this token 4 times per bar, evenly spaced." So `bd*4` is "four kicks in one bar." You can replace `4` with any number.
- `.bank("RolandTR909")` is a **method call** on the pattern. `.bank(...)` tells Strudel which drum-machine kit to use for the named sounds. `RolandTR909` is the Roland TR-909, released 1983, the kit you hear in most house and techno records. Other banks include `RolandTR808` (deeper kick, hip-hop and trap) and `RolandTR707` (lighter, popular in early UK electronic).

```strudel
// bd*4   = bass drum, repeated 4 times per bar, evenly spaced.
// .bank("RolandTR909")  = use the Roland TR-909 drum kit for the sounds.
// The TR-909 kick is the canonical house and techno kick.
s("bd*4").bank("RolandTR909")
```

## Try it

Paste in [strudel.cc](https://strudel.cc). Cmd+Enter plays, Cmd+. stops.

Now break it:

- Change `*4` to `*8`. Twice as many kicks. Suddenly busier — does it still feel like a heartbeat, or does it tip into drum 'n' bass?
- Change `*4` to `*2`. Half as many. Lazier, slower-feeling, even at the same tempo. This is closer to hip-hop's "boom-bap" pace.
- Swap `RolandTR909` for `RolandTR808`. Same beat, deeper and rounder kick. The 808 is the kick of trap and Miami bass; the 909 is the kick of house.
- Try `s("bd*4, hh*8").bank("RolandTR909")`. The comma inside the quotes means **play two patterns at the same time** (this is called layering or polyphony). Hats over the kick: the bare floor of a house track.

## In the world

Find any house, techno, disco, or Eurodance track. Within ten seconds you'll hear the steady "thump... thump... thump... thump." That is `bd*4`.

On a dance floor, the four-on-the-floor kick is the thing your feet step on. DJs lock two tracks together precisely on these kicks. Producers build every other element around it.

## Music theory note

What you've built is **four-on-the-floor**: one kick per quarter note in 4/4 time. Each kick lands on a **downbeat** (beats 1, 2, 3, 4 of the bar).

The contrast you'll meet later is **syncopation**: rhythms that pull *away* from the downbeats. The four-on-the-floor kick is the un-syncopated anchor that makes syncopated parts feel like syncopation.

## History

The steady four-on-the-floor kick came into popular music through disco drummers in the mid-1970s. Earl Young of MFSB and the Trammps is often named as the player who locked it in. Disco gave it to early house producers in Chicago in the mid-1980s (Frankie Knuckles, Larry Heard, Marshall Jefferson), who programmed it into machines like the TR-909 and looped it indefinitely.

From house it travelled into techno (Detroit, late 1980s), then into Eurodance, big-room, deep house, and on. It is one of the most consequential rhythmic decisions in 20th-century pop music.

## Dance and body

Stand. Bounce on the balls of your feet, one bounce per kick. That bounce is what dancers call **finding the one**. House DJs assume you can find the one — every transition, every drop, every build is timed against it.

Try clapping on every kick. Then try clapping on **every other** kick (beats 2 and 4 — the same beats your snare landed on in Stage 0). Notice how your body wants to do one or the other, not both at once.

## Self-test

Without looking back: what does `*4` do? And what does `,` inside the quotes do?

## Next

- Spine: [Stage 2 — Hats and clap](/journey/2/hats-clap)
