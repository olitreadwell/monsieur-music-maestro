---
id: stage-4-phrase-tag
stage: 4
title: Phrase tag
type: mutate
difficulty: normal
branch: side-quest
parent: stage-4-counting
estimate_min: 10
---

## What you're listening for

A **phrase tag**: a sound, usually a short drum fill or crash, that lands on the last beat of a phrase to signal that a new phrase is about to begin. In funk and disco, this is often a snare roll, a cymbal, or a flam on beat 4 of bar 4. It tells the band and the dancers: "new phrase in one beat."

The phrase tag is one of the oldest signal devices in music. It is a question mark at the end of a sentence, answered by the first beat of the next phrase.

## How to read the code

Notation from earlier stages at work here:

- `s(...)` plays sounds in a looped sequence.
- `bd*4` is four-on-the-floor kick.
- `~ cp ~ cp` is the backbeat clap.
- `hh*8` is eight hi-hats per bar.
- `,` layers patterns simultaneously.
- `.bank("RolandTR909")` selects the TR-909 kit.
- `.cpm(128)` sets the tempo.
- `< >` alternates between options each bar.

This toy adds one new idea: **the `slow()` method**.

- `.slow(N)` stretches a pattern so it takes N times as long to complete one cycle. If your base cycle is one bar, `.slow(4)` makes a pattern take 4 bars to loop once.

Use `.slow(4)` on the phrase-tag line to make a single sound appear once every 4 bars rather than every bar.

```strudel
// bd*4               = four-on-the-floor kick, every beat.
// ~ cp ~ cp          = backbeat clap on beats 2 and 4.
// hh*8               = eight hi-hats per bar.
// oh ~ ~ ~           = open hi-hat on beat 1, silence for beats 2-3-4.
// .slow(4)           = stretch this pattern to 4 bars, so the open hat
//                      only lands on beat 1 of every 4th bar.
// .gain(N)           = volume multiplier (1.0 = full, 0.5 = half).
stack(
  s("bd*4"),
  s("~ cp ~ cp"),
  s("hh*8").gain(0.4),
  s("oh ~ ~ ~").slow(4).gain(0.9)
).bank("RolandTR909").cpm(128)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste and play. Count the bars: "1-2-3-4, 2-2-3-4, 3-2-3-4, 4-2-3-4." The open hi-hat (`oh`) lands on beat 1 of bar 1, then is silent for bars 2, 3, 4, then returns on bar 1 of the next phrase.

Now break it:

- Move the phrase tag to the last beat: change `oh ~ ~ ~` to `~ ~ ~ oh`. Now the tag lands on beat 4 of bar 4, just before the phrase resets. This is the classic "fill" position.
- Replace `oh` with `sd sd sd sd`. Four snare hits on the last beat of bar 4 = a micro drum fill.
- Try `.slow(8)` instead of `.slow(4)` to tag every 8-bar phrase instead.
- Stack two tags: one on beat 4 of bar 4 (`~ ~ ~ sd`) and a crash (`oh`) on beat 1 of bar 1. The phrase landing becomes a two-beat event.

## In the world

Listen to James Brown's band, or any classic funk record. The drummer (often Clyde Stubblefield or John "Jabo" Starks) puts a snare or tom fill on the last half-beat before the phrase turns over. That fill is the drum speaking to the dancers: "get ready."

In disco, producers added a cymbal crash or a short hat rush at phrase boundaries so DJs could use the change as a cue for mixing. Bernard Purdie, one of the most recorded session drummers of the 1960s and 1970s, was famous for phrase markers so precise that overdubbing instruments to his tracks was easy: every musician could hear exactly where they were in the form.

## Music theory note

In formal analysis, a phrase tag or **turnaround** is a brief passage at the end of a phrase that prepares the listener for the next one. In jazz, the turnaround is usually the last two bars of a 12-bar or 32-bar form, containing a chord that points back to the start.

In funk and drum-machine music, the equivalent is purely rhythmic: a **drum fill** (a rapid series of hits that depart from the groove) or a **crash** on the downbeat of the new phrase.

The fill's job is to say: "phrase ending now" and "phrase beginning now" at the same time. When it is right, it is almost invisible; you feel the phrase turn without consciously noticing the fill.

## History

The practice of marking phrase boundaries with drum fills is old in jazz and swing. Trap-set drummers in the 1930s and 1940s used short rolls to signal the band.

Clyde Stubblefield, who played on James Brown sessions from 1965 onward, developed fills so tightly linked to Brown's vocal phrases that the interaction became a model. Stubblefield's "Funky Drummer" break (1970) is one of the most sampled drum recordings in history, in part because the fill at the top of each phrase is perfectly placed.

Bernard Purdie worked as a session drummer for Atlantic Records through the 1960s and 1970s, recording with Aretha Franklin, Steely Dan, and many others. He is known for the "Purdie shuffle," a half-time feel with a distinctive ghost-note pattern, but also for phrase markers so clear that arrangers called him "Pretty Purdie" because his time made overdubbing easy.

Disco producers carried the fill convention into electronic music. When TR-808 and TR-909 patterns replaced live drummers, producers programmed equivalent fills with cymbal crashes and extra hi-hat hits at phrase turns.

## Dance and body

Dancers in funk and house settings use the phrase tag as a cue to break their groove: a spin, a dip, a freeze. If you are dancing and you lose the phrase count, wait for the fill or crash. It will locate you in the form.

Clap the phrase tag right now: count four bars of four, and on the last beat of bar 4, put in an extra loud clap. Feel how it snaps the phrase shut and opens a new one.

## Self-test

What is the difference between a phrase fill (on beat 4 of bar 4) and a phrase crash (on beat 1 of bar 1), and what does each one signal?

## Next

- Back to spine: [Counting](/journey/4/counting)
- Other side-quest: [16-bar build](/journey/4/16-bar-build)
