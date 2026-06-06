---
domain: art
matter: doc
energy: reference
time: perpetual
privacy: soft
status: active
related:
  - learning-journey.md
  - resources.md
---

# Strudel cheatsheet

Quick lookup by task. Open [strudel.cc](https://strudel.cc), paste any block, Cmd+Enter to play, Cmd+. to stop.

## How to use this page

Each section follows the same shape: a short explanation, a code block with inline comments, and a note on which toy introduces that notation. If a function errors, the note says what to try instead.

---

## 1. Pick a sound

`s(...)` is the core function. Pass it a string of space-separated sound names, one per beat slot. The names come from the Roland TR-808 and TR-909 drum machines.

```strudel
// s(...)   = play these sounds in sequence, looping forever.
// bd       = bass drum (kick).
// sd       = snare drum.
// hh       = hi-hat, closed.
// oh       = hi-hat, open (sustained, ringing).
// cp       = clap.
// cy       = cymbal (crash or ride).
// tom      = mid tom. Also: lt (low), mt (mid), ht (high).
// cb       = cowbell.
// rim      = rimshot.
s("bd hh sd hh")
```

To pick a specific variation within a bank, add `:N` after the name. `bd:0` plays the first kick sample, `bd:1` plays the second.

```strudel
// bd:0, bd:1  = different recordings of the same instrument.
//              Useful when a bank has multiple kick samples.
s("bd:0 ~ bd:1 ~")
```

→ first met in [Stage 0 — Play](/journey/0/play)

---

## 2. Repeat and time it

Inside the pattern string, `*N` repeats a sound N times per bar. `~` is a rest (silence). `[...]` groups tokens so they share one time slot.

```strudel
// bd*4        = four kicks in one bar, evenly spaced.
// hh*8        = eight hi-hats in one bar (eighth notes).
// ~           = a silence lasting one step.
// [sd sd]     = two snares squeezed into one beat slot.
s("bd*4, hh*8, ~ [sd sd] ~ sd")
```

→ first met in [Stage 1 — The pulse](/journey/1/pulse)

---

## 3. Layer multiple sounds

A comma inside the pattern string plays two patterns at the same time (one on top of the other). Each comma-separated part is a full pattern running in parallel.

```strudel
// "bd*4, ~ cp ~ cp, hh*8"
//   bd*4    = kick on every beat.
//   ~ cp ~ cp = clap on beats 2 and 4 (backbeat).
//   hh*8    = hi-hat on every eighth note.
// All three run together.
s("bd*4, ~ cp ~ cp, hh*8")
```

For more complex layering, `stack(a, b, c)` does the same thing across multiple lines and is easier to read.

→ first met in [Stage 0 — Two patterns at once](/journey/0/two-patterns-at-once)

---

## 4. Pick a drum kit

`.bank("...")` swaps the entire set of drum sounds to a specific drum machine. The name goes in quotes. All sound names in that pattern (`bd`, `sd`, `hh`, etc.) draw from that machine's recordings.

```strudel
// .bank("RolandTR909") = Roland TR-909 (1983).
//   The canonical kick for house and techno.
//   Punchy, slightly metallic kick; tight snare; bright hats.
s("bd*4, ~ cp ~ cp, hh*8").bank("RolandTR909")
```

Cultural shorthand:
- `RolandTR909`: house (Chicago, 1980s), techno (Detroit, late 1980s), most European dance music since.
- `RolandTR808`: hip-hop (1980s–present), trap, Miami bass. The 808 kick is longer, deeper, and more "boom."
- `RolandTR707`: early UK electronic, post-punk, some electro. Lighter, more plastic-sounding.

→ first met in [Stage 1 — The pulse](/journey/1/pulse)

---

## 5. Set tempo

`.cpm(N)` sets cycles (bars) per minute. One cycle = one bar. To convert from BPM: `cpm = BPM / 4` (for 4/4 time). So 120 BPM = `.cpm(30)`.

```strudel
// .cpm(128)  = 128 BPM in 4/4 time.
// Genre tempo guide (BPM):
//   House           120-128
//   Techno          125-140
//   Hip-hop         85-95
//   Drum 'n' bass   170+
//   Baião (Brazil)  80-110
s("bd*4").bank("RolandTR909").cpm(128)
```

Note: older Strudel tutorials may use `setcpm(N)` as a standalone call instead of `.cpm(N)` chained on the pattern. Both exist across versions. If one errors, try the other.

→ first met in [Stage 1 — Tempo shifts](/journey/1/tempo-shifts)

---

## 6. Pitched notes

`note("...")` takes pitch names instead of drum names. A pitch name is a letter (`c d e f g a b`) plus an octave number. `c2` is C in octave 2 (deep bass range). `c3` is one octave higher. `eb2` is E flat (`b` means flat, one half-step lower than `e`). Use `n("...")` to pick sample index numbers from a kit instead.

```strudel
// note(...)    = sequence of pitched notes.
// c2           = C, octave 2 (low bass).
// eb2          = E-flat, octave 2 (minor third above C).
// g2           = G, octave 2 (fifth above C — this is C minor).
// ~            = silence / rest.
// .s("bass")   = use the "bass" sample bank for the notes.
// .lpf(700)    = low-pass filter (see section 7).
note("c2 ~ ~ eb2 ~ ~ g2 ~").s("bass").lpf(700).gain(0.8)
```

For picking numbered variations from a sample bank, `n("0 1 2")` works the same way as `note(...)` but takes integers rather than pitch names.

```strudel
// n("0 ~ 1 2") = play samples 0, (rest), 1, 2 from the selected bank.
s("conga").n("0 ~ 1 2")
```

→ first met in [Stage 5 — The bassline](/journey/5/bassline)

---

## 7. Filters and shaping

`.lpf(N)` is a low-pass filter: it removes frequencies above N Hz, making the sound darker and warmer. `.attack(N)` controls how long the sound takes to reach full volume (fade-in). `.release(N)` controls how long it takes to fade out. `.cut(N)` assigns a sound to a cut group: when the next hit in the same group plays, the previous one stops immediately (useful for punchy, staccato sounds).

```strudel
// .lpf(1000)     = keep frequencies below 1000 Hz; cut the highs.
//                  Lower number = darker. Higher = brighter.
// .attack(0.1)   = 0.1 seconds to reach full volume.
// .release(0.5)  = 0.5 seconds to fade out after the note ends.
// .cut(1)        = cut group 1: each new hit stops the previous one.
note("<c2 eb2 g2 bb2>")
  .s("bass")
  .lpf(800)
  .attack(0.05)
  .release(0.4)
  .cut(1)
  .gain(0.8)
```

→ `.lpf` first met in [Stage 5 — The bassline](/journey/5/bassline). `.cut` first met in [Stage 5 — Sub stab (deep house)](/journey/5/sub-stab). `.attack` and `.release` first met in [Stage 7 — Deep house: the slow build](/journey/7/long-build)

---

## 8. Time-shifting

`.late(N)` delays a pattern's first entry by N cycles (bars). `.slow(N)` stretches the pattern so it takes N bars to complete. `.fast(N)` compresses it so it fits faster.

```strudel
// .late(4)   = this line stays silent for the first 4 bars, then starts.
//              Use to stagger entries in a build.
// .slow(2)   = pattern takes 2 bars to complete (half speed).
// .fast(2)   = pattern completes in half a bar (double speed).
stack(
  s("bd*4").bank("RolandTR909"),
  s("~ cp ~ cp").late(4).bank("RolandTR909"),    // enters at bar 4
  note("c2 ~ eb2 ~").s("bass").slow(2)            // plays at half speed
)
```

→ `.late` first met in [Stage 4 — 16-bar build](/journey/4/16-bar-build). `.slow` / `.fast` introduced across Stage 5–7.

---

## 9. Chord progressions

`<...>` (angle brackets) inside a pattern string play one item per cycle, cycling through them in order. This is how you write chord changes: each item inside the brackets is one bar's chord.

```strudel
// "<...>"         = play one item per cycle, looping through the list.
// c3eb3g3         = C minor triad: C, E-flat, G in octave 3.
// ab2c3eb3        = Ab major: A-flat (octave 2), C, E-flat.
// f2ab2c3         = F minor: F (octave 2), A-flat, C.
// g2bb2d3         = G minor: G (octave 2), B-flat, D.
// .s("piano")     = use a piano sample bank for the chords.
// .slow(2)        = each chord lasts 2 bars instead of 1.
note("<c3eb3g3 ab2c3eb3 f2ab2c3 g2bb2d3>")
  .s("piano")
  .slow(2)
  .room(0.3)
  .gain(0.5)
```

→ first met in [Stage 6 — The chord stab](/journey/6/chord-stab)

---

## 10. Polyrhythmic patterns (Euclidean rhythms)

`.euclid(pulses, steps)` distributes `pulses` hits as evenly as possible across `steps` slots. This produces patterns that feel hand-played rather than grid-locked, and it is the maths behind many traditional rhythms (clave, tresillo, West African bell patterns).

```strudel
// .euclid(3, 8)   = 3 hits across 8 steps = tresillo (3+3+2 rhythm).
// .euclid(5, 8)   = 5 hits across 8 steps = son clave approximation.
// .euclid(11, 16) = 11 hits across 16 steps = dense, flowing percussion.
stack(
  s("bd*4").bank("RolandTR909"),
  s("cp").euclid(3, 8).gain(0.8),    // tresillo clap
  s("oh").euclid(11, 16).gain(0.3)   // dense open-hat layer
)
```

→ first met in [Stage 8 — Afro house: live percussion](/journey/8/percussion-layer)

---

## 11. Live LFOs (automated parameters)

`saw.range(low, high).slow(N)` creates a value that rises from `low` to `high` over N bars, then repeats. Pass it to `.lpf(...)` (or other parameters) to create an automated filter sweep. `saw` is a sawtooth wave shape: it ramps up, then snaps back.

```strudel
// saw                    = sawtooth signal, 0 to 1 per cycle.
// .range(200, 8000)      = map that 0-1 signal to Hz: 200 Hz at the start,
//                          8000 Hz at the end (fully open).
// .slow(8)               = the sweep takes 8 bars to complete one rise.
// lpf(saw.range(...))    = the filter cutoff is now automated, not fixed.
note("c2 ~ ~ eb2 ~ ~ g2 ~")
  .s("sawtooth")
  .lpf(saw.range(200, 8000).slow(8))
  .gain(0.7)
```

To sweep from bright to dark (reverse), use `saw.range(8000, 200).slow(8)`.

→ first met in [Stage 7 — Filter build](/journey/7/filter-build)

---

## 12. Swing

`.swing(N)` shifts every second subdivision slightly later, creating a shuffle feel. `N` is between 0 and 1. `0` = perfectly straight. Around `0.15`–`0.25` = light shuffle. `0.5` = strong triplet swing.

```strudel
// .swing(0.2)  = light shuffle: every second eighth note lands slightly late.
//               Tune by ear — exact feel depends on Strudel version.
//               If it sounds wrong, try 0.15 or 0.25 instead.
s("bd*4, ~ cp ~ cp, hh*8").bank("RolandTR909").swing(0.2)
```

Note: `.swing()` behavior varies across Strudel versions. If the value you chose sounds too subtle or too strong, adjust by ear. This is flagged as uncertain in current Strudel documentation.

→ first met in [Stage 2 — Shuffle hats](/journey/2/shuffle-hats)

---

## Quick drum name table

| Code | Sound | Also written as |
|------|-------|-----------------|
| `bd` | kick (bass drum) | `bd:0`, `bd:1` (variations) |
| `sd` | snare | |
| `hh` | closed hi-hat | |
| `oh` | open hi-hat | |
| `cp` | clap | |
| `cy` | cymbal | |
| `tom` | mid tom | |
| `lt` | low tom | |
| `mt` | mid tom (explicit) | |
| `ht` | high tom | |
| `cb` | cowbell | |
| `rim` | rimshot | `rim:0` (first variation) |

---

## Run it

1. Go to [strudel.cc](https://strudel.cc).
2. Paste any code block above.
3. Cmd+Enter (Mac) or Ctrl+Enter plays or updates.
4. Cmd+. or Ctrl+. stops.
5. Change a number, press play, hear the change. That is the loop.
