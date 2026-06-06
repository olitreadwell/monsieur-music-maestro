---
id: stage-2-open-vs-closed-hats
stage: 2
title: Open vs closed hats
type: mutate
difficulty: easy
branch: side-quest
parent: stage-2-hats-clap
estimate_min: 8
---

## What you're listening for

**Question and answer** in percussion. A closed hi-hat (`hh`) is short and sharp: a question, a click that asks for the next beat. An open hi-hat (`oh`) is longer and ringing: an answer, a sound that floats over the beat. When you alternate them, the pattern breathes — tight then airy, closed then open.

The open hat is one of the most recognisable sounds in disco and house. Once you know what it is, you will hear it everywhere.

## How to read the code

You already know `s(...)`, `hh`, `oh`, `bd*4`, `[~ cp]*2`, `hh*8`, the comma `,`, and `.bank(...)` from earlier toys.

No new Strudel notation in this toy. The focus is on listening to the difference between two sounds you already know: `hh` (closed hi-hat) and `oh` (open hi-hat). The pattern below alternates them to create a question-and-answer feel within the hat voice.

The pattern `"hh oh hh oh"` places a closed hat on beats 1 and 3 and an open hat on beats 2 and 4. Together with `[~ cp]*2`, both the clap and the open hat fall on the backbeat — reinforcing the 2-and-4 accent.

```strudel
// s(...)            = play these sounds in order, looped.
// bd*4              = bass drum, 4 times per bar.
// ,                 = comma: add another voice.
// [~ cp]*2          = clap on beats 2 and 4.
// hh oh hh oh       = closed hat on beats 1 and 3, open hat on beats 2 and 4.
//   hh              = closed hi-hat (short, sharp click).
//   oh              = open hi-hat (long, ringing sustain).
// .bank("RolandTR909") = Roland TR-909 kit (its open hat is the disco ride sound).
s("bd*4, [~ cp]*2, hh oh hh oh").bank("RolandTR909")
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code. Cmd+Enter plays, Cmd+. stops.

Now break it:

- Listen to the alternation of `hh` and `oh`. Notice how the open hat sustains into the next beat, then the closed hat cuts it short. That cutting effect is called **choking**: the closed hat physically stops the cymbal from ringing.
- Replace `"hh oh hh oh"` with just `"hh*4"`. The pattern becomes tighter and more mechanical. Now try `"oh*4"`. Rings a lot. Neither alone is as musical as the alternation.
- Try `"hh hh oh hh"`. Open hat only on beat 3. Less symmetric, different accent.
- Try the full eight-hat version with alternation: `"hh oh hh oh hh oh hh oh"`. Eight hats per bar, alternating closed and open on every eighth note. This is the classic disco and early house hat pattern.
- Swap `.bank("RolandTR909")` for `.bank("RolandTR808")`. The 808's open hat has a different character — still ringy, but a different flavour of ringy.

## In the world

The open hi-hat on the "and" of every beat is one of the most recognisable sounds in disco. Listen to Gloria Gaynor's "I Will Survive," Chic's "Le Freak," or the Trammps' "Disco Inferno" — you will hear the open hat sustaining between beats, giving the track its forward, floating feeling.

Early house producers kept the open hat in their patterns because they came from and loved disco. The TR-909's open hat sample has become so closely linked to that era that it is now an iconic sound in its own right. When a producer wants to signal "house," the 909 open hat is often the first thing they reach for.

## Music theory note

In standard drum notation, the open hi-hat is written with a small circle above the note head; the closed hat has an "x" head. The notation "+" above a note means the player closes the hat foot pedal to stop the ring — that is the choke in physical playing.

The question-and-answer structure you are hearing is a broader principle in music: **call and response**. One phrase (the call) is answered by another (the response). West African music and African American gospel, blues, and jazz built entire forms around call and response. In this toy, the closed hat is the call and the open hat is the response.

## History

The hi-hat as we know it developed in jazz drumming in the 1920s and 1930s. Early "low-boy" hi-hats were operated by foot and sat close to the floor. When a cymbal stand allowed the player to raise the hats to hand height, the open-close technique became a central part of jazz soloing and comping.

Disco producers and session drummers in the 1970s standardised the "four-on-the-floor with open hat on the offbeat" pattern. Session drummer Dennis Davis (David Bowie's "Station to Station," "Heroes") and Harold Cowart played versions of this pattern on many studio records of the era. The drum machine encoded it: the TR-909's hi-hat channel became a fixed, programmable reproduction of what session drummers had been playing live.

House producers in Chicago inherited this. The open hat's presence in early house tracks by Larry Heard, Frankie Knuckles, and Jesse Saunders traces directly back to disco session playing.

## Dance and body

Step to the kick. Then try to nod your head or bob your shoulders to the open hat on beats 2 and 4. You are physically following two voices at once: feet on the kick, head on the open hat.

Disco dancers used the open hat as a cue for a specific upper-body movement — the lift, the gesture upward. In house dancing, the open hat often cues an arm extension or an upward weight shift. The sound carries you up; the kick brings you back down.

## Self-test

Without looking back: what is the difference between `hh` and `oh`, and what does "choking" mean in the context of a hi-hat?

## Next

- Spine: [Stage 3 — Clave](/journey/3/clave)
- Side-quests in Stage 2: [Shuffle hats](/journey/2/shuffle-hats), [Hats and clap](/journey/2/hats-clap)
