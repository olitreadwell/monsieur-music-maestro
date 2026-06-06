---
id: stage-2-shuffle-hats
stage: 2
title: Shuffle hats
type: mutate
difficulty: normal
branch: side-quest
parent: stage-2-hats-clap
estimate_min: 10
---

## What you're listening for

**Swing feel**: when the eighth notes between beats are not evenly spaced. In straight time, "one-AND-two-AND" divides each beat in half. In swung time, the first eighth note is a little longer and the second is a little shorter, giving the pattern a lopsided, rolling quality. That unevenness is what musicians call **shuffle** or **swing**.

Compare: straight hats feel mechanical, relentless. Swung hats feel like someone is playing them.

## How to read the code

You already know `s(...)`, `hh*8`, the comma `,`, `.bank(...)`, and `bd*4` and `[~ cp]*2` from the Hats and Clap toy.

This toy introduces one new method: `.swing(N)`.

- `.swing(N)` shifts every second subdivision slightly later in time, creating the swing feel. `N` is a value between 0 and 1, where 0 is perfectly straight and 0.5 is a very strong swing (a "triplet feel" where the beat is divided into three equal parts and the second lands on the third). A value around 0.15 to 0.25 gives a light shuffle: enough to feel but not cartoonish.

Note: `.swing()` is a live parameter and the exact range and feel depends on your Strudel version. If `.swing(0.2)` sounds too subtle, try `.swing(0.3)`. If it sounds wrong, try `.swing(0.15)`. Tune by ear.

```strudel
// s(...)            = play these sounds in order, looped.
// bd*4              = bass drum, 4 times per bar.
// ,                 = comma: add another voice.
// [~ cp]*2          = clap on beats 2 and 4 (rest-clap, rest-clap).
// hh*8              = hi-hat, 8 times per bar.
// .bank("RolandTR909") = Roland TR-909 kit.
// .swing(0.2)       = shift every second subdivision slightly later.
//                     0 = straight, ~0.5 = full triplet swing.
//                     Tune 0.15 to 0.3 for a light shuffle.
s("bd*4, [~ cp]*2, hh*8").bank("RolandTR909").swing(0.2)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code. Cmd+Enter plays, Cmd+. stops.

Now break it:

- Compare `.swing(0)` (perfectly straight) with `.swing(0.2)`. Your ear should catch the change in the hats. The kick and clap feel it too, but the hats make it obvious.
- Try `.swing(0.4)`. Very swung: almost dotted-note feel.
- Try `.swing(0.15)`. Subtle. Some producers call this "humanising" the grid.
- Try removing the kick and clap: `s("hh*8").bank("RolandTR909").swing(0.2)`. Just the hats. Now you can really hear the lopsided eighth notes.

## In the world

Swing is one of the most important feels in Western popular music. Jazz rhythm sections in the 1920s and 1930s swung every eighth note as standard practice. Funk drummers in the 1970s used a lighter shuffle to give grooves a forward lean. UK garage in the 1990s built its "2-step" feel by shifting the hi-hat off the straight eighth note grid: a swing that became the signature of the genre.

House music is often straight-quantised: perfectly even hats. But some sub-genres, including deep house and certain UK house styles, use a slight shuffle to add warmth. DJ and producer Larry Heard's early recordings from Chicago in the mid-1980s sometimes have this quality, though debates continue about whether it was deliberate or a product of the machines.

## Music theory note

In standard notation, **swing** is expressed as a triplet feel: a beat divides into three parts, and paired eighth notes are played as the first and third of a triplet (long-short instead of equal). A full swing would be notated as dotted eighth plus sixteenth. But musicians usually describe swing on a spectrum: light swing, medium swing, heavy swing, straight.

The term **shuffle** typically refers to a groove built on swung eighth notes, especially in blues. A classic 12-bar blues uses a shuffle feel throughout. The shuffle that travelled into rock, R&B, and soul is descended from this tradition.

## History

Jazz in the 1920s and 1930s formalised swing feel as the defining rhythmic character of the genre. Big band drummers (Chick Webb, Gene Krupa, Jo Jones) developed the vocabulary of swung ride cymbal patterns that became the template for jazz drumming.

Swing feel then moved into rhythm and blues in the 1940s and 1950s. Funk rhythm sections in the late 1960s and 1970s (James Brown's band, Sly Stone's band) often played with a slightly swung feel against an otherwise metronomic bass.

UK garage in the 1990s borrowed the two-step shuffle from its house and R&B influences and exaggerated it into a genre-defining feel. Producers like Todd Edwards, MJ Cole, and El-B made the swung grid central to the sound.

## Dance and body

Step to the straight version (`.swing(0)`) and notice how mechanical it feels. Then switch to `.swing(0.2)` while stepping. You may need a few bars to adjust, but the step will start to feel more like a walk than a march. The unevenness gives you something to lean into.

Jazz dancers, swing-era lindy hoppers, and later hip-hop dancers all described this as "the pulse you move with, not against." Straight time you push through; swing time carries you.

## Self-test

Without looking back: what does `.swing(N)` do to the pattern, and what value gives a subtle shuffle versus a heavy one?

## Next

- Spine: [Stage 3: Clave](/journey/3/clave)
- Side-quests in Stage 2: [Open vs closed hats](/journey/2/open-vs-closed-hats), [Hats and clap](/journey/2/hats-clap)
