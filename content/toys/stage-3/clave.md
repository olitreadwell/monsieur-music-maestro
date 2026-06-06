---
id: stage-3-clave
stage: 3
title: The clave
type: mutate
difficulty: normal
branch: spine
parent: stage-1-pulse
estimate_min: 10
quiz:
  id: stage-3-clave-quiz
  kind: multiple-choice
  question: "The son clave 3-2 spans how many bars, and which bar carries three hits?"
  options:
    - "One bar; the first half carries three hits."
    - "Two bars; the first bar carries three hits."
    - "Two bars; the second bar carries three hits."
    - "Four bars; the third bar carries three hits."
  correctAnswerIndex: 1
  explanation: "The son clave is a 16-step, two-bar pattern. The first bar is the 'three side' (three hits), the second is the 'two side' (two hits). Together they make five hits across two bars of 4/4 time."
---

## What you're listening for

A **clave** (pronounced "CLAH-veh"). It is a two-bar pattern — 16 steps in 4/4 time — that sits over the kick and tells every other instrument when to speak. It is asymmetric: three hits on one side, two hits on the other. That three-against-two pull is called **3-2** (or flipped, **2-3**).

You already know the single-bar shape from the history thread in the journey. This is that shape stretched across two bars and made complete.

## How to read the code

We are not adding any new Strudel functions here. Everything comes from stages 0 and 1. What changes is the **pattern itself**.

Recap of what you already know:

- `s("...")` plays a sequence of sounds, looped.
- `cp` is the clap, used here to represent the wooden clave instrument.
- `~` is a rest (silence). Each `~` is one step, the same duration as a sound token.
- `,` inside the quotes stacks two rhythms so they play at the same time.
- `.bank("RolandTR909")` swaps the kit to the TR-909 sounds.
- `stack(...)` layers separate `s(...)` lines so each can have its own settings.
- `.gain(0.8)` sets the volume. `1` is full, lower numbers are quieter.

The clave pattern uses **16 tokens** (steps) because it spans two bars of 4/4. The son clave 3-2 reads like this, where `cp` = hit and `~` = rest:

```
bar 1 (the "3 side"):  cp ~ ~ cp ~ ~ cp ~
bar 2 (the "2 side"):  ~ ~ cp ~ cp ~ ~ ~
```

Strudel plays both bars in a single string, looped. You write all 16 tokens together:

```strudel
// The son clave 3-2 over a house kick.
// cp               = clap, used here as the clave hit.
// ~                = rest (silence, one step of time).
// 16 tokens total  = two bars of 4/4 time.
// bar 1 (3 hits, the "three side"): cp ~ ~ cp ~ ~ cp ~
// bar 2 (2 hits, the "two side"):   ~ ~ cp ~ cp ~ ~ ~
stack(
  s("bd*4"),                                        // four-on-the-floor kick
  s("cp ~ ~ cp ~ ~ cp ~ ~ ~ cp ~ cp ~ ~ ~").gain(0.8), // son clave 3-2
  s("hh*8").gain(0.4)                               // eight hats, background texture
).bank("RolandTR909")
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the code. Cmd+Enter (Mac) or Ctrl+Enter plays, Cmd+. or Ctrl+. stops.

Now break it:

- Remove the kick line. Just listen to the clave alone. Does it feel stable even without the kick under it?
- Flip the clave to **2-3**: swap the two bars. Change the clave string to `"~ ~ cp ~ cp ~ ~ ~ cp ~ ~ cp ~ ~ cp ~"`. Notice how the phrasing feels like it "starts on the wrong foot" — neither is wrong, they suit different songs.
- Replace `cp` with `s("rim:0")` in the clave line. The rimshot is closer to the sound of real wooden clave sticks. (`rim:0` selects the first rimshot sample from the bank.)
- Lower the clave gain to `0.3`. Does it feel like it's gluing things together rather than standing on top?
- Remove the `stack(...)` wrapper and the kick, and write just the clave: `s("cp ~ ~ cp ~ ~ cp ~ ~ ~ cp ~ cp ~ ~ ~")`. Count along. Can you feel where bar 1 ends and bar 2 begins?

## In the world

Once you hear the son clave you will hear it everywhere: salsa, mambo, Latin jazz, Afro-Cuban son, and underneath the shuffle of Afro house and Latin house. It is one of the most recorded rhythms in the Americas.

In a dance context, the clave is the "key" — the word itself is Spanish for key. Dancers and musicians orient to it. If you play a clave pattern over any Afrobeats or Afro house track, you will usually find the clave syncs or at least rhymes with what is already there.

## Music theory note

The son clave is a **2-bar ostinato** — a short figure that repeats unchanged for the whole song. Unlike the backbeat (which sits symmetrically on beats 2 and 4), the clave is **syncopated**: its hits land in the gaps between beats, not on them.

The 3-2 label tells you which bar comes first. The "three side" has three hits, the "two side" has two. Together they add up to five hits over 16 steps: a **3+2** grouping inside 4/4 time.

This is different from a **polyrhythm** (two tempos at once). The clave lives inside one tempo. It pulls against the downbeats while still fitting neatly into the bar. That tension between the steady kick and the uneven clave is what makes the music move.

## History

The clave and the wooden **clave sticks** (two rounded hardwood cylinders struck together) are both called "clave." The rhythm and the instrument share the name because one defines the other.

The son clave emerged from **son cubano**, the Cuban popular music that developed in the eastern provinces (Oriente) in the late 19th century and moved to Havana in the 1910s and 1920s. Son drew from Spanish guitar traditions and from the drumming of the enslaved Africans brought to Cuba, whose rhythms included the bell patterns of West and Central African music. The clave is one result of that long collision.

By the 1930s and 1940s, son cubano spread widely. **Arsenio Rodríguez**, a tres guitarist and composer, was a major figure who pushed son toward a harder, more African sound in the 1940s. He helped carry it into what became mambo.

In New York in the late 1940s, **Mario Bauzá** (a Cuban musician who had played with Cab Calloway) and his brother-in-law **Machito** fused son with jazz big-band arrangements. The result was Afro-Cuban jazz. The bebop trumpeter Dizzy Gillespie took it up, and the clave entered jazz.

The 1950s brought **mambo** (Pérez Prado) and **cha-cha-chá** to dance halls across Latin America and the US. **Tito Puente** and **Cándido Camero** were central figures in this era. Cándido, a Cuban percussionist, brought Afro-Cuban hand drumming — congas, bongos, timbales — to broader audiences and influenced every Latin percussionist who followed.

Salsa in the 1970s (New York, Puerto Rican and Cuban communities) kept the clave alive. Latin house in the late 1980s and 1990s put it over four-on-the-floor kicks. Today's Afro house, Latin club music, and even mainstream pop carry traces of the same 16-step figure.

## Dance and body

The clave is a **felt anchor**, not a visual one. In Cuban partner dances (son, salsa, rumba), experienced dancers do not tap the clave consciously; they feel it inside the music and let it shape their steps. The clave tells them when to push and when to release.

Try this without any music: clap the tresillo (the first bar of the clave) slowly. "Clap... rest, rest... clap... rest, rest... clap, rest." Then let your body weight shift on each clap. You are doing what dancers do in social dancing: responding to asymmetry. The uneven gaps (3 steps, 3 steps, 2 steps) create a physical lean-and-release that even spacing never does.

Now add the second bar back: "rest, rest... clap... rest, clap... rest, rest, rest." The whole 16 steps again. Walk slowly as you clap. Your walk will start to syncopate.

## Self-test

Without looking back: the son clave 3-2 spans how many bars, and which bar has three hits?

## Next

- Spine: [Stage 4 — Counting bars](/journey/4/counting)
- Side-quests:
  - [Tresillo — the single-bar cell](/journey/3/tresillo)
  - [2-3 flip — swap clave direction](/journey/3/2-3-flip)
- Genre branches:
  - [Afrobeat clave — Tony Allen and Fela Kuti](/journey/3/branches/afro-house/afrobeat-clave)
  - [909 clave — sparse deep house rim](/journey/3/branches/deep/909-clave)
  - [2-step clave — UK garage kick shove](/journey/3/branches/garage/2-step-clave)
