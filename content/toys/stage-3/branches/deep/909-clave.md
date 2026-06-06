---
id: stage-3-909-clave
stage: 3
title: 909 clave
type: mutate
difficulty: normal
branch: deep
parent: stage-3-clave
estimate_min: 10
---

## What you're listening for

A clave that you can barely hear but that you immediately miss when it is gone. In **deep house** the clave is often implied: a quiet rim hit on a sparse 909 kit, sitting well underneath the kick and pads. It is not the feature; it is the texture. Your ear catches a looseness in the groove but cannot quite name why the music moves the way it does.

This toy puts a very quiet 909 rim on the clave pattern and asks you to find the line between "present" and "felt but not consciously heard."

## How to read the code

One new element: **`s("rim:0")`**.

`rim` is the name of the rimshot sample in Strudel's default library. A rimshot is made by striking the rim of the snare drum and the drumhead at the same time, producing a dry, woody click rather than the full crack of a full snare hit. It is a common clave substitute in Latin, jazz, and deep house because the woody tone resembles the clave sticks.

`:0` selects the first sample in the `rim` group. Strudel's default library may have more than one rimshot recording; `:0` pins the choice so the sound is consistent.

Everything else is from earlier toys:

- `s("...")` plays sounds in sequence.
- `~` is a rest.
- `stack(...)` layers patterns.
- `.gain(n)` sets volume.
- `.bank("RolandTR909")` uses the TR-909 kit for `bd`, `hh`, `oh`, etc.

Note: `rim` may or may not be part of the TR-909 bank. If the sound disappears when you add `.bank("RolandTR909")` to the stack, write the rim line separately without the bank call, like this toy does.

```strudel
// Sparse deep house groove with implied clave on a 909 rim.
// rim:0  = rimshot, sample 0 (dry, woody click, clave substitute).
// oh     = open hi-hat (the "tss" on the offbeats).
// The clave gain is very low: 0.25. Present, not featured.
stack(
  s("bd*4").gain(0.95).bank("RolandTR909"),           // steady kick
  s("~ ~ ~ oh ~ ~ ~ oh").gain(0.5).bank("RolandTR909"), // open hat, offbeat
  s("hh*8").gain(0.2).bank("RolandTR909"),            // closed hat, quiet texture
  s("rim:0 ~ ~ rim:0 ~ ~ rim:0 ~ ~ ~ rim:0 ~ rim:0 ~ ~ ~").gain(0.25) // clave 3-2 on rim
)
```

## Try it

Paste in [strudel.cc](https://strudel.cc). Play, then mutate:

- Raise the rim gain from `0.25` to `0.7`. The clave becomes obvious. Then bring it back down. Find the gain where you can feel it but not quite name it.
- Remove the rim line entirely. The kick and hats stay. Does the groove feel slightly looser, like a table missing one leg?
- Change `rim:0` to `cp`. The clap is brighter than the rim. How does a bright clave feel in a sparse deep house context?
- Swap the clave to 2-3: change the string to `"~ ~ rim:0 ~ rim:0 ~ ~ ~ rim:0 ~ ~ rim:0 ~ ~ rim:0 ~"`. Does the implied clave still "work" with the kick when the direction flips?
- Add a very quiet open hat on the offbeats (already present) and reduce the kick gain to `0.8`. Deep house is about space; see how thin you can make the top end before the groove disappears.

## In the world

Deep house emerged in Chicago and New York in the mid-to-late 1980s as a more understated, soulful branch of house. Larry Heard (recording as Mr. Fingers), Marshall Jefferson, and Larry Levan at the Paradise Garage were early points of reference. Deep house kept a connection to gospel, jazz, and soul that harder house variants dropped.

In deep house production the clave is rarely stated loudly. You find it as a rim hit, a subtle percussion loop, or buried in a piano part that has a slight syncopation. The **implication** is the point: listeners feel the African-Latin ancestry of the groove without the producer hitting them over the head with it.

This approach: hiding the structural rhythm inside the texture: is also common in Brazilian baile funk, in much UK garage, and in certain strands of Afro house from South Africa. The clave is load-bearing architecture, but it does not need to be visible.

## Music theory note

When a musical element is **implied rather than stated** it means the listener's brain constructs it from context and expectation. You do this constantly with music: you "hear" a bass note under a thin chord even when the bass is absent because the chord implies it.

With the clave, the implication works because the other instruments (kick, hats, open hat placement) create a 4/4 grid that the ear knows. The rim hits on the clave positions are small deviations from that grid. Your ear registers the deviations and fills in the pattern, even at low volume.

This is related to the concept of a **ghost note** in jazz and funk drumming: a note struck so softly it is felt more than heard, but its absence changes the groove.

## History

Larry Heard's *Can You Feel It* (recorded around 1986, released 1987) is one of the foundational deep house records. It uses a sparse Roland TR-909 pattern with open hats, a gentle clave-adjacent percussion part, and a slow, emotional piano. The percussion is so quiet that many listeners do not notice it explicitly but feel the groove it creates.

The Roland TR-909 was released in 1983 and discontinued in 1985. By the mid-1980s secondhand units were cheap, which is one reason Chicago and Detroit producers used them heavily. The 909's kick, snare, and hi-hat sounds became the template for house and techno. Its rim sound: the dry crack you hear on this toy: was often used for auxiliary percussion roles: shakers, claves, and additional accents.

## Dance and body

At a deep house night the floor is usually dark and the tempos are lower (115-120 BPM rather than the 126-128 of harder house). Dancers tend to move slower and more inward: small hip shifts, weight transfers, slow arm movements. The implied clave gives those movements a shape that an even kick and hat pattern alone would not.

Try moving slowly to the patch at a low tempo. Let your hip move on each clave hit, even though the rim is quiet. After a few bars your body will start to anticipate the hits. That anticipation: filling in a pattern your ears half-hear: is a version of what dancers call "finding the pocket."

## Self-test

Without looking back: what is a ghost note, and how does the low-gain rim in this toy relate to that idea?

## Next

- Spine: [Stage 3: The clave](/journey/3/clave)
- Other branches:
  - [Afrobeat clave: Tony Allen and Fela Kuti](/journey/3/branches/afro-house/afrobeat-clave)
  - [2-step clave: UK garage kick shove](/journey/3/branches/garage/2-step-clave)
