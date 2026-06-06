---
id: stage-3-2-3-flip
stage: 3
title: 2-3 flip
type: mutate
difficulty: normal
branch: side-quest
parent: stage-3-clave
estimate_min: 8
---

## What you're listening for

The same five hits, different order. In **3-2** (the spine toy) the "three side" comes first. In **2-3** the "two side" comes first. Both use the same clave tones. The change sounds subtle but it shifts where the phrase feels like it "starts."

Experienced musicians in Cuban and Latin traditions argue about which direction a song's clave runs. Getting it wrong: playing 3-2 over a 2-3 song: is one of the clearest errors a musician can make. The rhythm clashes with the melody even if every individual note is correct.

## How to read the code

No new Strudel notation. This toy is about the **order of the 16 tokens**, not new functions.

Recap:

- `s("...")` plays sounds in sequence, looped.
- `cp` is a hit, `~` is a rest.
- 16 tokens = two bars of 4/4.
- `stack(...)` layers patterns at the same time.
- `.gain(n)` controls volume.
- `.bank("RolandTR909")` uses the TR-909 kit.

The two directions, written out:

```
3-2 (three side first):
bar 1: cp ~ ~ cp ~ ~ cp ~   (3 hits)
bar 2: ~ ~ cp ~ cp ~ ~ ~    (2 hits)
full string: "cp ~ ~ cp ~ ~ cp ~ ~ ~ cp ~ cp ~ ~ ~"

2-3 (two side first):
bar 1: ~ ~ cp ~ cp ~ ~ ~    (2 hits)
bar 2: cp ~ ~ cp ~ ~ cp ~   (3 hits)
full string: "~ ~ cp ~ cp ~ ~ ~ cp ~ ~ cp ~ ~ cp ~"
```

Notice the 2-3 string is simply the 3-2 string cut at the midpoint and the two halves swapped.

```strudel
// Clave in 2-3 direction (two side comes first).
// bar 1 (2 hits): ~ ~ cp ~ cp ~ ~ ~
// bar 2 (3 hits): cp ~ ~ cp ~ ~ cp ~
stack(
  s("bd*4"),                                           // four-on-the-floor kick
  s("~ ~ cp ~ cp ~ ~ ~ cp ~ ~ cp ~ ~ cp ~").gain(0.8), // son clave 2-3
  s("hh*8").gain(0.4)                                  // hi-hats
).bank("RolandTR909")
```

## Try it

Paste in [strudel.cc](https://strudel.cc). Play, then break it:

- Switch back to 3-2 by changing the clave string to `"cp ~ ~ cp ~ ~ cp ~ ~ ~ cp ~ cp ~ ~ ~"`. Go back and forth a few times. Which direction feels like it starts on a stronger footing?
- Remove the kick. Listen to the 2-3 clave alone for a minute. Clap with it. Then switch to 3-2. Does one feel more "resolved" to you personally?
- Try playing two clavas at the same time: one 3-2, one 2-3, both at half gain. They will clash: this is what musicians mean when they say the clave is "crossed."
  ```strudel
  stack(
    s("bd*4"),
    s("cp ~ ~ cp ~ ~ cp ~ ~ ~ cp ~ cp ~ ~ ~").gain(0.4), // 3-2
    s("~ ~ cp ~ cp ~ ~ ~ cp ~ ~ cp ~ ~ cp ~").gain(0.4), // 2-3: clashes
    s("hh*8").gain(0.3)
  ).bank("RolandTR909")
  ```
- Use the rumba clave instead of the son clave. The rumba 3-2 string from the cheatsheet is `"cp ~ ~ cp ~ ~ ~ cp ~ ~ cp ~ cp ~ ~ ~"`. The third hit in bar 1 moves one step later. Does it sound more slippery?

## In the world

In salsa and son cubano, the clave direction is determined by the **melody** and specifically by where the melody's long tones fall. A phrase that opens with a long note on the "and" of beat 2 (an off-beat) usually sits over a 3-2 clave. A phrase that opens on beat 1 (a downbeat) often sits over a 2-3.

Soloists in Latin jazz and salsa know the clave direction of each song and make sure their phrases do not "break the clave": that is, start on the wrong bar and pull against the rhythm.

In modern Latin house and Afro house, producers sometimes leave the clave implied rather than stated. A melodic hook or a percussion fill takes the place of literal clave sticks. The direction is still there; it shapes how the music breathes.

## Music theory note

The 3-2 and 2-3 distinction is a case of **phrase alignment**: where a musical figure sits relative to the bar line.

In a 3-2 pattern, the "heavy" side (three hits) lands in bar 1. The ear treats bar 1 as the "downward" moment and bar 2 as the "release." In 2-3, the lighter side comes first and the heavier bar 2 becomes the arrival.

Some musicologists describe this as analogous to strong/weak beat relationships within a bar: downbeat versus upbeat, cadence versus antecedent. The clave makes this a two-bar phenomenon rather than a single-beat one.

Neither direction is "correct" in isolation. In Cuban music the direction is a property of the song, determined by the vocals and the primary instrumental melody. Changing direction mid-song (called **crossing the clave**) is considered an error: not a creative choice.

## History

The distinction between 3-2 and 2-3 was documented by Cuban musicologists, notably Fernando Ortiz in his mid-20th-century research on Afro-Cuban music. Ortiz spent decades cataloguing the instruments, rhythms, and religious ceremonies of Cuban African-descended communities and is considered the foundational scholar of Afro-Cuban cultural studies.

Son cubano solidified both clave directions as distinct, song-specific choices in the early 20th century. By the time salsa emerged in New York in the 1970s, the vocabulary of "playing in clave" was shared knowledge among Latin musicians. Educators like John Santos and Rebeca Mauleón (whose book *Salsa Guidebook for Piano and Ensemble* remains a standard reference) formalised the rules for English-speaking audiences from the 1990s onward.

Afro house producers in South Africa and Lagos in the 2010s and 2020s do not always follow the Cuban convention explicitly, but the same underlying tension between a heavy and a light bar appears in their music through different cultural routes: back to West African bell patterns that share the same 3+2 structure.

## Dance and body

Stand and walk slowly around the room. Count "1, 2, 3, 4" as you walk, one count per step. Now add the clave clap over your walk.

With 3-2: your first clap lands close to your first step (beat 1 of bar 1). The phrase feels grounded immediately.

With 2-3: your first clap lands a little late, in the middle of bar 1. The phrase feels like it is already in motion when it arrives.

Many dancers describe 2-3 as feeling "like you caught the bus rather than waited for it." Both feelings are musical and valid. Notice which one makes your body want to turn or spin sooner.

## Self-test

Without looking back: what does it mean when a musician says the clave is "crossed"?

## Next

- Spine: [Stage 3: The clave (spine)](/journey/3/clave)
- Related side-quest: [Tresillo: the single-bar cell](/journey/3/tresillo)
