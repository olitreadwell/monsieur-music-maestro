---
date: 2026-06-06
status: active
owner: olitreadwell
---

# Product vision

Monsieur Music Maestro is a single-user music-learning website that starts at preschool-level music intuition and walks toward mastery. The destination is broad: music theory, music history, **global musical cultures**, dance, and DJ craft. The vehicles are Strudel (live-coded music), the world's musical traditions, and house music as the engaging anchor (the genre the learner already loves).

## North-star user stories

These keep us honest about who this is for and what "mastery" means concretely.

1. **"I can dance Afro and Latin social dances confidently without counting in my head."** Salsa, bachata, kizomba, semba, forró, cumbia, etc. The user knows the beat in their body, not their head.
2. **"I can hear a song from a tradition I've never met and place it in time, region, and rhythmic family."** Open a track from Mali, Iran, Java, the Andes: and have grounded vocabulary to describe what's happening.
3. **"I can write a Strudel patch that captures the feel of a rhythm I just heard."** Listen, internalise, reproduce.
4. **"I can DJ a set that moves a crowd through three traditions without it feeling like a genre-tour."** Mix with cultural literacy.

## Constraints

- **Audience**: one user (Oli). No accounts, no auth, no multi-user state.
- **Starting point**: preschool-level. Assume no prior music vocabulary.
- **Accessibility**: WCAG 2.2 AA+ minimum. Real a11y, not lip service.
- **Devices**: mobile-first. The site has to feel right on a phone before it feels right on a laptop.
- **Connectivity**: offline-first. The user should be able to read articles and run patches without a connection.
- **Storage**: progress lives in `localStorage`. No server.

## Progress mechanisms

The learner should be able to:

1. Click **"I read this article"** at the bottom of every page: marks the toy as read.
2. Complete **quizzes**: multiple-choice or short-answer, validated client-side.
3. Complete **challenges**: modify a Strudel patch to achieve a stated effect, validated by tests.
4. Solve **puzzles**: drag-drop, reordering, pattern-matching games.
5. See **progress**: a checkmark next to completed toys on the tree; per-stage completion bar; overall completion percentage.

Tests run client-side. The user submits, the page evaluates, gives feedback, records the attempt.

## Spaced repetition

Challenges and quizzes should resurface on a spaced-repetition cadence (Leitner-box style) so the learner re-meets concepts at increasing intervals. Stored in `localStorage`.

## Structure: lesson sets

The journey is organised into **lesson sets**, not just stages. A lesson set is:

- A small group of toys (3-7) that share a theme.
- Plus an entry point (one paragraph framing why this exists).
- Plus a set of challenges woven through the toys.
- Plus a **final review** gate (quiz + challenge + open prompt) that must pass before the next set unlocks.

There are two lesson-set formats:

| Format | Shape | Example |
|---|---|---|
| **Cultural deep-dive** | One musical culture explored across its key concepts. | "Cuban son": clave, montuno, tres, the dance, the diaspora. |
| **Concept across cultures** | One concept explored through 3 traditions with strong examples. | "Polyrhythm": West African (Ewe), Cuban (rumba guaguancó), Indian (Carnatic tala). |

The "concept across cultures" format is the workhorse for breadth. The "cultural deep-dive" format is the workhorse for depth.

## Global discovery: cultures to cover

Starter list (will grow):

- **Africa**: West African (Mali, Senegal, Ghana, Nigeria), Central African (Congo), East African (Tanzania, Ethiopia), Southern African (South Africa, Zimbabwe), North African (Morocco, Egypt).
- **Latin America and Caribbean**: Cuba, Brazil, Puerto Rico, Dominican Republic, Haiti, Colombia, Argentina, Mexico, Peru, Venezuela.
- **Asia**: Indian Hindustani, Indian Carnatic, Persian/Iranian, Indonesian gamelan, Chinese (multiple traditions), Japanese, Korean, Vietnamese, Mongolian.
- **Oceania**: Aboriginal Australian, Maori, broader Polynesian, Melanesian.
- **Americas (north)**: Indigenous North American traditions, Appalachian, blues, gospel, jazz, country.
- **Europe**: Iberian, Balkan, Celtic, Sami, Scandinavian, Roma.

Each cultural deep-dive treats the tradition with care: real names, real places, real lineages, no exotification. Music is people, not aesthetic spice.

## Music, rhythm, dance: one sphere

Music and dance are not two subjects with a connecting bridge. They are the same thing observed from different angles. A rhythm is what a dancer's body does. A dance step is a rhythm made visible. In most of the traditions this site covers (Cuban, West African, Brazilian, Indian, Persian, Indonesian, Aboriginal Australian, gospel) the separation we make in Western conservatory tradition (music ↔ dance) is a recent and culturally specific abstraction.

Practically:

- Every rhythm toy includes a `Dance and body` section. Already the case in the current toy body shape; don't lose it.
- Cultural deep-dives name the dances that live in the tradition, treat them as part of the rhythm, not a follow-up.
- "Concept across cultures" lesson sets show the same concept in song, percussion, and dance simultaneously.
- The Afro and Latin social-dance threads (salsa, bachata, kizomba, semba, forró, cumbia, son cubano partnerwork, merengue) are woven through cultural deep-dives, not isolated to one phase. The user story "I dance these in my body, not my head" is met by repeated exposure across cultural sets, not a special dance module.

## Critique-level design

The page design itself should hold up to a critique. Typography, spacing, motion, hierarchy, semantic markup, focus states. Frontend-design and web-design-guidelines skills should be applied per route.

## Phase plan

The work breaks down into ordered phases. Each phase should be ship-able on its own.

| Phase | Title | Why |
|---|---|---|
| A | Progress tracking foundation | Lowest-risk, immediate user value. "I read this" + ✓ on tree + per-stage progress. |
| B | a11y AA+ pass + mobile-first review | Foundation for everything else. Audit + fixes before more features. |
| C | First quiz prototype on one toy + lesson-set scaffold | Prove the validator pattern + spaced-repetition data shape + the lesson-set entry + final review structure. |
| D | Offline + PWA | Service worker, manifest, cached assets. |
| E | Preschool layer + first cultural lesson set | Re-do the start so it's truly preschool. Add the first lesson set (Cuban son OR West African polyrhythm) as proof: rhythm + dance treated as one. |
| F | Critique-level design pass | Per-route design polish using frontend-design + web-design-guidelines. |
| G | Build out global discovery: one new lesson set per cycle | Cultural deep-dives + concept-across-3-cultures sets, each with challenges + final review, dance always woven in. |
| H | More challenges, puzzles, spaced-repetition queue at scale | Surface re-meets across the whole tree. |

Each phase produces a working artifact and gets merged + deployed before the next starts.
