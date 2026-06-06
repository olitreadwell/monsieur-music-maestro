---
id: stage-8-headphone-cue
stage: 8
title: Headphone cue — the DJ's private channel
type: challenge
difficulty: stretch
branch: side-quest
parent: stage-8-two-decks
estimate_min: 12
---

## What you're listening for

A **cue channel**: an audio monitor path that only the DJ hears, not the crowd. The DJ listens to the next track in their headphones while the current track plays through the speakers. This lets them beatmatch, phrase-align, and check key before the crowd ever hears the incoming track.

This toy cannot fully demonstrate the headphone cue in code (that requires hardware or DJ software with separate output routing). What it does instead: it walks through the listening technique that the cue channel enables, and it uses Strudel to let you practise the underlying skill of listening to two things at once.

## How to read the code

No new Strudel notation. The challenge in this toy is the listening task, not the syntax.

**Pre-fader listen (PFL)** is the technical term for what the cue button does: it routes the channel's audio to the headphone output *before* the channel fader. This means the DJ can hear the incoming track at full level in headphones even while its fader is at zero (silent to the crowd).

The Strudel exercise here uses two patterns with **different rhythmic accents** so you can practise identifying beats in one pattern while the other plays. This is a simplified version of the cue skill: finding beat 1 in the incoming track by listening over the outgoing track.

```strudel
// Track A (main speakers): 4/4 kick on every beat
// This is what the crowd hears.
s("bd*4").bank("RolandTR909")
```

```strudel
// Track B (in your headphones): starts with a pickup note on beat 4
// Open this in a second strudel.cc tab.
// Your challenge: find beat 1 of Track B so you can align it with Track A.
// The bd hit at the start of each cycle = beat 1 of Track B.
// Listen: the pattern is bd, then rest, then hh, then cp (4 beats).
// Track B starts on beat 4 of its own phrase with an extra cp:
stack(
  s("bd ~ hh cp").bank("RolandTR909"),
  s("hh*8").bank("RolandTR909").gain(0.3)
)
```

## Try it

This is a challenge toy. The steps require active, split-attention listening.

**Step 1: Learn both patterns separately.**
- Open two tabs of [strudel.cc](https://strudel.cc). Paste Track A in one, Track B in the other.
- Listen to each alone until you can find beat 1 (the kick) in each.

**Step 2: Listen to both together.**
- Play both tabs at the same time.
- Identify beat 1 of Track B while Track A is playing. This is the cue skill: finding the incoming beat inside the outgoing sound.

**Step 3: Align them.**
- Stop Track B. Let Track A keep playing.
- Count to a phrase boundary in Track A (every 4 bars = 16 beats).
- At the exact moment of beat 1 in Track A, start Track B.
- If they line up, you have phrase-aligned a mix. If they do not, the kicks will be offset and you will hear two competing kick patterns.

**Step 4: Reflect.**
- How hard was it to find beat 1 of Track B while Track A was playing?
- A DJ does this with Track B playing only in headphones, at full volume, at the same time as Track A at speaker volume, for up to 8 bars while also moving the tempo fader and watching the crowd.
- This is a real physical skill. It improves with practice, not just understanding.

**After this toy**: try the same exercise in Mixxx. Use the headphone cue button (the headphone icon next to each channel). Load one track on each deck, play one, put the other in cue, and practise finding beat 1 before you let it play through the speakers.

## In the world

The headphone cue technique is standard on all DJ mixers. Every mixer since the late 1970s with a professional feature set has included a headphone section with per-channel cue buttons and a mix knob (for blending the cue signal with the main program).

In a club setting, the DJ monitor speaker (the wedge or small speaker on the DJ booth facing the DJ) plays the main program. The headphones play the cue signal. The DJ switches their listening attention between the two, constantly monitoring both streams and making decisions.

DJs describe this as a form of **split attention**: a mental mode where you maintain awareness of two separate audio streams simultaneously. Experienced DJs do this automatically; beginners find it disorienting at first.

## Music theory note

**Monitor mixing** (what happens in the headphone cue) is a different skill from **programme mixing** (what the crowd hears). A professional studio has both: the control room monitors play the mix as it will be heard, while the talkback and headphone sends let the producer and engineer hear different things. DJ technique brings the same principle into a live performance context.

**Gain staging** matters in headphone cue: the cue signal volume must be high enough to hear over the ambient noise of a loud club (often 100+ dB SPL at the DJ booth). Many DJs have experienced hearing damage from decades of using headphone cue at high volumes. Ear protection and regular audiologist checks are a real professional health concern.

## History

The headphone cue technique as a DJ practice traces back to Francis Grasso at the Sanctuary (1969-1972). Grasso used a modified mixer that allowed him to preview records before playing them to the crowd. He also introduced **slip-cueing**: holding a record still on a spinning platter (protected by a felt mat) and releasing it on the beat, allowing for precise phrase alignment without stopping the turntable.

This technique was passed informally from Grasso to the next generation of New York DJs. By the time Frankie Knuckles and Larry Levan arrived in the mid-1970s, headphone cueing was established practice. Both DJs trained under the same mentor network and brought the technique to Chicago and New York clubs that became the centres of house music culture.

The technology evolved: from modified mixers to purpose-built DJ mixers (Urei 1620, Rane TTM 56) to the current standard Rane and Pioneer DJ mixers that include a full monitoring section as standard.

## Dance and body

The physical act of DJing with headphones is ergonomically strange: one ear pressed to the headphone cup, tilted sideways, the other ear open to the room. Experienced DJs develop their own variant, but the asymmetric posture is common enough to be recognisable from photos or video.

The split-attention skill is also a physical skill: you are training your brain to process two audio streams as separate, meaningful signals rather than letting them merge into noise. This is similar to how musicians in an ensemble listen to themselves and to the group simultaneously. It takes time, and it uses the body as well as the mind: DJs often describe feeling the beat in their feet while listening in their heads.

## Self-test

Without looking back: what does PFL stand for, and what does it allow a DJ to do that a regular fader does not?

## Next

- Return to spine: [Two decks](/journey/8/two-decks)
- Other side-quest: [Key matching](/journey/8/key-matching)
- Optional: [Afro house: percussion layer](/journey/8/branches/afro-house/percussion-layer)
