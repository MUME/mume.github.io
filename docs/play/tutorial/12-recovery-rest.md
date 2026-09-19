---
title: "Recovery & Rest"
description: "Sit down to accelerate hit point recovery, quench thirst, and satisfy hunger."
teach:
  - command: "rest"
    desc: "sit down to accelerate health and move recovery"
  - command: "wake"
    desc: "wake up and stand"
  - command: "drink water"
    desc: "drink water from a well or waterskin"
  - command: "eat biscuit"
    desc: "eat rations to maintain fast health regeneration"
steps:
  - story: "Breathless, Fuor and Ermin arrive back at the warm peat hearth inside The Foaming Mug."
  - ask: "rest"
    note: "Sit down to rest and regenerate health faster using `rest`."
    accept:
      - "rest"
    hint: "Type: rest"
  - ask: "wake"
    note: "Stand up and prepare to move again using `wake` (or `stand`)."
    accept:
      - "wake"
      - "stand"
      - "st"
    hint: "Type: wake"
  - ask: "drink water"
    note: "Quench thirst at the village well with `drink water`."
    accept:
      - "drink water"
      - "drink"
    hint: "Type: drink water"
  - ask: "eat biscuit"
    note: "Satisfy hunger with `eat biscuit`."
    accept:
      - "eat biscuit"
    hint: "Type: eat biscuit"
responses:
  rest: |
    You sit down and rest your tired bones.

    *+->
  wake: |
    You stop resting and stand up.

    *+->
  stand: |
    You stop resting and stand up.

    *+->
  st: |
    You stop resting and stand up.

    *+->
  drink water: |
    You drink the water from the stone well.

    *+->
  drink: |
    You drink the water from the stone well.

    *+->
  eat biscuit: |
    You eat a large biscuit.
    You are full.

    *+->
---

# Chapter 12: Recovery by the Fire

Safely back inside **The Foaming Mug**, Fuor and Ermin sit by the peat fire. Sitting down (`rest`) accelerates health recovery, while drinking fresh well water (`drink water`) and eating biscuits (`eat biscuit`) maintain rapid health regeneration.

Help Fuor rest (`rest`), stand (`wake`), quench his thirst (`drink water`), and eat (`eat biscuit`) below!
