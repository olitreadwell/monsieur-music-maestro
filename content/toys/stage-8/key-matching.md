---
id: stage-8-key-matching
stage: 8
title: Key matching and the Camelot wheel
type: mutate
difficulty: normal
branch: side-quest
parent: stage-8-two-decks
estimate_min: 10
---

## What you're listening for

Two tracks playing in the same key, or in keys that are harmonically compatible. When keys match or are related, the melodies and chords of the two tracks blend rather than clash. When they do not match, even a perfect beatmatch sounds wrong: like two singers singing in different keys at the same time.

## How to read the code

The music theory concept here is the **circle of fifths**: an arrangement of all 12 keys in Western music where each key shares a maximum of notes with its neighbours. Two adjacent keys on the circle differ by only one note, making them easy to mix without harmonic clash.

The **Camelot wheel** is a DJ-friendly re-labelling of the circle of fifths. Instead of using key names (which require music theory knowledge), it assigns each key a number (1-12) and a letter (A for minor, B for major). Compatible keys are neighbours on the wheel: same number, same letter type, or one step clockwise/anticlockwise.

This toy uses Strudel's `note(...)` to compare two patterns in **compatible keys** (C minor and F minor, which are one step apart on the circle of fifths) versus two patterns in **incompatible keys** (C minor and F-sharp minor, which are at the furthest point apart).

No new Strudel notation. The musical comparison is the point.

```strudel
// Compatible keys: C minor and F minor
// C minor Camelot: 5A | F minor Camelot: 4A
// These are one step apart on the Camelot wheel: smooth blend
stack(
  // Pattern in C minor
  note("<c3eb3g3 ab2c3eb3>")
    .s("piano").slow(2).room(0.3).gain(0.5),

  // Pattern in F minor: one step away on the Camelot wheel
  // F minor triad: F, Ab, C
  note("<f2ab2c3 db3f3ab3>")
    .s("piano").slow(2).room(0.3).gain(0.5).delay(0.02)
)
```

```strudel
// Incompatible keys: C minor and F-sharp minor
// C minor Camelot: 5A | F-sharp minor Camelot: 11A
// These are far apart: clash
stack(
  // Pattern in C minor
  note("<c3eb3g3 ab2c3eb3>")
    .s("piano").slow(2).room(0.3).gain(0.5),

  // Pattern in F-sharp minor: very far on the Camelot wheel
  // F-sharp minor triad: F#, A, C#
  note("<fs3a3cs4 d3fs3a3>")
    .s("piano").slow(2).room(0.3).gain(0.5).delay(0.02)
)
```

## Try it

Open [strudel.cc](https://strudel.cc).

1. Paste the first code block (compatible keys). Listen for several cycles. Do the two patterns blend or fight?
2. Paste the second code block (incompatible keys). Listen. The clash should be audible, even with the same rhythmic pattern.
3. The `.delay(0.02)` staggers the second pattern's notes very slightly so you can hear them separately. Remove the `.delay(0.02)` from the compatible version: full simultaneous blend.
4. Change the second pattern in the compatible version to use a key two steps away: **G minor** (Camelot 6A). G minor triad: `g3 bb3 d4`. Listen to whether the blend is tighter or looser than F minor.

## In the world

Harmonic mixing became widely discussed in DJ culture after the Camelot wheel was popularised through software tools (Mixed In Key was released in 2007 and brought the system to a large audience). Before that, experienced DJs matched keys by ear or by trial and error.

DJs who are known for exceptional harmonic mixing include Sasha (UK, progressive house), whose sets move through key relationships smoothly, and Carl Cox (UK, techno), who combines key matching with energy management across long sets.

In Afro house and Amapiano, harmonic mixing is particularly valued because both genres use melodic vocals and chordal keyboards prominently: a key clash is immediately obvious to listeners who are following the melody.

## Music theory note

The **circle of fifths** organises keys so that each step clockwise is a fifth higher (or a fourth lower). C is at the top. Moving clockwise: G, D, A, E, B, F-sharp/G-flat, D-flat, A-flat, E-flat, B-flat, F, back to C. The outer ring is major keys; the inner ring is their **relative minors** (the minor key that shares the same key signature).

**Relative major/minor**: every major key has a relative minor that shares all the same notes. C major and A minor share all the same notes (no sharps or flats). G major and E minor share all the same notes (one sharp: F-sharp). Relative keys are maximally compatible because they are literally the same set of pitches.

On the Camelot wheel, relative major and relative minor are given the same number (e.g., 8B = C major, 8A = A minor). A DJ can move between them without any harmonic clash at all.

## History

Mark Davis developed the Camelot Harmonic Mixing system in the 1990s and began sharing it with DJs through workshops and online materials in the late 1990s and early 2000s. He founded Camelot Sound and later licensed the key-detection technology that became the basis for Mixed In Key.

The circle of fifths itself is ancient in Western music theory. Johann David Heinichen, a German music theorist, published a version of it in 1711. Johann Mattheson, a Hamburg-based composer and theorist, published a similar diagram around the same time. The concept was refined and standardised through the 18th century.

The DJ application of the circle of fifths is entirely modern: it takes a 300-year-old theoretical tool and repurposes it as a practical checklist for a real-time decision. That repurposing is a good example of how music theory concepts stay useful across completely different contexts.

## Dance and body

Harmonic clash between two tracks sounds wrong physically, not just intellectually. Your body knows before your brain names it. If you are dancing and the mix suddenly feels wrong even though the tempo is fine, key clash is likely the cause.

Listen to the incompatible-keys code and move to it. Notice where in your body the clash registers. Then switch to the compatible version and feel the difference. This is your body doing music theory.

## Self-test

Without looking back: what is a relative minor, and why are a major key and its relative minor maximally compatible for DJ mixing?

## Next

- Return to spine: [Two decks](/journey/8/two-decks)
- Other side-quest: [Headphone cue](/journey/8/headphone-cue)
