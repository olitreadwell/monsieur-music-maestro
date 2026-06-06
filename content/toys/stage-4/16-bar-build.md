---
id: stage-4-16-bar-build
stage: 4
title: 16-bar build
type: mutate
difficulty: stretch
branch: side-quest
parent: stage-4-counting
estimate_min: 12
---

## What you're listening for

An **additive build**: a section of music where new elements are introduced one at a time, every 4 bars, over 16 bars. At bar 1, you might hear only the kick. By bar 16, everything is running. The build creates anticipation: each new layer adds energy until the full arrangement lands.

This structure is a convention in house and techno. When you hear a track that gets progressively fuller over 16 or 32 bars before dropping to the full loop, you are hearing an additive build.

## How to read the code

Notation already introduced:

- `s(...)` plays sounds in a looped sequence.
- `bd*4` is four-on-the-floor kick.
- `~ cp ~ cp` is the backbeat clap.
- `hh*8` is eight hi-hats per bar.
- `,` layers patterns.
- `.bank("RolandTR909")` selects the TR-909 kit.
- `.cpm(128)` sets the tempo.
- `.slow(N)` stretches a pattern to take N bars to complete.
- `.gain(N)` adjusts volume.

This toy introduces two more ideas:

- `.late(N)` delays the **start** of a pattern by N cycles. `.late(4)` means "do not play this line at all for the first 4 bars, then start." This is how you write a delayed entry.
- `.fade(N)` fades a pattern in over N cycles. It is optional here; the important tool is `.late(N)`.

Together, `.late(4)`, `.late(8)`, and `.late(12)` let you schedule the entry of each new layer at bar 4, bar 8, and bar 12 of the 16-bar section.

```strudel
// bd*4             = four-on-the-floor kick, present from bar 1.
// .late(4)         = the clap enters at bar 4 (delayed 4 cycles).
// .late(8)         = the hats enter at bar 8.
// .late(12)        = the open hi-hat accent enters at bar 12.
// .gain(N)         = volume per layer.
// .bank(...)       = TR-909 kit.
// .cpm(128)        = 128 BPM.
stack(
  s("bd*4"),
  s("~ cp ~ cp").late(4).gain(0.9),
  s("hh*8").late(8).gain(0.4),
  s("~ ~ ~ oh").slow(2).late(12).gain(0.7)
).bank("RolandTR909").cpm(128)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste and play. Count bars. At bar 1, only the kick plays. At bar 4, the clap joins. At bar 8, the hats fill in. At bar 12, the open hi-hat phrase-tag appears. By bar 16, all four layers are running. The full groove "drops" at bar 16.

Now break it:

- Remove `.late(...)` from all lines. Everything plays from bar 1: the build disappears and you have a full loop immediately.
- Swap the entry order: put `.late(4)` on hats and `.late(8)` on clap. The arrangement changes character.
- Add a fifth layer, something with `.late(16)` or no `.late()` at all, so it lands precisely when the build completes.
- Try `.cpm(130)`. The build feels shorter because each bar passes faster.

## In the world

Listen to any classic deep house or techno intro from the late 1980s or 1990s. Larry Heard's productions often start with kick only, then add elements at 4-bar intervals. Derrick May's "Strings of Life" (1987) builds from a simple loop with entries spaced across many bars before the piano phrase arrives.

In a club, a DJ might play a track's intro (kick-only) for 8 or 16 bars while the previous track fades. The additive build means the DJ can layer tracks without jarring cuts. The 16-bar block is the DJ's working unit.

## Music theory note

**Additive form** is a compositional structure where texture grows by the addition of independent layers. It is the opposite of **subtractive form** (taking layers away, which creates breakdown sections).

In popular music, arrangements are often described in terms of **layers** and **drops**. A "build" is technically a passage of increasing density or energy. A "drop" is the moment when the full arrangement arrives (often after a brief silence or filter sweep).

The 16-bar block is a standard unit partly because 16 bars of 4/4 at house tempos (around 128 BPM) lasts about 30 seconds, which matches the human attention span for a repeated element before novelty becomes welcome.

## History

The 16-bar build as a structural convention in electronic dance music is rooted in how early house and techno producers worked with Roland drum machines and basic sequencers in Chicago and Detroit in the mid-1980s.

Frankie Knuckles at the Warehouse (Chicago, open from 1977 to 1983) played extended builds by manually editing reel-to-reel tapes of disco records: removing layers by splicing, then adding them back. When drum machines became available, producers could program the same idea directly.

In European techno and progressive house through the 1990s, the build extended to 32 and 64 bars, making the "drop" a longer-anticipated event. Labels like React Records and Bedrock released tracks specifically structured around their builds. The length of a build became a genre marker: minimal techno builds can last minutes; commercial big-room house might resolve in 8 bars.

## Dance and body

Stand and let the build run. During bar 1 through bar 8 (kick and clap only), feel how your body is held back, waiting. When the hats enter at bar 8, notice a small energy release. When the final layer lands at bar 12, notice another. The full drop at bar 16 should feel like a permission to move fully.

That sequence of anticipation and release is what producers design. The build is not decoration. It is the mechanism that makes the drop land.

## Self-test

You hear a track where a new layer enters every 4 bars over 16 bars. How many total layers does the track add during that build, and on which bars do they enter?

## Next

- Back to spine: [Counting](/journey/4/counting)
- Other side-quest: [Phrase tag](/journey/4/phrase-tag)
- Continue: [Stage 5: The low end](/journey/5/bassline)
