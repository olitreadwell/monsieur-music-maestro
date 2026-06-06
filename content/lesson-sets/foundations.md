---
slug: foundations
title: Foundations
format: cultural-deep-dive
intro: |
  Three short toys to plant the seeds of musical thinking: what a beat is,
  what a pulse feels like, and how a basic backbeat sits over it. By the end
  you should be able to clap a steady 4/4 and pick out the kick and snare
  in any pop song.
toyIds:
  - stage-0-play
  - stage-1-pulse
  - stage-2-hats-clap
finalReview:
  quizzes:
    - id: foundations-review-q1
      kind: multiple-choice
      question: "What is a bar in 4/4 time?"
      options:
        - "Four beats grouped together."
        - "A type of drum."
        - "The end of a song."
        - "A single sound."
      correctAnswerIndex: 0
      explanation: "A bar is four beats grouped as one repeating unit. Four bars often form a short phrase, sixteen bars a section."
    - id: foundations-review-q2
      kind: multiple-choice
      question: "Where does the backbeat traditionally fall in a 4/4 bar?"
      options:
        - "Beats 1 and 3."
        - "Beats 2 and 4."
        - "Beat 1 only."
        - "All four beats."
      correctAnswerIndex: 1
      explanation: "The backbeat is the snare on beats 2 and 4. Earl Palmer and other R&B drummers of the 1940s and 1950s made it the foundation of rock, soul, funk, and disco."
  challenges:
    - id: foundations-review-c1
      prompt: "Write a Strudel patch that has a four-on-the-floor kick AND a clap on beats 2 and 4. Use the TR-909 bank."
      starterCode: |
        s("bd*4").bank("RolandTR909")
      targetDescription: "Kick on every beat (bd*4), clap on beats 2 and 4 (e.g. [~ cp]*2), TR-909 bank."
      validator: regex
      target: 'bd\*4.*\[~\s*cp\]\*2.*RolandTR909'
  openPrompt: |
    Play any house track and tap one foot on the kick, clap on the snare or clap.
    Did your body find it without counting? Describe what it felt like.
---

# Foundations: the bones of a beat

This first set is about getting comfortable enough with rhythm that you can
start to hear deliberately. You will press play. You will count to four.
You will swap one drum for another and notice. By the end you should be able
to find the "one" of any house, pop, or rock track without thinking.

The three toys below walk you through:

1. **Play**: pressing play, hearing four sounds in a row, swapping one out.
2. **The pulse**: the steady kick that defines house and most dance music.
3. **Hats and clap**: adding the backbeat that makes you nod your head.

Take them in order. Do the "I read this" button at the bottom of each page.
When you've done all three, come back here and do the final review.
