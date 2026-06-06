---
id: stage-7-filter-build
stage: 7
title: Filter build — sweep the tension
type: mutate
difficulty: normal
branch: side-quest
parent: stage-7-intro-build-drop
estimate_min: 10
---

## What you're listening for

The **filter sweep**: a single, continuous movement of a low-pass filter cutoff from low to high, creating a feeling of rising tension and anticipation. The sound starts muffled and dark, then opens up gradually until the full, bright sound arrives. It is one of the most recognisable devices in house, French house, and techno, and it creates dramatic builds without adding or removing any layers.

## How to read the code

You have used `.lpf(...)` before: it cuts all frequencies above the cutoff value. A low number (e.g., 200) sounds muffled and dark. A high number (e.g., 8000) lets everything through, sounding fully open and bright.

**`.lpf(...)`** can accept a **pattern** as its argument, not just a fixed number. This toy uses a pattern inside `.lpf(...)` to automate the cutoff over time.

**`saw.range(200, 8000).slow(8)`** is a new combination. Let's unpack it:

- **`saw`** is a Strudel signal: a value that rises from 0 to 1 over the course of one cycle, like a sawtooth wave in signal form (not sound). It goes: 0.0, 0.1, 0.2 ... 0.9, 1.0, then back to 0.0 at the start of the next cycle.
- **`.range(200, 8000)`** maps the 0-to-1 signal onto a specific range of values: 0 becomes 200, 1 becomes 8000, and the values in between are linearly spread across that range.
- **`.slow(8)`** stretches this sweep to take 8 cycles (8 bars) to complete. So the filter starts at 200 Hz and opens fully to 8000 Hz over 8 bars, creating a slow, sustained build.

The result: `.lpf(saw.range(200, 8000).slow(8))` is a filter that sweeps from closed to open over 8 bars automatically.

```strudel
// Full groove with an automated filter sweep across 8 bars.
stack(
  // Kick: four-on-the-floor
  s("bd*4").bank("RolandTR909"),

  // Clap on 2 and 4
  s("~ cp ~ cp").bank("RolandTR909"),

  // Hi-hats
  s("hh*8").bank("RolandTR909").gain(0.5),

  // Bass with filter sweep: starts dark, opens over 8 bars
  // saw          = 0-to-1 rising signal, one cycle long
  // .range(200, 8000)  = map to filter cutoff Hz range
  // .slow(8)     = stretch the rise over 8 bars
  note("c2 ~ ~ eb2 ~ ~ g2 ~")
    .s("sawtooth")
    .lpf(saw.range(200, 8000).slow(8))
    .gain(0.6),

  // Chord stab, also filtering up from closed
  note("<c3eb3g3 ab2c3eb3 f2ab2c3 g2bb2d3>")
    .s("piano")
    .slow(2)
    .lpf(saw.range(400, 6000).slow(8))
    .room(0.3)
    .gain(0.5)
)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code. Let it run for 8 full bars and hear the full arc.

Now break it:

- Change `.slow(8)` to `.slow(2)`. The sweep now completes in 2 bars: fast and urgent, like a short DJ build. Compare the feeling.
- Change `.slow(8)` to `.slow(16)`. Very slow opening: almost imperceptible shift. This is a technique in long DJ sets where the energy change is felt rather than heard.
- Replace `saw` with `sine.range(200, 8000).slow(8)`. The `sine` signal moves in a smooth S-curve rather than a straight line, which can sound more organic.
- Try the opposite: start open and filter down. Use `saw.range(8000, 200).slow(8)` to sweep from bright to dark. This is how a **break** can feel: energy draining.
- Add `.lpf(saw.range(800, 8000).slow(4))` to just the hi-hats and hear the top end open up separately from the bass.

## In the world

The filter sweep build is most associated with **French house** of the late 1990s. Daft Punk's tracks like "Da Funk" (1995) and especially "Around the World" (1997) used filter sweeps as a structural element. The Stardust track "Music Sounds Better with You" (1998, produced by Bangalter of Daft Punk plus others) has one of the most iconic filter builds in dance music.

Cassius (Nicolas Debelmas and Philippe Zdar) and Alan Braxe also built tracks around filter sweeps in this era. The technique was available to them through studio equipment (like the Mutronics Mutator or the Sherman Filterbank), but the same effect can be programmed in Strudel in a single line.

Earlier techno producers also used manual filter sweeps in live performance: moving the cutoff knob on a synthesiser or filter unit while the track played. The automation version (programmed into the sequencer) standardised what had been a performance gesture.

## Music theory note

The filter sweep is a **timbre** change, not a **pitch** change. No new notes are added; no notes are removed. The harmonic content of the sound stays the same, but which overtones are audible changes.

A low-pass filter with a low cutoff removes the **harmonics** of a sound, leaving only the fundamental frequencies. As the cutoff rises, harmonics return one by one, from lowest to highest. This is perceived as brightness returning, and brightness is associated with energy and presence. The sweep manipulates this perception continuously.

This is why the filter build works even without any structural change to the arrangement: it uses the brain's sensitivity to timbral change to create a sensation of increasing energy.

## History

The low-pass filter as a musical control comes from **voltage-controlled synthesizers** of the late 1960s and 1970s. Bob Moog's VCF (voltage-controlled filter) and Don Buchla's equivalent designs gave synthesiser players a real-time handle on timbre. Robert Moog designed his ladder filter in 1965, and it became the defining characteristic of Moog synthesizers.

In early electronic music (Wendy Carlos, Tangerine Dream), filter sweeps appeared as compositional elements. By the time house and techno producers had access to affordable filter-equipped synthesisers and drum machines in the 1980s, the sweep was in their vocabulary.

French producers in the late 1990s made the filter sweep an explicit structural device, building whole tracks around the moment when the filter opens fully. This moved the technique from studio craft into listener recognition: people started *expecting* the sweep and experiencing the tension it created.

## Dance and body

The filter sweep builds physical tension in the body the same way a held breath does. As the filter opens, your body wants to move more. The full opening is a release: you can feel it in your jaw unclenching and your arms wanting to rise.

On a dance floor, a filter sweep over 8 bars keeps dancers locked in, waiting for the opening. They move continuously, but you can see the collective tension in how controlled the movement is. When the filter reaches full open (often at the same time as the drop), the release is collective and physical.

Try moving to the filter sweep in this code with your eyes closed. Follow the energy with your arms: let them rise as the filter opens, fall or swing when it reaches full brightness.

## Self-test

Without looking back: what does `saw.range(200, 8000).slow(8)` do step by step? Name each piece.

## Next

- Return to spine: [Stage 8 — Two decks](/journey/8/two-decks)
- Other side-quest: [16-bar section thinking](/journey/7/16-bar-section)
- Optional: [Deep house long build](/journey/7/branches/deep/long-build)
