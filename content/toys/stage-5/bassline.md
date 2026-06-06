---
id: stage-5-bassline
stage: 5
title: The bassline
type: mutate
difficulty: normal
branch: spine
parent: stage-4-counting
estimate_min: 10
challenge:
  id: stage-5-bassline-challenge
  prompt: "Change the bassline so it uses `e2` instead of `eb2`. This shifts the minor third to a major third above the root."
  starterCode: |
    stack(
      s("bd*4").bank("RolandTR909"),
      note("c2 ~ ~ eb2 ~ ~ c2 ~").s("bass").lpf(700).gain(0.8)
    ).cpm(128)
  targetDescription: "The tresillo bassline with e2 (major third) in place of eb2 (minor third)."
  validator: contains
  target: 'e2'
---

## What you're listening for

The **bass**: the lowest voice in the arrangement. The bass does two things at once. It carries **pitch** (giving the music its key and mood) and **rhythm** (locking with the kick drum to move the body). A great bassline is melodic and rhythmic at the same time.

The bassline in this toy has the shape of a **tresillo** (the 3+3+2 rhythm you know from Stage 3), but now each hit lands on a named pitch. When the pattern plays, you can hear both the groove and the notes.

## How to read the code

Notation already introduced: `s(...)`, `bd*4`, `.bank(...)`, `.cpm(...)`, `,`, `~` (silence), `stack(...)`.

This toy introduces three new tools:

- `note("c2 ~ ~ eb2 ~ ~ c2 ~")` is the **note function**. Where `s(...)` takes sound names, `note(...)` takes **pitch names**. Each pitch is a letter (`c`, `d`, `e`, `f`, `g`, `a`, `b`) followed by a number for the **octave**. `c2` is C in the second octave (low, bass range). `eb2` is E flat in the second octave (`b` after a letter means flat: one half-step lower). Higher octave numbers are higher in pitch: `c3` is one octave above `c2`.

- `.s("bass")` tells Strudel which **sample bank** to use for the notes. Where `.bank(...)` routes all sounds in a `stack()` to a drum kit, `.s("bass")` applies to the `note(...)` line only and specifies a sampled bass instrument.

- `.lpf(N)` is a **low-pass filter**. It removes frequencies above the cutoff number N (in Hz). `.lpf(700)` keeps everything below 700 Hz and removes the bright upper harmonics. The result is a rounder, warmer, more "bass-like" sound. A lower number (`.lpf(200)`) makes it darker and more sub-heavy. A higher number (`.lpf(2000)`) lets through more brightness.

```strudel
// note(...)        = a sequence of pitched notes.
// "c2 ~ ~ eb2 ~ ~ c2 ~"  = tresillo rhythm: hit, rest, rest, hit, rest, rest, hit, rest.
//                          c2 = C in octave 2 (low bass note).
//                          ~  = silence.
//                          eb2 = E flat in octave 2 (one half-step below E).
// .s("bass")       = play notes using the "bass" sample bank.
// .lpf(700)        = low-pass filter: removes frequencies above 700 Hz,
//                    keeping the sound warm and round.
// .gain(0.8)       = 80% volume.
// bd*4             = four-on-the-floor kick.
// .bank("RolandTR909") = TR-909 drum kit.
// .cpm(128)        = 128 BPM.
stack(
  s("bd*4").bank("RolandTR909"),
  note("c2 ~ ~ eb2 ~ ~ c2 ~").s("bass").lpf(700).gain(0.8)
).cpm(128)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code and play.

Now break it:

- Change `eb2` to `e2` (remove the `b` after `e`). E natural is one half-step higher than E flat. The bassline sounds brighter, more resolved, less tense. That is the difference between a **minor** and a **major** third above the root note C. One half-step changes the mood of the whole pattern.
- Change `c2` to `c3` everywhere. The bass line jumps up an octave: same pitches, very different weight.
- Try `note("c2 ~ eb2 ~ g2 ~ ~ ~")` to move the tresillo hits to different positions. Same notes, new groove.
- Add a clap: `s("~ cp ~ cp").bank("RolandTR909")` as a third line in the stack.
- Lower the filter: `.lpf(300)`. The high harmonics disappear and the bass becomes thick and sub-heavy.

## In the world

The tresillo-shaped bassline appears throughout Afro-Cuban son (the **tumbao** bass pattern), funk, and house. When the bass locks its rhythm to the tresillo while carrying harmony, it serves the music and the dancers at the same time.

Listen to Chic's "Good Times" (1979): Bernard Edwards plays a bass pattern that propels the track rhythmically while spelling out the chord changes. That dual function is what great bass playing does.

## Music theory note

**Pitch** is the frequency of a sound, perceived as high or low. Western music organises pitches into 12 named notes, repeating across **octaves** (each octave doubles the frequency: `c3` vibrates at twice the frequency of `c2`).

The notes A through G cover seven of the twelve pitches. The remaining five are **sharps** (raised by a half-step: `c#`, `d#`, `f#`, `g#`, `a#`) or **flats** (lowered by a half-step: `bb`, `eb`, `ab`, `db`, `gb`). In Strudel, `eb2` is E flat in octave 2.

The interval from `c2` to `eb2` is a **minor third**: three half-steps. A minor third above the root gives a chord its minor (darker, more tense) quality. `c2` to `e2` (without the flat) is a **major third**: four half-steps, brighter and more resolved.

Bass notes that sit a minor or major third away from the root create the harmonic tension that makes the progression feel like it moves.

## History

**Larry Graham** (of Sly and the Family Stone, then Graham Central Station) developed the technique known as **slap bass** or **thumping** in the late 1960s and early 1970s. Graham hit the low strings with his thumb and popped the higher strings with his index finger, producing a percussive, rhythmically prominent bass sound. This made the bass a lead rhythmic voice, not just a harmonic filler. Graham has said the technique developed from necessity: playing without a drummer in his mother's lounge act, he needed to provide both the bass note and a drum-like attack.

**James Jamerson** was the session bassist for Motown Records in Detroit through the 1960s. Playing with one finger on a 1962 Fender Precision Bass, Jamerson created basslines of extraordinary melodic complexity under songs by Marvin Gaye, Stevie Wonder, the Supremes, and the Four Tops. His lines often moved against the rhythm in syncopated figures while keeping the harmonic motion clear. He is considered one of the most influential bass players in popular music.

**Bernard Edwards** of Chic (with producer and guitarist Nile Rodgers) brought the funk bass vocabulary into disco in the mid-1970s. His line on "Good Times" (1979) was lifted almost directly into the basslines of early hip-hop records, including "Rapper's Delight" by the Sugarhill Gang (1979). In house, the locked bass-and-kick relationship owes a direct debt to Edwards' approach.

## Dance and body

Hum or sing the bassline while the pattern plays. Notice how the pitch moves (c2, then up a minor third to eb2, then back down). Now bounce on the kick while you hum. The bass and kick land together on beat 1 and on the tresillo hits. That coincidence between the lowest sound and the kick is the "lock" that gives the track its physical weight.

Sub-bass frequencies below about 80 Hz are felt as vibration as much as heard as pitch. In a club with a good sound system, the bassline is something you feel in your chest and feet before you consciously hear it.

## Self-test

What is the difference between `eb2` and `e2`? Which sounds darker, and why?

## Next

- Spine: [Stage 6 — The colour](/journey/6/chords-stab)
- Side-quests:
  - [Sub vs mid bass](/journey/5/sub-vs-mid)
  - [Off-beat bass](/journey/5/off-beat-bass)
