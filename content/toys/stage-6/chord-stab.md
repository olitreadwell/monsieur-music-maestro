---
id: stage-6-chord-stab
stage: 6
title: The chord stab
type: mutate
difficulty: normal
branch: spine
parent: stage-5-bass-mood
estimate_min: 10
puzzle:
  id: stage-6-chord-stab-puzzle
  kind: fill-blank
  prompt: "Complete the C minor triad. A minor triad is built from a root, a minor third (3 semitones up), and a perfect fifth (7 semitones up). Fill in the missing middle note: `c3 ___ g3`."
  tokens:
    - "d3"
    - "eb3"
    - "e3"
    - "f3"
  correctSequence:
    - "eb3"
  explanation: "A minor third above C is E-flat (3 semitones: C to C#, C# to D, D to Eb). E-flat gives the triad its minor, darker quality. E natural (4 semitones) would produce a major third and a brighter major triad."
---

## What you're listening for

A **chord stab**: a short, punchy chord hit that lands like a percussion hit, not a sustained wash. You hear it in house, disco, and funk as the "sting" that lands between or on top of beats, adding harmonic colour without getting in the way of the rhythm. When three notes hit at once and cut short, they create a jab of harmony.

## How to read the code

This toy introduces several things.

**Chord notation.** A chord is three or more notes played at the same time. In Strudel's `note(...)`, you write a chord as a group of note names squished together without spaces inside the string: `c3eb3g3` means "play C, E-flat, and G all at the same pitch moment, at octave 3." Octave numbers follow each note directly: `c3` is middle C area, `eb3` is E-flat in the same octave, `g3` is G in the same octave.

**Angle brackets.** You met these briefly in Stage 4 for alternating patterns. In `note("<c3eb3g3 ab2c3eb3>")`, the angle brackets `< >` mean "play one item per cycle." So in cycle 1 you hear the first chord, in cycle 2 the second chord, and so on. Each cycle is one bar.

**`.s("piano")`** is a method that tells Strudel which sample bank to use for the sound. Where `.bank("RolandTR909")` sets the drum kit for drum sounds, `.s(...)` on a `note(...)` pattern sets the instrument timbre. `"piano"` gives a short, bright attack that sounds like a piano stab.

**`.slow(2)`** stretches the pattern to take twice as long per cycle. This means the full chord progression takes two bars to complete, giving it more space.

**A triad** is the simplest chord: three notes stacked in a specific pattern of intervals. The chord `c3 eb3 g3` is a **minor triad**: root (C), minor third (E-flat, three semitones up), fifth (G, seven semitones from root). The minor third is what gives it its darker, more tense feeling.

**A "stab"** as a rhythmic idea means the chord is short and accented, almost percussive. The note duration is cut short rather than allowed to ring out.

```strudel
// note(...)     = play pitched notes (not drum names)
// "<...>"       = angle brackets: play one item per cycle, looped
// c3eb3g3       = C minor triad: C, E-flat, G in octave 3
// ab2c3eb3      = Ab major triad voicing: A-flat (octave 2), C, E-flat
// f2ab2c3       = F minor triad: F (octave 2), A-flat, C
// g2bb2d3       = G minor triad: G (octave 2), B-flat, D
// .s("piano")   = use the piano sample bank for timbre
// .slow(2)      = stretch to 2 bars per full chord cycle
// .room(0.3)    = add 30% reverb for a little space
// .gain(0.5)    = play at half volume so it sits under the kick
note("<c3eb3g3 ab2c3eb3 f2ab2c3 g2bb2d3>")
  .s("piano")
  .slow(2)
  .room(0.3)
  .gain(0.5)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code. Cmd+Enter (or Ctrl+Enter) plays, Cmd+. stops.

Now break it:

- Remove `.slow(2)`. The progression now cycles through all four chords in one bar. Too fast? That is how a rapid stab sequence works.
- Change `.room(0.3)` to `.room(0.8)`. Much more reverb: the stabs now blur together. Compare the dry stab (`room(0)`) with the wet one.
- Add the four-on-the-floor kick as a second line:
  ```strudel
  stack(
    note("<c3eb3g3 ab2c3eb3 f2ab2c3 g2bb2d3>")
      .s("piano").slow(2).room(0.3).gain(0.5),
    s("bd*4").bank("RolandTR909")
  )
  ```
  Hear how the stabs float over the kick.
- Change the first chord from `c3eb3g3` to `c3e3g3` (E natural instead of E-flat). That one note change shifts from minor to major. Brighter, almost optimistic.

## In the world

Listen to Marshall Jefferson's "Move Your Body" (1986) for melodic piano lines woven through house music. Hear Mr Fingers' "Can You Feel It" (1986) for chords that sit inside an atmospheric groove. In both, chords are not decoration: they carry the emotion of the track.

In funk and disco, the pianist or keyboardist plays short, stabby chords between downbeats, a technique called **comping**. House producers sampled or replayed those stabs, hooking them to drum machine loops.

## Music theory note

The four chords in the code (i, VI, iv, v in C minor) are a **chord progression**: a sequence of chords that defines a key and creates a sense of movement and return. The progression moves from the home chord (C minor) through related chords and back, giving the loop a feeling of travel without ever fully landing somewhere new.

A **voicing** is how you stack the notes of a chord across octaves. `ab2c3eb3` puts A-flat in a lower octave than C and E-flat, spreading the chord out. Different voicings of the same chord can feel open or tight, dark or bright.

The interval that makes a triad minor or major is the **third**: minor third (3 semitones) = minor, major third (4 semitones) = major.

## History

The piano stab in house has roots in two places.

From **disco**: labels like Salsoul Records (New York, late 1970s) featured live orchestras and keyboardists playing punchy chord stabs over four-on-the-floor grooves. The Salsoul Orchestra, produced by Vincent Montana Jr., made that stab part of the disco vocabulary.

From **jazz and R&B**: the Rhodes electric piano (manufactured by Harold Rhodes from the late 1950s) became the keyboard of choice for jazz, soul, and funk. Pianists like McCoy Tyner (of John Coltrane's quartet) and Herbie Hancock played dense, quartal voicings that influenced how house producers heard chords. The Rhodes sound, warm and slightly bell-like, became the sound of deep house.

Patrick Cowley, a San Francisco producer, worked with Sylvester in the late 1970s and early 1980s and showed how synthesizer chord stabs could replace the disco orchestra. His productions are a bridge between disco and house.

By 1986, Chicago house producers like Marshall Jefferson were using piano and Rhodes sounds from drum machines and samplers to put chords directly into the groove.

## Dance and body

When a chord stab lands, you feel it in your chest and shoulders, not just your feet. The kick is a foot thing; the stab is a torso thing. Watch dancers in a house set: their upper bodies respond to chords while their feet stay on the kick.

Raise your arms slightly on each stab. Let your shoulders move. The "nod" you do to a stab is different from the bounce you do to a kick: the stab invites a more expressive, less mechanical response.

## Self-test

Without looking back: a minor triad has three notes. What is the name of the interval between the root and the second note that makes it minor (rather than major)?

## Next

- Spine: [Stage 7: Shape: intro, build, drop](/journey/7/intro-build-drop)
- Side-quests:
  - [Minor vs major: change one note](/journey/6/minor-vs-major)
  - [The pad: sustained chord wash](/journey/6/pad)
