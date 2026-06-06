---
id: stage-3-tresillo
stage: 3
title: Tresillo
type: mutate
difficulty: normal
branch: side-quest
parent: stage-3-clave
estimate_min: 8
---

## What you're listening for

A single bar of eight steps with **three hits**: at step 1, step 4, and step 7. The gaps are not even: they are 3 steps, then 3 steps, then 2 steps. That `3+3+2` cell is called the **tresillo** (Spanish for "little three").

If the clave is a two-bar phrase, the tresillo is the first bar of it. It is also the building block of reggaeton, habanera, jazz, and much of the pop you hear today.

## How to read the code

No new Strudel notation here. Everything is from stages 0 and 1.

- `s("...")` plays a looping sound sequence.
- `cp` is a clap, one hit at one step.
- `~` is a rest, one silent step.
- `stack(...)` layers patterns so they play simultaneously.
- `.gain(n)` sets volume.
- `.bank("RolandTR909")` uses the TR-909 kit.

The tresillo written out: 8 steps, 3 hits, unevenly spaced.

```
step: 1  2  3  4  5  6  7  8
hit:  cp ~  ~  cp ~  ~  cp ~
gap:  |--3--|  |--3--|  |-2-|
```

In Strudel that is exactly: `"cp ~ ~ cp ~ ~ cp ~"`

```strudel
// The tresillo over a house kick.
// cp = clap, the tresillo hit.
// ~  = rest (silence).
// 8 steps total = one bar. Gaps: 3, 3, 2.
stack(
  s("bd*4"),                           // four-on-the-floor kick
  s("cp ~ ~ cp ~ ~ cp ~").gain(0.8),   // tresillo: 3+3+2 over 8 steps
  s("hh*8").gain(0.3)                  // hi-hats for texture
).bank("RolandTR909")
```

## Try it

Paste in [strudel.cc](https://strudel.cc). Play and stop with Cmd+Enter and Cmd+.

Break it:

- Remove the kick. Clap along with the tresillo. Count "1, 2, 3" for the first gap, "1, 2, 3" for the second, then "1, 2" for the last. Does the final shorter gap feel like it "snaps" back to the start?
- Change the clave to `"cp ~ cp ~ ~ cp ~ ~"`: that is a 2+3+3 arrangement. Same three hits, different home. Does it feel like the tresillo starts on a different foot?
- Lower the tresillo gain to `0.2`. With the kick louder, does the tresillo feel hidden inside the groove rather than sitting on top?
- Try the full son clave from the spine toy: `"cp ~ ~ cp ~ ~ cp ~ ~ ~ cp ~ cp ~ ~ ~"`. Compare the one-bar tresillo to the two-bar clave. The tresillo is the clave's first half.

## In the world

The tresillo does not stay in one genre. It has been in pop music for well over 150 years.

In 19th-century Cuba it appeared in the **habanera**: a ballroom and parlour dance that became popular across Europe. The composer Georges Bizet used the habanera rhythm in his 1875 opera *Carmen*. The aria "L'amour est un oiseau rebelle" opens with a bass line in exactly the tresillo shape. Bizet likely found the rhythm in printed sheet music imported from Cuba.

That same cell fed into early US **ragtime** (Scott Joplin's syncopations carry the same feel) and into jazz.

In Jamaican music in the late 1980s the **Dem Bow** riddim (a tresillo-shaped kick and snare pattern, produced by Steely and Clevie around 1990) became the rhythmic foundation of **dancehall**. Puerto Rican producers in New York in the early 1990s took Dem Bow and built **reggaeton** from it. Today reggaeton is one of the most-streamed genres on earth, and that bass-heavy 3+3+2 is still underneath it.

Drake's "Hotline Bling" (2015) rides a tresillo-shaped rhythmic feel. Post Malone's trap-influenced records lean on it. The cell keeps appearing because it is natural and pleasing: two long gestures followed by a short snap.

## Music theory note

The tresillo is an example of **rhythmic displacement**: placing accents where the listener does not quite expect them, while still fitting inside the 4/4 bar.

The three hits span 3+3+2 = 8 steps. If you divide 8 evenly you get 4 steps between hits. The tresillo compresses two of those gaps (from 4 to 3) and shortens the last one further (to 2). The result is a kind of forward lean: the rhythm always arrives a little early.

That forward lean is what makes people move. It is not random or chaotic; it is a very specific deviation from even spacing that creates anticipation and release.

## History

The tresillo's ancestry runs through West and Central African drumming via Cuba. Enslaved Africans brought to Cuba during the Spanish colonial period (roughly 1500s to 1886 emancipation) included musicians from Bantu-speaking Central African cultures and from the Yoruba, Ewe, and Fon peoples of West Africa. Their bell and percussion patterns included the tresillo-like cell. Cuban son absorbed those patterns.

The **habanera** (also called *contradanza cubana*) formalised the tresillo in written music by the mid-19th century. From Cuba it moved into Mexico, Argentina (the precursor of tango), Spain, and beyond. Bizet's *Carmen* (premiered in Paris in 1875) made it European.

Back in the Americas it fed into the blues, jazz, and eventually into the rhythm section patterns that shape modern pop. Music historians sometimes call the tresillo the "New World rhythm" because it appears in so many traditions across the Americas with African-descended roots.

## Dance and body

The tresillo's 3+3+2 feel gives dancers two long beats and one short one per bar. The "short beat" at the end: the snap back to step 1: is a moment of urgency. Salsa dancers call a related feeling the "clave feel": the sense that certain steps are pushed and others are pulled.

Try this: stand still and bounce slowly. On the tresillo hits, let your weight drop (or your knee bend): hit, rest, rest, **drop**; rest, rest, **drop**; rest, **drop**, and restart. The short gap at the end means the third drop arrives faster. That sudden arrival is a bodily jolt. It is why tresillo rhythms work on a dance floor.

## Self-test

Without looking back: what are the three gap sizes in a tresillo? (In steps.)

## Next

- Spine: [Stage 3: The clave (spine)](/journey/3/clave)
- Related side-quest: [2-3 flip: swap clave direction](/journey/3/2-3-flip)
