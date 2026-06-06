---
id: stage-5-off-beat-bass
stage: 5
title: Off-beat bass
type: mutate
difficulty: normal
branch: side-quest
parent: stage-5-bassline
estimate_min: 10
---

## What you're listening for

Bass on the **offbeats**: the "and" between each beat. In 4/4 time, the beats are 1, 2, 3, 4. The offbeats are the half-beats: "1-and, 2-and, 3-and, 4-and." When the bass lands on the "ands" rather than the beats, the pattern becomes **syncopated**, creating a bouncing, forward-leaning energy. This is the sound of disco bass and the driving pulse of classic house.

## How to read the code

Notation already introduced:

- `note(...)` plays pitched note sequences.
- `.s("bass")` uses the bass sample bank.
- `.lpf(N)` is the low-pass filter.
- `.gain(N)` adjusts volume.
- `s("bd*4")` is four-on-the-floor kick.
- `.bank("RolandTR909")` selects the TR-909 kit.
- `.cpm(128)` sets the tempo.
- `~` is silence (a rest).
- `[...]` (square brackets) is **mini-notation subdivision**: the content inside brackets divides the slot evenly. So `[~ c2]` means "within one beat, play silence then `c2`." That puts `c2` on the offbeat (the "and") of that beat.

The key idea: placing `[~ c2]` in a slot makes the note fall on the second half of that beat. That is the offbeat.

```strudel
// note(...)        = pitched note sequence.
// [~ c2]           = subdivision: silence on the beat, c2 on the "and" (offbeat).
// ~                = full-slot silence: skip this beat entirely.
// [~ eb2]          = silence on the beat, eb2 on the "and" (offbeat).
// .s("bass")       = bass sample bank.
// .lpf(500)        = low-pass filter, keeping warmth but some presence.
// .gain(0.8)       = 80% volume.
// bd*4             = four-on-the-floor kick on every beat.
// .bank("RolandTR909") = TR-909 kit.
// .cpm(128)        = 128 BPM.
stack(
  s("bd*4").bank("RolandTR909"),
  note("[~ c2] ~ [~ c2] [~ eb2]").s("bass").lpf(500).gain(0.8)
).cpm(128)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste and play. The kick lands on beats 1, 2, 3, 4. The bass lands between beats: on the "and" of beat 1, the "and" of beat 3, and the "and" of beat 4. Notice how the bass seems to push forward, as if it is always arriving just a fraction late and pulling you along with it.

Now break it:

- Change `[~ c2]` to `c2` (remove the brackets and silence). The bass lands directly on the beats now. Compare: the bouncing energy disappears.
- Try `note("[~ c2] [~ c2] [~ g2] [~ c2]")` for a bass pattern on every offbeat. This is the classic disco "pumping" bass feel.
- Change `eb2` to `bb1`. A lower note on the last offbeat creates a "dip" before beat 1 of the next bar.
- Add a backbeat: include `s("~ cp ~ cp").bank("RolandTR909")` in the stack. Hear how the offbeat bass and the on-beat clap create tension between them.

## In the world

The offbeat bass is central to disco. Listen to Chic's "Le Freak" (1978) or "Dance, Dance, Dance (Yowsah, Yowsah, Yowsah)" (1977): Bernard Edwards places many bass hits on the "ands," creating a momentum that runs under the four-on-the-floor kick. The bass never stops moving.

Robbie Shakespeare (of Sly and Robbie, the Jamaican studio duo) used a similar approach in reggae and dancehall productions: the bass dips and rises between the one-drop drum hits, creating the characteristic "sway" of roots reggae.

Bootsy Collins, who played with James Brown and then Parliament-Funkadelic, often plays bass around the beat rather than on it, in conversation with the kick and snare rather than simply doubling them.

In house, the offbeat bass became part of the genre DNA through tracks that sampled or directly referenced disco. The "pump" in a house track, where the bass note appears on the "and" of beat 4 and hangs over into beat 1 of the next bar, is a direct disco inheritance.

## Music theory note

**Syncopation** is the placement of rhythmic emphasis on weak beats or offbeats. In 4/4 time, the strong beats are 1 and 3; the weaker beats are 2 and 4; the weakest positions are the "ands" between each beat.

Moving bass hits onto "ands" creates syncopation. The listener's ear expects the bass to land on the beat; when it arrives slightly early or late, tension and forward momentum are created. This tension resolves each time the kick reinforces the beat.

The interplay between the on-beat kick and the off-beat bass is a rhythmic dialogue. The kick says "here is the beat." The bass says "I know, but I am going to push toward it." When the two lock at bar boundaries, the resolution is satisfying.

In Afro-Cuban music, the same dialogue happens between the clave and the bass tumbao. The tumbao bass pattern in son and salsa is built around offbeat anticipations of the beat, creating the characteristic forward-leaning energy of Latin music.

## History

**Bernard Edwards** (born 1952, died 1996) formed Chic with Nile Rodgers in New York in 1976. The Chic Organisation produced and wrote for Sister Sledge, Diana Ross, and others through the late 1970s and early 1980s. Edwards' bass playing on "Good Times" (1979) is one of the most influential bass lines in popular music: its offbeat hits and rhythmic clarity became a template for disco, early hip-hop, and house.

**Robbie Shakespeare** (born 1953, died 2021) worked primarily in Jamaica and New York. With drummer Sly Dunbar, he formed the production duo Sly and Robbie, recording with artists including Peter Tosh, Gregory Isaacs, and Grace Jones. Shakespeare's bass playing in reggae and dancehall moved fluidly between the one-drop (beat 3) and anticipations around the beat.

**Bootsy Collins** (born 1951) played bass for James Brown (1970 to 1971) then joined George Clinton's Parliament-Funkadelic collective, where he developed a style of playing that treated the bass as a lead melodic and rhythmic voice, often at the expense of strict harmonic function. His "one" concept (every groove resolves to beat 1) became a key idea in funk theory.

In house music, these bass approaches arrived through sampling, through direct study by house producers, and through the musical backgrounds of musicians in the Chicago and New York scenes who had grown up listening to soul, funk, and disco.

## Dance and body

Listen to the patch and count the beats out loud: "1-and, 2-and, 3-and, 4-and." Tap your foot on the beat numbers. Now notice when the bass hits: it lands on the "ands," between your foot-taps.

Try walking to the beat while listening. Your feet land on 1, 2, 3, 4. Feel how the bass pulls your weight forward, arriving just after your foot does, as if nudging you toward the next step. That forward lean is syncopation in the body.

This is why disco made people dance. The bass did not follow the beat; it pushed toward it.

## Self-test

In `[~ c2]`, which part of the beat does `c2` land on: the downbeat or the offbeat? How would you write "c2 on the downbeat, silence on the offbeat" in the same notation?

## Next

- Back to spine: [Bassline](/journey/5/bassline)
- Other side-quest: [Sub vs mid bass](/journey/5/sub-vs-mid)
