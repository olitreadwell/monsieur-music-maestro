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

Quick lookup. Open `learning-journey.md` for the path. This is just "what do I type."

## Skim: run it

1. Go to **strudel.cc**.
2. Type code in the box.
3. Press **Ctrl + Enter** (Mac: **Cmd + Enter**) to play or update.
4. Press **Ctrl + .** (Mac: **Cmd + .**) to stop.

That is the whole loop. Change a number, press play, hear the change.

## Drum sounds

| Code | Sound |
|------|-------|
| `bd` | kick (bass drum) |
| `sd` | snare |
| `hh` | closed hi-hat |
| `oh` | open hi-hat |
| `cp` | clap |
| `rim` | rimshot |
| `lt` `mt` `ht` | low / mid / high tom |

## Mini-notation (the symbols inside the quotes)

| Symbol | Means | Example |
|--------|-------|---------|
| space | one step after another | `"bd sd"` |
| `*4` | repeat, faster | `"bd*4"` = 4 kicks |
| `~` | rest (silence) | `"bd ~ sd ~"` |
| `[ ]` | squeeze into one step | `"bd [sd sd]"` |
| `,` | stack (play together) | `"bd*4, hh*8"` |
| `< >` | alternate, one per cycle | `"<c e g>"` |
| `(3,8)` | euclidean: 3 hits over 8 steps | `"bd(3,8)"` |
| `!3` | repeat, same speed | `"bd!3"` = bd bd bd |

## Core functions

| Code | Does |
|------|------|
| `s("...")` or `sound("...")` | pick a drum or sample |
| `note("c e g")` | pick pitches |
| `n("0 1 2")` | pick which sample in a kit |
| `stack(a, b, c)` | layer patterns on top of each other |
| `.gain(0.5)` | volume (1 = full, lower = quieter) |
| `.lpf(800)` | low-pass filter (cut the highs). `.hpf(...)` cuts the lows |
| `.room(0.3)` | reverb (space / echo-y) |
| `.delay(0.4)` | echo |
| `.speed(2)` | playback speed / pitch |
| `.bank("RolandTR909")` | swap the drum machine kit |
| `.slow(2)` `.fast(2)` | stretch / squeeze time |
| `.rev` | reverse |
| `.every(4, x => x.rev())` | every 4th cycle, do something |

## Tempo

```
setcpm(31)
```
Put this on the first line. `cpm` = cycles per minute. One cycle here = one bar = 4 beats,
so beats-per-minute (BPM) = cpm x 4. House sits around 120 to 128 BPM, so use
**`setcpm(30)` to `setcpm(32)`**.

Note: some tutorials write `.cpm(130)` chained on the end instead. Both exist across
Strudel versions. If the tempo sounds wrong, that is why.

## Kits for house / techno

- `RolandTR909` — house and techno (the classic).
- `RolandTR808` — hip-hop and electro.

## Copy-paste snippets

These come from the research in `resources.md`. Standard, stable Strudel.

**Just a kick (four-on-the-floor):**
```
s("bd*4")
```

**Kick with the house kit:**
```
s("bd*4").bank("RolandTR909")
```

**Hats every eighth note:**
```
s("hh*8").gain(0.4)
```

**Open hats on the offbeat (the "tss" between kicks):**
```
s("~ oh ~ oh ~ oh ~ oh")
```

**Clap on beats 2 and 4 (the backbeat):**
```
s("~ cp ~ cp")
```

**All the house drums in one line:**
```
s("bd*4, ~ cp ~ cp, hh*8").bank("RolandTR909")
```

**A simple bassline (minor mood):**
```
note("c2 ~ eb2 ~ g2 ~ eb2 ~").s("sawtooth").lpf(700).gain(0.6)
```

**Chord stabs (one chord per cycle):**
```
note("<c3eb3g3 ab2c3eb3 f2ab2c3 g2bb2d3>").s("sawtooth").slow(2).room(0.3).gain(0.5)
```

**A whole house loop (paste the lot):**
```
setcpm(31)
stack(
  s("bd*4").bank("RolandTR909"),
  s("hh*8").gain(0.4).bank("RolandTR909"),
  s("~ cp ~ cp").gain(0.7).bank("RolandTR909"),
  note("c2 ~ eb2 ~ g2 ~ eb2 ~").s("sawtooth").lpf(700).gain(0.6),
  note("<c3eb3g3 ab2c3eb3 f2ab2c3 g2bb2d3>").s("sawtooth").slow(2).room(0.3).gain(0.4)
)
```
Flag: this full loop is assembled from verified parts, not run end-to-end. If a sound
name errors, check `resources.md`.

## Afro / Latin rhythm patterns

`x` = hit, `.` = rest (use `~` in Strudel). These are the heartbeat of Afro and Latin music,
and they sit beautifully over a house kick. See Stage 3 of `learning-journey.md`.

**Tresillo** (the DNA cell, 3+3+2), 8 steps:
```
s("cp ~ ~ cp ~ ~ cp ~")
```

**Son clave 3-2**, 16 steps:
```
s("cp ~ ~ cp ~ ~ cp ~ ~ ~ cp ~ cp ~ ~ ~")
```

**Rumba clave 3-2** (3rd hit slides one step later), 16 steps:
```
s("cp ~ ~ cp ~ ~ ~ cp ~ ~ cp ~ cp ~ ~ ~")
```

**12/8 West African bell** (the ancestor of clave), 12 steps:
```
s("cp ~ cp ~ cp cp ~ cp ~ cp ~ cp")
```

**3-against-2 polyrhythm** (let Strudel space the hits evenly):
```
stack(s("hh*3"), s("bd*2"))
```

**Afro-Latin house starter** (tresillo clap over four-on-the-floor):
```
stack(
  s("bd*4"),
  s("cp ~ ~ cp ~ ~ cp ~").gain(0.8),
  s("hh*8").gain(0.4)
).bank("RolandTR909")
```
Flag: clave grids are cross-checked across sources but were gathered from search excerpts.
Confirm them by ear (they should sound like the clave you know from the music).
