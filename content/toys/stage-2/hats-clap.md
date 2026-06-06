---
id: stage-2-hats-clap
stage: 2
title: Hats and clap
type: mutate
difficulty: easy
branch: spine
parent: stage-1-pulse
estimate_min: 8
puzzle:
  id: stage-2-hats-clap-puzzle
  kind: reorder
  prompt: "Reorder these tokens so the bar reads kick on every beat, clap on beats 2 and 4, hats on every eighth."
  tokens:
    - "bd*4"
    - "[~ cp]*2"
    - "hh*8"
  correctSequence:
    - "bd*4"
    - "[~ cp]*2"
    - "hh*8"
---

## What you're listening for

The **backbeat**: the clap or snare that falls on beats 2 and 4 of a 4/4 bar. Add the eight hi-hats that fill the space between kicks, and you have the complete house drum loop: kick, clap, hats, all running at the same time.

This is the pattern behind nearly every house track you have ever heard.

## How to read the code

You already know `s(...)`, `bd*4`, the comma `,` for layering voices, and `.bank(...)`.

This toy introduces three new pieces of notation:

- `~` is **rest** (silence). A `~` in a slot means "no sound here." It is a placeholder that takes up time without making a sound.
- `[...]` is **grouping** for subdivisions. Square brackets group multiple tokens into one slot on the bar grid. So `[~ cp]` means "fit a rest and a clap together into a single beat slot." Strudel divides that slot in two and plays one item per half.
- `*2` after a group or token means "repeat this group 2 times across the bar." You already know `*4` and `*8` for single tokens. The same `*N` works after `[...]` groups. So `[~ cp]*2` means "play the group `[~ cp]` twice in one bar": rest-clap, rest-clap. That lands the clap on beats 2 and 4.

Putting it together: `"bd*4, [~ cp]*2, hh*8"` reads as three voices:
1. `bd*4`: kick on all four beats.
2. `[~ cp]*2`: rest on beat 1, clap on beat 2, rest on beat 3, clap on beat 4.
3. `hh*8`: hi-hat eight times per bar, which is twice per beat (eighth notes).

```strudel
// s(...)           = play these sounds in order, looped.
// bd*4             = bass drum, 4 times per bar (four-on-the-floor).
// ,                = comma: play the next pattern at the same time.
// [~ cp]*2         = group of (rest, clap), repeated twice per bar.
//   ~              = rest (silence on beat 1 and beat 3).
//   cp             = clap (lands on beat 2 and beat 4 = the backbeat).
//   *2             = play this group 2 times per bar.
// hh*8             = hi-hat, 8 times per bar (eighth notes, twice per beat).
// .bank(...)       = which drum machine kit to use.
// "RolandTR909"    = Roland TR-909 (1983), the house/techno kit.
s("bd*4, [~ cp]*2, hh*8").bank("RolandTR909")
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code. Cmd+Enter plays, Cmd+. stops.

Now break it:

- Listen to the full loop. Try to identify each of the three voices separately while it plays.
- Remove the clap voice: `s("bd*4, hh*8").bank("RolandTR909")`. The track sounds emptier. The clap creates the backbeat emphasis.
- Change `[~ cp]*2` to `cp*4`. The clap now falls on every beat instead of just 2 and 4. Notice how it loses its backbeat snap and starts to sound monotonous.
- Change `hh*8` to `hh*4`. Half as many hats: the pattern suddenly feels more open and less like classic house.
- Change `hh*8` to `hh*16`. Sixteen hats per bar is double-time. Busy, almost frantic: closer to UK garage or drum 'n' bass.
- Swap `.bank("RolandTR909")` for `.bank("RolandTR808")`. Same pattern, different weight: the 808 kick is rounder, from the 808 vs 909 toy.

## In the world

Put on any house track: Larry Heard's "Can You Feel It," Frankie Knuckles's "Your Love," any Armand van Helden or MK track. Within the first four bars you will hear this exact pattern: four kicks, clap on 2 and 4, hats running between. The clap is usually a sample of a TR-909 clap or a real hand clap, sometimes both layered.

On the dance floor, the backbeat clap is what the crowd claps along to. When a DJ drops a track and the whole room claps in unison, they are all on beats 2 and 4, following the backbeat.

## Music theory note

**Backbeat** refers to the emphasis on beats 2 and 4 in a 4/4 bar. The "strong beats" in classical theory are 1 and 3 (the downbeats). Placing the accent on 2 and 4 instead creates tension against that expectation: the feeling of forward motion, groove.

The eight hi-hats per bar are **eighth notes**: the bar is divided into eight equal parts, two per beat. When you count "one-and-two-and-three-and-four-and," the "and" syllables are the eighth-note subdivisions. House hi-hats fill those subdivisions.

## History

The clap on beats 2 and 4 comes from Black American popular music long before drum machines. Drummers in gospel, R&B, and soul emphasised those beats to match and drive call-and-response clapping from the congregation or audience. James Brown's longtime drummer **Clyde Stubblefield** is one of the most sampled and cited examples of backbeat precision. **Earl Young** of Philadelphia's MFSB session band laid down the backbeat-plus-four-on-the-floor combination that became the template for disco. Disco gave it to house.

The drum machine encoded this tradition. The TR-909's clap channel became standard because it could reproduce exactly the 2-and-4 placement, locked to a digital clock, every bar, indefinitely.

## Dance and body

Clap your hands on beats 2 and 4 while the pattern plays. Your feet step on 1-2-3-4 (the kicks), your hands clap on 2 and 4. This split is the most fundamental physical gesture in house dancing and in most of the popular music that fed it: soul, funk, disco, gospel.

Try stepping and clapping at the same time. Once you feel both, try adding a slight shoulder bounce on each kick. You are now doing the basic house step from the inside out.

## Self-test

Without looking back: what does `[~ cp]*2` produce, and on which beats does the clap fall?

## Next

- Spine: [Stage 3: Clave](/journey/3/clave)
- Side-quests in Stage 2: [Shuffle hats](/journey/2/shuffle-hats), [Open vs closed hats](/journey/2/open-vs-closed-hats)
