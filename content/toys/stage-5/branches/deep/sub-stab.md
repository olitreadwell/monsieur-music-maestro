---
id: stage-5-deep-sub-stab
stage: 5
title: Sub stab (deep house)
type: mutate
difficulty: stretch
branch: deep
parent: stage-5-sub-vs-mid
estimate_min: 12
---

## What you're listening for

A **sub stab**: a short, punchy burst of sub-bass that lands in a specific rhythmic position rather than sustaining through a bar. Where a bassline flows across a bar, a sub stab hits once and stops. The space around it is part of the sound.

In deep house, sub stabs create the warmth and low-end push without cluttering the arrangement. Larry Heard (Mr Fingers) and Theo Parrish use this approach: a single low note appears, sits in the mix for a fraction, then disappears, leaving room for the kick and the pads.

## How to read the code

Notation already introduced:

- `note(...)` plays pitched note sequences.
- `.s("bass")` uses the bass sample bank.
- `.lpf(N)` is the low-pass filter.
- `.gain(N)` adjusts volume.
- `s("bd*4")` is four-on-the-floor kick.
- `.bank("RolandTR909")` selects the TR-909 kit.
- `.cpm(N)` sets the tempo.
- `~` is silence.
- `< >` alternates options each bar.

This toy introduces one new method:

- `.cut(N)` assigns a sound to a **cut group**. All sounds in the same cut group (same number N) stop each other when a new hit in the group plays. So `.cut(1)` on a bass note means "when the next note plays, stop this one immediately." Combined with short, staccato note spacing, this makes each note punchy and separated. Without `.cut()`, notes might blur into each other; with it, each stab is crisp.

```strudel
// note(...)        = pitched note sequence.
// c1               = C in octave 1 (deep sub, around 33 Hz).
// ~ ~ c1 ~         = silence, silence, sub stab on beat 3, silence.
// < >              = alternate options each bar.
//                    bar 1: stab on beat 3.
//                    bar 2: stab on beat 3 and beat 4's "and".
// .s("bass")       = bass sample bank.
// .lpf(120)        = very low cutoff: sub range only, minimal harmonics.
// .cut(1)          = cut group 1: each new stab stops the previous one.
// .gain(0.9)       = near full volume.
// bd*4             = four-on-the-floor kick.
// .cpm(120)        = 120 BPM (deep house is often slower than peak-hour).
stack(
  s("bd*4").bank("RolandTR909"),
  note("<~ ~ c1 ~ ~ ~ c1 ~>").s("bass").lpf(120).cut(1).gain(0.9)
).cpm(120)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste and play. The kick runs steadily. The sub stab appears only on beat 3 of bar 1, then on beat 3 and the offbeat of beat 3 in bar 2. Listen to the space around it. The sub is present but does not crowd the arrangement.

Now break it:

- Remove `.cut(1)`. Notes may blur together; the staccato quality is lost.
- Try `note("c1 ~ ~ ~")` (no alternation) for a single sub hit on beat 1 of every bar. Heavier, more constant.
- Change `.lpf(120)` to `.lpf(60)`. At very low cutoff, you are filtering most of the content: the stab becomes almost inaudible on laptop speakers but would be felt on a subwoofer.
- Add a simple pad: `note("<c3eb3g3>").s("sawtooth").room(0.4).gain(0.3).slow(4)` as a third line in the stack. The pad breathes over the sub stabs. This is close to the deep house texture.
- Slow it down: `.cpm(115)`. Deep house sits between 115 and 124 BPM.

## In the world

Larry Heard (recording as Mr Fingers) made "Can You Feel It" in 1986 in Chicago, widely considered one of the founding deep house records. Heard produced alone, using a Roland TR-909, a Roland Juno-106 synthesiser, and a Roland MSQ-700 sequencer. The production is minimal: a slow kick, a deep bass note, a simple chord progression. Almost nothing moves except the bass stab and the chords.

Theo Parrish (Detroit/Chicago, active from the early 1990s) works in a similar space: long, slow, deeply textured tracks where the sub-bass is a deliberate event rather than a constant presence. His approach to production treats space as a compositional tool.

The deep house aesthetic is partly a reaction against busier, higher-energy house styles. The sub stab is an expression of restraint: the bass says one thing, then stops.

## Music theory note

A **stab** in electronic music means a short, percussive sound event, as opposed to a sustained note or held chord. A sub stab is a stab in the sub-bass frequency range.

The **cut group** (`.cut(N)`) is a technical mechanism for producing staccato (short, detached) phrasing on sample-based sounds. Without a cut group, a bass sample might ring through its natural decay length, blurring into the next hit. With a cut group, each new note cuts the previous decay, producing clean separation.

In acoustic music, staccato is produced by the player releasing a note shortly after playing it. In electronic music, the cut group automates this.

## History

**Larry Heard** produced "Can You Feel It" in 1986 under the name Mr Fingers, self-releasing it on his own label in Chicago. Along with a handful of other tracks from the same period (including "Mystery of Love" and "Washing Machine"), it established a style of house music characterised by slow tempos, emotional chord progressions, and minimal arrangements. Heard has said in interviews that he produced the track alone at home in a single session.

**Theo Parrish** is from Washington DC and studied at the American Music Conservatory in Chicago. He began releasing records on Sound Signature (his own label) in the mid-1990s. His production approach is sometimes described as "broken" or "unquantised": beats that drift slightly from strict machine time, creating a human-feeling pulse. Sub-bass in his work is often felt rather than consciously heard.

Both producers belong to a lineage that runs from Chicago house (Trax Records, DJ International Records, mid-1980s) through the concept of deep house as a more introverted, soulful counterpart to the big-room house sound.

## Dance and body

Deep house at 120 BPM is slower than peak-hour house. The body responds differently: instead of the urgent push of a 128 BPM track, the slower tempo allows a more relaxed, fluid movement. The sub stab, arriving once per bar or every other bar, gives the body a low-frequency pulse to tune to that is different from the kick.

Some dancers respond to sub-bass with hip movement rather than foot movement, because the frequency is felt in the lower body. In reggae sound-system dancing, the bass is central; in deep house, the same relationship operates, more quietly.

## Self-test

What does `.cut(1)` do, and how does it change the sound of a bass sample compared to leaving it off?

## Next

- Back to side-quest: [Sub vs mid bass](/journey/5/sub-vs-mid)
- Back to spine: [Bassline](/journey/5/bassline)
