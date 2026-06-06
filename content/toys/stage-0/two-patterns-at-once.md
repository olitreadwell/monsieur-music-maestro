---
id: stage-0-two-patterns-at-once
stage: 0
title: Two patterns at once
type: mutate
difficulty: easy
branch: side-quest
parent: stage-0-play
estimate_min: 5
---

## What you're listening for

**Layered voices**: two rhythmic patterns playing at the same time, each on its own sounds. When you hear a kick underneath a clap, those are two separate rhythmic lines running in parallel. In music theory, this is called **rhythmic polyphony**: "poly" means many, "phony" means voices.

A single `s("bd hh sd hh")` is one voice. Two voices stacked together is the first step toward a real drum arrangement.

## How to read the code

You already know `s(...)`, `bd`, `hh`, `sd`, and `cp` from the Play toy.

This toy introduces one new operator: the **comma** `,` inside the pattern string.

- A comma `,` inside the pattern string tells Strudel to run two patterns at the same time, in the same bar. Everything before the comma is voice 1. Everything after is voice 2. Both voices loop together, perfectly in sync.

So `s("bd hh, sd cp")` means: "play kick-hat-kick-hat at the same time as snare-clap-snare-clap." Each voice has its own four slots fitted into one bar. The result is four beats of kick-plus-snare, hat-plus-clap, kick-plus-snare, hat-plus-clap.

```strudel
// s(...)           = play these sounds in order, looped.
// "bd hh, sd cp"   = two voices in one string.
//   bd hh          = voice 1: kick then hat, repeated.
//   ,              = the comma stacks voice 2 on top.
//   sd cp          = voice 2: snare then clap, at the same time as voice 1.
s("bd hh, sd cp")
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code. Cmd+Enter plays, Cmd+. stops.

Now break it:

- Listen once to `s("bd hh, sd cp")`. Now listen to `s("bd hh")` alone (remove `, sd cp`). Then `s("sd cp")` alone. Now put both together again. Your ear should be able to separate the two voices even when layered.
- Add a third voice: `s("bd hh, sd cp, oh*4")`. Three voices at once. `oh*4` is "open hi-hat, four times per bar": the `*4` shorthand is from the Pulse toy.
- Try `s("bd*4, cp*2")`. Four kicks and two claps. Where do the claps land? Count them: they land on beats 1 and 3.
- Try `s("bd*4, ~ cp ~ cp")`. The `~` is silence, introduced in Stage 2, but try it here. A `~` in a slot means "no sound in this slot." This pattern plays: kick on every beat, clap only on beats 2 and 4. That is the house backbeat.

## In the world

Every drum arrangement ever recorded is a set of layered voices. A live drummer plays kick, snare, and hi-hat all at once: three voices from one person. A drum machine separates them into independent channels, each programmable. The comma in Strudel mirrors that channel separation.

In a club, the DJ's monitor sends the kick into the floor and the clap into the air. These two timbres hit your body differently because they are different voices, even at the same tempo.

## Music theory note

Running two or more rhythmic lines simultaneously is called **rhythmic polyphony** or **polyrhythm** (when the voices have different metric cycles). When the voices share the same beat grid (as they do here), the more precise term is **rhythmic stratification**: each voice moves at its own rate within the shared pulse.

The hi-hat and the kick drum are the most common paired voices in popular music, and the relationship between them varies enormously by genre. House: hats faster than kicks. Reggaeton: clave-shaped pattern over the kick. Funk: syncopated snare against the kick.

## History

Multi-voice rhythm is ancient. West African drumming ensembles have played interlocking polyrhythmic patterns for centuries, each drummer holding one part of a larger rhythmic texture. The drum kit, invented in the United States in the early 20th century, was a single player's attempt to hold multiple percussion voices at once.

Drum machines like the Roland TR-909 made separate programming of each voice standard practice. Each drum sound gets its own programmable track. House producers exploited this by giving each voice a different pattern length or emphasis, creating complexity from simple parts.

## Dance and body

Try moving to both voices at once. Step your feet on the kick (beats 1, 2, 3, 4). Clap your hands on the clap (beats 2 and 4 in the `~ cp ~ cp` version). Now your body is playing both voices physically. That split: feet steady, hands on the backbeat: is the fundamental physical grammar of dance to house music.

## Self-test

Without looking back: what does a comma do inside a Strudel pattern string?

## Next

- Spine: [Stage 1: Pulse](/journey/1/pulse)
- Side-quests in Stage 0: [Explore sounds](/journey/0/explore-sounds)
