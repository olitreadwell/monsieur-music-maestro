---
id: stage-3-afrobeat-clave
stage: 3
title: Afrobeat clave
type: takeapart
difficulty: stretch
branch: afro-house
parent: stage-3-clave
estimate_min: 15
---

## What you're listening for

**Afrobeat** (one word, Lagos 1960s-70s, not to be confused with the broader "Afrobeats" with an s) is built from interlocking percussion parts where no single instrument carries the full rhythm. The guitar, the bass, the drums, and the percussion each play an incomplete piece. Together, the pieces interlock like fingers of two hands and produce a groove that feels continuous but is made of gaps.

This toy takes that idea apart. You will separate the layers, hear each one alone, and then hear what happens when they come back together.

## How to read the code

Two new things in this toy.

**`n("0 1 2...")`** selects which sample from a multi-sample instrument. Many drum banks have several recordings of the same instrument: a conga hit at different pitches or dynamics. `n("0")` plays the first recording, `n("1")` plays the second, and so on. Write the number after the sound name with `.n(...)` or embed it directly as `"soundname:n"`. This toy uses `"conga:0"` and `"conga:1"` to get two different conga tones.

**`s("soundname:n")`** is shorthand for selecting sample number `n` from the bank named `soundname`. So `s("conga:0")` plays the first conga sample and `s("conga:1")` plays the second. It is identical to `s("conga").n(0)`: just shorter. Use whichever reads more clearly.

Everything else you know:

- `s("...")` plays a sound sequence.
- `~` is a rest.
- `stack(...)` layers multiple patterns.
- `.gain(n)` sets volume.
- `.bank("RolandTR909")` swaps kits. Note: conga sounds come from the default Strudel sample library, not the TR-909 kit.

The Afrobeat approach uses **call and response between percussion voices**. Voice A plays where voice B rests, and vice versa. The kick and snare mark macro-time (the 4/4 grid) while percussion fills the micro-spaces.

```strudel
// Afrobeat-influenced interlocking percussion over a house kick.
// s("conga:0")  = first conga tone (lower).
// s("conga:1")  = second conga tone (higher).
// The two conga lines interlock: one plays where the other rests.
// The result suggests the clave without stating it literally.
stack(
  // kick: four-on-the-floor, the house anchor
  s("bd*4").gain(0.9),

  // snare: on beats 2 and 4, loosely (the backbeat keeps 4/4 felt)
  s("~ sd ~ sd").gain(0.6),

  // conga low: hits on steps 1, 4, 7: the tresillo skeleton
  s("conga:0 ~ ~ conga:0 ~ ~ conga:0 ~").gain(0.75),

  // conga high: fills the gaps between the low conga hits
  s("~ conga:1 conga:1 ~ conga:1 conga:1 ~ conga:1").gain(0.6),

  // hi-hat: eight notes, quiet, the time-keeper
  s("hh*8").gain(0.25)
).bank("RolandTR909")
// Note: bank() applies to the named 808/909 sounds (bd, sd, hh).
// conga sounds use Strudel's default sample library regardless of bank.
```

## Try it

Paste in [strudel.cc](https://strudel.cc). Play, then take it apart:

**Step 1: Isolate.** Comment out everything except the low conga line. In Strudel you can put `//` before a line inside `stack(...)` to silence it. Listen to just the low conga: you should hear the tresillo. Add back the high conga and hear the gaps fill in. Then unmute the kick. Each layer reveals something new.

**Step 2: Shift a conga.** Move the high conga one step earlier: change `"~ conga:1 conga:1 ~ conga:1 conga:1 ~ conga:1"` to `"conga:1 ~ conga:1 conga:1 ~ conga:1 conga:1 ~"`. Does the interlock feel tighter or looser?

**Step 3: Thin it out.** Remove the snare and lower all gains to around `0.5`. The pattern becomes sparse. This is closer to the feel of the early Fela Kuti records where the groove is light and the space is part of the sound.

**Step 4: Add the clave explicitly.** Add a fifth line to the stack:
```
s("cp ~ ~ cp ~ ~ cp ~ ~ ~ cp ~ cp ~ ~ ~").gain(0.5),
```
This is the full son clave 3-2. Does it clash with the conga pattern or sit alongside it?

## In the world

**Fela Kuti** (born Fela Anikulapo Kuti, Lagos 1938, died 1997) built Afrobeat in Lagos in the late 1960s and 1970s. He blended Nigerian Yoruba highlife and jazz with political commentary, leading a large band (Africa 70, later Egypt 80) that could have twenty or more musicians on stage. His drummer and chief musical architect was **Tony Allen** (born Lagos 1940, died Paris 2020).

Tony Allen's genius was precisely this interlocking approach. He played drum kit differently from Western rock drummers: the kick, snare, hi-hat, and percussion did not simply reinforce each other: each played against the others' gaps. Allen later described it as "playing across himself." The result was a groove that felt alive and never mechanical.

Modern **Afro house** producers in South Africa, Nigeria, and the diaspora (Black Coffee, Themba, Culoe De Song, and others from the 2000s onward) inherited this sense of interlocking parts. They layered samples and programmed percussion using the same logic: sparse individual voices, dense combined result.

## Music theory note

What you hear here is **polyrhythmic layering** within a single tempo. It is different from a **polyrhythm** (two tempos at once, like 3 against 2 in a 6/8 feel). In this pattern, all voices agree on the tempo and bar length. But each voice has its own rhythmic identity, and together they suggest multiple "lines" moving inside the same time grid.

African musicologists: particularly Kofi Agawu (Ghanaian, Princeton-based): have written at length about how Western notation struggles to capture this quality. The interlocking is an emergent property: neither voice alone contains the groove. The groove lives in the relationship between them.

## History

Tony Allen and Fela Kuti's collaboration produced a documented catalogue of recordings from roughly 1969 to 1979. Key records include *Zombie* (1977), *Expensive Shit* (1975), and *Afrodisiac* (1973), all recorded in Lagos. These records circulated in Black African communities and in the diaspora but were not widely available in mainstream Western markets until the 1990s reissue movement.

After Fela's death in 1997, Allen continued to record and collaborate. His album *Secret Agent* (2009) and his collaboration with Damon Albarn (of Gorillaz) on *The Good, the Bad and the Queen* (2007) introduced him to new audiences. He released *Rejoice* in 2020, weeks before his death.

The Afrobeat influence on Afro house and Afrobeats (with the s) is contested in its details: not all Afro house producers consciously reference Fela or Allen, and many come from Southern and East African traditions with different percussion vocabularies. What they share with Afrobeat is the **layering principle**, not necessarily a direct lineage.

## Dance and body

Afrobeat at live shows: and Afro house on the dance floor: asks your whole body to respond to multiple rhythms at once. The hips might respond to the kick. The shoulders to the high conga. The head to the hat.

Try this: bounce on the kick (four times per bar). Then, while still bouncing, roll your shoulders on the tresillo: three rolls per bar, unevenly spaced. The two movements will fight each other a little and then find a compromise. That compromise is what Afro house dancers call being "in the pocket."

## Self-test

Without looking back: what does Tony Allen mean when he is described as "playing across himself"?

## Next

- Spine: [Stage 3: The clave](/journey/3/clave)
- Other branches:
  - [909 clave: sparse deep house rim](/journey/3/branches/deep/909-clave)
  - [2-step clave: UK garage kick shove](/journey/3/branches/garage/2-step-clave)
