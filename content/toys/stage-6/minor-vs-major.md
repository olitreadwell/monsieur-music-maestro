---
id: stage-6-minor-vs-major
stage: 6
title: Minor vs major — change one note
type: mutate
difficulty: easy
branch: side-quest
parent: stage-6-chord-stab
estimate_min: 8
---

## What you're listening for

One note. That is the entire difference between a minor chord and a major chord. Change a single semitone and the emotional register shifts from darker and more tense to brighter and more open. You can feel this before you can name it.

## How to read the code

You have already seen chords in the chord-stab toy: three notes grouped together inside `note(...)`, played with angle brackets for one chord per cycle.

This toy introduces the **minor third vs major third** as something you can hear directly.

A **semitone** is the smallest step in Western music: the gap between any two adjacent keys on a piano (including the black ones). The difference between a minor triad and a major triad is exactly one semitone on the middle note.

- **Minor triad**: root, minor third (3 semitones up), fifth (7 semitones up). Example: `c3 eb3 g3`.
- **Major triad**: root, major third (4 semitones up), fifth (7 semitones up). Example: `c3 e3 g3`.

In Strudel note names, `eb` means E-flat (E lowered by one semitone). `e` (without the `b`) means E natural. Those two are one semitone apart.

The code uses a simple two-chord sequence. **Cycle A** plays the same chord in minor. **Cycle B** plays the same chord in major. The toggle is `<c3eb3g3 c3e3g3>`.

```strudel
// note(...)       = pitched notes
// "<...>"         = one item per cycle
// c3eb3g3         = C minor triad: root C, minor third Eb, fifth G
// c3e3g3          = C major triad: root C, major third E, fifth G
// The only change: eb (E-flat) vs e (E natural), one semitone
// .s("piano")     = piano timbre
// .slow(2)        = two bars per full cycle so you hear each chord clearly
// .room(0.2)      = slight reverb
note("<c3eb3g3 c3e3g3>")
  .s("piano")
  .slow(2)
  .room(0.2)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code. Play it.

Now break it:

- Remove the second chord so only minor plays: `note("<c3eb3g3>")`. Hear the feeling settle on minor.
- Swap to only major: `note("<c3e3g3>")`. The same groove, a different feeling.
- Try changing the root note. Replace both `c3` roots with `a2` to get A minor vs A major: `note("<a2c3e3 a2cs3e3>")`. (In Strudel, `cs` is C-sharp, one semitone above C. A major has C-sharp as its third.)
- Add the kick underneath:
  ```strudel
  stack(
    note("<c3eb3g3 c3e3g3>").s("piano").slow(2).room(0.2),
    s("bd*4").bank("RolandTR909")
  )
  ```
  The minor cycle feels like it yearns. The major cycle feels like arrival.

## In the world

House music leans minor. Deep house in particular — tracks by Larry Heard (Mr Fingers), Kerri Chandler, and early UK house producers in the early 1990s — favours minor chords that feel melancholy and contemplative. This is partly a blues inheritance: minor modes carry a long history of expressive depth from blues through soul through disco into house.

Joe Smooth's "Promised Land" (1987) is a clear example of major-key house. The gospel-inflected chords and major harmony give it a feeling of uplift rather than ache. Compare it to a Larry Heard deep house track in the same era and you hear the full emotional range that the minor/major choice controls.

In Amapiano, both minor and major chord progressions appear. The choice sets the mood of the whole track the way colour sets the mood of a room.

## Music theory note

The names come from Latin: **minor** (smaller) refers to the smaller interval of three semitones; **major** (larger) refers to the larger interval of four semitones. These terms appear in a Roman music-theory text from around the 6th century CE but the practice of distinguishing them in composition is older and developed through medieval and Renaissance polyphony.

The **key** of a track is defined partly by whether its scale and home chord are major or minor. A song in C minor uses a different set of notes than a song in C major, and the two sets create completely different emotional environments even though they share the same root pitch.

## History

The emotional association between minor keys and sadness, and major keys and happiness, is widespread across cultures but not universal. In Western European art music from roughly the 1600s onward, composers deliberately exploited this association. By the time of blues (early 1900s, American South), the **minor pentatonic scale** carried the expressive weight of that music.

Deep house producers, many of them Black and queer Chicagoans and New Yorkers in the 1980s, brought the minor-key feeling into house as a form of emotional honesty. Kerri Chandler (New Jersey) and Larry Heard (Chicago) in the late 1980s and early 1990s made minor-key house that felt devotional, almost spiritual.

Joe Smooth's "Promised Land" broke that pattern with major harmony and lyrics about unity and hope. Its reception showed that the dance floor could hold both registers.

## Dance and body

Close your eyes and listen to the same groove shift between minor and major. Notice where in your body you feel the change. Minor often sits heavier in the chest; major lifts toward the face and arms. Neither is better. Both are tools.

When you dance to a minor-key section, let your movement go a little inward. When the major resolution comes, let it open outward. This is how music and body talk to each other without words.

## Self-test

Without looking back: how many semitones separate a minor third from a major third? And which house producer is most associated with the melancholy, minor-key "deep house" sound?

## Next

- Return to spine: [Stage 7 — Shape](/journey/7/intro-build-drop)
- Other side-quest: [The pad](/journey/6/pad)
