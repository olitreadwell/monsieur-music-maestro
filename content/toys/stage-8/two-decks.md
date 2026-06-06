---
id: stage-8-two-decks
stage: 8
title: Two decks — the DJ mental model
type: takeapart
difficulty: stretch
branch: spine
parent: stage-7-intro-build-drop
estimate_min: 15
challenge:
  id: stage-8-two-decks-challenge
  prompt: "Add the EQ swap: uncomment Track B's bass line and remove Track A's bass line from the stack below. The goal is to hear only one bassline at a time."
  starterCode: |
    stack(
      s("bd*4").bank("RolandTR909"),
      s("~ cp ~ cp").bank("RolandTR909"),
      note("c2 ~ ~ eb2 ~ ~ g2 ~").s("sawtooth").lpf(700).gain(0.6)
    ).cpm(32)
  targetDescription: "Track A's stack with the bass note line removed, so only kick and clap remain."
  validator: contains
  target: 'bd*4'
---

## What you're listening for

Two tracks playing at the same time, at the same tempo, lined up so their beat 1s coincide. That is the core of DJing. Everything else (EQ, fader, cueing, key matching) is in service of that one act: making two streams of sound merge without the crowd noticing the seam.

## How to read the code

This toy uses Strudel to **demonstrate** what happens during a DJ mix. It is not a replacement for practising on DJ software: the toy is a mental model and a listening exercise. After this toy, the prompt will ask you to try real DJ software.

No new notation. The two "decks" in the code are two separate `stack(...)` blocks. The demo shows three phases: Track A alone, Track A plus Track B overlapping, Track B alone.

**`.cpm(...)` (cycles per minute)** sets the tempo of a pattern. If Track A is at 128 BPM and Track B is at 130 BPM, a DJ who does not beatmatch will hear them drift apart. In the code, both patterns are set to the same `.cpm(...)` value to simulate a beatmatched mix.

For Strudel patterns, BPM and CPM are related. One cycle in Strudel is one bar (4 beats). At 128 BPM, one bar takes 60/128 × 4 = 1.875 seconds. CPM at 128 BPM = 128/4 = 32 cycles per minute.

**The EQ swap**: in a real DJ mix, the DJ cuts the bass (low EQ) on the incoming track while the outgoing track is still playing, then swaps: fade in incoming bass, fade out outgoing bass. This prevents two basslines clashing. In the code, the incoming track has its bass element commented out at first, then you manually add it as you remove it from the outgoing track.

```strudel
// Track A (outgoing) — the track already playing.
// This is what the crowd hears before the mix.
stack(
  s("bd*4").bank("RolandTR909"),
  s("~ cp ~ cp").bank("RolandTR909"),
  s("hh*8").bank("RolandTR909").gain(0.5),
  note("c2 ~ ~ eb2 ~ ~ g2 ~").s("sawtooth").lpf(700).gain(0.6),
  note("<c3eb3g3 ab2c3eb3 f2ab2c3 g2bb2d3>")
    .s("piano").slow(2).room(0.3).gain(0.5)
).cpm(32) // 32 cpm = 128 BPM (4 beats per cycle)
```

```strudel
// Track B (incoming) — the track the DJ is cueing.
// Run this alongside Track A (open two strudel.cc tabs).
// To simulate an EQ swap: remove Track A's bass, add Track B's bass.
stack(
  s("bd*4").bank("RolandTR909"),
  s("~ cp ~ cp").bank("RolandTR909").gain(0.6),
  s("hh*16").bank("RolandTR909").gain(0.4), // busier hats: different feel
  // bass commented out — you bring this in as you fade out Track A's bass:
  // note("f2 ~ ~ ab2 ~ ~ c3 ~").s("sawtooth").lpf(700).gain(0.6),
  note("<f2ab2c3 eb2g2bb2 db2f2ab2 c2eb2g2>")
    .s("piano").slow(2).room(0.3).gain(0.5)
).cpm(32) // same tempo — beatmatched
```

## Try it

Open two tabs of [strudel.cc](https://strudel.cc). Paste Track A in one tab, Track B in the other.

1. Play Track A. Let it run for 8 bars (32 beats: count "1-2-3-4, 2-2-3-4 ... 8-2-3-4").
2. Start Track B in the second tab at bar 1 (the start of a new phrase). Listen to both playing.
3. Gradually lower Track A's volume (reduce its `.gain(...)` values in the code) while raising Track B's. This simulates a fader blend.
4. To simulate the EQ swap: remove the bass line from Track A (comment it out) and uncomment Track B's bass line. Restart both. This is the **EQ swap** technique.
5. Once Track B is fully in, stop Track A.

**The challenge**: start Track B so that beat 1 of Track B lands at the same time as beat 1 of a new 8-bar phrase in Track A. This alignment is phrase matching.

After trying the code simulation, take the next step. Install **Mixxx** (free, open-source, available at mixxx.org). It is the closest free equivalent to professional DJ software. Load two tracks, use the SYNC button to match tempos, then practise the steps above with real music.

## In the world

Every DJ set you have ever heard is this: two (or more) tracks played simultaneously, managed so the listener experiences a continuous flow rather than jarring interruptions. The skill is in making the seam invisible.

In a DJ set, the crowd does not know when the mix happens if it goes well. They only notice when it goes badly: when the beats go out of time (a train wreck), or when two basslines clash, or when there is silence between tracks.

DJs like Larry Levan at the Paradise Garage (New York, late 1970s to 1987) or Frankie Knuckles at the Warehouse and later the Power Plant (Chicago, late 1970s and 1980s) made mixing into an art: choosing tracks that spoke to each other harmonically and emotionally, managing energy over hours, reading the crowd.

## Music theory note

**Beatmatching** is the act of adjusting the playback speed (pitch-corrected, in modern equipment) of an incoming track so its BPM matches the outgoing track. Before pitch-fader technology was common, DJs adjusted the physical speed of turntables, which also changed pitch. Getting two tracks to the same BPM by ear alone is a tactile, learned skill.

**Phrase alignment** is placing the incoming track so that its bar 1 coincides with the outgoing track's bar 1 (or, more precisely, with a phrase boundary: every 8 or 16 bars). If both tracks are beatmatched but phrase-aligned wrong (Track B starts on bar 3 of a phrase while Track A is on bar 7), the mix will feel rhythmically correct but musically awkward.

**EQ mixing** uses the mixer's low/mid/high equaliser to remove the bass from the incoming track until the outgoing bass is fully faded: then swap. Two bass frequencies at the same time at similar pitches create phase cancellation and muddiness. The EQ swap is the most basic technique for clean transitions.

## History

The practice of mixing records together without gaps began in New York in the early 1970s. **Francis Grasso** at the Sanctuary club (1969-1972) is credited with pioneering continuous mixing and proto-beatmatching, using a headphone-cue system to listen to the next record before the crowd heard it.

**David Mancuso** at the Loft (private parties, starting 1970) took a different approach: he played records straight through without mixing, but curated the sequence with exceptional taste, matching energy, key, and mood. His parties were influential on the culture of listening.

**Larry Levan** at the Paradise Garage (1977-1987) synthesised both approaches: careful curation plus technical mixing skill. He reportedly spent hours before each night selecting and sequencing his records. His approach to energy management over a 10-hour set is still discussed by DJs.

The **Camelot wheel** for key-matching was developed by Mark Davis and popularised through the KeyFinder software and Mixed In Key tool in the 2000s, making harmonic mixing accessible to DJs who could not identify keys by ear.

## Dance and body

When a mix happens perfectly, dancers don't know. Their feet stay on the kick, their bodies stay in the groove, and the track changes underneath them without disruption. This continuity is the DJ's gift to the dancer.

When a mix goes badly (a train wreck), dancers stop: their bodies lose the reference point. The kick disappears or goes double, and the feet have nothing to step on. That physical disorientation is why beatmatching matters.

Think about the last time you danced to a long DJ set and felt completely carried. That feeling is the result of hours of preparation, skill, and real-time decision making: music, mixing, and crowd reading all at once.

## Self-test

Without looking back: name three things a DJ does to blend two tracks smoothly. And name the New York DJ from the early 1970s who is credited with pioneering continuous beatmatched mixing.

## Next

- Side-quests:
  - [Key matching and the Camelot wheel](/journey/8/key-matching)
  - [Headphone cue: the DJ's secret](/journey/8/headphone-cue)
- Optional: [Afro house: percussion layer over a mix](/journey/8/branches/afro-house/percussion-layer)
