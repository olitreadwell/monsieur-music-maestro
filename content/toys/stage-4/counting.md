---
id: stage-4-counting
stage: 4
title: Counting bars and phrases
type: mutate
difficulty: normal
branch: spine
parent: stage-3-clave
estimate_min: 10
---

## What you're listening for

A **phrase**: a chunk of music that feels like a sentence. Single beats group into bars (4 beats each). Bars group into phrases (usually 4, 8, or 16 bars). Listen to any house or pop track and you will notice something changes every 8 or 16 bars: a new element enters, a layer drops out, a vocal line starts. That change marks a **phrase boundary**.

This is how producers and DJs carve music into sections. This is how dancers know when a change is coming. Counting to 4 is one bar. Counting to 64 (sixteen bars of four beats) is one standard block.

## How to read the code

All the Strudel notation in this toy was introduced in earlier stages. Here is what is at work:

- `s(...)` plays a sequence of sounds.
- `bd*4` plays the bass drum four times per bar, evenly spaced (four-on-the-floor).
- `~ cp ~ cp` is silence, clap, silence, clap: the backbeat on beats 2 and 4.
- `hh*8` plays eight hi-hats per bar, filling every half-beat.
- `,` inside the quotes layers two or more patterns so they play at the same time.
- `.bank("RolandTR909")` selects the TR-909 drum machine kit.
- `.cpm(128)` sets the tempo in cycles (bars) per minute: 128 cpm = 128 BPM when one cycle is one bar.

The new notation this toy adds is `< >`:

- `< >` (angle brackets) is a **cycle alternation**. Each time the pattern loops, Strudel picks the next option inside the brackets. So `<hh*8 hh*16>` plays `hh*8` on bar 1, `hh*16` on bar 2, `hh*8` on bar 3, and so on.

Use alternation to create a **phrase marker**: a sound that changes only every Nth bar, signalling to the ear that a boundary has passed.

```strudel
// s(...)          = play these sounds in sequence, looped.
// bd*4            = four-on-the-floor kick.
// ~ cp ~ cp       = clap on beats 2 and 4 (backbeat).
// < >             = alternate between options on each new cycle (bar).
// hh*8            = eight hi-hats per bar (regular).
// hh*16           = sixteen hi-hats per bar (double-time rush).
// .bank(...)      = drum kit (TR-909 here).
// .cpm(128)       = 128 bars per minute = 128 BPM.
stack(
  s("bd*4"),
  s("~ cp ~ cp"),
  s("<hh*8 hh*16>").gain(0.4)
).bank("RolandTR909").cpm(128)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code above. Cmd+Enter (or Ctrl+Enter) plays, Cmd+. stops.

Count out loud as it runs: "1-2-3-4, 2-2-3-4, ..." When you hear the hats change from regular to rushing, that is bar 2 of a two-bar phrase.

Now break it:

- Change `<hh*8 hh*16>` to `<hh*8 hh*8 hh*8 hh*16>`. Now the double-time rush lands every 4th bar. That is a 4-bar phrase marker.
- Add a crash or open hat as the phrase marker: `<~ ~ ~ oh>`. Silence for three bars, then a single open hat on bar 4.
- Try `<bd*4 bd*2>` to make the kick itself halve in density every other bar.
- Slow it down with `.cpm(120)` (house tempo) or push it with `.cpm(134)` (harder techno).

## In the world

Listen to "Good Life" by Inner City (1988) or any Larry Heard track. Count the bars. Notice when the hi-hat pattern shifts, or when a new layer enters. Almost every change happens at bar 4, 8, or 16. Producers write these changes in because DJs mix at phrase boundaries and dancers feel them.

At a club, an experienced dancer never breaks their movement at a random beat. They "save" a direction change or a turn for the phrase boundary. The music and the body share the same calendar.

## Music theory note

A **bar** (also called a **measure**) is a group of beats set by the time signature. In 4/4 time, every bar has four beats.

A **phrase** is a musical sentence: the minimum unit that feels complete. In most pop and dance music, phrases are 4 bars, 8 bars, or 16 bars long.

The first beat of a bar is the **downbeat**, often written "the 1." The first beat of a phrase is the **phrase downbeat** or "the 1 of the phrase." DJs talk about "dropping on the 1" to mean starting a new track precisely at a phrase downbeat.

## History

Four-bar and eight-bar phrase structures run through European and American popular music from the 1800s onward, likely because they map onto the natural breath lengths of singers and the call-and-response shapes of hymns and work songs.

In the 1970s and 1980s, disco and funk arrangers kept the European phrase grid but stretched it. A typical disco track might stay on one section for 16 bars before moving, giving DJs enough time to beatmatch the next record. House producers in Chicago adopted that convention directly. Frankie Knuckles and Larry Heard built tracks in 8-bar and 16-bar blocks so the music could be looped and mixed seamlessly.

Techno and European house in the late 1980s and 1990s pushed toward 32-bar and 64-bar blocks for longer, slower builds. The phrase length became a tool of tension: the longer the phrase, the bigger the release when the drop finally lands.

## Dance and body

Stand up and count bars out loud: "1-2-3-4, 2-2-3-4, 3-2-3-4, 4-2-3-4." That is four bars.

Notice: somewhere around bar 4, your body wants to do something different. A step change, a turn, a raised arm. That anticipation is the phrase boundary working on you. Dancers learn to trust that feeling. When the music confirms it (a crash, a filter sweep, a new layer), the connection between your body and the track becomes physical.

Try this with a track you love: count 8-bar phrases and mark each boundary with a clap. Within a few minutes, you will predict the changes before they arrive.

## Self-test

How many beats are in an 8-bar phrase in 4/4 time?

## Next

- Spine: [Stage 5 — The low end](/journey/5/bassline)
- Side-quests:
  - [Phrase tag](/journey/4/phrase-tag)
  - [16-bar build](/journey/4/16-bar-build)
