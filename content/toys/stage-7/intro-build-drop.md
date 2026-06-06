---
id: stage-7-intro-build-drop
stage: 7
title: Intro, build, drop
type: takeapart
difficulty: normal
branch: spine
parent: stage-6-chord-stab
estimate_min: 12
quiz:
  id: stage-7-intro-build-drop-quiz
  kind: multiple-choice
  question: "In an additive build, what happens to the number of layers over time?"
  options:
    - "Layers are removed one by one until only the kick remains."
    - "Layers are added one by one, increasing density and energy."
    - "All layers enter at once on the drop, then thin out."
    - "Layers alternate: one enters as another exits, keeping density constant."
  correctAnswerIndex: 1
  explanation: "An additive build starts sparse (often just kick) and adds layers one at a time. Each addition raises energy. The drop then arrives with all layers playing, releasing the tension the build created."
---

## What you're listening for

**Structure**: the way a track moves through sections with different levels of energy. An **intro** arrives with just one or two elements. A **build** adds layers and tension. The **drop** brings everything in at once for maximum impact. A **breakdown** strips layers back out, creating space before the next drop.

You already have all the elements: kick, hats, clap, bass, chord stab. This toy is about deciding when each one enters and exits.

## How to read the code

No genuinely new Strudel notation in this toy. You are combining everything you already know. The new idea is **structural pattern**: using `.slow(N)` and `stack(...)` to layer parts that appear and disappear at different moments.

The demonstration shows an arrangement hint rather than a full 64-bar track. In Strudel, you cannot yet trigger sections interactively from a button. The code below shows the **drop section** (all parts in) alongside a second version (intro, stripped down) so you can hear the contrast by toggling between them.

**Takeapart instruction**: the code is intentionally complete. Your job is to remove individual lines and press play after each removal. Removing lines simulates what happens when a DJ or producer takes layers out to create a breakdown or isolate an intro.

```strudel
// Full drop: all layers together.
// This is what the dance floor hears after the build.
// Remove any line to create a stripped-down section.
stack(
  // Kick: four-on-the-floor, the spine of house
  s("bd*4").bank("RolandTR909"),

  // Clap on beats 2 and 4: the backbeat
  s("~ cp ~ cp").bank("RolandTR909"),

  // Hi-hats: 8 per bar, keeping time
  s("hh*8").bank("RolandTR909").gain(0.5),

  // Bass: tresillo-shaped, minor key
  note("c2 ~ ~ eb2 ~ ~ g2 ~").s("sawtooth").lpf(700).gain(0.6),

  // Chord stab: four-chord minor progression, slow cycle
  note("<c3eb3g3 ab2c3eb3 f2ab2c3 g2bb2d3>")
    .s("piano").slow(2).room(0.3).gain(0.5)
)
```

## Try it

Open [strudel.cc](https://strudel.cc). Paste the full code. Play it.

Now **take it apart** section by section:

1. Remove all lines except the kick and hats. Press play. This is the **intro**: sparse, just the rhythmic skeleton.
2. Add the clap back. The backbeat snaps in: energy rises.
3. Add the bass. Now the low end is present. The groove is recognisable.
4. Remove the kick but leave everything else. This is a **breakdown**: the rhythm is implied but the main drive is gone. The dance floor floats.
5. Bring the kick back. That re-entry is the **drop**.

Then try **building**: start from just the kick, add one line at a time, in this order: hats, clap, bass, chords. Hear the energy increase with each addition.

Finally, try: kick only for 4 bars, then kick plus hats for 4 bars, then everything in. That 3-step entry is an **additive build**.

## In the world

Listen to any house, techno, or EDM track and count bars while following the sections. In most house tracks you will find:
- 8-bar or 16-bar intro (often just kick or kick plus minimal elements)
- 8-bar build (layers added one at a time, or filter sweeping up)
- Drop (full groove, usually sustained for 16 or 32 bars)
- Breakdown (layers stripped, often pads or melody alone)
- Second drop or outro

DJs count these sections precisely because they need to drop the incoming track at a phrase boundary, matching their bar-counted listening from Stage 4.

## Music theory note

The additive build is a **texture** technique: gradually increasing the number of simultaneous sound layers. In orchestral music, building from a solo instrument to full orchestra is an ancient technique. In electronic dance music, it creates the same arc through layering patterns in a sequencer or sampler.

The term **drop** in EDM came from the moment when everything that had been building suddenly arrives. In older house and hip-hop production, producers used the term **break** for a stripped-down section, usually just drums, that came from sampled James Brown breakbeats. Both ideas involve strategic removal and re-entry of layers.

**Arrangement** is the sequence of all sections across the full length of the track. In house music, arrangement is almost always in multiples of 8: 8-bar, 16-bar, 32-bar blocks. This regularity is not an accident: it is what makes DJing possible, because the DJ knows exactly when a phrase boundary is coming.

## History

The intro/build/drop pattern became widely named in the early 2000s as big-room EDM producers (from Dutch progressive house, then American EDM) turned the drop into a dramatic, audience-anticipated climax.

But the underlying idea is older. Disco producers and arrangers in the 1970s used additive builds: a common technique was to start a track sparse (kick and bass), add percussion, add strings, add horns, until the track was fully dense by the first vocal chorus. Early house producers in Chicago used the same strategy with drum machines and sequencers.

Techno producers in Detroit (early 1990s: Jeff Mills, Robert Hood) mastered the **subtraction** version: they built hypnotic tracks by removing and replacing elements over long periods, creating tension through absence rather than addition.

## Dance and body

The build tells your body something is coming. Physical tension rises: shoulders, arms, jaw. The drop releases it. This is a real physiological pattern: the build/drop structure maps onto the stress-release cycle your body knows from suspense.

On the dance floor, people raise their arms during a build. This is partly imitation, partly genuine physical response to increasing musical density. When the drop lands, arms come down, feet go harder. The structure is designed to produce that response.

Try dancing through a build on your own: arms relaxed at the start, rising as layers add in, then a full physical release when the drop lands. Notice how the music tells your body what to do without instructions.

## Self-test

Without looking back: what is the difference between an **additive build** (adding layers) and a **breakdown** (removing layers)? And how many bars are the usual section lengths in house music?

## Next

- Spine: [Stage 8: Play it out (DJ): two decks](/journey/8/two-decks)
- Side-quests:
  - [Filter build: sweep tension](/journey/7/filter-build)
  - [16-bar section thinking](/journey/7/16-bar-section)
