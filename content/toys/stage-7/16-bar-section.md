---
id: stage-7-16-bar-section
stage: 7
title: 16-bar sections — verse and chorus thinking
type: challenge
difficulty: stretch
branch: side-quest
parent: stage-7-intro-build-drop
estimate_min: 15
---

## What you're listening for

A **section**: a block of music with a consistent character, usually 8 or 16 bars long. Dance music is built out of sections the way a wall is built out of bricks. Each brick is the same size; what changes is the arrangement of those bricks. This toy asks you to think at section scale, not bar scale.

## How to read the code

You know all the notation here. The challenge is in the thinking, not the syntax.

**`slow(N)` applied to the whole `stack`** stretches every pattern inside by the same factor. `stack(...).slow(2)` means the whole groove takes twice as many bars to complete one cycle. This gives you more time between structural events.

**The challenge structure**: the toy gives you two pattern variants labelled Section A and Section B. Your task is to combine them into a 32-bar arrangement: A for 16 bars, B for 16 bars, A for 8 bars. This is a standard AABA-flavour idea applied to dance music.

In Strudel, you cannot easily trigger a 16-bar section with a single control (that would require the interactive performance features in a more complex patch). Instead, you will **manually paste and run** one section, count 16 bars (that is 64 beats at 128 BPM, about 30 seconds), then paste the other section and run that.

This manual section switching is what a DJ does: they control which "section" the crowd hears by choosing what plays on which deck.

```strudel
// Section A — Verse: kick, hats, bass only (no chords, no clap)
// Use this for your intro and breakdown sections.
// Count 16 bars (about 30 seconds at 128 BPM) before switching.
stack(
  s("bd*4").bank("RolandTR909"),                         // kick
  s("hh*8").bank("RolandTR909").gain(0.45),              // hats
  note("c2 ~ ~ eb2 ~ ~ g2 ~").s("sawtooth").lpf(700).gain(0.6) // bass
)
```

```strudel
// Section B — Chorus/Drop: all elements in
// Use this for your drop. Switch to this after 16 bars of Section A.
stack(
  s("bd*4").bank("RolandTR909"),
  s("~ cp ~ cp").bank("RolandTR909"),
  s("hh*8").bank("RolandTR909").gain(0.5),
  note("c2 ~ ~ eb2 ~ ~ g2 ~").s("sawtooth").lpf(700).gain(0.6),
  note("<c3eb3g3 ab2c3eb3 f2ab2c3 g2bb2d3>")
    .s("piano").slow(2).room(0.3).gain(0.5)
)
```

## Try it

This is a **challenge** toy. Here is the structure to aim for:

1. Open [strudel.cc](https://strudel.cc). Paste Section A. Start playing.
2. Count 16 bars (tap your finger or count aloud: "1-2-3-4, 2-2-3-4... 16-2-3-4").
3. Without stopping, paste Section B into Strudel and press Cmd+Enter (Ctrl+Enter). The switch happens.
4. Count 16 more bars in Section B.
5. Paste Section A again and switch back. This is your breakdown.
6. After 8 bars in the breakdown, bring Section B back for the second drop.

You have just executed: A (16 bars) — B (16 bars) — A (8 bars) — B (16 bars). That is a real 56-bar arrangement.

**Extensions** once you can do the above:

- Write a Section C: just chords and bass (no kick), for a floating breakdown. Try: chords + bass with `.lpf(600)` to make them muffled and dark.
- Try three different hi-hat densities: `hh*4` for sparse intro, `hh*8` for verse, `hh*16` for chorus/drop. Use the different densities across your sections.
- Count your section lengths. Were you hitting exactly 16 bars, or losing count? The ability to count bars while doing something else (switching code, dancing) is a real DJ skill.

## In the world

Pop songs use verse/chorus as their primary structure. Dance music uses equivalent blocks labelled differently: intro, verse, break, chorus, outro. The principle is the same: contrast between sections (different energy, different texture) creates the listener's experience of a journey.

AABA is a common song form in jazz standards from the 1930s-50s: 8 bars of the main idea (A), 8 more bars of A, 8 bars of a contrasting section (B, called the "bridge"), 8 bars of A again. 32 bars total. Many house producers, consciously or not, use the same logic stretched to dance music's longer section lengths.

House tracks built for DJs typically have longer sections (16 or 32 bars each) than pop songs, because DJs need time to execute their mix transitions: they may need 4-8 bars to blend two tracks together smoothly.

## Music theory note

**Phrase structure** in Western music is built on powers of 2: 2-bar, 4-bar, 8-bar, 16-bar, 32-bar phrases. This is not a universal rule of music globally, but it is the dominant convention in European and American popular music from roughly the 1600s onward, and it maps onto how the ear groups events into units.

**AABA form** is also called **32-bar song form** or **Tin Pan Alley form**, named for the NYC songwriting industry (28th Street area, active roughly 1885-1950) that codified it. Gershwin, Porter, Berlin: all used AABA.

House music rarely uses lyrics or explicit verse/chorus naming, but the underlying phrase-length logic is the same. DJs instinctively feel when a 16-bar block ends: they have internalised the architecture.

## History

Section thinking in dance music developed differently than in song form. Early house producers in Chicago (mid-1980s) built tracks without a clear verse/chorus distinction: the goal was a continuous groove that DJs could mix with. Sections were defined more by what was in or out (the arrangement) than by melodic contrast.

The 16-bar block as the primary unit in house and techno became standard partly because it fit on both sides of a 12-inch single. A 12-inch single could hold roughly two to three minutes per side at 33rpm. Producers learned to make tracks where the structure would be legible to a DJ regardless of where the DJ started listening.

Detroit techno producers (Jeff Mills, Derrick May, Kevin Saunderson) were meticulous about bar counts. Live techno sets by Jeff Mills in the 1990s show a producer switching tracks at precise phrase boundaries, sometimes holding a new track for just 8 bars before switching again.

## Dance and body

16 bars is roughly 30 seconds at 128 BPM. That is long enough for your body to settle into a movement pattern and begin to anticipate change. The last 4 bars of a 16-bar section build anticipation: experienced dancers shift weight, preparing for whatever is coming.

When a breakdown hits (Section A after a heavy Section B), the body-release is visceral. Your shoulders drop. Your feet soften. This is why breakdowns exist: they give the body a rest before the next rise.

Try counting bars while dancing. See how long before you lose count. Most people can hold a bar count while doing simple movement; complex footwork interrupts the count. That difficulty is why counting in your head while DJing is a trainable skill.

## Self-test

Without looking back: what is AABA form, and why do house tracks use 16-bar sections instead of 8-bar sections like most pop songs?

## Next

- Return to spine: [Stage 8 — Two decks](/journey/8/two-decks)
- Other side-quest: [Filter build](/journey/7/filter-build)
