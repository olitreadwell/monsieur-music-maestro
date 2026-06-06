---
domain: art
matter: doc
energy: reference
time: perpetual
privacy: soft
status: active
related:
  - README.md
  - strudel-cheatsheet.md
  - resources.md
  - practice-log-template.md
---

# Music + Strudel learning journey

Learn to make house music by writing code, and learn the music underneath it:
listening, rhythm, theory, history, and DJing. Built for an absolute beginner.
Afro and Latin music run all the way through, because that is the music you love
and the music house comes from.

## Skim: the whole thing in 30 seconds

- You learn by **hearing and making first, naming after**. No theory dumps.
- Every session has the **same shape**, so it is calm and predictable.
- Inside that shape, the **music keeps changing** (new song, new sound), so it stays fresh.
- You **build a runnable beat every time** and you **move your body** to it.
- There are **9 stages** (0 to 8). Each one is a small, finished win.
- Start at **Stage 0**. Do one stage per session, or split a stage over several. No race.

## The 10 rules (how we learn here)

Each rule is a research-backed idea in plain words. The "why" is in the Depth section below.

1. **Sound before symbol.** Hear it and make it first. Put the name on it after.
2. **One thing at a time.** Add one new sound or idea per session. Never a pile.
3. **Short sessions.** 5 to 15 minutes is enough. You can always stop after the build.
4. **Same shape, new music.** The steps never change. The song inside them does.
5. **Build something every time.** You end each session with code that plays.
6. **Move your body.** Bounce and count to the beat. Dancing teaches rhythm faster than reading.
7. **Test yourself, do not re-read.** Try to rebuild the last thing from memory first.
8. **Come back on a schedule.** Revisit old patches on day 1, 3, 7, 14, 30. That is what makes it stick.
9. **Edge of ability.** Slow things down until they are about 90% right, then nudge harder.
10. **Your taste drives it.** Pick songs you love as your examples. Always.

## The session shape (the stable shell)

Every session is these six steps, in this order. This sameness is on purpose. It
calms the part of your brain that wants predictability, while the music inside
feeds the part that wants novelty.

1. **Warm-up (1 min).** Open Strudel. Rebuild last session's beat from memory. Peek only if stuck.
2. **Listen (2 min).** Play one track you love. Notice just one thing in it (the kick? the clap? the bass?).
3. **Move (1 min).** Stand up. Bounce once per beat. Count out loud: "1, 2, 3, 4."
4. **Build (5 to 10 min).** Add the one new thing for today's stage. Press play. Tweak. Hear it.
5. **Name it (1 min).** Learn the word for what you just made. One word.
6. **Log (1 min).** Fill in `practice-log-template.md`. Goal, what happened, one fix.

**You can stop here** after step 4 any day. The rest is bonus.

## The history thread (your "why")

Read one piece of this each session. It is the reason the rhythms feel the way they do.

> West African communities (like the Ewe of Ghana) played a fixed **bell pattern** that
> every drummer locked to. The transatlantic slave trade carried these rhythms to **Cuba
> and Brazil**, where the bell became the **clave**. Clave and its core cell, the
> **tresillo**, fed into **jazz**, then **disco**. In late-1970s and 1980s **Chicago and
> New York**, mostly **Black, Latino, and queer** clubs (the Warehouse with Frankie
> Knuckles, the Paradise Garage with Larry Levan) turned disco into **house**. From there
> grew **Afro house**, **Latin house**, and **Amapiano**.

So your favourite Afro and Latin music and house music are **the same family tree**. When
you code a clave over a four-on-the-floor kick, you are replaying 300 years of that story.

Sources for every claim are in `resources.md` (section 7).

## The map: 9 stages

Each stage is one small win. The pattern is always: **Goal, Listen, Move, Build, Name,
History, Self-test, Stop-point.** Code is paste-ready into strudel.cc. Full code reference
is in `strudel-cheatsheet.md`.

---

### Stage 0: Play (no rules)

- **Goal:** press play and make noise. Prove it works. No pressure.
- **Listen:** any track you love.
- **Move:** bounce to it.
- **Build:** paste this, press Ctrl+Enter (Cmd+Enter on Mac), then change `bd` to `cp` and replay.
  ```
  s("bd hh sd hh")
  ```
- **Name:** *sound* (a drum hit). `bd` kick, `sd` snare, `hh` hi-hat, `cp` clap.
- **History:** drum machines (like the Roland TR-909) made house possible. You are using their sounds.
- **Self-test:** can you make it play, and stop it (Ctrl+. / Cmd+.)?
- **Stop here.** That is a real first session.

---

### Stage 1: The pulse (four-on-the-floor)

- **Goal:** build the house heartbeat: a kick on every beat.
- **Listen:** any house track. Find the steady "thump... thump... thump... thump."
- **Move:** step or bounce once per thump. Count "1, 2, 3, 4" out loud.
- **Build:**
  ```
  s("bd*4").bank("RolandTR909")
  ```
  `bd*4` means four kicks, evenly spread. That is **four-on-the-floor**.
- **Name:** *beat* (one pulse), *BPM* (beats per minute, house is ~120 to 128), *4/4* (four beats per bar).
- **History:** the steady four-on-the-floor kick came from disco into house. It is the genre's spine.
- **Self-test:** without looking, what does `*4` do?
- **Stop here** if you like. You built the foundation of every house track ever made.

---

### Stage 2: The top (hats and clap)

- **Goal:** add the parts that sit on top of the kick.
- **Listen:** in a house track, find the fast ticking (hi-hats) and the clap.
- **Move:** keep bouncing on 1-2-3-4. Now clap your hands on **2 and 4** only.
- **Build:**
  ```
  s("bd*4, ~ cp ~ cp, hh*8").bank("RolandTR909")
  ```
  The commas stack sounds together. `~` is silence. So: kick on every beat, clap on
  beats 2 and 4, hats eight times across the bar.
- **Name:** *backbeat* (clap on 2 and 4), *offbeat* (the "and" between beats).
- **History:** clap on 2 and 4 is the "backbeat," shared across soul, funk, disco, and house.
- **Self-test:** which beats does `~ cp ~ cp` clap on?
- **Stop here.** You now have a full house drum loop.

---

### Stage 3: The clave (your Afro/Latin DNA)

This is the stage where your favourite music walks in.

- **Goal:** feel and code the **tresillo** and the **son clave**.
- **Listen:** an Afro house, Latin house, or reggaeton track. Find the "boom... boom... boom"
  that is *not* evenly spaced. That uneven pattern is tresillo.
- **Move:** clap the tresillo: "**1** . . **2** . . **3** ." (clap, rest, rest, clap, rest, rest, clap, rest). Slow.
- **Build:** the tresillo cell (the DNA of Afro and Latin music):
  ```
  s("cp ~ ~ cp ~ ~ cp ~")
  ```
  Now lay it over the house kick and hear Afro-Latin house appear:
  ```
  stack(
    s("bd*4"),
    s("cp ~ ~ cp ~ ~ cp ~").gain(0.8),
    s("hh*8").gain(0.4)
  ).bank("RolandTR909")
  ```
  Want the full **son clave (3-2)**? Swap the clap line for:
  ```
  s("cp ~ ~ cp ~ ~ cp ~ ~ ~ cp ~ cp ~ ~ ~")
  ```
- **Name:** *clave* (the key rhythm), *tresillo* (the 3+3+2 cell), *syncopation* (hits in the gaps).
- **History:** the tresillo came to the Americas through the slave trade and grew out of the
  West African bell pattern. It is inside reggaeton, salsa, son, and tons of house.
- **Self-test:** clap the tresillo with no music. Just `x . . x . . x .`
- **Stop here.** You just coded 300 years of rhythm history.

---

### Stage 4: Counting (bars and phrases)

- **Goal:** count past 4, so you can build song sections later.
- **Listen:** count "1-2-3-4" again and again in a track. Every four counts is one **bar**.
  Notice the music changes every 8 or 16 bars.
- **Move:** march in place. Count whole bars: "**1**-2-3-4, **2**-2-3-4, ... up to 8."
- **Build:** make a sound change every cycle so you can hear bars passing:
  ```
  stack(
    s("bd*4"),
    s("<hh*8 hh*16>").gain(0.4)
  ).bank("RolandTR909")
  ```
  The `< >` alternates each cycle: normal hats, then double-time hats, repeat.
- **Name:** *bar* (4 beats), *phrase* (8 or 16 bars), *cycle* (one loop in Strudel, here one bar).
- **History:** DJs mix tracks together at phrase boundaries (every 8, 16, or 32 bars). This
  counting is the exact skill behind beatmatching, which you reach in Stage 8.
- **Self-test:** how many beats in 2 bars?
- **Stop here.**

---

### Stage 5: The low end (bass and mood)

- **Goal:** add a bassline, and meet "happy vs sad" (major vs minor).
- **Listen:** find the low notes that move under a house track.
- **Move:** keep the kick bounce, hum the bass notes low.
- **Build:** a tresillo-shaped bassline (rhythm you already know, now with pitch):
  ```
  stack(
    s("bd*4").bank("RolandTR909"),
    note("c2 ~ ~ eb2 ~ ~ g2 ~").s("sawtooth").lpf(700).gain(0.6)
  )
  ```
  `eb2` (E flat) gives a **minor**, moodier feel. Change `eb2` to `e2` for a **major**,
  brighter feel. Press play after each change and hear the mood flip.
- **Name:** *note* (a pitch, A to G), *octave* (the number, higher = higher), *minor* (darker),
  *major* (brighter), *low-pass filter* (`lpf`, cuts brightness).
- **History:** the bass and kick "lock" together in house and in Afro-Cuban son (the *tumbao*).
  Low end is the body of the music.
- **Self-test:** which note made it sound sadder, `e2` or `eb2`?
- **Stop here.**

---

### Stage 6: The colour (chords and stabs)

- **Goal:** add chords, the "colour" on top.
- **Listen:** find the stabby chord hits in a house or Amapiano track.
- **Move:** nod on each chord stab.
- **Build:**
  ```
  note("<c3eb3g3 ab2c3eb3 f2ab2c3 g2bb2d3>")
    .s("sawtooth").slow(2).room(0.3).gain(0.5)
  ```
  Each group like `c3eb3g3` is three notes played together: a **chord**. The `< >` plays
  one chord per cycle, so it is a little progression. This one is in a minor key.
- **Name:** *chord* (notes stacked together), *stab* (a short chord hit), *progression* (chords in a row).
- **History:** soulful, jazzy 7th chords are a signature of deep house and its disco roots.
- **Self-test:** how many notes are in `c3eb3g3`?
- **Stop here.**

---

### Stage 7: The shape (arrange a track)

- **Goal:** turn loops into a short finished track (about 60 to 90 seconds).
- **Listen:** notice a track's sections: quiet intro, build-up, full drop, breakdown, outro.
- **Move:** feel where energy rises and falls.
- **Build:** combine your kick, clap/clave, hats, bass, and chords into one `stack(...)`
  (see the full loop in `strudel-cheatsheet.md`). Then practise **taking parts out and
  putting them back** to make sections:
  - **Intro:** just `s("bd*4")` and hats.
  - **Drop:** everything in.
  - **Breakdown:** remove the kick, leave chords and clave.
  - Change something every 8 or 16 bars.
- **Name:** *arrangement* (the order of sections), *intro / build / drop / breakdown / outro*.
- **History:** house tracks are built in 8 / 16 / 32-bar blocks like Lego, so DJs can mix them.
- **Self-test:** what do you remove to make a breakdown?
- **Stop here.** You have made a track.

---

### Stage 8: Play it out (DJ)

- **Goal:** mix two tracks together, like a DJ.
- **Tool:** install **Mixxx** (free, open-source, mixxx.org). DJ with just your laptop.
- **Listen:** to how one song blends into the next on a radio mix or DJ set.
- **Move:** this whole stage is about keeping two beats locked, which you trained in Stages 1 and 4.
- **Do:**
  1. Load two tracks. Press **SYNC** so Mixxx matches their tempo for you (training wheels, fine to use).
  2. Use **headphone cue** to hear the next track before the crowd does.
  3. Bring it in at a **phrase boundary** (every 8 or 16 bars, the counting from Stage 4).
  4. Use the **EQ** (low / mid / high knobs) to swap basslines cleanly.
  - Learn manual **beatmatching** by ear later. Sync first.
- **Name:** *beatmatching*, *phrasing*, *EQ*, *cue*, *crossfader*.
- **History:** Frankie Knuckles and Larry Levan built house culture by DJing, re-editing, and
  blending records for dancers. You are doing the same thing they did.
- **Stop here.** You went from zero to DJ.

---

## Where to go after Stage 8

Loop back. Pick a new genre you love (Amapiano, reggaeton, Afrobeats) and rebuild the
journey in that flavour: new tempo, new clave, new sounds, same nine stages. The shell
stays; the music changes. That is the whole idea.

## Depth: why it is built this way (the research)

The journey is designed on evidence. Strongest-evidence ideas carry the most weight. Full
sources and honest evidence-strength flags are in `resources.md` (section 8).

- **Sound before symbol.** Every major music-teaching method (Gordon, Kodaly, Orff, Suzuki)
  agrees: experience first, name after. Strudel is perfect for it because the sound is instant.
- **Chunk it (cognitive load).** Beginners overload because everything is new at once. One
  new element per session keeps it learnable. *Strong evidence.*
- **Test yourself + space it (retrieval practice + spacing).** Rebuilding from memory and
  revisiting on a 1-3-7-14-30 day ladder beats re-reading by a lot. *Strong evidence.*
- **I do, we do, you do (scaffolding).** Copy a worked example, then tweak with support, then
  build alone. Supports fade as you grow.
- **Move to learn (embodied cognition + Dalcroze).** Moving to a beat is a real brain process
  (auditory-motor entrainment) and builds an internal pulse. It also aids focus. *Mechanism: strong.*
- **Special interest as fuel (monotropism).** Anchoring to Afro and Latin music you love raises
  focus, motivation, and memory for an AuDHD brain. *Useful theory.*
- **Stable shell, novel content.** The fixed session shape satisfies the autistic need for
  predictability; the changing music satisfies the ADHD need for novelty. *Lived-experience pattern.*
- **Plain language + visuals (multimedia learning).** Short sentences, no idioms, a sound or
  picture with every idea. Good for ESL and for everyone. *Strong evidence.*
- **The "why" and immediate use (andragogy).** Adults learn better with a reason and a payoff.
  Every stage ends in something that plays.

**Borrowed from Teach Like a Champion 3.0** (a teaching book, current as of 2021): *Check for
Understanding* (the self-tests), *Right is Right* (hold out for the precise answer, not "close
enough"), *No Opt Out* (when stuck, work back to stating it yourself), and small-rep practice
(loop the one hard bar). The classroom-control parts of that book are skipped; they do not fit
solo adult learning.

## Logging and the spacing ladder

After each session, copy `practice-log-template.md` into `art/music/log/`. Track your goal,
what happened, one fix, and your **next review date**:

- Built something new today? Review it again in **1 day**.
- Got it again? Push the next review to **3 days**, then **7**, **14**, **30**.
- Each clean rebuild from memory earns a longer gap. That spacing is what moves it into
  long-term memory.
