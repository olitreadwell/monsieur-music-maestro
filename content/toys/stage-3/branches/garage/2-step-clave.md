---
id: stage-3-2-step-clave
stage: 3
title: 2-step clave
type: challenge
difficulty: stretch
branch: garage
parent: stage-3-clave
estimate_min: 12
---

## What you're listening for

A kick that moves. In **UK garage** (late 1990s London) the four-on-the-floor kick is broken apart. Instead of four steady kicks per bar you get a syncopated, skipping pattern with gaps where the kick "should" be. That pattern is called **2-step**: two main kick placements per bar, offset and staggered so they do not land on every beat.

Now put the clave over that. The clave was designed to be an anchor. When the kick itself is syncopated, the clave does not just sit over the groove — it shoves the kick sideways, making it feel like the music is always about to stumble but never does.

## How to read the code

One new element: **`[bd ~]`** inside a pattern string.

You already know `[...]` from the cheatsheet: square brackets squeeze multiple events into one step. `[bd ~]` plays a kick followed by a rest, both squeezed into the space of one step. This effectively shifts the kick to the **first half** of a step rather than the full step. The result is a softer "flam" feel or, in the right pattern, a syncopated half-step push.

This toy also uses `bd` at irregular positions to build the 2-step feel. You will write the kick pattern manually rather than using `*4`.

Everything else is from earlier toys:

- `s("...")` plays a sequence, looped.
- `~` is a rest.
- `,` inside the quotes (or `stack(...)` around separate lines) layers patterns.
- `.gain(n)` sets volume.
- `.bank("RolandTR909")` uses the TR-909 sounds.
- `cp` is the clap. Used here both for the backbeat and for the clave.
- `hh`, `oh` are the closed and open hi-hat.

The 2-step kick pattern used here is one common variant. It places kicks at steps 1, 5, 10, and 13 of 16 (in 1-indexed counting), leaving beats 2, 3, and 4 mostly empty and then filling them asymmetrically. Written as a 16-token string:

```
step: 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16
bd:   bd ~  ~  ~  bd ~  ~  ~  ~  bd ~  ~  bd ~  ~  ~
```

Compared to four-on-the-floor (`bd ~ ~ ~ bd ~ ~ ~ bd ~ ~ ~ bd ~ ~ ~`), the 2-step removes the kick from step 9 and adds one at step 10, then places a fourth kick at step 13 rather than step 13 (which aligns with beat 4). The result skips and lurches in a recognisable way.

```strudel
// UK garage 2-step kick with clave shove.
// The kick does NOT land on every beat — 2-step skips and lurches.
// The clave 3-2 lands against the irregular kick, creating tension.
// [bd ~] = squeeze kick + rest into one step: a half-step push.
stack(
  // 2-step kick: not four-on-the-floor, hits at off-positions
  s("bd ~ ~ ~ bd ~ ~ ~ ~ bd ~ ~ bd ~ ~ ~").gain(0.95),

  // clap: backbeat on beats 2 and 4 (the stable anchor)
  s("~ cp ~ ~ ~ cp ~ ~ ~ cp ~ ~ ~ cp ~ ~").gain(0.7),

  // son clave 3-2: laid over the moving kick
  // The clave hits collide with and against the kick gaps
  s("cp ~ ~ cp ~ ~ cp ~ ~ ~ cp ~ cp ~ ~ ~").gain(0.55),

  // open hi-hat on the "and" of beat 2 and beat 4 (garage "tss")
  s("~ ~ oh ~ ~ ~ ~ oh ~ ~ oh ~ ~ ~ ~ oh").gain(0.5),

  // closed hi-hat: sixteenth-note texture
  s("hh*16").gain(0.2)
).bank("RolandTR909")
```

## Try it

This is a challenge toy. The task is not just to play the patch but to make the clave and the kick **work together** by ear. Paste in [strudel.cc](https://strudel.cc) and try these steps:

**Step 1 — Hear the problem.** Play the full patch. The clave and kick hit on some of the same steps (step 1, step 10 area). Notice where they collide — the moments that feel busy. Notice where they open up.

**Step 2 — Remove the clave line.** Just the 2-step kick, backbeat clap, and hats. Does it feel lighter? Does it feel like something is missing?

**Step 3 — Re-add the clave but flip it to 2-3.** Change the clave string to `"~ ~ cp ~ cp ~ ~ ~ cp ~ ~ cp ~ ~ cp ~"`. Does the 2-3 direction clash more or less with the 2-step kick than 3-2?

**Step 4 — Write your own kick.** Delete the current kick string and try placing kicks at different positions. Your goal: four to five kicks per bar, no two consecutive steps, at least one kick that falls on an "off" position (not steps 1, 5, 9, 13). Can you make it still feel like a groove and not just random?

**Step 5 — Lower the clave gain until it glues.** Try gain values of `0.3`, `0.2`, `0.15`. At what point does the clave stop being a competing voice and start being the invisible structure?

## In the world

UK garage emerged in London in the mid-to-late 1990s. It grew from US garage house (the Paradise Garage lineage, Larry Levan, New York) that came to the UK via pirate radio stations in the late 1980s and early 1990s. UK producers accelerated it and gave the kick a new shape.

Key producers and artists: **MJ Cole**, whose productions in the late 1990s (the *Sincere* EP, the *MJ Cole Presents Crazy Love* compilation) helped define the sound; **Todd Edwards**, an American producer who recorded chopped, sped-up vocal loops that became a signature garage texture; **Artful Dodger**, whose "Re-Rewind (Find Out Soon)" (1999, featuring Craig David) brought the garage sound to mainstream UK radio.

The 2-step name comes from the kick pattern: instead of four on the floor you get two main placements per bar, with additional kicks and ghost kicks filling the gaps. The dancers at UK garage nights moved with a specific shuffle — small quick steps on the off-beat, weight rolling between feet — that was choreographed around the irregular kick placement.

## Music theory note

The term **syncopation** means placing accents on normally weak beats or between beats. Four-on-the-floor is the least syncopated kick pattern: every beat is marked. The 2-step is more syncopated because it removes expected beats and adds unexpected ones.

When you layer the clave over the 2-step, you have two syncopated patterns interacting. The **density** of the combined result depends on where the hits coincide and where they open up. Music producers call the relationship between two rhythmic patterns their **rhythmic counterpoint**: each pattern is a voice, and the voices move against each other.

This is the same principle as 17th-century counterpoint in Western classical music, just applied to drum patterns at 130 BPM.

## History

The 2-step kick pattern in UK garage is generally associated with the period roughly 1997-2001, though the sound continued and mutated into grime (which kept a version of the syncopated pattern) and later UK funky (a more Afro-influenced variant that emerged around 2008-2010).

Todd Edwards, though American (New Jersey), had significant influence on UK garage through his distinctive production style and releases on UK labels. His vocal-chop technique, where small fragments of a singer's voice are looped and rearranged as percussion, became an important element of the genre. Daft Punk cited him as an influence on their *Discovery* album (2001).

MJ Cole (real name Matt Coleman) studied jazz at university, which may account for the harmonic sophistication of some UK garage productions — the genre often used jazz-inflected chord progressions under the syncopated beats. That jazz-clave-over-syncopated-kick chain connects back to Mario Bauzá and the Afro-Cuban jazz of the 1940s, though the UK garage producers were not necessarily aware of that lineage.

## Dance and body

UK garage floor dancing uses quick, small steps with an emphasis on the off-beats. Unlike house dancing (which often emphasises the downbeat kick) or salsa (which moves on defined beats against the clave), garage dancing shuffles between the kicks: the feet move in the spaces, not on the hits.

Try this without music: walk forward taking two small steps for every four counts (left foot on count 1, right foot on count 3). That is close to four-on-the-floor weight transfer. Now take a left step on count 1, right on count 2.5, left on count 4. That uneven distribution is closer to a 2-step body pattern. Add a small hip dip on the count 4 step. You have the basic unit of UK garage footwork.

## Self-test

Without looking back: what does "rhythmic counterpoint" mean when applied to drum patterns?

## Next

- Spine: [Stage 3 — The clave](/journey/3/clave)
- Other branches:
  - [Afrobeat clave — Tony Allen and Fela Kuti](/journey/3/branches/afro-house/afrobeat-clave)
  - [909 clave — sparse deep house rim](/journey/3/branches/deep/909-clave)
