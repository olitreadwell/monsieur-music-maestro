---
id: stage-5-sub-vs-mid
stage: 5
title: Sub vs mid bass
type: takeapart
difficulty: normal
branch: side-quest
parent: stage-5-bassline
estimate_min: 10
---

## What you're listening for

The difference between **sub-bass** and **mid-bass**. Every bass note has a fundamental frequency (the pitch you name) and a stack of higher **harmonics** (multiples of that frequency that give the sound texture and presence). Sub-bass is the region below about 80 Hz: you feel it as vibration, often more than you hear it as a distinct tone. Mid-bass is roughly 80 to 300 Hz: this is where the body and presence of a bass sound lives, the part you hear clearly on small speakers.

A low-pass filter (`lpf`) is the tool that lets you sculpt which region dominates.

## How to read the code

All notation below was introduced in the bassline toy (Stage 5 spine) or earlier:

- `note(...)` plays pitched notes. `c1` is C in octave 1, very low (sub territory). `c2` is C in octave 2, bass range.
- `.s("bass")` uses the bass sample bank.
- `.lpf(N)` is the **low-pass filter** introduced in the bassline toy. Setting N low (e.g. 80) cuts almost everything above the fundamental, isolating the sub-bass weight. Setting N higher (e.g. 300) lets through more of the mid harmonics, giving the bass presence on small speakers.
- `.gain(N)` adjusts volume per line.

This toy puts two versions of the same bassline in the same stack so you can hear them side by side. The only difference between the two lines is the `lpf` cutoff.

```strudel
// Two basslines, same pitches, different filter settings.
// Line 1: sub-bass — very low cutoff keeps only the fundamental.
// Line 2: mid-bass — higher cutoff keeps harmonics for presence.
//
// note(...)       = pitched note sequence.
// c1              = C in octave 1 (very low, sub range).
// ~ eb1           = silence, then E flat in octave 1.
// .s("bass")      = bass sample bank.
// .lpf(80)        = low-pass filter at 80 Hz: sub-bass only.
// .lpf(300)       = low-pass filter at 300 Hz: mid-bass presence.
// .gain(N)        = volume per line.
// bd*4            = four-on-the-floor kick.
stack(
  s("bd*4").bank("RolandTR909"),
  note("c1 ~ ~ eb1 ~ ~ c1 ~").s("bass").lpf(80).gain(0.9),
  note("c2 ~ ~ eb2 ~ ~ c2 ~").s("bass").lpf(300).gain(0.5)
).cpm(128)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste and play on a device with a subwoofer or decent headphones if possible.

Now break it:

- Remove the `lpf(80)` line from the stack. What you lose is the physical weight in the low end.
- Remove the `lpf(300)` line instead. The bass becomes heavy but loses definition: harder to follow on laptop speakers.
- Raise the sub-bass filter to `.lpf(200)`. More of the harmonics come through, moving the sound from "felt" to "heard."
- Swap `c1` for `c2` on the sub line. Higher pitch, less sub weight, now more mid. The perception shifts from vibration to tone.
- Try `.lpf(50)` on the sub line. At very low cutoffs, the fundamental almost disappears into inaudible rumble. This is intentional in some genres (very deep dub, certain techno) where sub presence is felt rather than heard.

## In the world

Sub-bass became central in UK pirate-radio genres: jungle and drum and bass in the early 1990s, UK garage in the mid-1990s, dubstep from the early 2000s. Sound-system culture imported from Jamaica (through UK reggae and sound clashes) meant that bass was a physical experience, played through speaker stacks large enough to move air in your chest. A dubstep production might place most of its bass energy below 80 Hz, inaudible on standard earbuds but overwhelming on a sound system.

Producers in those genres mix for two contexts: the sound system (where the sub lands) and the radio or stream (where the mid harmonics carry the line to smaller speakers). A well-mixed bassline works in both.

In contrast, most pop production keeps the bass in the mid range (80 to 250 Hz) because the target is phones and laptop speakers. Sub is often cut entirely to preserve headroom.

## Music theory note

Every pitched sound is a **fundamental frequency** plus **harmonics** (also called **overtones**). The fundamental is the pitch you name. Harmonics are multiples of that frequency: for a C at 65 Hz (C2), the harmonics are 130 Hz (2nd harmonic), 195 Hz (3rd), 260 Hz (4th), and so on.

A **low-pass filter** passes frequencies below the cutoff and attenuates (reduces) frequencies above it. Setting `.lpf(80)` on a C2 bassline keeps mainly the fundamental (65 Hz) and removes most harmonics, producing a sub-bass thud. Setting `.lpf(300)` passes the fundamental and the first few harmonics, which is what you perceive as "warmth" or "body" in the sound.

The **sub-bass** region is roughly 20 to 80 Hz. The **bass** region is roughly 80 to 300 Hz. These numbers are approximate and debated; different sources draw the line differently.

## History

The physical experience of sub-bass in popular music traces to **sound-system culture** in Jamaica, beginning in the 1950s and 1960s. Mobile sound systems (powerful speaker stacks on trucks or set up at outdoor dances) competed through bass power. Producers like Lee "Scratch" Perry and later King Tubby developed **dub** production, where bass and drums were stripped out and re-processed with heavy low-end emphasis.

Jamaican immigrants brought sound-system culture to the UK, where it mixed with British record shops and pirate radio in Black communities in London and other cities. By the late 1980s and early 1990s, this bass-weight aesthetic was feeding into jungle, then drum and bass (labels like Moving Shadow and Metalheadz in London, from roughly 1993 onward). UK garage in the mid-to-late 1990s and dubstep from around 2001 continued the lineage.

Dubstep producers like Digital Mystikz, Skream, and Benga (based in south London, active mid-2000s) built tracks where the sub-bass was the primary event. At Fabric or FWD>> in London, the physical impact of the sub was the point of the music, not incidental to it.

## Dance and body

Put on headphones or earbuds and play the patch above. The sub line (`.lpf(80)`) may be nearly inaudible. Now find a speaker with bass response, or use over-ear headphones. The sub line reappears as a felt presence.

On a large sound system, sub-bass at around 40 to 80 Hz is perceived partly through the body's chest and diaphragm, not just through the ears. This is why club music is designed for large speakers: the physical component is part of the musical experience.

Notice how the mid-bass line (`.lpf(300)`) carries the melody and rhythm clearly through smaller speakers, while the sub-bass line provides physical weight on big systems. These are two different jobs done by one instrument.

## Self-test

If you removed all harmonics above 80 Hz from a C2 bass note, what would remain, and why might that be inaudible on laptop speakers?

## Next

- Back to spine: [Bassline](/journey/5/bassline)
- Other side-quest: [Off-beat bass](/journey/5/off-beat-bass)
- Optional deep branch: [Sub stab (deep house)](/journey/5/branches/deep/sub-stab)
