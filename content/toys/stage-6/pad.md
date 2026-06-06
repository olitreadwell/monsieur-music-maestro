---
id: stage-6-pad
stage: 6
title: "The pad: sustained chord wash"
type: mutate
difficulty: normal
branch: side-quest
parent: stage-6-chord-stab
estimate_min: 10
---

## What you're listening for

A **pad**: a sustained, smooth chord texture that fills the background of a track like a wash of colour. Where a stab is short and punchy, a pad rings out across bars, softening the space between the kick hits. You hear pads in deep house, ambient, and most electronic music that wants to feel spacious rather than percussive.

## How to read the code

You have heard chords already. The pad toy introduces two new ideas: **sustain** and **envelope control**.

**`.s("supersaw")`** selects the "supersaw" synth, which produces a thick, slightly detuned layer of sawtooth waves. It was widely used in trance and progressive house for pads because it has a naturally warm, sustained quality. It rings out longer than a piano stab.

**`.attack(...)`** controls how fast the sound reaches full volume when a note starts. A low attack (e.g., `0.1`) means the pad fades in over 0.1 seconds: gentle, blurred entry. A high attack (e.g., `1`) means the pad takes a whole second to reach full volume: very soft, almost invisible arrival.

**`.release(...)`** controls how long the sound fades out after the note ends. A long release (e.g., `2`) means the chord lingers for two seconds after the trigger point. Combined with a long attack, this gives the pad its characteristic wash quality: sounds overlap and blur together.

**`.lpf(...)`** you met in Stage 5: a low-pass filter that cuts high frequencies above the cutoff point. On a pad, keeping the LPF cutoff moderate (e.g., `1200`) removes harsh brightness and keeps the sound warm and background.

**`.slow(4)`** stretches the pattern to four bars per cycle. With a pad, you want each chord to hang for a long time so it truly washes rather than choppping.

```strudel
// note(...)        = pitched notes
// "<...>"          = one chord per cycle (each chord lasts one slow cycle)
// c3eb3g3          = C minor triad
// ab2c3eb3         = Ab major chord (with Eb carried over from C minor)
// f2ab2c3          = F minor chord
// g2bb2d3          = G minor chord
// .s("supersaw")   = thick, sustained synth timbre
// .slow(4)         = each full chord cycle takes 4 bars (16 beats)
// .attack(0.8)     = fade in over 0.8 seconds: soft entry
// .release(2.5)    = linger for 2.5 seconds after note end: slow fade-out
// .lpf(1200)       = low-pass filter: keep warm, remove harshness
// .room(0.5)       = 50% reverb: the pad breathes in space
// .gain(0.35)      = quiet so it sits under everything else
note("<c3eb3g3 ab2c3eb3 f2ab2c3 g2bb2d3>")
  .s("supersaw")
  .slow(4)
  .attack(0.8)
  .release(2.5)
  .lpf(1200)
  .room(0.5)
  .gain(0.35)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code. Play it and sit with it for a few cycles.

Now break it:

- Change `.attack(0.8)` to `.attack(0.05)`. The pad now snaps in immediately instead of fading. More like a stab, less like a wash.
- Change `.release(2.5)` to `.release(0.2)`. The note cuts off almost instantly after the cycle ends. Hear how much the long release creates the "wash" feeling.
- Stack the pad with the chord stab from the spine toy. Both together: the pad sits under and the stab pokes through on top.
- Try `.s("sawtooth")` instead of `.s("supersaw")`. Thinner, more digital. The supersaw stacks multiple detuned sawtooths; a single sawtooth has more edge.
- Raise `.lpf(1200)` to `.lpf(4000)`. More brightness comes through. Lower it to `.lpf(400)`: just a warm rumble of chord.

## In the world

The pad sound in electronic music came from analog polyphonic synthesizers of the late 1970s and 1980s. The Roland Juno-60 (1982) had a warm, slightly chorused pad sound that became a signature of the era. The Yamaha DX7 (1983) contributed electric piano and pad tones to pop and R&B.

Larry Heard's "Mystery of Love" (1985), recorded in Chicago, used minimal keyboards and drum machine to create a deeply atmospheric pad-driven deep house track. The sustained chord wash under a sparse groove defined what deep house felt like.

Pad sounds moved from house into ambient (Brian Eno's ambient series, early 1980s), then into trance (Roland's JP-8000 supersaw became the trance pad sound in the mid-1990s). The concept of "colour wash" carried across all those genres: a pad is a sustained harmonic environment, not a melodic statement.

## Music theory note

A pad exploits **voice leading**: the way each note in a chord moves smoothly to the nearest note in the next chord. The four chords in the code were chosen so that notes move small distances (one or two semitones) between chords. That smooth movement is part of why the progression feels fluid rather than lurching.

**Sustain** as a concept lives inside what musicians call the **ADSR envelope**: Attack, Decay, Sustain, Release. The four parameters control how a synthesiser shapes the volume over time when a note is held and then released. `.attack(...)` and `.release(...)` are the A and R of that four-parameter system. Decay and Sustain are implicit in the sampler behaviour here.

## History

The use of sustained synthesizer pads in pop and dance music accelerated once manufacturers made affordable polyphonic synthesizers available to non-classical musicians. Before the Juno-60 and DX7, building a lush pad required a studio or a large, expensive modular system.

Larry Heard worked with a basic setup in his apartment. His ability to create warmth from minimal equipment, largely through careful arrangement and the character of sustain, made deep house a producer's music rather than a studio engineer's. He showed that a pad didn't need to be dense to be effective.

In the 1990s, UK producers in the Bristol sound (Massive Attack, Portishead) and the Detroit techno second wave used pads as carriers of melancholy. The sustained chord wash became a way to create emotional weather inside a track without literal words.

## Dance and body

A pad changes how you want to move. It takes away the urgency of the stab and invites slower, more continuous motion. Try swaying gently to the chord wash without following the kick closely. This is what a breakdown feels like on the dance floor: the kick drops out, the pad sustains, the crowd floats rather than pumps.

Raise your hands slightly during the pad section. That gesture, common on dance floors during a breakdown or atmospheric build, is a physical response to sustained harmonic texture. The music invites it.

## Self-test

Without looking back: what do `.attack(...)` and `.release(...)` control in an envelope? And which affordable synthesizer from 1982 was central to the early pad sound?

## Next

- Return to spine: [Stage 7: Shape](/journey/7/intro-build-drop)
- Other side-quest: [Minor vs major](/journey/6/minor-vs-major)
