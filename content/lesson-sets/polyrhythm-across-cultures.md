---
slug: polyrhythm-across-cultures
title: Polyrhythm across cultures
format: concept-across-cultures
intro: |
  Polyrhythm is when two or more independent rhythms play at the same
  time. Most Western pop arranges instruments so they all agree on the
  same downbeat. Much of the world's music does not. It layers rhythms
  that pull against each other, and the friction is the point.
  This set looks at polyrhythm through three traditions: Ewe drumming
  from coastal West Africa, Cuban son and rumba, and South Indian
  Carnatic tala. The clave you've already met is one specific kind of
  polyrhythm: here you'll see the bigger family.
toyIds:
  - stage-3-clave
  - stage-3-tresillo
  - stage-3-2-3-flip
finalReview:
  quizzes:
    - id: polyrhythm-q1
      kind: multiple-choice
      question: "What is a polyrhythm?"
      options:
        - "A rhythm played at multiple tempos."
        - "Two or more rhythms played at the same time that don't share the same downbeat or grouping."
        - "A rhythm with many drums."
        - "A complicated drum solo."
      correctAnswerIndex: 1
      explanation: "Polyrhythm means two or more rhythms running at once with different grouping or downbeat structures. It's not just lots of drums; it's rhythms that pull against each other on purpose."
    - id: polyrhythm-q2
      kind: multiple-choice
      question: "The 3-against-2 polyrhythm (three even strokes against two even strokes in the same span of time) is foundational in many traditions. Which of these is it the basis of?"
      options:
        - "Only Cuban son."
        - "Only West African bell patterns."
        - "All three of these: West African bell patterns, the hemiola in classical music, and the swing feel in jazz."
        - "Only Carnatic tala."
      correctAnswerIndex: 2
      explanation: "3-against-2 (also called hemiola in European classical music) is a near-universal building block. You find it in West African gankogui bell patterns, in Western classical (Brahms loved it), and inside the swing feel of jazz. The clave's 3-side is closely related."
    - id: polyrhythm-q3
      kind: short-answer
      question: "Name one Carnatic tala (South Indian rhythmic cycle)."
      correctAnswerPattern: "(adi|rupaka|jhampa|misra chapu|khanda chapu|triputa|tisra triputa|ata|dhruva|matya|jhampa|eka)"
      explanation: "Common talas include Adi (8 beats, the most common), Rupaka, Misra Chapu (7 beats), Khanda Chapu (5 beats), and many more. South Indian Carnatic music organises time into talas the way Western music organises into time signatures, but with vastly more variety."
  challenges:
    - id: polyrhythm-c1
      prompt: "Layer a 3-pulse and a 2-pulse over the same bar (a 3-against-2). Use any two sounds. Hint: in Strudel you can use a comma to layer patterns."
      starterCode: |
        s("bd*2, hh*3")
      targetDescription: "Two patterns layered with a comma, one repeated 2 times per bar and the other 3 times per bar."
      validator: regex
      target: '(\*2.*\*3|\*3.*\*2)'
  openPrompt: |
    Listen to one track each from three of these traditions: Ewe drumming
    (search "Ewe Agbadza" on YouTube), Cuban rumba guaguancó, and
    Carnatic tala (search "Adi tala demonstration"). What did your body
    want to do for each? Did one feel easier to dance to? Why?
---

# Polyrhythm across cultures

In a lot of Western pop the drums, bass, and guitar all agree on a
single downbeat. Beat 1 of the bar is unambiguous. Polyrhythm is what
happens when you stop agreeing. Two rhythms run at once. They cross.
They argue. The argument is the music.

## What you'll meet

**West Africa: Ewe drumming (coastal Ghana, Togo, Benin)**

The Ewe people have a long tradition of master-drummer ensembles where
each drummer plays a different rhythmic role. A gankogui (a double iron
bell) plays a steady time-keeping pattern. A kagan (high drum) plays
fast subdivisions. The kidi and sogo (medium drums) play interlocking
parts. The master drummer (atsimevu) plays improvised calls and
responses that cross the underlying patterns. The whole ensemble is
polyrhythm by design. Search "Ewe Agbadza" or read about C K Ladzekpo's
teaching at UC Berkeley.

**Cuba: son and rumba**

The clave you've met is one polyrhythmic pattern. In Cuban rumba
(particularly guaguancó), the clave plays against tumbadoras (conga
drums) and the cajón (a wooden box drum, originally a shipping crate).
Each drummer locks to the clave but plays a pattern with different
grouping. The dance moves are themselves a rhythm: the dancer's feet
say one thing while the shoulders say another.

**India: Carnatic tala**

Carnatic music (South India) organises time into talas: rhythmic
cycles. Adi tala is 8 beats. Rupaka is 6. Misra Chapu is 7 (3 + 4).
The mridangam drummer plays patterns that span multiple talas, cross
through them, and resolve precisely on beat 1 of the next cycle. The
calculation involved is enormous; the listening is meditative.

## What ties them together

The 3-against-2 polyrhythm (three even strokes in the time of two)
shows up in every one of these traditions. It is one of the most
universal rhythmic ideas in human music. The clave's 3-side is a 3,
the 2-side is a 2. The Ewe bell pattern's accent pattern is 3-2-3-2.
The Carnatic tisra (3) and chatusra (4) cross-rhythms are exactly this
family.

Once you can feel a 3-against-2, you can recognise it in everything
from a Brazilian samba (the tamborim plays a 3-against-2 over the
surdo) to a Brahms symphony to a J Dilla beat.

## How to use this set

The three toys below (clave, tresillo, 2-3 flip) are about Cuban
clave specifically. After running through them, come back here and do
the final review: the quizzes and challenge widen the lens to the
three traditions named above.
