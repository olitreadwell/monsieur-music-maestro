---
id: stage-0-explore-sounds
stage: 0
title: Explore sounds
type: mutate
difficulty: easy
branch: side-quest
parent: stage-0-play
estimate_min: 5
---

## What you're listening for

**Timbre**: the quality or colour of a sound, apart from how loud or how long it is. A snare and a cymbal can both play at the same pitch and volume, but they sound completely different. That difference is timbre. When a drummer picks which drum to hit, they are choosing timbre.

Every token in Strudel's pattern string is an instruction to fetch a specific timbre from a drum machine kit. This toy cycles through all the main ones so you know what is in your toolkit.

## How to read the code

You already know `s(...)`, `bd`, `hh`, `sd`, `cp`, and `oh` from the Play toy. This toy adds two more names:

- `cy` = **cymbal** (specifically a crash cymbal). A splash of metallic noise. Longer than a closed hat and brighter than an open hat. Good for accents.
- `tom` = **tom drum** (a floor or rack tom). A thud with more pitch and body than the kick, used for fills and transitions.

The code below plays all seven sounds in one bar, one per slot, so you can hear them in sequence. Then it attaches `.bank("RolandTR909")` so you get the 909 flavour of each sound.

```strudel
// s(...)          = play these sounds in order, looped.
// bd              = bass drum (kick).
// hh              = hi-hat (closed, short tick).
// sd              = snare drum.
// cp              = clap.
// oh              = open hi-hat (longer, sustained ring).
// cy              = cymbal (crash, bright splash).
// tom             = tom drum (thuddy, mid-pitched).
// .bank(...)      = which drum machine kit to use for all sounds.
// "RolandTR909"   = the Roland TR-909 (1983), the house/techno kit.
s("bd hh sd cp oh cy tom").bank("RolandTR909")
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code. Cmd+Enter (or Ctrl+Enter) plays, Cmd+. stops.

Now break it:

- Listen twice. Try to name the timbre difference between `hh`, `oh`, and `cy`. All three are metallic. Which is shortest? Which spreads most?
- Reorder the slots. Try `s("bd cy sd oh tom hh cp").bank("RolandTR909")`. Same sounds, new feel.
- Try `s("cy*4").bank("RolandTR909")`. Four crashes per bar is unusual: but useful to know what it would sound like.
- Try `s("tom*4").bank("RolandTR909")`. Four toms per bar. This is the shape of a drum fill.
- Swap `"RolandTR909"` for `"RolandTR808"`. The 808 is from 1980, one model earlier. Its sounds have a different character: especially the kick and the toms.

## In the world

In a real track, different timbres give the ear different information:

- Low timbres (kick, bass) anchor the body and drive movement.
- Mid timbres (snare, clap, tom) mark the backbeat: the "crack" your body responds to.
- High timbres (closed hat, open hat, cymbal) fill the space between beats, keeping energy up.

A house producer layers these timbres carefully. The kick might be at 60 Hz, the snare at 200 Hz, the hats at 8 kHz: none of them competing for the same frequency slot.

## Music theory note

Timbre is sometimes called **tone colour** or **sound quality**. It is determined by the harmonic content of a sound: which overtones are present, how they change over time (the sound's **envelope**), and how the sound begins (the **attack**).

Percussion instruments are largely **unpitched**, meaning their harmonic content is noisy rather than forming a clear note. The tom is the most pitched of the standard drum kit sounds; the cymbal is the most complex and noisy.

## History

The Roland TR-909 came out in 1983. Roland designed it to simulate a live drum kit, but producers found the simulated sounds too artificial for acoustic-style recording. The machines sold poorly at first and were discontinued within two years. Musicians bought them secondhand cheaply.

Chicago house and Detroit techno producers then programmed the 909 to do things no live drummer could: perfectly steady patterns, looped forever, at precise tempo. The "artificial" quality became a feature, not a bug. The timbres you are hearing now are the timbres of early house: DJ Pierre, Frankie Knuckles, Marshall Jefferson, Derrick May, Kevin Saunderson.

## Dance and body

Different timbres land on different parts of the body. The kick goes into your chest and feet. The snare goes into your shoulders. The hi-hat goes into your hands and fingers. Listen to the sequence above and notice where each hit registers. Drummers and dancers share this knowledge: the body is the instrument that responds.

## Self-test

Without looking back: what is timbre, and which of the seven sounds is the most pitched?

## Next

- Spine: [Stage 1: Pulse](/journey/1/pulse)
- Side-quests in Stage 0: [Two patterns at once](/journey/0/two-patterns-at-once)
