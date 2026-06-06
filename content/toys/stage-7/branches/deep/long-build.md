---
id: stage-7-deep-long-build
stage: 7
title: Deep house — the slow build
type: mutate
difficulty: stretch
branch: deep
parent: stage-7-filter-build
estimate_min: 15
---

## What you're listening for

A **slow build** in deep house: where energy rises over 32 or even 64 bars, so gradually you barely notice it happening until you realise you are in a completely different emotional place than when you started. Deep house does not shout. It breathes you in.

## How to read the code

All notation here is from earlier toys. The new idea is using very slow automation values to create almost imperceptible change.

**`.slow(16)`** on a filter sweep means the cutoff takes 16 full bars to open from dark to bright. Combined with a reverb that stays large throughout, the effect is a fog slowly lifting rather than a dramatic sweep.

**`.room(...)`** you have seen. A value of `0.7` or higher creates a very large, spacious reverb: the sound feels like it is in a cathedral rather than a club. Deep house uses large reverbs to create atmosphere and to make sparse sounds feel full.

The code is intentionally sparse. Deep house trusts silence and space.

```strudel
// Deep house slow build: sparse groove, large reverb, slow filter opening.
// Let this run for 32+ bars. The change is barely noticeable bar to bar.
stack(
  // Kick: steady and quiet, letting the groove breathe
  s("bd*4").bank("RolandTR909").gain(0.7),

  // No clap in the first section: space instead of backbeat

  // Hats: quieter and sparser than usual
  s("hh*4").bank("RolandTR909").gain(0.25),

  // Bass: slow filter opening over 16 bars, large reverb
  // sat        = signal rising 0 to 1 over 1 cycle
  // .range(120, 2400)  = filter sweeps from very dark to open
  // .slow(16)  = the sweep takes 16 full bars
  note("c2 ~ ~ eb2 ~ ~ g2 ~")
    .s("sawtooth")
    .lpf(saw.range(120, 2400).slow(16))
    .room(0.6)
    .gain(0.5),

  // Pad: entering late (in real arrangement, fade this in manually)
  note("<c3eb3g3 ab2c3eb3>")
    .s("supersaw")
    .slow(4)
    .attack(1.2)
    .release(3)
    .lpf(1000)
    .room(0.7)
    .gain(0.25)
)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code. Let it run for 2 full minutes without touching anything. Listen to what changes.

Now break it:

- Change `.slow(16)` on the bass filter to `.slow(4)`. The build becomes more dramatic and faster. Compare how each tempo of change feels.
- Change `.gain(0.7)` on the kick to `.gain(0.4)`. Even quieter. Does the groove still hold?
- Remove the pad entirely. The track becomes even more minimal. This is a Larry Heard approach: just kick, sparse hat, bass.
- Add back `s("~ cp ~ cp")` at `.gain(0.35)` (quiet) after 16 bars. The clap entering late creates an "arrival" feeling: suddenly the groove has a reference point it did not have before.

## In the world

Larry Heard (Mr Fingers) recorded "Can You Feel It" and "Mystery of Love" (both 1985-86) in his Chicago apartment with a drum machine, a synth, and a cassette recorder. These tracks have extremely sparse arrangements: minimal kick, simple bass, large reverb, almost no top end. The build is not in layering new sounds; it is in the emotional accumulation of the same sparse sounds repeating with slight variations.

This approach influenced all of deep house, UK garage, and eventually much of the ambient and lo-fi genres of the 2000s and 2010s. The lesson is that density of sound and depth of feeling are not the same thing.

## Music theory note

The **sustain pedal** in classical piano performance holds notes to blur into each other, creating a wash. Deep house uses reverb the same way: sustained reverb tails overlap, creating a continuous harmonic blur that fills the space between events. This makes sparse patterns sound full.

## History

Deep house as a named genre solidified in Chicago and New York in the late 1980s, defined by a mood more than a tempo or technical feature. The mood was: contemplative, spiritual, soulful. It drew from gospel (the call-and-response structure of the build), from jazz (the spacious, harmonic depth), and from soul (the emotional directness).

Larry Heard, Frankie Knuckles, Kerri Chandler, and Frankie Feliciano in New Jersey all made tracks that fit this mood. The "slow build" was one of their primary structural tools: invite the listener in slowly, then bring them fully inside before they realise it.

## Dance and body

Move to this code with no goal: just let your body find what the music invites. Deep house rewards slow movement: rolling your head, shifting weight gradually, eyes closed. It is not music for athletic footwork. It is music for presence.

Notice when the filter sweep reaches its midpoint (around bar 8): your body may want to respond before the build is complete. That anticipation is the music doing its job.

## Self-test

Without looking back: what is the name of the Chicago producer most associated with minimal, atmospheric deep house, and which two tracks from around 1985-86 define his early sound?

## Next

- Return to stage-7 spine: [Intro, build, drop](/journey/7/intro-build-drop)
- Continue to Stage 8: [Two decks](/journey/8/two-decks)
